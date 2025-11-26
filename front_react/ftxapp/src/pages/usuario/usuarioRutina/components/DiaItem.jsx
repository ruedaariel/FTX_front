import React from "react";
import EjercicioItem from "./EjercicioItem";

const DiaItem = ({
  dia,
  onSeleccionEjercicio,
  ejercicioSeleccionado,
  onToggleEjercicioHecho,
}) => {
  const handleToggleHecho = (idEjercicioRutina) => {
    dia.ejerciciosRutina = dia.ejerciciosRutina.map((ej) =>
      ej.idEjercicioRutina === idEjercicioRutina
        ? { ...ej, ejercicioHecho: !ej.ejercicioHecho }
        : ej
    );
  };



  return (
    <div className="dia-item">
      {/* <h4>Día {dia.nroDia} – Focus: {dia.focus}</h4> */}
      {/* {dia.ejerciciosRutina.map((ejercicio) => (
        <EjercicioItem key={ejercicio.idEjercicioRutina} ejercicio={ejercicio} />
      ))} */}
      {dia.ejerciciosRutina.map((ejercicio) => {
        const seleccionado =
          ejercicio.idEjercicioRutina ===
          ejercicioSeleccionado?.idEjercicioRutina;
        return (
          <div
            key={ejercicio.idEjercicioRutina}
            className={`ejercicio-item ${seleccionado ? "expandido" : ""} ${ejercicio.ejercicioHecho ? "hecho" : ""}`}

            onClick={() => onSeleccionEjercicio?.(ejercicio)}
          >
            <input className="checkbox-ejercicio"
              type="checkbox"
              checked={ejercicio.ejercicioHecho}
              disabled={ejercicio.ejercicioHecho} // bloquea si ya está hecho
              onClick={(e) => e.stopPropagation()}
              onChange={() =>
                onToggleEjercicioHecho?.(ejercicio.idEjercicioRutina)
              }
            />

            <span>{ejercicio.ejercicioBasico.nombreEjercicio}</span>

            {seleccionado && (
              <div className="detalle-inline">
                <p>
                  <strong>Repeticiones:</strong> {ejercicio.repeticiones}
                </p>
                <p>
                  <strong>Peso:</strong> {ejercicio.peso} kg
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {ejercicio.ejercicioBasico.observaciones}
                </p>
                {ejercicio.ejercicioBasico.videoLink ? (
                  <a
                    href={ejercicio.ejercicioBasico.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-youtube social-icon-dia"></i> Ver
                    explicación en Youtube
                  </a>
                ) : (
                  <p className="video-faltante">No hay video disponible</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DiaItem;
