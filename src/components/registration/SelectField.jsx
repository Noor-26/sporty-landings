
import { useState } from 'react';

const SelectField = ({ 
  id, 
  name, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  label, 
  error, 
  isFocused,
  options = [],
  disabled = false,
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className={`relative ${isFocused ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
            error 
              ? 'ring-2 ring-red-500' 
              : 'focus:ring-2 focus:ring-sport-blue'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectField;
