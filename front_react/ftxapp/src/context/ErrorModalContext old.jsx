import React, { createContext, useContext, useState } from "react";
import ModalError from "../componentsShare/Modal/ModalError.jsx";

/**
 * Contexto para manejar el modal de error global.
 * 
 *  ¿Cómo usarlo en cualquier componente?
 * 
 * 1. Envolvé tu aplicación con <ErrorModalProvider> en App.jsx:
 * 
 *    <ErrorModalProvider>
 *      <App />
 *    </ErrorModalProvider>
 * 
 * 2. Usá el hook `useErrorModal()` donde necesites mostrar un error:
 * 
 *    import { useErrorModal } from "./context/ErrorModalContext";
 * 
 *    const { showErrorModal } = useErrorModal();
 * 
 *    showErrorModal("Título del error", "Mensaje descriptivo", "clase-css-opcional");
 * 
 * 3. El modal se cierra automáticamente con el botón "Cerrar", o podés usar `closeErrorModal()`.
 */

// Crear el contexto
const ErrorModalContext = createContext();

// Hook personalizado para acceder al contexto
export const useErrorModal = () => useContext(ErrorModalContext);

// Proveedor que gestiona el estado del modal y lo renderiza
export const ErrorModalProvider = ({ children }) => {
  // Estado del modal
  const [modalState, setModalState] = useState({
    isOpen: false,       // Si el modal está visible
    title: "",           // Título del modal
    message: "",         // Mensaje del modal
    borderClass: "",     // Clase CSS opcional para estilizar el borde
  });

  /**
   * Muestra el modal de error con contenido personalizado.
   * 
   * @param {string} title - Título del modal
   * @param {string} message - Mensaje descriptivo
   * @param {string} borderClass - Clase CSS opcional para el borde
   */
  const showErrorModal = (title, message, borderClass = "") => {
    setModalState({ isOpen: true, title, message, borderClass });
  };

  /**
   * Cierra el modal de error.
   */
  const closeErrorModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, closeErrorModal }}>
      {children}
      <ModalError
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        borderClass={modalState.borderClass}
        onClose={closeErrorModal}
      />
    </ErrorModalContext.Provider>
  );
};

