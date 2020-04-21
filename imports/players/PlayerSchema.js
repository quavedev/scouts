import SimpleSchema from 'simpl-schema';
import {
  enumToTypeDef,
  typeToSimpleSchema,
  typeToTypeDef
} from "../pkgs/schemaHelpers";

const PlayerPosition = {
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
    graphQLType: 'DateTime'
  },
  position: {
    type: String,
    optional: true,
    allowedValues: Object.keys(PlayerPosition),
    graphQLType: 'PlayerPosition'
  }
};

export const PlayerSchema = new SimpleSchema(typeToSimpleSchema(PlayerType));

export const PlayerTypeDef = `
  ${typeToTypeDef({
  name: 'Player',
  def: PlayerType
})}
  ${enumToTypeDef({
  name: 'PlayerPosition',
  def: PlayerPosition
})}
  type Query {  
    player(_id: ID!): Player
    players: [Player]
  }
`;
console.log(`PlayersTypeDef`, PlayerTypeDef);
