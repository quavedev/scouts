import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { PlayerPosition } from '../players/PlayerPositionEnum';

const PlayerForm = ({
  name,
  position,
  setName,
  setPosition,
  save,
  erase,
  cancel,
}) => (
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
        {Object.entries(PlayerPosition).map(([key, { name: optionName }]) => (
          <option key={key} value={key}>
            {optionName}
          </option>
        ))}
      </select>
    </div>
    <div>
      <button onClick={save}>Save</button>
    </div>
    {erase && (
      <div>
        <button onClick={erase}>Erase</button>
      </div>
    )}
    <div>
      <button onClick={cancel}>Cancel</button>
    </div>
  </>
);

const Players = () => {
  const { loading, error, data } = useQuery(gql`
    ${PlayerDefinition.toGraphQLManyQuery()}
  `);
  const { data: { player: playerData } = {} } = useQuery(
    gql`
      ${PlayerDefinition.toGraphQLOneQuery()}
    `,
    { variables: { _id: 'QD7AC9ZoQZE2CtWCJ' } }
  );

  const [_id, setId] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const [savePlayer] = useMutation(gql`
    ${PlayerDefinition.toGraphQLSaveMutation()}
  `);
  const [erasePlayer] = useMutation(gql`
    ${PlayerDefinition.toGraphQLEraseMutation()}
  `);

  const { players } = data || { players: [] };

  // eslint-disable-next-line no-console
  console.log('playerData', playerData);
  // eslint-disable-next-line no-console
  console.log('players', players);

  const cancel = () => {
    setId(null);
    setName('');
    setPosition(undefined);
    setIsCreating(false);
  };

  const edit = player => {
    cancel();
    setId(player._id);
    setName(player.name);
    setPosition(player.position || undefined);
  };

  const create = () => {
    cancel();
    setIsCreating(true);
  };

  const save = () => {
    const player = {
      _id,
      name,
      position,
    };

    savePlayer({
      variables: {
        player,
      },
      refetchQueries: () => [PlayerDefinition.graphQLManyQueryName],
    }).then(() => cancel());
  };

  const erase = () => {
    erasePlayer({
      variables: {
        _id,
      },
      refetchQueries: () => [PlayerDefinition.graphQLManyQueryName],
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
      <div>Players</div>
      <div>
        <button onClick={create}>New</button>
      </div>
      <div>
        {isCreating && (
          <PlayerForm
            name={name}
            position={position}
            setName={setName}
            setPosition={setPosition}
            isCreating={isCreating}
            save={save}
            cancel={cancel}
          />
        )}
      </div>
      {players.map(player => (
        <div key={player._id}>
          <div>
            {player.name}
            {player.position && ` / ${PlayerPosition[player.position].name}`} (
            <button onClick={() => edit(player)} key={player._id}>
              edit
            </button>
            )
          </div>
          {_id === player._id && (
            <PlayerForm
              name={name}
              position={position}
              setName={setName}
              setPosition={setPosition}
              save={save}
              cancel={cancel}
              erase={erase}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const App = () => <Players />;
