// Importación de React y hooks necesarios
import React, { useEffect, useState } from "react";

// Estilos específicos del componente y colores globales
import "./listaUsuarios.css";
import "./colores.css";

import ContenedorCards from './ContenedorCards';

// Componentes modales reutilizables
import ModalEditarUsuario from "./ModalEditarUsuario";
import ModalDecision from "../Modal/ModalDecision"; // Modal de confirmación con respuesta booleana

// Componente principal que muestra la lista de usuarios
const TablaUsuarios = ({ estadoFiltro, filtrosAvanzados }) => {
  // Estado que almacena la lista de usuarios obtenidos del backend
  const [usuarios, setUsuarios] = useState([]);

  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);

  // Estado para almacenar errores en la carga de datos
  const [error, setError] = useState(null);

  // Estado para controlar qué usuario se está editando
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Estado para mostrar el modal de confirmación (no usado en esta versión)
  const [modalVisible, setModalVisible] = useState(false);

  // Estado para mostrar el modal de decisión (sí/no)
  const [mostrarDecision, setMostrarDecision] = useState(false);

  // Estado para guardar el usuario que se desea eliminar
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Estado para guardar el status del acceso a datos
  const [mostrarErrorAcceso, setMostrarErrorAcceso] = useState(false);

  const [activeTab, setActiveTab] = useState({});

  // Efecto que se ejecuta al montar el componente para obtener los usuarios
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Aplicar filtro según estado
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideEstado =
      estadoFiltro === "todos" || usuario.estado.toLowerCase() === estadoFiltro;

    const coincideEmail =
      !filtrosAvanzados.email ||
      usuario.email
        .toLowerCase()
        .includes(filtrosAvanzados.email.toLowerCase());

    // se evalua si datos personales no existe se omite    
    const coincideApellido =
      !filtrosAvanzados.apellido ||
      usuario.datosPersonales?.apellido
        ?.toLowerCase()
        .includes(filtrosAvanzados.apellido.toLowerCase());

    
    const coincideNombre =
      !filtrosAvanzados.nombre ||
      usuario.datosPersonales?.nombre
        ?.toLowerCase()
        .includes(filtrosAvanzados.nombre.toLowerCase());

    const coincideEstadoAvanzado =
      !filtrosAvanzados.estado ||
      usuario.estado.toLowerCase() === filtrosAvanzados.estado;

    return (
      coincideEstado &&
      coincideEmail &&
      coincideApellido &&
      coincideNombre &&
      coincideEstadoAvanzado
    );
  });

  useEffect(() => {
    const tabsIniciales = {};
    usuariosFiltrados.forEach((usuario) => {
      tabsIniciales[usuario.id] = "basicos";
    });
    setActiveTab(tabsIniciales);
  }, [usuarios]);

  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuario/all`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setUsuarios(data);

      setError(null);
    } catch (err) {
      setError(err.message);
      setMostrarErrorAcceso(true); // Mostrar modal de decisión
    } finally {
      setLoading(false);
    }
  };

  // Función que abre el modal de edición con los datos del usuario seleccionado
  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
  };

  //

  // Función que se ejecuta al guardar los cambios desde el modal de edición
  const handleGuardarCambios = (datosActualizados) => {
    // Aquí iría la lógica para actualizar el usuario en el backend
    console.log("Guardar:", datosActualizados);
    setUsuarioEditando(null); // Cerrar el modal
  };

  // Funciones para abrir y cerrar el modal genérico (no usado en esta versión)
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Función que se ejecuta al hacer clic en “Eliminar”
  // Muestra el modal de decisión y guarda el usuario seleccionado
  const handleEliminarClick = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarDecision(true);
  };

  // Función que maneja la respuesta del modal de decisión
  const handleDecision = async (respuesta) => {
    setMostrarDecision(false); // Ocultar el modal
    if (!respuesta || !usuarioAEliminar) return; // Si el usuario eligió “No” o no hay usuario, cancelar

    try {
      // Petición DELETE al backend para eliminar el usuario
      const response = await fetch(
        `${API_URL}/usuario/delete/${usuarioAEliminar.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("No se pudo eliminar el usuario");

      // Actualizar el estado local del usuario sin eliminarlo
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioAEliminar.id ? { ...u, estado: "archivado" } : u
        )
      );
    } catch (error) {
      alert("Error al eliminar el usuario: " + error.message);
    } finally {
      setUsuarioAEliminar(null); // Limpiar el estado
    }
  };

  // Renderizado condicional mientras se cargan los datos
  if (loading) return <p>Cargando usuarios...</p>;

  // Renderizado principal del componente
  return (
    <div className="contenedor-cards">
      {/* Renderizar cada usuario como una card */}
      {usuariosFiltrados
        .filter((usuario) => usuario.rol === "usuario")
        .map((usuario) => (
          <div key={usuario.id} className="card-usuario">
            {/* Navegación por pestañas */}
            <div className="tabs-usuario">
              <button
                className={`tab-btn ${
                  activeTab[usuario.id] === "basicos" ? "active" : ""
                }`}
                onClick={() =>
                  setActiveTab((prev) => ({ ...prev, [usuario.id]: "basicos" }))
                }
              >
                Básicos
              </button>
              <button
                className={`tab-btn ${
                  activeTab[usuario.id] === "personales" ? "active" : ""
                }`}
                onClick={() =>
                  setActiveTab((prev) => ({
                    ...prev,
                    [usuario.id]: "personales",
                  }))
                }
              >
                Datos Personales
              </button>
              <button
                className={`tab-btn ${
                  activeTab[usuario.id] === "fisicos" ? "active" : ""
                }`}
                onClick={() =>
                  setActiveTab((prev) => ({ ...prev, [usuario.id]: "fisicos" }))
                }
              >
                Datos Físicos
              </button>
            </div>

            {/* Contenido según pestaña activa */}
            <div className="contenido-tab">
              {activeTab[usuario.id] === "basicos" && (
                <div className="basicos-grid">
                  {/* Columna izquierda: imagen */}
                  <div className="col-imagen">
                    <div className="juego-box">
                      <img
                        src={
                          usuario.datosPersonales?.imagenPerfil ||
                          "/img/default-juego.png"
                        }
                        alt="Imagen de juego"
                        className="juego-imagen"
                      />
                    </div>
                  </div>

                  {/* Columna derecha: Plan y Estado */}
                  <div className="col-datos">
                    <div className="dato-linea">
                      <strong>Plan:</strong>{" "}
                      {usuario.datosPersonales?.plan?.nombrePlan || "—"}
                    </div>
                    <div className="dato-linea">
                      <strong>Estado:</strong> {usuario.estado}
                    </div>
                  </div>

                  {/* Fila inferior: Email y Nombre */}
                  <div className="fila-inferior">
                    <div className="dato-horizontal">
                      <strong>Email:</strong> <span>{usuario.email}</span>
                    </div>
                  </div>
                  <div className="fila-inferior-1">
                    <div className="dato-horizontal">
                      <strong>Nombre:</strong>{" "}
                      <span>
                        {usuario.datosPersonales?.nombre || "—"}{" "}
                        {usuario.datosPersonales?.apellido || "—"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab[usuario.id] === "personales" && (
                <>
                  <div className="dato-linea-personales">
                    <strong>Nombre:</strong>{" "}
                    <span>
                      {usuario.datosPersonales?.nombre || "—"}{" "}
                      {usuario.datosPersonales?.apellido || "—"}{" "}
                    </span>
                  </div>
                  <div className="dato-linea-personales">
                    <strong>DNI:</strong> {usuario.datosPersonales?.dni || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Teléfono:</strong>{" "}
                    {usuario.datosPersonales?.phone || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Género:</strong>{" "}
                    {usuario.datosPersonales?.genero || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Fecha Nacimiento:</strong>{" "}
                    {usuario.datosPersonales?.fNacimiento || "—"}
                  </div>
                </>
              )}

              {activeTab[usuario.id] === "fisicos" && (
                <>
                  <div className="dato-linea-personales">
                    <strong>Nombre:</strong>{" "}
                    <span>
                      {usuario.datosPersonales?.nombre || "—"}{" "}
                      {usuario.datosPersonales?.apellido || "—"}{" "}
                    </span>
                  </div>
                  <div className="dato-linea-personales">
                    <strong>DNI:</strong> {usuario.datosPersonales?.dni || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Teléfono:</strong>{" "}
                    {usuario.datosPersonales?.phone || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Género:</strong>{" "}
                    {usuario.datosPersonales?.genero || "—"}
                  </div>
                  <div className="dato-linea-personales">
                    <strong>Fecha Nacimiento:</strong>{" "}
                    {usuario.datosPersonales?.fNacimiento || "—"}
                  </div>
                </>
              )}
            </div>

            {/* Botones de acción */}
            <div className="acciones-card">
              <button
                className="btn-editar"
                onClick={() => handleEditar(usuario)}
              >
                {" "}
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={() => handleEliminarClick(usuario)}
              >
                {" "}
                Eliminar
              </button>
            </div>
          </div>
        ))}

      {/* Modal de edición de usuario */}
      {usuarioEditando && (
        <ModalEditarUsuario
          usuario={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onGuardar={handleGuardarCambios}
        />
      )}

      {/* Modal de decisión para confirmar eliminación */}
      {mostrarDecision && (
        <ModalDecision
          isOpen={mostrarDecision}
          title="Confirmar eliminación"
          message={`¿Querés eliminar a ${usuarioAEliminar.email}?`}
          borderClass="modal-error-border"
          onClose={() => setMostrarDecision(false)}
          onDecision={handleDecision}
        />
      )}

      {mostrarErrorAcceso && (
        <ModalDecision
          isOpen={mostrarErrorAcceso}
          title="Error de conexión"
          message="No se pudo acceder a los datos de usuarios. ¿Querés reintentar?"
          borderClass="modal-error-border"
          onClose={() => setMostrarErrorAcceso(false)}
          onDecision={(respuesta) => {
            setMostrarErrorAcceso(false);
            if (respuesta) obtenerUsuarios();
          }}
        />
      )}
    </div>
  );
};

export default TablaUsuarios;
