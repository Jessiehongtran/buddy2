
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics').del()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
        {
          id: 1,
          topic_name: "travel"
        },
        {
          id: 2,
          topic_name: "punctuality"
        },
        {
          id: 3,
          topic_name: "entertainment"
        },
        {
          id: 4,
          topic_name: "education"
        },
        {
          id: 5,
          topic_name: "health"
        },
        {
          id: 6,
          topic_name: "art"
        },
        {
          id: 7,
          topic_name: "business"
        },
        {
          id: 8,
          topic_name: "money"
        },
        {
          id: 9,
          topic_name: "communication"
        },
        {
          id: 10,
          topic_name: "environment"
        },
        {
          id: 11,
          topic_name: "family"
        },
        {
          id: 12,
          topic_name: "food"
        },
        {
          id: 13,
          topic_name: "government"
        },
        {
          id: 14,
          topic_name: "housing"
        },
        {
          id: 15,
          topic_name: "language"
        },
        {
          id: 16,
          topic_name: "advertising"
        },
        {
          id: 17,
          topic_name: "technology"
        },
        {
          id: 18,
          topic_name: "space"
        },
        {
          id: 19,
          topic_name: "society"
        },
        {
          id: 20,
          topic_name: "sport"
        },
        {
          id: 21,
          topic_name: "tourism"
        },
        {
          id: 22,
          topic_name: "transport"
        },
        {
          id: 23,
          topic_name: "work"
        }
      ])
    })
};
