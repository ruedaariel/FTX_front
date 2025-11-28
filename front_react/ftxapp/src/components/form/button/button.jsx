// front_react/ftxapp/src/components/Form/Button.jsx
import React from 'react';
import './button.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${loading ? 'loading' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading-spinner"></span>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;