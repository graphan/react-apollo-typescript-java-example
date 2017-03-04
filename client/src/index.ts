import ApolloClient from 'apollo-client';

import {
  FeedQuery,
  FeedAuthorFragment,
  FeedRepoFragment,
} from './schema';
const graphqlDocuments = require('./documents.json');

const client = new ApolloClient();

function renderApp() {
  client.query({
    query: graphqlDocuments['Feed.graphql']
  })
  .then(({data}: {data: FeedQuery}) => {
    document.getElementById("app").innerHTML = `
      <h1>GitHunt Feed</h1>
      <ul>
        ${data.feed.map(({repository, postedBy}: {
          repository: FeedRepoFragment, postedBy: FeedAuthorFragment
        }) => `
          <li>
            <a
              href="https://github.com/${repository.owner.login}/${repository.name}"
            >
              ${repository.owner.login}/${repository.name}
            </a>
            <span> - posted by: </span>
            <a href="https://github.com/${postedBy.login}">${postedBy.login}</span>
          </li>
        `).join('\n')}
      </ul>
    `;
  });
}

renderApp();
