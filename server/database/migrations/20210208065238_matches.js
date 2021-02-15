
exports.up = function(knex) {
  return knex.schema.createTable('matches', tbl => {
    tbl.increments()
    tbl.integer('request1_id')
    tbl.integer('request2_id')
    tbl.integer('meetingTimeInt')
    tbl.string('topics')
    tbl.timestamp('matched_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('matches')
};
