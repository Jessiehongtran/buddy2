
exports.up = function(knex) {
  return knex.schema.createTable('days', tbl => {
      tbl.increments()
      tbl.string('day_name')
      tbl.integer('day_int')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('days')
};
