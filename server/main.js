import { startGraphQLServer } from 'meteor/quave:graphql/server';

import { createResolvers } from 'meteor/quave:resolvers';

import { DateTimeTypeDef } from 'meteor/quave:graphql/DateTimeTypeDef';
import { DateTimeResolver } from 'meteor/quave:graphql/DateTimeResolver';

import { PlayerPositionDefinition } from '../imports/players/PlayerPositionEnum';
import { PlayersCollection } from '../imports/players/PlayersCollection';
import { PlayerDefinition } from '../imports/players/PlayersDefinitions';

startGraphQLServer({
  typeDefs: [
    DateTimeTypeDef,
    PlayerPositionDefinition.toGraphQL(),
    PlayerDefinition.toGraphQL(),
  ],
  resolvers: [
    DateTimeResolver,
    createResolvers({
      definition: PlayerDefinition,
      collection: PlayersCollection,
    }),
  ],
});
