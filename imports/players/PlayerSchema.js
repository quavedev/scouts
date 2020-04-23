import SimpleSchema from 'simpl-schema';
import {
  enumToEnumDef,
  typeToSimpleSchema, typeToDefs, typeToFragment
} from "../pkgs/schemaHelpers";

export const PlayerPosition = {
  GOLEIRO: {
    name: 'Goleiro',
  },
  LATERAL_DIREITO: {
    name: 'Lateral Direito',
  },
  LATERAL_ESQUERDO: {
    name: 'Lateral Esquerdo',
  },
  ZAGUEIRO: {
    name: 'Zagueiro',
  },
  VOLANTE: {
    name: 'Volante',
  },
  MEIA: {
    name: 'Meia',
  },
  ATACANTE: {
    name: 'Atacante',
  },
  PONTA_DIREITA: {
    name: 'Ponta Direita',
  },
  PONTA_ESQUERDA: {
    name: 'Ponta Esquerda',
  },
};

const PlayerType = {
  name: {
    type: String,
  },
  birthday: {
    type: Date,
    optional: true,
    graphQLType: 'DateTime',
  },
  position: {
    type: String,
    optional: true,
    allowedValues: Object.keys(PlayerPosition),
    graphQLType: 'PlayerPosition'
  }
};

export const PlayerSchema = new SimpleSchema(typeToSimpleSchema(PlayerType));
export const PlayerFragments = {
  Full: typeToFragment({name: 'Player', def: PlayerType})
}
export const PlayerTypeDef = `
  ${typeToDefs({
  name: 'Player',
  def: PlayerType
})}
  ${enumToEnumDef({
  name: 'PlayerPosition',
  def: PlayerPosition
})}

  type Query {  
    player(_id: ID!): Player
    players: [Player]
  }
  
  type Mutation {  
    savePlayer(player: PlayerInput!): Player
    erasePlayer(_id: ID!): Player
  }
`;
console.log(`PlayersTypeDef`, PlayerTypeDef);
