import { startGraphQLServer } from 'meteor/quave:graphql';

import { createResolvers } from 'meteor/quave:resolvers';

import { DateTimeResolver } from 'meteor/quave:custom-type-date-time/DateTimeResolver';
import { DateTimeDefinition } from 'meteor/quave:custom-type-date-time/DateTimeDefinition';
import { PlayerPositionDefinition } from '../imports/players/PlayerPositionEnum';
import { PlayersCollection } from '../imports/players/PlayersCollection';
import { PlayerDefinition } from '../imports/players/PlayersDefinitions';

startGraphQLServer({
  typeDefs: [
    DateTimeDefinition,
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
