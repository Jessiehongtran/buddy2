
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          first_name: 'Hong',
          last_name: 'Tran',
          email: 'htran2@babson.edu',
          password: '1234',
          zoomID: '12345678'
        },
        {
          first_name: 'Vy',
          last_name: 'Tran',
          email: 'vytran@babson.edu',
          password: '12345',
          zoomID: '12345679'
        },
        {
          first_name: 'La',
          last_name: 'Giang',
          email: 'lagiang@gmail.com',
          password: 'abcd',
          zoomID: '123456710'
        }
      ]);
    });
};
