const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: "fnAE_f5wubACWdaGNhEflqpRCSqh8_9E6jfW3lA-" });

exports.handler = async (event, context) => {
  const { action, username, password } = JSON.parse(event.body);

  try {
    if (action === "login") {
      // Handle user login
      const { data } = await client.query(
        q.Get(q.Match(q.Index("users_by_username"), username))
      );

      if (data.password === password) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Logged in successfully!" }),
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Invalid password" }),
        };
      }
    } else if (action === "signup") {
      // Handle user sign-up
      const newUser = await client.query(
        q.Create(q.Collection("users"), {
          data: { username, password },
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Signed up successfully!" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid action" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
