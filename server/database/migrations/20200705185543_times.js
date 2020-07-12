
exports.up = function(knex) {
  return knex.schema.createTable('times', tbl => {
      tbl.increments()
      tbl.string('timeslot')
      tbl.string('ampm')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('times')
};
