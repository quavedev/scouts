import { EJSONType } from 'meteor/quave:collections/EJSONType';

export class DateTime extends EJSONType {
  constructor(time) {
    super();
    this.ms = time || new Date().getTime();
  }

  toJSONValue() {
    return this.ms;
  }

  toDate() {
    return new Date(this.ms);
  }
}
