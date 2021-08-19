import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { Form } from 'meteor/quave:forms/Form';
import { definitionToComponent } from '../definitionToComponent';

export const DetailsComponent = ({
  definition,
  formProps,
  crudActions,
  initialValues,
  loading,
}) => {
  const history = useHistory();
  if (loading) {
    return null;
  }

  return (
    <Card>
      <CardHeader color="green" contentPosition="left">
        <h2 className="text-white text-2xl">{definition.name}</h2>
      </CardHeader>
      <CardBody>
        <Form
          className="flex gap-6 flex-wrap"
          initialValues={initialValues}
          definition={definition}
          definitionToComponent={definitionToComponent}
          onSubmit={values => {
            crudActions.save(values).then(history.goBack);
          }}
          onClick={event => event.stopPropagation()}
          {...formProps}
          actions={[
            () => (
              <Button
                onClick={event => {
                  event.preventDefault();
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            ),
            () => <Button type="submit">Submit</Button>,
          ]}
        />
      </CardBody>
    </Card>
  );
};
