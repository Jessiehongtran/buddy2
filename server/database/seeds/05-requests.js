
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {
          id: 1, 
          user_id: 1,
          day_id: 1,
          time_id: 1,
          timezone_id: 5,
          date: '07/20',
          matched: false
        },
        {
          id: 2, 
          user_id: 1,
          day_id: 2,
          time_id: 7,
          timezone_id: 5,
          date: '07/21',
          matched: false
        },
        {
          id: 3, 
          user_id: 2,
          day_id: 2,
          time_id: 8,
          timezone_id: 5,
          date: '07/21',
          matched: false
        },
        {
          id: 4, 
          user_id: 3,
          day_id: 2,
          time_id: 8,
          timezone_id: 5,
          date: '07/21',
          matched: false
        },
      ]);
    });
};