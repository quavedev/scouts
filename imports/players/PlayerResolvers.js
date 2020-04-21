import {PlayersCollection} from "./PlayersCollection";

export const PlayerResolvers = {
  Query: {
    async player(root, {_id}) {
      return PlayersCollection.findOne(_id);
    },
    async players() {
      return PlayersCollection.find({}, {sort: {name: 1}}).fetch();
    }
  }
};
