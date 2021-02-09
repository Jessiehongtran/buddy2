
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert([
        {
          id: 1,
          buddy1_ID: 1,
          buddy2_ID: 2,
          buddy1_zoomID: "1234567",
          buddy2_zoomID: "123456710",
          meetingTimeInt: 1614349886,
          topics: "environment, education"
        },
      ]);
    });
};

