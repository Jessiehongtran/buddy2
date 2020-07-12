
exports.up = function(knex) {
  return knex.schema.createTable('request_topic', tbl => {
      tbl.increments()
      tbl.integer('request_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('requests')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      tbl.integer('topic_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('topics')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('request_topic')
};
