const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// schema defines the actual queries or rel endpoints
// rootValue(is and object which has all the resolver functions in it) tell where we can find
//   our resolvers which contains the logics to interract with DB based on queries defined in the Schema
app.use(express.json());
app.use(
  "/graphapi",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ["Standup Comedy", "All night coding", "Cooking"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("server is listning at 3000");
});
