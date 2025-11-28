// Importación de React y hooks necesarios
import React, { Fragment, useEffect, useState } from "react";

// Estilos específicos del componente y colores globales
import "./listaUsuarios.css";
import "./colores.css";

import ContenedorCards from "./ContenedorCards";
import ModalInfoTemporizado from "../Modal/ModalInfoTemporizado";


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

  const [modalExito, setModalExito] = useState(false);

  //setea configuracion del modal de informacion reutilizable
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    borderClass: "",
    autoCloseMs: null,
  });

  // Efecto que se ejecuta al montar el componente para obtener los usuarios
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // funcion que maneja la informacion del modal info reutilizable
  const mostrarModal = ({ title, message, borderClass, autoCloseMs }) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      borderClass,
      autoCloseMs,
    });

    if (autoCloseMs) {
      setTimeout(() => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      }, autoCloseMs);
    }
  };

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

  // Efecto para inicializar activeTab para cada usuario filtrado
  useEffect(() => {
    setActiveTab((prevTabs) => {
      const nuevosTabs = { ...prevTabs };
      let cambio = false;

      usuariosFiltrados.forEach((usuario) => {
        if (!nuevosTabs[usuario.id]) {
          nuevosTabs[usuario.id] = "basicos";
          cambio = true;
        }
      });

      return cambio ? nuevosTabs : prevTabs;
    });
  }, [usuariosFiltrados]);

  // Función para obtener los usuarios del backend
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

  // Función que se ejecuta al guardar los cambios desde el modal de edición
  const handleGuardarCambios = async (datosActualizados) => {
    try {
      const response = await fetch(
        `${API_URL}/usuario/update-basico/${usuarioEditando.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosActualizados),
        }
      );

      console.log("Respuesta del servidor:", response);
      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status}`);
      }

      await response.json();
      setModalExito(true); //  mostrar el modal con info de la transaccion
    } catch (error) {
      mostrarModal({
        title: "Fallo al guardar",
        message: error.message,
        borderClass: "modal-error-border",
        autoCloseMs: 3000,
      });
    }

    setUsuarioEditando(null); // Cerrar el modal
    obtenerUsuarios(); //  Refrescar datos desde el backend
    // abremodal de exito
    mostrarModal({
      title: "Cambios guardados",
      message: "El usuario fue actualizado correctamente.",
      borderClass: "modal-success-border",
      autoCloseMs: 2000,
    });
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
      mostrarModal({
        title: "Fallo al guardar",
        message: error.message,
        borderClass: "modal-error-border",
        autoCloseMs: 3000,
      });
    } finally {
      setUsuarioAEliminar(null); // Limpiar el estado
    }
  };

  // Renderizado condicional mientras se cargan los datos
  //if (loading) return <p>Cargando usuarios...</p>;

  // Renderizado principal del componente
  return (
    <>
      <ContenedorCards
        usuariosFiltrados={usuariosFiltrados}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleEditar={handleEditar}
        handleEliminarClick={handleEliminarClick}
        usuarioEditando={usuarioEditando}
        setUsuarioEditando={setUsuarioEditando}
        handleGuardarCambios={handleGuardarCambios}
        mostrarDecision={mostrarDecision}
        setMostrarDecision={setMostrarDecision}
        usuarioAEliminar={usuarioAEliminar}
        handleDecision={handleDecision}
        mostrarErrorAcceso={mostrarErrorAcceso}
        setMostrarErrorAcceso={setMostrarErrorAcceso}
        obtenerUsuarios={obtenerUsuarios}
      />

      <ModalInfoTemporizado
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        borderClass={modalConfig.borderClass}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        autoCloseMs={modalConfig.autoCloseMs}
      />
    </>
  );
};

export default TablaUsuarios;
