
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('times').del()
    .then(function () {
      // Inserts seed entries
      return knex('times').insert([
        {
          id: 1, 
          timeslot: '8:00',
          ampm: 'AM'
        },
        {
          id: 2, 
          timeslot: '9:00',
          ampm: 'AM'
        },
        {
          id: 3, 
          timeslot: '10:00',
          ampm: 'AM'
        },
        {
          id: 4, 
          timeslot: '11:00',
          ampm: 'AM'
        },
        {
          id: 5, 
          timeslot: '12:00',
          ampm: 'PM'
        },
        {
          id: 6, 
          timeslot: '1:00',
          ampm: 'PM'
        },
        {
          id: 7, 
          timeslot: '2:00',
          ampm: 'PM'
        },
        {
          id: 8, 
          timeslot: '3:00',
          ampm: 'PM'
        },
        {
          id: 9, 
          timeslot: '4:00',
          ampm: 'PM'
        },
        {
          id: 10, 
          timeslot: '5:00',
          ampm: 'PM'
        },
        {
          id: 11, 
          timeslot: '6:00',
          ampm: 'PM'
        },
        {
          id: 12, 
          timeslot: '7:00',
          ampm: 'PM'
        },
        {
          id: 13, 
          timeslot: '8:00',
          ampm: 'PM'
        },
        {
          id: 14, 
          timeslot: '9:00',
          ampm: 'PM'
        },
        {
          id: 15, 
          timeslot: '10:00',
          ampm: 'PM'
        },
      ]);
    });
};
