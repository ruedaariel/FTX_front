import React, { useEffect, useState } from "react";
import "./SeleccionUsuariosyRutinas.css";
import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../../context/ModalContext";

// Componente que permite seleccionar un usuario y una rutina asociada,
// y muestra los datos estadísticos de la rutina seleccionada
const SeguimientoRutinas = ({ onUsuarioChange, onRutinaChange }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [rutinasUsuario, setRutinasUsuario] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const [datosRutinaSeleccionada, setDatosRutinaSeleccionada] = useState(null);
  const { showModal } = useModal();

  // Cargar lista de usuarios al montar el componente
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  // Cargar rutinas del usuario seleccionado
  useEffect(() => {
    if (!usuarioSeleccionado) return;

    fetchGeneral({
      url: `http://localhost:8000/apiFtx/usuario/rutinas/${usuarioSeleccionado.id}`,
      method: "GET",
      onSuccess: (data) => setRutinasUsuario(data),
      showModal,
    });
  }, [usuarioSeleccionado]);

  // Cargar datos estadísticos de la rutina seleccionada
  useEffect(() => {
    if (!rutinaSeleccionada) return;

    fetchGeneral({
      url: `http://localhost:8000/apiFtx/rutina/seguimiento/${rutinaSeleccionada.idRutina}`,
      method: "GET",
      onSuccess: (data) => setDatosRutinaSeleccionada(data),
      showModal,
    });
  }, [rutinaSeleccionada]);

  // Notificar al componente padre cuando cambia el usuario
  useEffect(() => {
    if (onUsuarioChange) {
      onUsuarioChange(usuarioSeleccionado);
    }
  }, [usuarioSeleccionado, onUsuarioChange]);

  // Notificar al componente padre cuando cambia la rutina
  useEffect(() => {
    if (onRutinaChange) {
      onRutinaChange(rutinaSeleccionada);
    }
  }, [rutinaSeleccionada, onRutinaChange]);

  return (
    <div className="seleccion-usuario-rutina">
      {/* Selector de usuarios */}
      <div className="form-group-seleccion-usuario-rutina">
        <label>Seleccionar Usuario:</label>
        <select
          id="usuarioSelect"
          value={usuarioSeleccionado ? usuarioSeleccionado.id : ""}
          onChange={(e) => {
            const userObj = usuarios.find(
              (u) => String(u.id) === e.target.value
            );
            setUsuarioSeleccionado(userObj || null);
            setRutinaSeleccionada(null); // Resetear rutina al cambiar usuario
          }}
        >
          <option value="">-- Seleccione un usuario --</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.datosPersonales?.nombre} {usuario.datosPersonales?.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Selector de rutinas */}
      {usuarioSeleccionado && (
        <div className="form-group-seleccion-usuario-rutina">
          <label>Seleccionar Rutina:</label>
          <select
            id="rutinaSelect"
            value={rutinaSeleccionada ? rutinaSeleccionada.idRutina : ""}
            onChange={(e) => {
              const rutinaObj = rutinasUsuario.find(
                (r) => String(r.idRutina) === e.target.value
              );
              setRutinaSeleccionada(rutinaObj || null);
            }}
          >
            <option value="">-- Seleccione una rutina --</option>
            {rutinasUsuario.map((rutina) => (
              <option key={rutina.idRutina} value={rutina.idRutina}>
                {rutina.nombreRutina}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Visualización de datos de la rutina seleccionada */}
      {rutinaSeleccionada && datosRutinaSeleccionada && (
        <div className="datos-rutina-seleccionada">
          <div className="datos-rutina-pra-linea">
            <div className="datos-columna">
              <p className="rotulo-datos">Rutina:</p>
              <p>{datosRutinaSeleccionada.nombreRutina}</p>
            </div>
            <div className="datos-columna">
              <p className="rotulo-datos">Estado:</p>
              <p>{datosRutinaSeleccionada.estadoRutina}</p>
            </div>
          </div>
          <div className="datos-rutina-sda-linea">
            <div className="datos-columna">
              <p className="rotulo-datos">Fecha Creación:</p>
              <p>{datosRutinaSeleccionada.fCreacionRutina}</p>
            </div>
            <div className="datos-columna">
              <p className="rotulo-datos">Fecha Último Acceso:</p>
              <p>{datosRutinaSeleccionada.fUltimoAccesoRutina}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeguimientoRutinas;

