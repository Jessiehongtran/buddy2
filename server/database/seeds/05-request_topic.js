
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('request_topic').del()
    .then(function () {
      // Inserts seed entries
      return knex('request_topic').insert([
        {
          id: 1, 
          request_id: 1,
          topic_id: 1
        },
        {
          id: 2, 
          request_id: 1,
          topic_id: 2
        },
        {
          id: 3, 
          request_id: 1,
          topic_id: 5
        },
        {
          id: 4, 
          request_id: 2,
          topic_id: 12
        },
        {
          id: 5, 
          request_id: 2,
          topic_id: 10
        },
        {
          id: 6, 
          request_id: 3,
          topic_id: 8
        },
        {
          id: 7, 
          request_id: 4,
          topic_id: 5
        }
      ]);
    });
};
