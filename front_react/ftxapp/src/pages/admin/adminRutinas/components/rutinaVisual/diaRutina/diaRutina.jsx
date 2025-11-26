import React from "react";
import EjercicioRutina from "../../ejercicioRutina/ejercicioRutina";
// import { useModal } from "../../../../../context/ModalContext";

/**
 * Componente que representa un día dentro de una semana de rutina.
 * Muestra el foco del día y permite editar la lista de ejercicios.
 * @param {Object} dia - Datos del día (focus, ejerciciosRutina)
 * @param {number} nroDia - Número visible del día (1-indexado)
 * @param {Function} onEjercicioChange - Callback para actualizar un ejercicio
 * @param {Function} onAgregarEjercicio - Callback para agregar un nuevo ejercicio
 * @param {Function} onEliminarEjercicio - Callback para eliminar un ejercicio
 * @param {Function} onGuardarDia - Callback para guardar el día completo
 */
const DiaRutina = ({
  dia,
  nroDia,
  onEjercicioChange,
  onAgregarEjercicio,
  onEliminarEjercicio,
  onGuardarDia,
}) => {

  // console.log("DiaRutina - Dia recibida:", dia);


  return (
    <div className="dia-rutina">
      {/* Encabezado del día con foco y botón de guardar */}
      <div className="dia-header">
        <h4>
          {/* Día {nroDia} — Foco: {dia.focus} */}
          Día {nroDia} 
        </h4>
        <button
          className="btn-guardar-dia"
          onClick={() => onGuardarDia(nroDia - 1)} // Se usa índice 0-based
        >
          Guardar día
        </button>
      </div>

      {/* Lista de ejercicios del día */}
      <div className="ejercicios-rutina-list">
        {dia.ejerciciosRutina.map((ejercicio, index) => (
          <EjercicioRutina
            key={index}
            index={index}
            ejercicio={ejercicio}
            onChange={(i, nuevoEjercicio) =>
              onEjercicioChange(nroDia - 1, i, nuevoEjercicio)
            }
            onAgregar={() => onAgregarEjercicio(nroDia - 1, index)}
            onEliminar={() => onEliminarEjercicio(nroDia - 1, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaRutina;

