const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
//const reduceProperties = require("../utils/reduce-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  critic_preferred_name: "critic.critic.preferred_name",
  critic_surname: "critic.critic.surname",
  critic_created_at: "critic.critic.created_at",
  critic_updated_at: "critic.critic.updated_at",
});

/*const reduceCritic = reduceProperties("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"],
});*/

function update(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(addCritic);
  //.then(reduceCritic);
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
  delete: destroy,
};
