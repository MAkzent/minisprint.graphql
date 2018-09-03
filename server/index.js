const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
// The data below is mocked.
const data = require("./data/pokemon.js");

// The schema should model the full data object available.
const schema = buildSchema(`
  type Pokemon {
    id: String
    name: String!
    classification: String
    types: [String]
    resistant: String
    weaknesses: String
    weight: Weight
    fleeRate: Float
    evolutionRequirements: EvolutionRequirements
    evolutions: [Evolution]
    maxCP: Int
    maxHP: Int
    attacks: Attacks
  }
  type Weight {
    minimum: String
    maximum: String
  }
  type Height {
    minimum: String
    maximum: String
  }
  type EvolutionRequirements {
    amount: Int
    name: String
  }
  type Evolution {
    id: Int
    name: String
  }
  type Attacks {
    fast: [Attack]
    special: [Attack]
  }
  type Attack {
    name: String
    type: String
    damage: Int
  }
  input newPokemon {
    id: ID!
    name: String
    types: String
  }
  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String): Pokemon
    highFlee: [Pokemon]
  }
  type Mutation {
    createPokemon(input: newPokemon): Pokemon
    updatePokemon(id: ID, input: newPokemon): Pokemon
    deletePokemon(id: ID): Pokemon
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  Pokemons: () => {
    return data;
  },
  Pokemon: (request) => {
    return data.find((pokemon) => pokemon.name === request.name);
  },
  highFlee: () => {
    return data.filter((pokemon) => pokemon.fleeRate > 0.15);
  },
  createPokemon: (request) => {
    data.push({
      id: request.input.id,
      name: request.input.name,
      type: request.input.type,
    });
    return data;
  },
  updatePokemon: (request) => {
    // console.log(data[0]);
    const index = data.findIndex((pokemon) => pokemon.id == Number(request.id));
    data[index] = {
      ...data[index],
      ...request.input,
    };
  },
  deletePokemon: (request) => {
    const index = data.findIndex((pokemon) => pokemon.id == Number(request.id));
    data.splice(index, 1);
  },
};

// Start your express server!
const app = express();

/*
  The only endpoint for your server is `/graphql`- if you are fetching a resource, 
  you will need to POST your query to that endpoint. Suggestion: check out Apollo-Fetch
  or Apollo-Client. Note below where the schema and resolvers are connected. Setting graphiql
  to 'true' gives you an in-browser explorer to test your queries.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");
