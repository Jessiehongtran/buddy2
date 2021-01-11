
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('request_topic').del()
    .then(function () {
      // Inserts seed entries
      return knex('request_topic').insert([
        {
          request_id: 1,
          topic_id: 1
        },
      ]);
    });
};

