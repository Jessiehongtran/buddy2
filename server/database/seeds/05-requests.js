
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {
          id: 1,
          user_id: 1,
          timeSlotInteger: 1614358886,
          matched: false,
          showZoomLink: false
        },
        {
          id: 2,
          user_id: 2,
          timeSlotInteger: 1614370886,
          matched: false,
          showZoomLink: false
        },
      ]);
    });
};