import React from 'react';
import { getIn } from 'formik';
import propTypes from 'prop-types';
import { AiFillEye,AiFillCalendar } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

DatePickers.propTypes = {
  formik: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  isRequiredLabel: propTypes.bool,
  isDynamic: propTypes.bool
};

export default function DatePickers({
  formik,
  label,
  name,
  type = 'date',
  placeholder,
  className = '',
  disabled = false,
  isRequiredLabel,
  isDynamic = false,
  ...props
}) {
  console.log("date",formik.values)
  return (
    <div className='input-first-div'>
      <label className="input-label">
        {label}{' '}
        
      </label><br/>
      <input
        {...(formik && formik.getFieldProps(name))}
        type={type}
        onChange={(e) => {
            formik?.setFieldValue(name, e.target.value);
        }}
        placeholderText={placeholder}
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
         `}
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