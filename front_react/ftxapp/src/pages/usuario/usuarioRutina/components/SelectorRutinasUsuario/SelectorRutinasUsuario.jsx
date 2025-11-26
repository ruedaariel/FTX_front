import React, { useEffect } from "react";
import "./SelectorRutinasUsuario.css";

/**
 * SelectorRutinasUsuario
 * 
 * @param {Array} opciones - Lista de rutinas [{idUsuario, idRutina, nombreRutina, estadoRutina}]
 * @param {Object} valorSeleccionado - Rutina actualmente seleccionada
 * @param {Function} onSeleccionar - Callback que recibe el objeto rutina seleccionado
 * @param {string} labelTexto - Texto para el encabezado del selector
 * @param {boolean} disabled - Si el selector debe estar deshabilitado
 */
const SelectorRutinasUsuario = ({
  opciones = [],
  valorSeleccionado,
  onSeleccionar,
  labelTexto = "Seleccione una rutina",
  disabled = false,
}) => {

  // Handler para cambio de selección
  const handleChange = (e) => {
    const valor = e.target.value;
    const rutinaSeleccionada = opciones.find(
      (item) => String(item.idRutina) === valor
    );
    if (onSeleccionar) onSeleccionar(rutinaSeleccionada);
  };

  // Valor actual del select
  const valorSelectInterno =
    valorSeleccionado && valorSeleccionado.idRutina
      ? String(valorSeleccionado.idRutina)
      : "";

  // useEffect(() => {
  //   // console.log("Rutina seleccionada cambió:", valorSeleccionado);
  // }, [valorSeleccionado]);

  // console.log("opciones",opciones);


  return (
    <div className="selector-usuario-header">
      <div className="selector-usuario-wrapper">
        {/* Etiqueta descriptiva */}
        <h2 className="selector-usuario-label">{labelTexto} estas son tus rutinas: </h2>

        {/* Selector principal */}
        <select className="select-selector-rutinas"
          id="selector-rutinas"
          value={valorSelectInterno}
          onChange={handleChange}
          disabled={disabled}
        >
          {/* Opción inicial vacía */}
          <option value="">Elige una rutina...</option>

          {/* Render dinámico de opciones */}
          {opciones.map((item) => (
            <option key={item.idRutina} value={String(item.idRutina)}>
              {item.nombreRutina} — {item.estadoRutina}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectorRutinasUsuario;


