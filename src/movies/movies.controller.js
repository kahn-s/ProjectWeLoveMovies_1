const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const moviesService = require("./movies.service.js");

async function showReviews(req, res) {
  const reviews = await moviesService.showReviews(req.params.movieId);
  const newArray = Object.values(reviews);
  const resp = [...newArray, (critic = critic[0])];
  console.log("RESP", resp);
  res.json({ data: newArray });
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
    console.log("SHOWING");
    const data = await moviesService.isShowing();
    console.log("SHOWING DATA");
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
