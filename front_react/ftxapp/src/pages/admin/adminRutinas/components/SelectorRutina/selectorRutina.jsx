import React, { useEffect, useState } from "react";
import "./selectorRutina.css";

// Utilidades y componentes compartidos
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral.js";
import GrupoRadios from "../../../../../components/componentsShare/grupoRadios/grupoRadios.jsx";
import SelectorGenerico from "../../../../../components/componentsShare/selectorGenerico/selectorGenerico.jsx";
import { useModal } from "../../../../../context/ModalContext.jsx";


/**
 * Componente que permite seleccionar una rutina existente y definir el modo de trabajo (Crear, Editar, Copiar)
 * @param {Function} onSeleccionarRutina - Callback que envía la rutina seleccionada al componente padre
 * @param {string} modoRutina - Modo actual de operación
 * @param {Function} setModoRutina - Setter para cambiar el modo
 */
const SelectorRutinas = ({ onSeleccionarRutina, modoRutina, setModoRutina }) => {
  // Lista de rutinas disponibles desde el backend
  const [rutinas, setRutinas] = useState([]);

  // Estado de carga y error para el fetch
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showModal } = useModal();

  // Rutina seleccionada localmente desde el selector
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState("");

  // Cargar todas las rutinas disponibles al montar el componente
  useEffect(() => {
    fetchGeneral({
      url: `${API_URL}/rutina/all`,
      method: "GET",
      setLoading,
      setError,
      onSuccess: (data) => setRutinas(data),
      showModal,
    });
  }, []);

  // Limpiar selección si el usuario cambia a modo "Crear"
  useEffect(() => {
    if (modoRutina === "Crear") {
      setRutinaSeleccionada(null);
    }
  }, [modoRutina]);

  return (
    <div className="selector-rutinas-container">
      <div className="selector-rutinas-visual">
        {/* Selector de modo de operación */}
        <GrupoRadios
          opciones={["Crear", "Editar", "Copiar"]}
          valorSeleccionado={modoRutina}
          onChange={setModoRutina}
          nombreGrupo="modoRutina"
        />

        {/* Selector de rutina existente */}
        <SelectorGenerico
          opciones={rutinas}
          valueKey="idRutina"
          labelKey="nombreRutina"
          valorSeleccionado={rutinaSeleccionada}
          disabled={modoRutina === "Crear"? true : false}
          onSeleccionar={(rutina) => {
            setRutinaSeleccionada(rutina);
            if (onSeleccionarRutina) onSeleccionarRutina(rutina);
          }}
          labelTexto="Seleccione Rutina"
        />
      </div>

      {/* Mostrar mensaje de error si falla la carga */}
      {/* {error && <p className="error-texto">Errorcito: {error}</p>} */}
    </div>
  );
};

export default SelectorRutinas;

