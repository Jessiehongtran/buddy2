
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert([
        {
          id: 1,
          request1_id: 1,
          request2_id: 2,
          meetingTimeInt: 1614349886,
          topics: "environment, education"
        },
      ]);
    });
};

