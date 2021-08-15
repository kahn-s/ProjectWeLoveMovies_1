const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const reviewsService = require("./reviews.service.js");

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviews.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  res.json({ data: data[0] });
}

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}
async function destroy(req, res) {
  await service.delete(res.locals.reviews.reviews_id);
  res.status(204).send("No Content");
}
module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
