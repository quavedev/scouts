import {startGraphQLServer} from "meteor/quave:graphql/server";

import {DateTimeTypeDef} from "meteor/quave:graphql/DateTimeTypeDef";
import {DateTimeResolver} from "meteor/quave:graphql/DateTimeResolver";

import {PlayerTypeDef} from "../imports/players/PlayerSchema";
import {PlayerResolvers} from "../imports/players/PlayerResolvers";

startGraphQLServer({
  typeDefs: [DateTimeTypeDef, PlayerTypeDef],
  resolvers: [DateTimeResolver, PlayerResolvers]
});
