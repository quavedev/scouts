import React from 'react';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { Crud } from 'meteor/quave:crud/Crud';
import { BrowserRouter, Route } from 'react-router-dom';

const Players = () => (
  <BrowserRouter>
    <Route path="/">
      <Crud
        definition={PlayerDefinition}
        omitColumns={['__typename']}
        formProps={{ isDebug: false }}
      />
    </Route>
  </BrowserRouter>
);
export const App = () => <Players />;
