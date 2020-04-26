import { createModelDefinition } from 'meteor/quave:definitions';
import { PlayerPositionDefinition } from './PlayerPositionEnum';

export const PlayerDefinition = createModelDefinition({
  name: 'Player',
  fields: {
    name: {
      type: String,
    },
    birthday: {
      type: Date,
      optional: true,
      graphQLType: 'DateTime',
    },
    position: {
      ...PlayerPositionDefinition.toSimpleSchemaField(),
      optional: true,
    },
  },
});

export const PlayerSchema = PlayerDefinition.toSimpleSchema();
