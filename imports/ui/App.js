import React from 'react';
import { PlayerDefinition } from '../players/PlayersDefinitions';
import { Crud } from 'meteor/quave:crud/Crud';
import { BrowserRouter, Route } from 'react-router-dom';
import '@material-tailwind/react/tailwind.css';
import { TableComponent } from './TableComponent';
import { DetailsComponent } from './organisms/DetailsComponent';

export const App = () => (
  <BrowserRouter>
    <Route path="/">
      <div className="pt-10 px-4 bg-gray-200 h-full">
        <Crud
          limit={5}
          listComponent={TableComponent}
          detailsComponent={DetailsComponent}
          definition={PlayerDefinition}
          omitColumns={['__typename']}
          formProps={{ isDebug: false }}
        />
      </div>
    </Route>
  </BrowserRouter>
);
