import React from "react";
import DiaRutina from "../diaRutina/diaRutina";
import { useModal } from "../../../../../context/ModalContext";

/**
 * Componente que representa una semana dentro de la rutina.
 * Muestra resumen visual de los días y permite expandir para editar cada día.
 * @param {Object} semana - Datos de la semana actual
 * @param {number} nroSemana - Número visible de la semana (1-indexed)
 * @param {number} semanaIndex - Índice real de la semana en el array
 * @param {Function} onEjercicioChange - Handler para editar un ejercicio
 * @param {Function} onAgregarEjercicio - Handler para agregar un ejercicio
 * @param {Function} onEliminarEjercicio - Handler para eliminar un ejercicio
 * @param {Function} onGuardarDia - Handler para guardar un día
 * @param {Function} onGuardarSemanaAvanzar - Handler para guardar y avanzar semana
 * @param {boolean} esActiva - Indica si la semana está expandida
 * @param {Function} onToggleExpand - Handler para expandir/contraer semana
 */
const SemanaRutina = ({
  semana,
  nroSemana,
  semanaIndex,
  onEjercicioChange,
  onAgregarEjercicio,
  onEliminarEjercicio,
  onGuardarDia,
  onGuardarSemanaAvanzar,
  esActiva,
  onToggleExpand,
}) => {
  // Verifica si un día tiene al menos un ejercicio válido
  const diaTieneEjercicios = (dia) =>
    dia.ejerciciosRutina.some(
      (ej) => ej.idEjercicioBasico && ej.idEjercicioBasico !== ""
    );

  // Genera resumen visual de los días (cuadros activos/inactivos)
  const resumenVisual = semana.dias.map((dia, index) => {
    const activo = diaTieneEjercicios(dia);
    return (
      <div
        key={index}
        className={`cuadro-dia ${activo ? "activo" : "inactivo"}`}
        title={`Día ${index + 1}: ${activo ? "con ejercicios" : "descanso"}`}
      />
    );
  });

  console.log("SemanaRutina - Semana recibida:", semana);


  return (
    <div className={`semana-rutina ${esActiva ? "activa" : ""}`}>
      {/* Encabezado de semana con resumen visual y botón de guardar */}
      <div
        className="semana-header"
        onClick={() => onToggleExpand(semanaIndex)}
        style={{ cursor: "pointer" }}
      >
        <h3>
          Semana {nroSemana} – {semana.estadoSemana}
        </h3>

        <div className="barra-semana">
          {resumenVisual}
          <span className="contador-activos">
            {semana.dias.filter(diaTieneEjercicios).length} de 7 días activos
          </span>
        </div>

        <button
          className="btn-guardar-semana"
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic colapse la semana
            onGuardarSemanaAvanzar(semanaIndex);
          }}
        >
          Guardar semana
        </button>
      </div>

      {/* Contenido expandido de la semana: edición de días */}
      {esActiva && (
        <div className="semana-contenido">
          {semana.dias?.length > 0 ? (
            semana.dias.map((dia, index) => (
              <DiaRutina
                key={index}
                dia={dia}
                nroDia={index + 1}
                onEjercicioChange={(diaIdx, ejIdx, nuevoEj) =>
                  onEjercicioChange(semanaIndex, diaIdx, ejIdx, nuevoEj)
                }
                onAgregarEjercicio={(diaIdx, ejIdx) =>
                  onAgregarEjercicio(semanaIndex, diaIdx, ejIdx)
                }
                onEliminarEjercicio={(diaIdx, ejIdx) =>
                  onEliminarEjercicio(semanaIndex, diaIdx, ejIdx)
                }
                onGuardarDia={(diaIdx) => onGuardarDia(semanaIndex, diaIdx)}
              />
            ))
          ) : (
            <p>No hay días cargados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SemanaRutina;

