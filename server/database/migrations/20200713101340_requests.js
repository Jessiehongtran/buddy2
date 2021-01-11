
exports.up = function(knex) {
    return knex.schema.createTable('requests', tbl => {
        tbl.increments()
        tbl.integer('user_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('timeSlotInteger')
        tbl.boolean('matched')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('requests')
  };