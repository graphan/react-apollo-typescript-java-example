import * as React from "react";

import {
  CharacterFragment
} from '../interfaces';

const Character = ({name, appearsIn, friends}: CharacterFragment) => (
  <div className="character">
    <span>Name: {name}</span>
    <div className="episodes">
      Episodes:
      <ul>
        {appearsIn && appearsIn.map(movie => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </div>
    <div className="friends">
      Friends:<br />
      {friends && friends.map((friend, index) => (
        <span key={index}>
            {index === friends.length - 1 ? friend.name : `${friend.name}, `}
        </span>
      ))}
    </div>
  </div>
)

export default Character;