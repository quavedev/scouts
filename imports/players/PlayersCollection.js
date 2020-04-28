import { createCollection } from 'meteor/quave:collections';
import { resolvable } from 'meteor/quave:resolvers';

import { PlayerSchema, PlayerDefinition } from './PlayersDefinitions';

// TODO accept definition from quave:definitions here
export const PlayersCollection = createCollection({
  name: PlayerDefinition.pluralNameCamelCase,
  definition: PlayerDefinition,
  schema: PlayerSchema,
  composers: [resolvable],
});
