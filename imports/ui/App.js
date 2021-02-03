import React from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DateTime } from 'meteor/quave:custom-type-date-time/DateTime';
import { Table } from 'meteor/quave:forms';
import { Field } from 'formik';
import { PlayerDefinition } from '../players/PlayersDefinitions';

const Players = () => {
  const { loading, error, data } = useQuery(gql`
    ${PlayerDefinition.toGraphQLManyQuery()}
  `);

  // Getting an specific player
  // const { data: { player: playerData } = {} } = useQuery(
  //   gql`
  //     ${PlayerDefinition.toGraphQLOneQuery()}
  //   `,
  //   { variables: { _id: 'QD7AC9ZoQZE2CtWCJ' } }
  // );

  const [savePlayer] = useMutation(gql`
    ${PlayerDefinition.toGraphQLSaveMutation()}
  `);
  const [erasePlayer] = useMutation(gql`
    ${PlayerDefinition.toGraphQLEraseMutation()}
  `);

  const { players } = data || { players: [] };

  const save = ({ __typename, ...values }) => {
    const player = {
      ...values,
      birthday: DateTime.parseDate(values.birthday),
    };

    savePlayer({
      variables: {
        player,
      },
      refetchQueries: () => [PlayerDefinition.graphQLManyQueryName],
    });
  };

  const erase = values => {
    erasePlayer({
      variables: {
        _id: values._id,
      },
      refetchQueries: () => [PlayerDefinition.graphQLManyQueryName],
    });
  };

  if (error) {
    return 'ops, broken!';
  }
  if (loading) {
    return 'loading...';
  }

  const definitionToComponent = (fieldDefinition, fieldName) => {
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

  return (
    <div>
      <h4>Players</h4>
      <Table
        definition={PlayerDefinition}
        objects={players}
        onSubmit={save}
        omitColumns={['__typename']}
        transformBeforeUse={(fieldValue, fieldDefinition) => {
          if (fieldDefinition?.typeName === 'DateTime') {
            return fieldValue.formatDate();
          }
          return null;
        }}
        formProps={{
          definitionToComponent,
          actionButtons: [
            {
              label: 'ERASE',
              handler: erase,
              shouldBeVisible: ({ _id }) => !!_id,
            },
          ],
        }}
      />
    </div>
  );
};

export const App = () => <Players />;
