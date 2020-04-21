import React from 'react';
import {Hello} from './Hello';
import {Info} from './Info';

import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

const nowQuery = gql`
  query Now {
    now {
      dateTime
    }
  }
`;

export const App = () => {
  const {loading, error, data} = useQuery(nowQuery);
  console.log(`loading`, loading);
  console.log(`error`, error);
  console.log(`data`, data);
  const today = data && data.now && new Date(data.now.dateTime);
  const dayOfMonth = today && today.getDate();
  const monthOfYear = today && today.getMonth() + 1;

  const welcome = loading ? <h1>loading</h1> :
    <h1>Welcome to quave:graphql ({dayOfMonth}/{monthOfYear})!</h1>;
  return (
    <div>
      {welcome}
      <Hello/>
      <Info/>
    </div>
  );
};
