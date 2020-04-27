/* eslint-disable class-methods-use-this */
import { TypeDef } from 'meteor/quave:collections/TypeDef';
import { DateTime } from './DateTime';

class _DateTimeType extends TypeDef {
  name() {
    return 'DateTime';
  }

  description() {
    return 'Represents Date time';
  }

  doToPersist(dateTime) {
    return dateTime.toDate();
  }

  doFromPersisted(time) {
    return new DateTime(time);
  }

  fromJSONValue(time) {
    return new DateTime(time);
  }
}
export const DateTimeType = new _DateTimeType();
