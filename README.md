# Proof of concept: React Apollo TypeScript Java

> Use static types in the frontend world easily!

## Concept

In vast majority of cases, both server-side and client-side use the same data model. The main difference is that data on the server and client side are respectively: statically and dynamically typed. The culprit is that REST APIs do not allow us to receive information about data types. We just receive data values.

 Harnessing such solutions as [GraphQL](http://graphql.org/) and [TypeScript](https://www.typescriptlang.org/), we can easily move static typings to the frontend world. The communication could be described as follows:
  - Java -> *GraphQLSchema* -> *TypeScript Interfaces* -> React

where GraphQL Schema and TypeScript Interfaces would be generated automatically.

Hence, the aim of this proof of concept is to demonstrate how to:
 - create a Java backend to expose GraphQL API (compatible with [React Apollo](http://dev.apollodata.com/react/))
 - automatically generate GraphQL Schema based on Java JPA Model
 - automatically generate TypeScript Interfaces based on GraphQL Schema
 - create the app consuming exposed GraphQL API

## Running the app

### 1. Server

The server side part was taken from the awesome project: [graphql-jpa](https://github.com/jcrygier/graphql-jpa). Only some changes were needed to make it compatible with React Apollo. You just need to run the application located at: `server/src/test/groovy/org/crygier/graphql/TestApplication.groovy`

GraphQL API will be exposed at: `http://localhost:8080/graphql`

GraphiQL will be by default available at: `http://localhost:8080`

### 2. Client

The client side was created based on [typed-graphql-client-example](https://github.com/apollographql/typed-graphql-client-example). It was totally ovehauled to make it compatible with GraphQL API exposed by the above server. In order to run:

```
cd client
yarn install
npm start
```

If you want to launch the application, remember to run the above server first and then:
- Open the client at http://localhost:3000

#### How TypeScript Interfaces are generated?

`npm start` invokes two scripts behind the scenes:
 - `npm run update-schema`

    It downloads the GraphQL Schema from the server in JSON and save it in `client/schema/schema.json`.

 - `npm run generate-graphql-types`

    It generates TypeScript Interfaces based on earlier downloaded GraphQL Schema and graphql files located at: `client/src/graphql` and save them in: `client/src/interfaces.ts`
