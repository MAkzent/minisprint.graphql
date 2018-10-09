<img src="https://cdn-images-1.medium.com/max/1000/1*IvCDlfi3vQfgyKO1eFv4jA.png" alt="graphql" width="400">
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

# GraphQL

## Server Quick Start

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


