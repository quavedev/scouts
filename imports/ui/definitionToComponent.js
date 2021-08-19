import React from 'react';
import { DateTimeType } from 'meteor/quave:custom-type-date-time/DateTimeType';
import { useField } from 'formik';
import { Checkbox, Input } from '@material-tailwind/react';
import SimpleSchema from 'simpl-schema';
import { Select } from './atoms/Select';

export const definitionToComponent = ({ name, fieldDefinition }) => {
  if (fieldDefinition.allowedValues) {
    return () => {
      const [field, meta] = useField(name);

      return (
        <Select
          name={name}
          error={meta.error}
          options={fieldDefinition.allowedValues.map(value => ({
            value,
            label: value
              .split('_')
              .map(
                word =>
                  `${word.charAt(0).toUpperCase()}${word
                    .substring(1)
                    .toLowerCase()}`
              )
              .join(' '),
          }))}
          {...field}
        />
      );
    };
    // return () => (
    //   <div className="w-full inline-flex flex-col gap-2">
    //     <label className="text-gray-400 text-sm">{fieldDefinition.label}</label>
    //     <Field as="select" name={name}>
    //       <option value="">Choose one {fieldDefinition.label}</option>
    //       {fieldDefinition.allowedValues.map(value => (
    //         <option key={`field-${name}-option-${value}`} value={value}>
    //           {value
    //             .split('_')
    //             .map(
    //               word =>
    //                 `${word.charAt(0).toUpperCase()}${word
    //                   .substring(1)
    //                   .toLowerCase()}`
    //             )
    //             .join(' ')}
    //         </option>
    //       ))}
    //     </Field>
    //   </div>
    // );
  }

  switch (fieldDefinition.type) {
    case Number:
      return () => {
        const [field, meta] = useField(name);

        return (
          <Input
            placeholder={fieldDefinition.label}
            name={name}
            type="number"
            error={meta.error}
            {...field}
          />
        );
      };
    case SimpleSchema.Integer:
      return () => {
        const [field, meta] = useField(name);

        return (
          <Input
            placeholder={fieldDefinition.label}
            name={name}
            type="number"
            step={1}
            error={meta.error}
            {...field}
          />
        );
      };
    case Boolean:
      return () => {
        const [field, meta] = useField(name);

        return (
          <div>
            <Checkbox
              checked={field.value}
              text={fieldDefinition.label}
              id={name}
              name={name}
              type="date"
              {...field}
            />
            <span style={{ color: 'red' }}>{meta.error}</span>
          </div>
        );
      };
    case DateTimeType:
      return () => {
        const [field, meta] = useField(name);

        return (
          <Input
            placeholder={fieldDefinition.label}
            name={name}
            type="date"
            error={meta.error}
            {...field}
          />
        );
      };
    default:
      return () => {
        const [field, meta] = useField(name);

        return (
          <Input
            placeholder={fieldDefinition.label}
            name={name}
            type="text"
            error={meta.error}
            {...field}
          />
        );
      };
  }
};
