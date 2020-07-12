
exports.up = function(knex) {
  return knex.schema.createTable('topics', tbl => {
      tbl.increments()
      tbl.string('topic_name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('topics')
};
