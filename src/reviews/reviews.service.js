const knex = require("../db/connection");
//const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritic = reduceProperties("critic_id", {
  organization_name: ["critic", null, "organization_name"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
});

function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}
function showUpdate(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ review_id: updatedReview.review_id })
    .then(reduceCritic);
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  showUpdate,
  delete: destroy,
};
