import React from 'react';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { Crud } from 'meteor/quave:crud/Crud';

const Players = () => (
  <div>
    <h4>Players</h4>
    <Crud
      definition={PlayerDefinition}
      omitColumns={['__typename']}
      formProps={{ isDebug: true }}
    />
  </div>
);
export const App = () => <Players />;
