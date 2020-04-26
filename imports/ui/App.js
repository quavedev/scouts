import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PlayerFragments } from '../players/PlayerSchema';
import { PlayerPosition } from '../players/PlayerPositionEnum';

const playersQuery = gql`
  query Players {
    players {
      ...PlayerFull
    }
  }
  ${PlayerFragments.Full}
`;
const savePlayerMutation = gql`
  mutation SavePlayer($player: PlayerInput!) {
    savePlayer(player: $player) {
      ...PlayerFull
    }
  }
  ${PlayerFragments.Full}
`;
const erasePlayerMutation = gql`
  mutation ErasePlayer($_id: ID!) {
    erasePlayer(_id: $_id) {
      ...PlayerFull
    }
  }
  ${PlayerFragments.Full}
`;

export const App = () => {
  const { loading, error, data } = useQuery(playersQuery);

  const [_id, setId] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState(undefined);

  const [savePlayer] = useMutation(savePlayerMutation);
  const [erasePlayer] = useMutation(erasePlayerMutation);

  const { players } = data || { players: [] };

  const edit = player => {
    setId(player._id);
    setName(player.name);
    setPosition(player.position || undefined);
  };
  const save = () => {
    savePlayer({
      variables: {
        player: {
          _id,
          name,
          position,
        },
      },
    }).then(() => {
      setId(null);
      setName('');
      setPosition(undefined);
    });
  };
  const erase = () => {
    erasePlayer({
      variables: {
        _id,
      },
      refetchQueries: () => ['Players'],
    }).then(() => {
      setId(null);
      setName('');
      setPosition(undefined);
    });
  };

  if (error) {
    return 'ops, broken!';
  }
  if (loading) {
    return 'loading...';
  }
  return (
    <div>
      {players.map(player => (
        <div onClick={() => edit(player)} key={player._id}>
          <div>
            {player.name}
            {player.position &&
              ` / ${PlayerPosition[player.position].name}`}{' '}
            (edit)
          </div>
          {_id === player._id && (
            <>
              <div>
                <input
                  onChange={({ target: { value } }) => setName(value)}
                  value={name}
                />
              </div>
              <div>
                <select
                  onChange={({ target: { value } }) => setPosition(value)}
                  value={position}
                >
                  <option>select</option>
                  {Object.entries(PlayerPosition).map(([key, { name }]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span onClick={save}>Save</span>
              </div>
              <div>
                <span onClick={erase}>Erase</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
