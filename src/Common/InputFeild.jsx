import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';
import { AiFillEye } from 'react-icons/ai';
import { boolean } from 'yup';

TextField.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  isRequiredLabel: propTypes.bool,
  onInput: propTypes.func,
  isDynamic: propTypes.bool
};


export default function TextField({
  formik,
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  disabled = false,
  isRequiredLabel,
  onInput,
  isDynamic = false,
  ...props
}) {
  return (
    <div className="input-first-div">
      <label className="input-label">
        {label}
        {isRequiredLabel && (
          <>
            *
            </>
        )}
      </label>
      <input
        {...(formik && formik.getFieldProps(name))}
        type={type}
        {...(onInput && { onInput })}
        placeholder={placeholder}
        disabled={disabled}
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
         focus:outline-none placeholder-gray-300 shadow-md`}
        {...props}
      />
      <span className="extra-input-text">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]}
      </span>
    </div>
  );
}
