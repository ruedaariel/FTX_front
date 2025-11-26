// CardUsuario.jsx
import React from 'react';

function CardUsuario({ usuario, activeTab, setActiveTab, handleEditar, handleEliminarClick }) {
  const tab = activeTab[usuario.id];

  // console.log ("ImagemPerfil:",usuario.datosPersonales.imagenPerfil);

  return (
    <div className="card-usuario">
      <div className="tabs-usuario">
        {['basicos', 'personales', 'fisicos'].map((tipo) => (
          <button
            key={tipo}
            className={`tab-btn ${tab === tipo ? 'active' : ''}`}
            onClick={() => setActiveTab((prev) => ({ ...prev, [usuario.id]: tipo }))}
          >
            {tipo === 'basicos' ? 'Básicos' : tipo === 'personales' ? 'Datos Personales' : 'Datos Físicos'}
          </button>
        ))}
      </div>

      <div className="contenido-tab">
        {tab === 'basicos' && (
          <div className="basicos-grid">
            <div className="col-imagen">
              <div className="imagen-box">
                <img
                  src={usuario.datosPersonales?.imagenPerfil || 'http://localhost:8000/uploads/perfiles/usuario.png'}
                  alt="Imagen no Disponible"
                  className="formato-imagen"
                />
              </div>
            </div>
            <div className="col-datos">
              <div className="dato-linea">
                <strong>Plan:</strong> {usuario.datosPersonales?.plan?.nombrePlan || '—'}
              </div>
              <div className="dato-linea">
                <strong>Estado:</strong> {usuario.estado}
              </div>
            </div>
            <div className="fila-inferior">
              <div className="dato-horizontal">
                <strong>Email:</strong> <span>{usuario.email}</span>
              </div>
            </div>
            <div className="fila-inferior-1">
              <div className="dato-horizontal">
                <strong>Nombre:</strong>{' '}
                <span>
                  {usuario.datosPersonales?.nombre || '—'} {usuario.datosPersonales?.apellido || '—'}
                </span>
              </div>
            </div>
          </div>
        )}

        {tab === 'personales' && (
          <>
            <div className="dato-linea-personales">
              <strong>Nombre:</strong>{' '}
              <span>
                {usuario.datosPersonales?.nombre || '—'} {usuario.datosPersonales?.apellido || '—'}
              </span>
            </div>
            <div className="dato-linea-personales">
              <strong>DNI:</strong> {usuario.datosPersonales?.dni || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Teléfono:</strong> {usuario.datosPersonales?.phone || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Género:</strong> {usuario.datosPersonales?.genero || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Fecha Nacimiento:</strong> {usuario.datosPersonales?.fNacimiento || '—'}
            </div>
          </>
        )}

        {tab === 'fisicos' && (
          <>
            <div className="dato-linea-personales">
              <strong>Peso (Kg.):</strong>{' '}
              <span>
                {usuario.datosFisicos?.peso || '—'} 
              </span>
            </div>
            <div className="dato-linea-personales">
              <strong>Estatura (cm):</strong> {usuario.datosFisicos?.estatura || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Actividad Diaria:</strong> {usuario.datosFisicos?.actividadDiaria || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Metas:</strong> {usuario.datosFisicos?.metas || '—'}
            </div>
            <div className="dato-linea-personales">
              <strong>Observaciones:</strong> {usuario.datosFisicos?.Observaciones || ' —--'}
            </div>
          </>
        )}
      </div>

      <div className="acciones-card">
        <button className="btn-editar" onClick={() => handleEditar(usuario)}>Editar</button>
        <button className="btn-eliminar" onClick={() => handleEliminarClick(usuario)}>Eliminar</button>
      </div>
    </div>
  );
}

export default CardUsuario;
