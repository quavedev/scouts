import React, { useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import { useClickedOutside } from '../useClickedOutside';
import { Icon } from '@material-tailwind/react';

// TODO: This component does not yet show error messages
export const Select = ({
  options,
  name,
  color = 'light-blue',
  emptyText = 'Choose one',
  value,
}) => {
  const ref = useRef(null);
  const { setFieldValue, setFieldTouched, touched } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const optionsWithEmpty = [{ value: '', label: emptyText }, ...options];

  useClickedOutside(ref, () => setIsOpen(false));

  return (
    <div
      className="flex justify-start w-full"
      onClick={e => e.stopPropagation()}
    >
      <div ref={ref} className="inline">
        <button
          className={`false relative overflow-hidden flex items-center justify-center gap-1 rounded-lg font-bold outline-none capitalize tracking-wider focus:outline-none transition-all duration-300 rounded pl-4 pr-2.5 py-2.5 text-sm leading-normal text-white bg-${color}-500 hover:bg-${color}-700 focus:bg-${color}-400 active:bg-${color}-800 shadow-md-${color} hover:shadow-lg-${color}`}
          type="button"
          onClick={event => {
            event.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {optionsWithEmpty.find(option => option.value === value).label ||
            emptyText}
          <Icon
            name={`${isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}`}
            size="small"
          />
        </button>
        <div
          className={`overflow-y-scroll h-60 absolute overflow-hidden inline-flex flex-col gap-2 bg-white text-base z-50 text-left rounded-lg shadow-lg mt-1 p-2.5 overflow-hidden transition-all duration-500 ${
            isOpen ? 'visible' : 'hidden'
          }`}
        >
          {optionsWithEmpty.map(({ value: optionValue, label }) => (
            <span
              key={`select-${name}-${optionValue}`}
              className={`block w-full text-sm py-3 px-4 font-normal cursor-pointer whitespace-no-wrap rounded-md text-gray-900 hover:text-white hover:bg-${color}-700 hover:shadow-md-${color} transition-all duration-300 ${
                value === optionValue ? `bg-${color}-500 text-white` : ''
              }`}
              onClick={() => {
                setFieldValue(name, optionValue);
                setIsOpen(false);

                if (!touched[name]) {
                  setFieldTouched(name, true);
                }
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
