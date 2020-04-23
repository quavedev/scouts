import {PlayersCollection} from "../players/PlayersCollection";

export const editable = collection =>
  Object.assign({}, collection, {
    save(input) {
      const object = {...input};

      if (object._id) {
        this.update(object._id, {$set: {...object}});
        return this.findOne(object._id);
      }
      delete object._id;
      return this.findOne(this.insert({...object}));
    },
    erase(_id) {
      const object = this.findOne(_id);
      this.remove(_id);
      return object;
    }
  });
