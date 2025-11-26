import React from "react";
import DiaItem from "./DiaItem";

const SemanaItem = ({ semana, onToggleEjercicioHecho }) => {
  return (
    <div className="semana-item">
      <h3>Semana {semana.nroSemana}</h3>
      {semana.dias.map((dia) => (
        <DiaItem
          key={dia.idDia}
          dia={dia}
          onToggleEjercicioHecho={onToggleEjercicioHecho}
        />
      ))}
    </div>
  );
};

export default SemanaItem;
