
exports.up = function(knex) {
  return knex.schema.createTable('matches', tbl => {
    tbl.increments()
    tbl.integer('buddy1_ID')
    tbl.integer('buddy2_ID')
    tbl.string('buddy1_zoomID')
    tbl.string('buddy2_zoomID')
    tbl.integer('meetingTimeInt')
    tbl.string('topics')
    tbl.timestamp('matched_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('matches')
};
