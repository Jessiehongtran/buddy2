
exports.up = function(knex) {
  return knex.schema.createTable('timezones', tbl => {
      tbl.increments()
      tbl.string('value')
      tbl.float('dif')
      tbl.string('name')
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('timezones')
};
