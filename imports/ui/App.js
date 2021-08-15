import React from 'react';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { Crud } from 'meteor/quave:crud/Crud';
import { BrowserRouter, Route } from 'react-router-dom';

export const App = () => (
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
