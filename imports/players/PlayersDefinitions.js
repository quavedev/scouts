import { createModelDefinition } from 'meteor/quave:definitions';
import { DateTimeType } from 'meteor/quave:custom-type-date-time/DateTimeType';
import { PlayerPositionDefinition } from './PlayerPositionEnum';

export const PlayerDefinition = createModelDefinition({
  name: 'Player',
  fields: {
    name: {
      type: String,
    },
    birthday: {
      type: DateTimeType,
      optional: true,
    },
    position: {
      ...PlayerPositionDefinition.toSimpleSchemaField(),
      optional: true,
    },
  },
});

export const PlayerSchema = PlayerDefinition.toSimpleSchema();
