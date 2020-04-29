import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DateTime } from 'meteor/quave:custom-type-date-time/DateTime';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { PlayerPosition } from '../players/PlayerPositionEnum';

const PlayerForm = ({
  name,
  setName,
  position,
  setPosition,
  birthday,
  setBirthday,
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
      <input
        type="date"
        onChange={({ target: { value } }) => setBirthday(value)}
        value={birthday}
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
  const [birthday, setBirthday] = useState(undefined);
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
    setBirthday(undefined);
    setPosition(undefined);
    setIsCreating(false);
  };

  const edit = player => {
    cancel();
    setId(player._id);
    setName(player.name);
    setBirthday(player.birthday.formatDate());
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
      birthday: DateTime.parseDate(birthday),
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
      cancel();
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
            birthday={birthday}
            setBirthday={setBirthday}
            isCreating={isCreating}
            save={save}
            cancel={cancel}
          />
        )}
      </div>
      {players.map(player => {
        const yearsOld =
          player.birthday &&
          Number.parseInt(
            (new Date().getTime() - player.birthday.ms) /
              1000 /
              60 /
              60 /
              24 /
              365,
            10
          );
        return (
          <div key={player._id}>
            <div>
              {player.name}
              {player.position && ` / ${PlayerPosition[player.position].name}`}
              {!!yearsOld && ` / ${yearsOld} years old`} (
              <button onClick={() => edit(player)} key={player._id}>
                edit
              </button>
              )
            </div>
            {_id === player._id && (
              <PlayerForm
                name={name}
                setName={setName}
                position={position}
                setPosition={setPosition}
                birthday={birthday}
                setBirthday={setBirthday}
                save={save}
                cancel={cancel}
                erase={erase}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const App = () => <Players />;
