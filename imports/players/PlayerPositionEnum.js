import { createEnumDefinition } from 'meteor/quave:definitions';

export const PlayerPositionDefinition = createEnumDefinition({
  name: 'PlayerPosition',
  options: {
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
  },
});

export const PlayerPosition = PlayerPositionDefinition.toEnum();
