import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { startGraphQLClient } from 'meteor/quave:graphql';

import { ApolloProvider } from '@apollo/react-hooks';
import { DateTimeType } from 'meteor/quave:custom-type-date-time/DateTimeType';

DateTimeType.register();

const apolloClient = startGraphQLClient({ connectToDevTools: true });

Meteor.startup(() => {
  render(
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>,
    document.getElementById('react-target')
  );
});
