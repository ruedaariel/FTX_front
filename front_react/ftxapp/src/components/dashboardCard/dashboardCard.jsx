import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ 
  icon, 
  title, 
  description, 
  onClick = () => {},
  variant = 'default',
  disabled = false,
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div 
      className={`dashboard-card ${variant} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-icon">
        {typeof icon === 'string' ? <span>{icon}</span> : icon}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      
      <div className="card-hover-effect"></div>
    </div>
  );
};

export default DashboardCard;