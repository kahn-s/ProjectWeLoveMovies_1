const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const reviewsService = require("./reviews.service.js");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}
async function read(req, res) {
  res.json({ data: res.locals.review });
}

async function update(req, res) {
  try {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const data = await reviewsService.update(updatedReview);
    res.json({ data: data[0] });
  } catch (err) {
    console.log(err);
  }
}

async function destroy(req, res) {
  await reviewsService.delete(res.locals.review.review_id);
  res.status(204).send("No Content");
}
module.exports = {
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
