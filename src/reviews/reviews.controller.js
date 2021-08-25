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
    await reviewsService.update(updatedReview);

    const showUpdate = await reviewsService.showUpdate(updatedReview);

    const review = showUpdate[0];
    let newReview = {};

    if (showUpdate.length > 0) {
      newReview = {
        content: review.content,
        created_at: review.created_at,
        critic: review.critic[0],
        critic_id: review.critic_id,
        movie_id: review.movie_id,
        review_id: review.review_id,
        score: review.score,
        updated_at: review.updated_at,
      };
      console.log("newReview", newReview);
    }
    res.json({ data: newReview });
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
