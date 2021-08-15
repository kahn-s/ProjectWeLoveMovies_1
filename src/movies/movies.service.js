const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  critic_name: "critic.critic.preferred_name",
  critic_surname: "critic.critic.surname",
  critic_created_at: "critic.critic.created_at",
  critic_updated_at: "critic.critic.updated_at",
});

function showReviews(movieId) {
  return knex("reviews as r")
    .select("*")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ movie_id: movieId })
    .then(addCritic);
}

function showingAtTheater(movieId) {
  return knex("theaters as t")
    .select()
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .where({ movie_id: movieId }, { is_showing: true });
}

function isShowing() {
  return knex("movies as m")
    .select()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function list() {
  return knex("movies").select();
}

module.exports = {
  read,
  list,
  isShowing,
  showingAtTheater,
  showReviews,
};
