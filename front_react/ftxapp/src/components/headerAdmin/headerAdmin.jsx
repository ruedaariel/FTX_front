import React from 'react';
import './HeaderAdmin.css';

const HeaderAdmin = ({ 
  logo = "FTX", 
  title = "Panel Administrador", 
  onLogout = () => {},
  logoutText = "Cerrar Sesión"
}) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🏋️</span>
          <span className="logo-text">{logo}</span>
        </div>
      </div>
      
      <div className="header-center">
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="header-right">
        <button className="logout-btn" onClick={onLogout}>
          {logoutText}
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;