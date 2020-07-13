
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
        tbl.integer('day_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('days')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('time_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('times')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('timezone_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('timezones')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.string('date')
        tbl.boolean('matched')
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('requests')
  };