
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics').del()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
        {
          topic_name: "travel"
        },
        {
          topic_name: "punctuality"
        },
        {
          topic_name: "entertainment"
        },
        {
          topic_name: "education"
        },
        {
          topic_name: "health"
        },
        {
          topic_name: "art"
        },
        {
          topic_name: "business"
        },
        {
          topic_name: "money"
        },
        {
          topic_name: "communication"
        },
        {
          topic_name: "environment"
        },
        {
          topic_name: "family"
        },
        {
          topic_name: "food"
        },
        {
          topic_name: "government"
        },
        {
          topic_name: "housing"
        },
        {
          topic_name: "language"
        },
        {
          topic_name: "advertising"
        },
        {
          topic_name: "technology"
        },
        {
          topic_name: "space"
        },
        {
          topic_name: "society"
        },
        {
          topic_name: "sport"
        },
        {
          topic_name: "tourism"
        },
        {
          topic_name: "transport"
        },
        {
          topic_name: "work"
        }
      ])
    })
};
