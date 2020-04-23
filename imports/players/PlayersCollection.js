import {createCollection} from 'meteor/quave:collections';
import {PlayerSchema} from "./PlayerSchema";
import {editable} from "../pkgs/editable";

export const PlayersCollection = createCollection({
  name: 'players',
  schema: PlayerSchema,
  composers: [editable]
});

PlayersCollection.insert({
  name: `Filipe ${new Date().getMilliseconds()}`,
  birthday: new Date()
})
