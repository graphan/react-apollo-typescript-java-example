# typed-graphql-client-example

This experimental project shows how to use the following projects to make your Development Experience with GraphQL better:

- [`apollo-codegen`](https://github.com/apollostack/apollo-codegen)
- [`graphql-document-collector`](https://github.com/apollostack/graphql-document-collector)
- [`eslint-plugin-graphql`](https://github.com/apollostack/eslint-plugin-graphql)

## Installation

Clone the repository, run `npm i` or `yarn`.

You have to setup [GitHunt-API](https://github.com/apollostack/GitHunt-API/) in order to be able to work on this project.

## Run

You can run the project with `npm start` or `yarn start`.

## Update with the latest schema from GitHunt

If the GitHunt schema changes, pull the latest schema with `npm run download-schema` or `yarn download-schema`.

## Re-generate documents/types

GraphQL types and documents are generated each time you run `start` or `build` but you can redo them independently with the following scripts:

- `npm run generate-graphql-types` or `yarn generate-graphql-types`
- `npm run generate-graphql-documents` or `yarn generate-graphql-documents`

## Check GraphQL files correctness

Run `npm run lint` or `yarn lint`.

To get this linting in your editor, you should tell your editor to treat GraphQL files as JavaScript files.

## Use react/angular

You are free to import any other library to this project to build a bigger application out of it. Just keep in mind **this is still highly experimental**.
