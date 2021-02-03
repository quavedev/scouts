import { createModelDefinition } from 'meteor/quave:definitions';
import { DateTimeType } from 'meteor/quave:custom-type-date-time/DateTimeType';
import { PlayerPositionDefinition } from './PlayerPositionEnum';

export const PlayerDefinition = createModelDefinition({
  name: 'Player',
  fields: {
    name: {
      type: String,
      label: 'Name',
    },
    isActive: {
      type: Boolean,
      label: 'Is Active',
      defaultValue: false,
      optional: true,
    },
    birthday: {
      type: DateTimeType,
      label: 'Birthday',
      optional: true,
    },
    position: {
      ...PlayerPositionDefinition.toSimpleSchemaField(),
      label: 'Position',
      optional: true,
    },
  },
});
