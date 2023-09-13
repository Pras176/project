import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';

SelectField.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  isRequiredLabel: propTypes.bool,
  selectedText: propTypes.string,
  children: propTypes.node,
  isDynamic: propTypes.bool
};

export default function SelectField({
  formik,
  label,
  name,
  placeholder,
  className = '',
  disabled = false,
  isRequiredLabel,
  children,
  selectedText,
  isDynamic,
  ...props
}) {
  return (
    <div className="input-first-div">
      <label
        className={
          'input-label'
        }
      >
        {label}
        {isRequiredLabel && (
          <>
            *
          </>
        )}
      </label><br/>
      <select
        name={name}
        value={formik?.values[name]}
        onChange={(e) => {
          formik?.setFieldValue(name, e.target.value);
          formik?.setFieldValue(
            selectedText,
            e.target.options[e.target.selectedIndex].text === 'Select'
              ? ''
              : e.target.options[e.target.selectedIndex].text
          );
          return formik?.handleChange(e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
        className={`${className} input-feild 
        ${
          isDynamic
            ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
            ? 'extra-input-feild'
            : 'extra-secondinput-feild'
            : formik?.touched[name] && formik?.errors[name]
            ? 'extra-input-feild'
                : 'extra-secondinput-feild'
        }
           focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
      >
        <option value="">Select</option>
        {children}
      </select>
      <span className="extra-input-text">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]
          ? formik?.errors[name]
          : null}
      </span>
    </div>
  );
}
