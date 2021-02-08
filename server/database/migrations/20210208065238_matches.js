
exports.up = function(knex) {
  return knex.schema.createTable('matches', tbl => {
    tbl.increments()
    tbl.integer('buddy1_ID')
    tbl.integer('buddy2_ID')
    tbl.string('buddy1_zoomID')
    tbl.string('buddy2_zoomID')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('matches')
};
