import React, { useEffect, useState } from "react";
import "./selectorEjercicio.css";
import "../../../../components/componentsShare/grupoRadios/grupoRadios.css"
import "../../../../components/componentsShare/selectorGenerico/selectorGenerico.css";
//  Función genérica para llamadas al backend

import GrupoRadios from "../../../../components/componentsShare/grupoRadios/grupoRadios.jsx"; // ajustá la ruta según tu estructura
import SelectorGenerico from "../../../../components/componentsShare/selectorGenerico/selectorGenerico.jsx";

const SelectorEjercicio = ({ modoEjercicio, ejercicios,ejercicioSeleccionado, onSeleccionarEjercicio,onCambiarModo }) => {
  
 
  // const [error, setError] = useState(null);
  //const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("");
 // const [modoEjercicio, setModoEjercicio] = useState("Crear");


// const isDisabled = modoEjercicio === "Crear";

  return (
    <div className="selector-ejercicios-container">
      <div className="selector-ejercicios-visual">
        {/* Radios a la izquierda */}
        <GrupoRadios
          opciones={["Crear", "Editar"]}
          valorSeleccionado={modoEjercicio}
          onChange={onCambiarModo}
          nombreGrupo="modoEjercicio"
        />

        {/* Selector a la derecha */}
      {/*   <SelectorGenerico
          opciones={ejercicios}
          valueKey="idEjercicioBasico"
          labelKey="nombreEjercicio"
          valorSeleccionado={ejercicioSeleccionado}
        
          onSeleccionar={onSeleccionarEjercicio}
          labelTexto="Seleccione Ejercicio"
          disabled = {isDisabled}
        /> */}
        {modoEjercicio === "Editar" && (
  <SelectorGenerico
    opciones={ejercicios}
    valueKey="idEjercicioBasico"
    labelKey="nombreEjercicio"
    valorSeleccionado={ejercicioSeleccionado}
    onSeleccionar={onSeleccionarEjercicio}
    labelTexto="Seleccione Ejercicio"
  />
)}

      </div>

      {/* {error && <p className="error-texto-ejercicio">Error: {error}</p>} */}
    </div>
  );
};

export default SelectorEjercicio;
