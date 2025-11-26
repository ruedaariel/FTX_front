import React from "react";
import "./BarraBusqueda.css";
//import "../../../../colores.css";
import GrupoRadios from "../../../../../components/componentsShare/grupoRadios/grupoRadios"; // ajustá la ruta según tu estructura

function BarraBusqueda({
  estadoSeleccionado,
  onEstadoChange,
  onAbrirBusqueda,
  onResetFiltro,
}) {
  return (
    <div className="seccion-busqueda-react">
      {/* Radios horizontales alineados a la izquierda */}
      <GrupoRadios
        opciones={["todos", "activo", "inactivo", "archivado"]}
        valorSeleccionado={estadoSeleccionado}
        onChange={onEstadoChange}
        nombreGrupo="estado"
      />

      {/* Botones de acción */}
      <div className="grupo-botones">
        <button id="btnDeBusqueda" onClick={onAbrirBusqueda}>
          Buscar/Filtrar
        </button>
        <button id="btnResetFiltro" onClick={onResetFiltro}>
          Borrar Filtro
        </button>
        {/* <button id="btnNuevoCliente">Agregar Cliente</button> */}
      </div>
    </div>
  );
}

export default BarraBusqueda;
