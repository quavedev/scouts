import {createCollection} from 'meteor/quave:collections';
import {PlayerSchema} from "./PlayerSchema";

export const PlayersCollection = createCollection({
  name: 'players',
  schema: PlayerSchema
});

PlayersCollection.insert({
  name: `Filipe ${new Date().getMilliseconds()}`,
  birthday: new Date()
})
