import * as React from "react";
import {graphql, compose} from 'react-apollo';

import {withLoadingComponent, getOptionsAndProps} from '../helpers/index';
const CHARACTER_QUERY = require('../graphql/CharacterConnection.graphql');
import Character from '../components/Character';
import './style.css';

import {
  CharactersQuery,
  CharactersQueryVariables
} from '../interfaces';

interface CharactersProps extends CharactersQuery {
  loadMoreEntries:any
}

const Characters = ({CharacterConnection: {content, totalPages, currentPage}, loadMoreEntries} : CharactersProps) => (
  <div>
    <div className="characters">
      {content && content.map(character => {
        return (
          <Character {...character} key={character.id} />
        )
      })}
    </div>
    {currentPage.toString() != totalPages ? <button onClick={loadMoreEntries}>load more entries</button> : null}
  </div>
);

const queryVariables:CharactersQueryVariables = {
  "page": 1
}

export default compose(
  graphql(CHARACTER_QUERY, getOptionsAndProps(queryVariables, 'CharacterConnection')),
  withLoadingComponent
)(Characters);


