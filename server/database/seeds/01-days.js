
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('days').del()
    .then(function () {
      // Inserts seed entries
      return knex('days').insert([
        {
          id: 1, 
          day_name: 'Sun',
          day_int: 0
        },
        {
          id: 2, 
          day_name: 'Mon',
          day_int: 1
        },
        {
          id: 3, 
          day_name: 'Tue',
          day_int: 2
        },
        {
          id: 4, 
          day_name: 'Wed',
          day_int: 3
        },
        {
          id: 5, 
          day_name: 'Thu',
          day_int: 4
        },
        {
          id: 6, 
          day_name: 'Fri',
          day_int: 5
        },
        {
          id: 7, 
          day_name: 'Sat',
          day_int: 6
        },
      ]);
    });
};
