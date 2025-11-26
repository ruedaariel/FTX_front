import React from "react";
import SemanaItem from "./SemanaItem";

const RutinaPorSemana = ({ rutina }) => {
  if (!rutina?.semanas?.length) return null;

  return (
    <div className="rutina-semanal-container">
      {rutina.semanas.map((semana) => (
        <SemanaItem key={semana.idSemana} semana={semana} />
      ))}
    </div>
  );
};

export default RutinaPorSemana;
