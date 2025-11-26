import React, { useState } from 'react';
import './ModalBusqueda.css'; // Usá tus estilos base

function ModalBusqueda({ isOpen, onClose, onBuscar }) {
  const [email, setEmail] = useState('');
  const [dni, setDNI] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');

  // console.log("isOpen",isOpen);

  const resetCampos = () => {
  setEmail('');
  setDNI('');
  setApellido('');
  setNombre('');
};

  if (!isOpen) return null;

  const handleSubmit = () => {
  if (!email && !dni && !apellido && !nombre) {
    // Si no hay criterios, se cierra sin hacer nada
    resetCampos();
    onClose();
    return;
  }
  // console.log('Criterios:', { email, dni, apellido, nombre });
  onBuscar({ email, dni, apellido, nombre});
  resetCampos();
  onClose();
};

  return (
    <div className="modal-busqueda">
      <div className="modal-content-busqueda modal-info-border-busqueda">
        {/* <span className="close-button" onClick={onClose}>&times;</span> */}
        <h2>Buscar clientes</h2>

        <div className="campo-busqueda">
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="campo-busqueda">
          <label>DNI:</label>
          <input type="text" value={dni} onChange={(e) => setDNI(e.target.value)} />
        </div>

        <div className="campo-busqueda">
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>

        <div className="campo-busqueda">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        {/* <div className="campo-busqueda">
          <label>Nombre:</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">—</option>
            <option value="activo">Activo</option>
            <option value="archivado">Archivado</option>
          </select>
        </div> */}

        <div className="botones-modal">
          <button className="btn-confirmar" onClick={handleSubmit}> Buscar </button>
          <button className="btn-cancelar" onClick={() => {resetCampos();onClose();}}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalBusqueda;
