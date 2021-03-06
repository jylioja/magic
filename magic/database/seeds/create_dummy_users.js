
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'John Doe', email: 'johndoe@example.com', password: '123', role: 'admin'},
        {username: 'Jane Doe', email: 'janedoe@example.com', password: '123', role: 'admin'},
        {username: 'Matti Nykänen', email: 'mattinykanen@example.com', password: '123', role: 'admin'}
      ]);
    });
};
