import React from "react";
import "./GrupoRadios.css";

const GrupoRadios = ({ opciones = [], valorSeleccionado, onChange, nombreGrupo = "grupo" }) => {
  return (
    <div className="grupo-radios-horizontal">
      {opciones.map((opcion) => (
        <label
          key={opcion}
          className={`radio-opcion ${valorSeleccionado === opcion ? "activo" : ""}`}
        >
          <input
            type="radio"
            name={nombreGrupo}
            value={opcion}
            checked={valorSeleccionado === opcion}
            onChange={(e) => onChange(e.target.value)}
          />
          {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default GrupoRadios;
