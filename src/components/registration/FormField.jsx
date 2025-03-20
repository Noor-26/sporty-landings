
import { useState } from 'react';

const FormField = ({ 
  id, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  placeholder, 
  label, 
  error, 
  isFocused,
  disabled = false
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className={`relative ${isFocused ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
        <input
          type={type}
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
          placeholder={placeholder}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;
