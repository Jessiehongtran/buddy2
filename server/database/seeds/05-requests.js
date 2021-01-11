
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {
          id: 1,
          user_id: 1,
          timeSlotInteger: 1234,
          matched: false
        },
      ]);
    });
};