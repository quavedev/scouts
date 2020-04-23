const getType = value => {
  if (value.graphQLType) {
    return value.graphQLType;
  }
  if (value.type instanceof String) {
    return value.type;
  }
  if (value.type.name) {
    return value.type.name;
  }
  let stringType = value.type.toString();
  if (stringType === 'SimpleSchema.Integer') {
    return 'Int';
  }
  throw new Error(`'type' ${value.type} is not supported. Use 'graphQLType' as string instead.`)
};

const getFieldsDefinitions = ({def, isInput = false}) =>
  Object.entries(def).map(([key, value]) => {
    let isOptional = value.optional || (isInput && value.graphQLOptionalInput) ? '' : '!';
    return `${key}: ${getType(value)}${isOptional}`;
  }).join('\n  ');

const getFieldsNames = ({def}) =>
  Object.keys(def).map(key => key).join('\n  ');

export const typeToInputDef = ({name, def}) => `input ${name}Input {
  _id: ID
  ${(getFieldsDefinitions({def, isInput: true}))}
}`;

export const typeToTypeDef = ({name, def}) => `type ${name} {
  _id: ID!
  ${(getFieldsDefinitions({def}))}
}`;

export const typeToFragment = ({name, def}) => `fragment ${name}Full on ${name} {
  _id
  ${(getFieldsNames({def}))}
}`;

export const typeToDefs = (arg) => `
  ${typeToTypeDef(arg)}
  ${typeToInputDef(arg)}
  ${typeToFragment(arg)}
`;

export const enumToEnumDef = ({name, def}) => `enum ${name} {
  ${Object.keys(def).join('\n  ')}
}`;

// removes fields that are not part of SimpleSchema
export const typeToSimpleSchema = (type) => Object.entries(type)
  .reduce((acc, [fieldName, {graphQLType, graphQLOptionalInput, ...item}]) => ({
    ...acc,
    [fieldName]: item
  }), {});
