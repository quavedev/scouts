import { startGraphQLServer } from 'meteor/quave:graphql/server';

import { DateTimeTypeDef } from 'meteor/quave:graphql/DateTimeTypeDef';
import { DateTimeResolver } from 'meteor/quave:graphql/DateTimeResolver';

import { PlayerDefinition } from '../imports/players/PlayerSchema';
import { PlayerResolvers } from '../imports/players/PlayerResolvers';

import { PlayerPositionDefinition } from '../imports/players/PlayerPositionEnum';

startGraphQLServer({
  typeDefs: [
    DateTimeTypeDef,
    PlayerPositionDefinition.toGraphQL(),
    PlayerDefinition.toGraphQL(),
  ],
  resolvers: [DateTimeResolver, PlayerResolvers],
});
