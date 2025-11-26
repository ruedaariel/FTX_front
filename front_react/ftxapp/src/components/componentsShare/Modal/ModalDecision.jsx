import React, { useEffect } from 'react';
import '../Modal/modalError/ModalError.css'; // Usa estilos existentes

const ModalDecision = ({
  isOpen,
  title,
  message,
  borderClass = '',
  onClose,
  onDecision // función que recibe true o false
}) => {
  useEffect(() => {
    console.log("ModalDecision montado");
  }, []);

  if (!isOpen) return null;

  console.log('ModalDecision renderizado');

  return (
    <div className="modal-temporizado">
      <div className={`modal-content-temporizado ${borderClass}`}>
        {/* Botón para cerrar el modal sin tomar decisión */}
        <span className="close-button-temporizado" onClick={onClose}>&times;</span>

        {/* Título y mensaje */}
        <h1>{title}</h1>
        <p>{message}</p>

        {/* Botones de decisión */}
        <div className="modal-buttons-temporizado">
          <button className="btn-confirmar-temporizado" onClick={() => onDecision(true)}>Sí</button>
          <button className="btn-cancelar-temporizado" onClick={() => onDecision(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDecision;

