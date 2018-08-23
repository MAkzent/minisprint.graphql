<img src="https://cdn-images-1.medium.com/max/1000/1*IvCDlfi3vQfgyKO1eFv4jA.png" alt="graphql" width="400">
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

# GraphQL

## 1. Server Quick Start

Run `yarn start` to start the server.

Visit `http://localhost:4000/graphql` to test that the server is running.

Here are some queries you can test:

```
{
  pokemons {
    id
    name
  }
}
```

```
{
  pokemon(name: "Pikachu") {
    id
    name
  }
}
```

## 2. Schema

* Right now, the server is only set up to provide the Pokemon's id and name. What if you also wanted to get their weight, attacks, and evolutions?

* To do that, you will need to update the schema. The schema (in `server/index.js`) should model the full data object available. Take a look at `server/data/pokemon.js` to see what other fields you can add to the schema.

* Update your schema so it fully represents your Pokemon data object!

* Test your work! Go back to GraphiQL to test some queries. Remember, the magic of GraphQL is that you don't have to get back the full data object, even if it is available. Click `Docs` on the right side of the explorer to see your full schema.

## 3. Resolvers

* The resolvers in `server/index.js` are functions that return the data requested in the queries. You will notice that the names of these functions match the names of the queries listed in the type `Query` in your schema.

* This is where you can add additional types of resolvers. Think about what other types of queries you are interested in and add them here!

## 4. Mutations

* If you want to add a mutation, the structure is a little different. Instead of using the keyword `type`, use the keyword `input`. Additionally, you will need to create a type called `Mutation` inside your schema. See below for an example!

```
input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
}

type Query {
  getMessage(id: ID!): Message
}

type Mutation {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
```

## 5. Frontend

* You can continue to test all of this using `localhost:4000/graphql`. But let's say you want to connect a frontend to this server. The only endpoint for your server is `/graphql`– if you are fetching a resource, you will need to POST your query to that endpoint (whether it is a query or a mutation). Suggestion: check out Apollo-Fetch or Apollo-Client.

## Basic Requirements

* Schema
  * Update your schema so it fully represents your Pokemon data object!
  * Add a Schema for [Pokeballs](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9_Ball#Types_of_Pok.C3.A9_Balls)! No need to have a full dataset, just pick some to include so you can play around. Include fields for at least:
    * Name
    * Effect
    * Catch Rate
* Resolvers
  * Add Resolvers to Query Pokeballs you added in the last step.
* Mutations
  * Create mutations to modify Pokemon and Pokeballs, including adding, editing and removing them
* Frontend
  * Add a basic frontend that uses either `apollo-client` or `apollo-fetch` to query your endpoint.

## Advanced Requirements

* Add a React or Vue Frontend
* Hook up a Database to store your data in
