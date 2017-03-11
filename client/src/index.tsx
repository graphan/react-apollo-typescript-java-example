import 'babel-polyfill';
import * as React from "react";
import {render} from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

import Characters from './containers/Characters';

const networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});

const client = new ApolloClient({
  networkInterface,
  addTypename: true,
  dataIdFromObject: (result:{id:number, __typename:string}) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
    }
    return null;
  }
});

render((
  <ApolloProvider client={client}>
    <Characters />
  </ApolloProvider>
), document.getElementById('app'));
