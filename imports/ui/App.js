import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DateTime } from 'meteor/quave:custom-type-date-time/DateTime';
import { Form } from 'meteor/quave:forms';
import { Field } from 'formik';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { PlayerPosition } from '../players/PlayerPositionEnum';

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
    if (_id === player._id) {
      return;
    }
    setId(player._id);
    setName(player.name);
    setBirthday(player.birthday.formatDate());
    setPosition(player.position || undefined);
  };

  const create = () => {
    cancel();
    setIsCreating(true);
  };

  const save = values => {
    const player = {
      _id,
      name: values.name,
      birthday: DateTime.parseDate(values.birthday),
      position: values.position,
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

  const typeToComponent = (fieldName, fieldDefinition) => {
    if (fieldDefinition.typeName === 'DateTime') {
      return (
        <>
          <div>{fieldDefinition.label}</div>
          <Field type="date" name={fieldName} />
        </>
      );
    }

    return null;
  };

  const PlayerForm = ({ initialValues, editing = false }) => (
    <div style={{ width: 400 }}>
      <Form
        className="form"
        onSubmit={save}
        initialValues={initialValues}
        submitLabel="SAVE"
        typeToComponent={typeToComponent}
        definition={PlayerDefinition}
        actionButtons={[
          ...(editing ? [{ label: 'ERASE', handler: erase }] : []),
          { label: 'CANCEL', handler: cancel },
        ]}
      />
    </div>
  );

  return (
    <div>
      <div>Players</div>
      <div>
        <button onClick={create}>New</button>
      </div>
      <div style={{ width: 400 }}>
        {isCreating && (
          <PlayerForm initialValues={{ name, position, birthday }} />
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
                editing
                initialValues={{
                  ...player,
                  birthday: player.birthday.formatDate(),
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const App = () => <Players />;
