const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const moviesService = require("./movies.service.js");

async function showReviews(req, res) {
  const reviews = await moviesService.showReviews(req.params.movieId);
  console.log("reviews[0].critic[0]", reviews[0].critic[0]);
  const respCritObj = [];
  reviews.map((review) => {
    newReview = {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: review.critic[0],
    };
    respCritObj.push(newReview);
  });
  res.json({ data: respCritObj });
}

async function showingAtTheater(req, res) {
  const theaters = await moviesService.showingAtTheater(req.params.movieId);
  res.json({ data: theaters });
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function list(req, res) {
  const showing = req.query.is_showing;
  if (showing) {
    const data = await moviesService.isShowing();
    res.json({ data: data });
  } else {
    const data = await moviesService.list();
    res.json({ data: data });
  }
}

module.exports = {
  showReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(showReviews),
  ],
  showingAtTheater: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(showingAtTheater),
  ],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
