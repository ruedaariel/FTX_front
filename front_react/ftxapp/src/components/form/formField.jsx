// front_react/ftxapp/src/components/Form/FormField.jsx
import React from 'react';
import './formField.css';

const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  options = [], // Para select
  className = ''
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`form-input ${error ? 'error' : ''}`}
            required={required}
          >
            <option value="">{placeholder || 'Seleccionar...'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-input form-textarea ${error ? 'error' : ''}`}
            required={required}
            rows={4}
          />
        );
      
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-input ${error ? 'error' : ''}`}
            required={required}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      {renderInput()}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default FormField;