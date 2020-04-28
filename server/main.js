import { startGraphQLServer } from 'meteor/quave:graphql';

import { createResolvers } from 'meteor/quave:resolvers';

import { PlayerPositionDefinition } from '../imports/players/PlayerPositionEnum';
import { PlayersCollection } from '../imports/players/PlayersCollection';
import { PlayerDefinition } from '../imports/players/PlayersDefinitions';
import { DateTimeResolver } from '../imports/pkgs/DateTimeResolver';
import { DateTimeDefinition } from '../imports/pkgs/DateTimeDefinition';

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
