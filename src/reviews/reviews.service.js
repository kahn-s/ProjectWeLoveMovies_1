const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  critic_preferred_name: "critic.critic.preferred_name",
  critic_surname: "critic.critic.surname",
  critic_created_at: "critic.critic.created_at",
  critic_updated_at: "critic.critic.updated_at",
});

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((data) => {
      // console.log("addCritic");
      const addCData = addCritic(data);
      return { critic: addCData };
    });
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
