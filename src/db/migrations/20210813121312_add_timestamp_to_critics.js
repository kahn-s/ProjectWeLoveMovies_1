exports.up = function (knex) {
  return knex.schema.table("critics", (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.table("critics", (table) => {
    table.time("created_at");
    table.time("updated_at");
  });
};
