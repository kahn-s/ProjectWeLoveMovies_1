exports.up = function (knex) {
  return knex.schema.table("critics", (table) => {
    table.decimal("created_at"), table.decimal("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.table("critics", (table) => {
    table.dropColumn("created_at"), table.dropColumn("updated_at");
  });
};
