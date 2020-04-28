import { createModelDefinition } from 'meteor/quave:definitions';
import { PlayerPositionDefinition } from './PlayerPositionEnum';
import { DateTimeType } from '../pkgs/DateTimeType';

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
