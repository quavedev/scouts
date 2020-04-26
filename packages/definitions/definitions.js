import { getSettings } from 'meteor/quave:settings';

const PACKAGE_NAME = 'quave:definitions';
const settings = getSettings({ packageName: PACKAGE_NAME });

const { isVerbose } = settings;

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
  const stringType = value.type.toString();
  if (stringType === 'SimpleSchema.Integer') {
    return 'Int';
  }
  throw new Error(
    `'type' ${value.type} is not supported. Use 'graphQLType' as string instead.`
  );
};

const getFieldsDefinitions = ({ fields, isInput = false }) =>
  Object.entries(fields)
    .map(([key, value]) => {
      const isOptional =
        value.optional || (isInput && value.graphQLOptionalInput) ? '' : '!';
      return `${key}: ${getType(value)}${isOptional}`;
    })
    .join('\n  ');

const getFieldsNames = ({ fields }) =>
  Object.keys(fields)
    .map(key => key)
    .join('\n  ');

const definitionToInputDef = ({ name, fields }) => `input ${name}Input {
  _id: ID
  ${getFieldsDefinitions({ fields, isInput: true })}
}`;

const definitionToEnumDef = ({ name, options }) => `enum ${name} {
  ${Object.keys(options).join('\n  ')}
}`;

const definitionToTypeDef = ({ name, fields }) => `type ${name} {
    _id: ID!
    ${getFieldsDefinitions({ fields })}
  }`;

const definitionToFragment = ({
  name,
  fields,
}) => `fragment ${name}Full on ${name} {
  _id
  ${getFieldsNames({ fields })}
}`;

// removes fields that are not part of SimpleSchema
const definitionToSimpleSchema = definition =>
  Object.entries(definition.fields).reduce(
    (acc, [fieldName, { graphQLType, graphQLOptionalInput, ...item }]) => ({
      ...acc,
      [fieldName]: item,
    }),
    {}
  );

const toCamelCase = text =>
  `${text.charAt(0).toLowerCase()}${text.substring(1)}`;

const getNameCamelCase = definition => toCamelCase(definition.name);
const getPluralName = definition =>
  definition.pluralName || `${definition.name}s`;
const getPluralNameCamelCase = definition =>
  toCamelCase(getPluralName(definition));

const v = result => {
  if (isVerbose) {
    console.log(PACKAGE_NAME);
    console.log(result);
  }
  return result;
};
export const createModelDefinition = definition => {
  const toSimpleSchema = () => {
    import SimpleSchema from 'simpl-schema';

    return new SimpleSchema(definitionToSimpleSchema(definition));
  };
  const toGraphQLFragment = () => definitionToFragment(definition);
  const toGraphQLType = () => definitionToTypeDef(definition);
  const toGraphQLInput = () => definitionToInputDef(definition);
  const toGraphQLQueries = () => `
        type Query {
          ${getNameCamelCase(definition)}(_id: ID!): ${definition.name}
          ${getPluralNameCamelCase(definition)}: [${definition.name}]
        }      
      `;
  const toGraphQLMutations = () => `
        type Mutation {
          save${definition.name}(${getNameCamelCase(definition)}: ${
    definition.name
  }Input!): ${definition.name}
          erase${definition.name}(_id: ID!): ${definition.name}
        }      
      `;
  const toGraphQL = () =>
    v(`    
        ${toGraphQLType(definition)}
        ${toGraphQLInput(definition)}
        ${toGraphQLFragment(definition)}
        ${toGraphQLQueries(definition)}
        ${toGraphQLMutations(definition)}
  `);
  return {
    definition,
    toSimpleSchema,
    toGraphQLFragment,
    toGraphQLType,
    toGraphQLInput,
    toGraphQLQueries,
    toGraphQLMutations,
    toGraphQL,
  };
};

export const createEnumDefinition = definition => {
  const toSimpleSchemaField = () => ({
    type: String,
    allowedValues: allowedValues(),
    graphQLType: definition.name,
  });
  const allowedValues = () => {
    return Object.keys(definition.options);
  };
  const toGraphQLEnum = () => definitionToEnumDef(definition);
  const toGraphQL = () => v(toGraphQLEnum(definition));
  const toEnum = () => definition.options;
  return {
    definition,
    allowedValues,
    toSimpleSchemaField,
    toGraphQLEnum,
    toGraphQL,
    toEnum,
  };
};
