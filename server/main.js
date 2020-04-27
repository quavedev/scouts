import { GraphQLScalarType } from 'graphql';
import { startGraphQLServer } from 'meteor/quave:graphql';
import { Types } from 'meteor/quave:collections/TypedCollection';

import { createResolvers } from 'meteor/quave:resolvers';

import { PlayerPositionDefinition } from '../imports/players/PlayerPositionEnum';
import { PlayersCollection } from '../imports/players/PlayersCollection';
import { PlayerDefinition } from '../imports/players/PlayersDefinitions';
import { DateTimeType } from '../imports/pkgs/DateTimeType';
import { DateTime } from '../imports/pkgs/DateTime';
// function scalarAndEjson(type) {
//   return {
//     name: type.name(),
//     description: type.description(),
//     serialize: obj => {
//       console.log(`serialize obj`, obj);
//       return type.serialize(obj);
//     },
//     parseValue: obj => {
//       console.log(`parseValue obj`, obj);
//       return type.parseValue(obj);
//     },
//   };
// }
startGraphQLServer({
  typeDefs: [
    `scalar DateTime
    
  type Now {
    dateTime: DateTime
  } 
  
  input NowInput {
    dateTime: DateTime
  }
  
  type Query {
    now: Now
    logDateTime(dateTime: DateTime!): Now
    logNow(now: NowInput!): Now
  }`,
    PlayerPositionDefinition.toGraphQL(),
    PlayerDefinition.toGraphQL(),
  ],
  resolvers: [
    {
      DateTime: new GraphQLScalarType(Types.scalarAndEjson(DateTimeType)),
      Query: {
        async now() {
          const date = new DateTime();
          console.log(`plain`, date.toDate());

          return {
            dateTime: date,
          };
        },
        async logDateTime(root, { dateTime }) {
          console.log(`param`, dateTime.toDate());

          return {
            dateTime,
          };
        },
        async logNow(root, { now }) {
          console.log(`input`, now.dateTime.toDate());

          return now;
        },
      },
    },
    createResolvers({
      definition: PlayerDefinition,
      collection: PlayersCollection,
    }),
  ],
});
