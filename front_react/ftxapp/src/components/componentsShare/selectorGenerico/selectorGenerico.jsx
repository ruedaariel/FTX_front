import React, { useEffect } from "react";
import "./selectorGenerico.css";

/**
 * Componente reutilizable para renderizar un <select> dinámico.
 * Permite seleccionar un objeto desde una lista de opciones, usando claves configurables.
 *
 * @param {Array} opciones - Lista de objetos disponibles para seleccionar
 * @param {string} valueKey - Clave que representa el valor único de cada opción (por defecto "id")
 * @param {string} labelKey - Clave que representa el texto visible de cada opción (por defecto "nombre")
 * @param {Object} valorSeleccionado - Objeto actualmente seleccionado
 * @param {Function} onSeleccionar - Callback que recibe el objeto seleccionado
 * @param {string} labelTexto - Texto que acompaña al selector
 * @param {boolean} disabled - Si el selector debe estar deshabilitado
 */
const SelectorGenerico = ({
  opciones = [],
  valueKey = "id",
  labelKey = "nombre",
  valorSeleccionado,
  onSeleccionar,
  labelTexto = "Seleccione una opción",
  disabled = false, // para habilitar o deshabilitar el selector
}) => {
  /**
   * Handler para el cambio de selección.
   * Busca el objeto completo en base al value seleccionado y lo pasa al callback.
   */
  const handleChange = (e) => {
    const valor = e.target.value;
    const objetoSeleccionado = opciones.find(
      (item) => String(item[valueKey]) === valor
    );
    if (onSeleccionar) onSeleccionar(objetoSeleccionado);
  };

  /**
   * Determina el valor actual del <select> en base al objeto seleccionado.
   * Si no hay selección válida, retorna cadena vacía.
   */
  const valorSelectInterno =
    valorSeleccionado && valorSeleccionado[valueKey]
      ? String(valorSeleccionado[valueKey])
      : "";

  // Diagnóstico opcional para trazabilidad de cambios
  useEffect(() => {
    // console.log("Valor seleccionado cambió:", valorSeleccionado);
  }, [valorSeleccionado]);

  return (
    <div className="selector-generico-header">
      <div className="selector-generico-wrapper">
        {/* Etiqueta descriptiva */}
        <span className="selector-generico-label">{labelTexto}</span>

        {/* Selector principal */}
        <select
          id="selector-generico"
          value={valorSelectInterno}
          onChange={handleChange}
          disabled={disabled}
        >
          {/* Opción inicial vacía */}
          <option value="">Elige una opción...</option>

          {/* Render dinámico de opciones */}
          {opciones.map((item) => (
            <option
              key={item[valueKey] ?? item.id} // Fallback para key única
              value={String(item[valueKey])}
            >
              {item[labelKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectorGenerico;

