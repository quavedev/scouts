import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Pagination,
  PaginationItem,
} from '@material-tailwind/react';

export const TableComponent = ({
  definition,
  columnNames,
  rows,
  listActions,
  pagination,
}) => (
  <Card>
    <CardHeader color="green" contentPosition="none">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-white text-2xl">{definition.pluralName}</h2>
        <button
          color="green"
          className="ml-auto font-bold uppercase cursor-pointer"
          onClick={listActions.goToNewObject}
        >
          New
        </button>
      </div>
    </CardHeader>
    <CardBody>
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            {columnNames.map((name, index) => (
              <th
                key={`table-header-${name}-${rows[index]?.object._id}`}
                className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
              >
                {name}
              </th>
            ))}
            <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left" />
          </tr>
        </thead>
        <tbody>
          {rows.map(({ values, object, rowActions }) => (
            <tr
              className="cursor-pointer"
              key={`table-row-${object._id}`}
              onClick={() => listActions.goToObject(object._id)}
            >
              {values.map((value, index) => (
                <td
                  key={`table-cell-${columnNames[index]}-${value}-${object._id}`}
                  className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                >
                  {`${value}`}
                </td>
              ))}

              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <Button
                  size="sm"
                  color="red"
                  buttonType="link"
                  iconOnly
                  rounded
                  onClick={event => {
                    event.stopPropagation();
                    rowActions.remove();
                  }}
                >
                  <Icon name="delete" size="regular" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationItem
            className="cursor-pointer"
            button
            onClick={() => listActions.changePagination(pagination.first)}
            ripple="dark"
          >
            First
          </PaginationItem>
          <PaginationItem
            className="cursor-pointer"
            onClick={() => listActions.changePagination(pagination.previous)}
            ripple="dark"
          >
            <Icon name="keyboard_arrow_left" />
          </PaginationItem>
          <div className="w-8 h-8 mx-1 p-0 text-sm text-gray-700 flex items-center justify-center">
            {pagination?.currentPage}
          </div>
          <PaginationItem
            className="cursor-pointer"
            onClick={() => listActions.changePagination(pagination.next)}
            ripple="dark"
          >
            <Icon name="keyboard_arrow_right" />
          </PaginationItem>
          <PaginationItem
            className="cursor-pointer"
            button
            onClick={() => listActions.changePagination(pagination.last)}
            ripple="dark"
          >
            Last
          </PaginationItem>
        </Pagination>
      </div>
    </CardBody>
  </Card>
);
