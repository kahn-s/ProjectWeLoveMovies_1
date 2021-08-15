const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const moviesService = require("./movies.service.js");

async function showReviews(req, res) {
  const review = await moviesService.showReviews(req.params.movieId);
  res.json({ data: review });
}

async function showingAtTheater(req, res) {
  const theater = await moviesService.showingAtTheater(req.params.movieId);
  res.json({ data: theater });
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
  if (!(showing === true)) {
    const data = await moviesService.list();
    res.json({ data });
  }
  if (showing === true) {
    const data = await moviesService.isShowing();
    res.json({ data });
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
