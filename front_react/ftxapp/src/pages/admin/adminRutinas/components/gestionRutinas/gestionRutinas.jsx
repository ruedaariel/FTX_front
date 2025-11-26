import React, { useState } from "react";
import SelectorRutinas from "./../SelectorRutina/selectorRutina";
import RutinaUsuario from "./../rutinaUsuario/rutinaUsario";

function GestionRutinas() {
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);

  return (
    <>
      
      <SelectorRutinas onSeleccionarRutina={setRutinaSeleccionada} />
      <RutinaUsuario rutinaSeleccionada={rutinaSeleccionada} />
    </>
  );
}

export default GestionRutinas;
