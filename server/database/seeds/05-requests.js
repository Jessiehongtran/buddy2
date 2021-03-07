
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {
          user_id: 1,
          timeSlotInteger: 1614358886,
          matched: false,
          showZoomLink: false
        },
        {
          user_id: 2,
          timeSlotInteger: 1614370886,
          matched: false,
          showZoomLink: false
        },
      ]);
    });
};