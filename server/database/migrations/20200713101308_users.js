
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('first_name')
        tbl.string('last_name')
        tbl.string('email').unique().notNullable()
        tbl.string('password')
        tbl.string('zoomID').unique().notNullable()
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
  
