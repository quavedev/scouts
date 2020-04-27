import { EJSONType } from './EJSONType';

export class DateTime extends EJSONType {
  constructor(time = new Date().getTime()) {
    super();
    this.time = time;
    this.date = new Date(time);
  }

  toJSONValue() {
    return this.time;
  }

  toDate() {
    return this.date;
  }
}
