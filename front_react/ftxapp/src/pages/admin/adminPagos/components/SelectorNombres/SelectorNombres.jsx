import React from "react";
import "./SelectorNombres.css"; // Importamos el CSS externo

const SelectNombres = ({ opciones, valorSeleccionado, onChange }) => {
  return (
    <div className="select-nombres-wrapper">
      <label className="select-nombres-label">
        Ver Historial de un Usuario:
      </label>
      <select
        value={valorSeleccionado}
        onChange={(e) => onChange(e.target.value)}
        className="select-nombres-dropdown"
      >
        <option value="">-- Todos --</option>
        {opciones.map((nombreCompleto, index) => (
          <option key={index} value={nombreCompleto}>
            {nombreCompleto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectNombres;

