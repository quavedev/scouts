import { createCollection } from 'meteor/quave:collections';
import { crudable } from 'meteor/quave:resolvers/resolvers';

import { PlayerDefinition } from './PlayersDefinitions';

export const PlayersCollection = createCollection({
  name: PlayerDefinition.pluralNameCamelCase,
  definition: PlayerDefinition,
  composers: [crudable],
});
