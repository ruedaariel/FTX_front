import React, { useEffect, useState } from "react";
import "./rutinaUsuario.css";
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral";
import API_URL from "../../../../../config/api";

/**
 * Componente que permite editar el nombre y usuario asociado a una rutina.
 * Se adapta según el modo: Crear, Editar o Copiar.
 */
const RutinaUsuario = ({
  rutinaSeleccionada,       // Rutina actual seleccionada
  //rutinaEditable,           // Rutina editable (no se usa directamente aquí)
  //mostrarModalInfo,         // Modal para mostrar mensajes (no se usa aquí)
  modoRutina,               // Modo actual: "Crear", "Editar", "Copiar"
  //onResetearInterfaz,       // Callback para reiniciar la interfaz (no se usa aquí)
  onDatosRutinaChange,      // Callback para enviar cambios al componente padre
  datosRutinaUsuario,       // Datos de la rutina (nombre y usuario)
}) => {
  // Lista de usuarios disponibles
  const [usuarios, setUsuarios] = useState([]);

  // Estado local del usuario y nombre de rutina seleccionados
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [nombreRutinaEditable, setNombreRutinaEditable] = useState("");

  // Validación para habilitar botón en modo Crear (no se usa aquí)
  const camposValidosCrear = nombreRutinaEditable.trim().length > 0;

  // Cargar usuarios desde el backend al montar el componente
  useEffect(() => {
    fetchGeneral({
      url: `${API_URL}/usuario/all`,
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  // Inicializar campos cuando cambia la rutina seleccionada
  useEffect(() => {
    if (rutinaSeleccionada?.nombreRutina) {
      setNombreRutinaEditable(rutinaSeleccionada.nombreRutina);
      setUsuarioSeleccionado(rutinaSeleccionada.idUsuario || "");
    }
  }, [rutinaSeleccionada]);


  /* useEffect(() => {
  setNombreRutinaEditable(datosRutinaUsuario?.nombreRutina || "");
  setUsuarioSeleccionado(datosRutinaUsuario?.idUsuario || "");
}, [datosRutinaUsuario]); */


  

  // Propagar cambios al componente padre cuando cambian los campos
  useEffect(() => {
    if (nombreRutinaEditable || usuarioSeleccionado) {
      onDatosRutinaChange?.({
        nombreRutina: nombreRutinaEditable,
        idUsuario: usuarioSeleccionado,
      });
    }
  }, [nombreRutinaEditable, usuarioSeleccionado]);

  
  // console.log("%cUsuario ----->","color: orange;font-weight: bold;",rutinaSeleccionada);
  // Handler para cambio de usuario
  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
    console.log("usuario", e.target.value);
    
  };

  // Handler para cambio de nombre de rutina
  const handleNombreChange = (e) => {
    setNombreRutinaEditable(e.target.value);
  };

  // Validación para habilitar botón en modo Copiar (no se usa aquí)
  const camposModificados = (() => {
    if (!rutinaSeleccionada) return false;
    return (
      nombreRutinaEditable &&
      usuarioSeleccionado &&
      nombreRutinaEditable !== rutinaSeleccionada.nombreRutina &&
      usuarioSeleccionado !== rutinaSeleccionada.nombreUsuario
    );
  })();

  return (
    <div className="rutina-usuario-container">
      {/* Mensaje contextual según el modo actual */}
      {modoRutina === "Copiar" &&
        rutinaSeleccionada?.nombreRutina &&
        rutinaSeleccionada?.nombreUsuario && (
          <div className="mensaje-contextual">
            Estás copiando la rutina{" "}
            <strong>{rutinaSeleccionada.nombreRutina}</strong> de{" "}
            <strong>{rutinaSeleccionada.nombreUsuario}</strong>.
          </div>
        )}

      {modoRutina === "Crear" && (
        <div className="mensaje-contextual">
          Estás creando una nueva rutina. Ingresá un nombre y asignale un
          usuario (opcional).
        </div>
      )}

      {modoRutina === "Editar" && rutinaSeleccionada?.nombreRutina && (
        <div className="mensaje-contextual">
          Estás editando la rutina{" "}
          <strong>{rutinaSeleccionada.nombreRutina}</strong>. Solo podés
          modificar el nombre y la estructura, no el usuario.
        </div>
      )}

      {/* Formulario de edición */}
      <div className="rutina-usuario-form-row">
        {/* Campo para nombre de rutina */}
        <div className="rutina-usuario-nombre">
          <label>Nombre de Rutina </label>
          <input
            type="text"
            value={nombreRutinaEditable}
            onChange={handleNombreChange}
            placeholder="Nuevo nombre de la rutina"
          />
        </div>

        {/* Selector de usuario */}
        <div className="rutina-usuario-selector">
          <label>Seleccione Usuario</label>
          <select
            value={usuarioSeleccionado}
            onChange={handleUsuarioChange}
            disabled={modoRutina === "Editar"}
          >
            <option value="">{rutinaSeleccionada?.nombreUsuario || "Seleccione un usuario"}</option>
            {usuarios
              .filter((usuario) => usuario.rol === "usuario")
              .map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.datosPersonales?.nombre}{" "}
                  {usuario.datosPersonales?.apellido}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RutinaUsuario;
