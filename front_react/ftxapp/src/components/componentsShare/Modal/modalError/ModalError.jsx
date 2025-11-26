import React from 'react';
//import './ModalError.css'; // Asegurate de tener los estilos que usabas antes

const ModalError = ({ isOpen, title, message, borderClass = '', onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-temporizado">
      <div className={`modal-content-temporizado ${borderClass}`}>
        <span className="close-button-temporizado" onClick={onClose}>&times;</span>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalError;
