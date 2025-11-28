//  Importación de React y hooks necesarios
import React, { useEffect, useState } from "react";

//  Función genérica para llamadas al backend
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral";
// Contexto de modal
import { useModal } from "../../../../../context/ModalContext";
import API_URL from "../../../../../config/api";

//  Estilos específicos del componente y colores globales
import "./listaUsuarios.css";
//import "../../../../colores.css";

//  Componentes hijos
import ContenedorCards from "../contenedorCards/ContenedorCards";
// import ModalInfoTemporizado from "../../../../../components/componentsShare/Modal/ModalInfoTemporizado";

//  Componente principal que muestra la lista de usuarios
const TablaUsuarios = ({ estadoFiltro, filtrosAvanzados }) => {
  //  Estados de datos
  const [usuarios, setUsuarios] = useState([]);
  const [activeTab, setActiveTab] = useState({});

  //  Estados de carga y error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarErrorAcceso, setMostrarErrorAcceso] = useState(false);

  //  Estados de edición y eliminación
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [mostrarDecision, setMostrarDecision] = useState(false);

  //  Estado para modal de éxito (no usado directamente)
  const [modalExito, setModalExito] = useState(false);
  const { showModal } = useModal(); // Modal global

  //  Estado para modal de información reutilizable
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    borderClass: "",
    autoCloseMs: null,
  });

  //  Efecto inicial para obtener usuarios al montar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // //  Función para mostrar el modal informativo con cierre automático
  // const mostrarModal = ({ title, message, borderClass, autoCloseMs }) => {
  //   setModalConfig({ isOpen: true, title, message, borderClass, autoCloseMs });

  //   if (autoCloseMs) {
  //     setTimeout(() => {
  //       setModalConfig((prev) => ({ ...prev, isOpen: false }));
  //     }, autoCloseMs);
  //   }
  // };

  //  Filtro avanzado aplicado sobre la lista de usuarios
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideEstado =
      estadoFiltro === "todos" || usuario.estado.toLowerCase() === estadoFiltro;

    const coincideEmail =
      !filtrosAvanzados.email ||
      usuario.email
        .toLowerCase()
        .includes(filtrosAvanzados.email.toLowerCase());

    const coincideApellido =
      !filtrosAvanzados.apellido ||
      usuario.datosPersonales?.apellido
        ?.toLowerCase()
        .includes(filtrosAvanzados.apellido.toLowerCase());

    const coincideDni =
      !filtrosAvanzados.dni ||
      usuario.datosPersonales?.dni
        ?.toLowerCase()
        .includes(filtrosAvanzados.dni);    

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
      coincideDni &&
      coincideEstadoAvanzado
    );
  });

  //  Efecto para inicializar pestañas activas por usuario
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

  //  Función para obtener usuarios desde el backend
  const obtenerUsuarios = () => {
    fetchGeneral({
      url: `${API_URL}/usuario/all`,
      method: "GET",
      setLoading,
      setError,
      setMostrarErrorAcceso,
      onSuccess: (data) => setUsuarios(data),
      //mostrarModal, // solo muestra modal si hay error
      showModal, // para mostrar errores críticos
    });
  };

  //  Función para iniciar edición de usuario
  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
  };

  //  Función para guardar cambios del usuario editado
  const handleGuardarCambios = (datosActualizados) => {
    fetchGeneral({
      url: `${API_URL}/usuario/update-basico/${usuarioEditando.id}`,
      method: "PATCH",
      body: datosActualizados,
      setLoading,
      setError,
      onSuccess: () => {
        obtenerUsuarios(); // refrescar lista
        setUsuarioEditando(null); // cerrar modal
      },
      //mostrarModal, // muestra modal de éxito por 2 segundos
      showModal,
    });
  };

  //  Función para iniciar eliminación de usuario
  /* const handleEliminarClick = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarDecision(true);
  }; */

  //  Función que maneja la decisión del modal de confirmación
  /* const handleDecision = (respuesta) => {
    setMostrarDecision(false);
    if (!respuesta || !usuarioAEliminar) return;

    eliminarUsuario(
      usuarioAEliminar.id,
      usuarioAEliminar.datosPersonales?.nombre || "—",
      usuarioAEliminar.datosPersonales?.apellido || "—"
    );

    setUsuarioAEliminar(null);
  }; */

  // funcion con showmodal para preguntar si se elimia usuario

  // Función para iniciar eliminación de usuario
  const handleEliminarClick = (usuario) => {
    setUsuarioAEliminar(usuario);

    /* showModal("¿Confirmás la acción?", "decision", 0, true, (respuesta) => {
  console.log("Respuesta del usuario:", respuesta);
}); */

    showModal(
      `¿Estás seguro que querés eliminar a ${
        usuario.datosPersonales?.nombre || "—"
      } ${usuario.datosPersonales?.apellido || "—"}?`,
      "decision",
      0,
      true,
      (respuesta) => {
        if (!respuesta) return;

        eliminarUsuario(
          usuario.id,
          usuario.datosPersonales?.nombre || "—",
          usuario.datosPersonales?.apellido || "—"
        );

        setUsuarioAEliminar(null);
      }
    );
  };

  //  Función que elimina el usuario y muestra feedback
  const eliminarUsuario = (id, nombre, apellido) => {
    fetchGeneral({
      url: `${API_URL}/usuario/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        obtenerUsuarios();

        showModal(`El usuario "${nombre} ${apellido}" ha sido eliminado correctamente.`, "success", 2000);

        /* mostrarModal({
          title: "Usuario eliminado",
          message: `El usuario "${nombre} ${apellido}" ha sido eliminado correctamente.`,
          borderClass: "modal-success-border",
          autoCloseMs: 2000,
        }); */
      },
      //mostrarModal,
    });
  };

  //  Renderizado principal del componente
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
        //mostrarDecision={mostrarDecision}
        //setMostrarDecision={setMostrarDecision}
        usuarioAEliminar={usuarioAEliminar}
        //handleDecision={handleDecision}
        mostrarErrorAcceso={mostrarErrorAcceso}
        setMostrarErrorAcceso={setMostrarErrorAcceso}
        obtenerUsuarios={obtenerUsuarios}
      />

      {/* <ModalInfoTemporizado
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        borderClass={modalConfig.borderClass}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        autoCloseMs={modalConfig.autoCloseMs}
      /> */}
    </>
  );
};

export default TablaUsuarios;
