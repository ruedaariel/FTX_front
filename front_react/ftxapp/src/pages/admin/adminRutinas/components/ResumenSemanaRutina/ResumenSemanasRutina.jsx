import React from "react";
import "./ResumenSemanasRutina.css";

const ResumenSemanasRutina = ({ rutina }) => {
  if (!rutina?.semanas?.length) return null;

  console.log("ResumenSemanasRutina - Rutina recibida:", rutina);

  return (
    <div className="resumen-semanas-container">
      {rutina.semanas.map((semana) => (
        <div key={semana.idSemana} className="barra-semana-resumen">
          <div className="etiqueta-semana-resumen">Semana {semana.nroSemana}</div>
          <div className="dias-semana-resumen">
            {semana.dias.map((dia) => {
              const cantidadEjercicios = dia.ejerciciosRutina?.length || 0;
              return (
                <div key={`${semana.idSemana}-${dia.idDia}`} className="cuadro-dia-resumen" title={`Día ${dia.nroDia}`}>
                  {cantidadEjercicios}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumenSemanasRutina;

