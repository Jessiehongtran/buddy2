
exports.up = function(knex) {
  return knex.schema.createTable('newVocab', tbl => {
      tbl.increments()
      tbl.string('new_word')
      tbl.string('meaning')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('newVocab')
};
