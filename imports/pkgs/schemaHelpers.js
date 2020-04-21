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

export const typeToTypeDef = ({name, def}) => `type ${name} {
  _id: ID!
  ${Object.entries(def).map(([key, value]) => `${key}: ${getType(value)}${value.optional ? '' : '!'}`).join('\n  ')}
}`;

export const enumToTypeDef = ({name, def}) => `enum ${name} {
  ${Object.keys(def).join('\n  ')}
}`;

// removes fields that are not part of SimpleSchema
export const typeToSimpleSchema = (type) => Object.entries(type)
  .reduce((acc, [fieldName, {graphQLType, ...item}]) => ({
    ...acc,
    [fieldName]: item
  }), {});
