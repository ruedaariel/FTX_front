import { createContext, useContext, useState } from "react";
import ModalInfoTemporizado from "../components/componentsShare/Modal/ModalInfoTemporizado.jsx";
import ModalError from "../components/componentsShare/Modal/modalError/ModalError.jsx";
import ModalDecision from "../components/componentsShare/Modal/ModalDecision.jsx";

/**
 * Contexto para mostrar modales informativos, de éxito, de error o de decisión.
 * 
 *  ¿Cómo usar `showModal` en cualquier componente?
 * 
 * 1. Envolvé tu aplicación con <ModalProvider> en App.jsx:
 * 
 *    <ModalProvider>
 *      <App />
 *    </ModalProvider>
 * 
 * 2. Usá el hook `useModal()` donde necesites mostrar un mensaje:
 * 
 *    import { useModal } from "./context/ModalContext";
 * 
 *    const { showModal } = useModal();
 * 
 *    showModal("Mensaje a mostrar", "info" | "success" | "error" | "decision", duraciónEnMs, persistente, callback);
 * 
 *    Ejemplo:
 *    showModal("Guardado exitoso", "success", 3000); // temporizado
 *    showModal("Error al guardar", "error", 0, true); // persistente
 * 
 *     **mostrar modal para tomar decisión**
 *    const handleDelete = () => {
 *      showModal(
 *        "¿Estás seguro que querés eliminar este ítem?",
 *        "decision",
 *        0,
 *        true,
 *        (respuesta) => {
 *          if (respuesta) {
 *            **Acción si el usuario confirma**
 *            eliminarItem();
 *          } else {
 *            **Acción si cancela**
 *            console.log("Cancelado");
 *          }
 *        }
 *      );
 *    };
 * 
 * 3. El modal se cierra automáticamente si no es persistente, o manualmente con `closeModal()`.
 */

// Crear el contexto
const ModalContext = createContext();

// Hook personalizado para acceder al contexto
export const useModal = () => useContext(ModalContext);

// Proveedor que gestiona el estado del modal y lo renderiza
export const ModalProvider = ({ children }) => {
  // Estado del modal
  const [visible, setVisible] = useState(false);       // Si el modal está visible
  const [message, setMessage] = useState("");           // Mensaje a mostrar
  const [duration, setDuration] = useState(3000);       // Duración en ms (solo si no es persistente)
  const [type, setType] = useState("info");             // Tipo de modal: "info", "success", "error", "decision"
  const [persistente, setPersistente] = useState(false); // Si el modal debe permanecer abierto
  const [onDecisionCallback, setOnDecisionCallback] = useState(null); // Callback para decisiones

  /**
 * Muestra el modal con contenido personalizado.
 * 
 * @param {string} msg - Mensaje a mostrar
 * @param {string} variant - Tipo de modal: "info", "success", "error", "decision"
 * @param {number} ms - Duración en milisegundos (solo si no es persistente y no es de tipo "decision")
 * @param {boolean} persist - Si el modal debe permanecer abierto hasta que se cierre manualmente
 * @param {function} decisionCallback - Callback para decisiones (solo si variant === "decision")
 */
const showModal = (
  msg,
  variant = "info",
  ms = 3000,
  persist = false,
  decisionCallback = null
) => {
  setMessage(msg);
  setType(variant);
  setDuration(ms);
  setOnDecisionCallback(() => decisionCallback);

  // Forzar persistencia si el tipo es "decision"
  const esDecision = variant === "decision";
  setPersistente(esDecision ? true : persist);

  setVisible(true);

  // Solo cerrar automáticamente si no es persistente y no es de tipo "decision"
  if (!persist && !esDecision) {
    setTimeout(() => setVisible(false), ms);
  }
};

  /**
   * Cierra el modal manualmente.
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * Renderiza el modal según el tipo y persistencia.
   */
const renderModal = () => {
  if (!visible) return null;

  // console.log("Renderizando modal tipo:", type, "visible:", visible);


  switch (type) {
    case "error":
      if (persistente) {
        return (
          <ModalError
            isOpen={visible}
            title="Se ha producido un Error"
            message={message}
            onClose={closeModal}
            borderClass="modal-error-border"
          />
        );
      }
      break;

    case "decision":
      return (
        <ModalDecision
          isOpen={visible}
          title="Confirmar"
          message={message}
          borderClass="modal-info-border"
          onClose={closeModal}
          onDecision={(value) => {
            if (onDecisionCallback) onDecisionCallback(value);
            closeModal();
          }}
        />
      );

    case "info":
    case "success":

    default:

      if(duration > 0 && !persistente) {

      return (
        <ModalInfoTemporizado
          isOpen={visible}
          message={message}
          title={type === "info" ? "Información" : "Operacion exitosa"}
          type={type}
          borderClass={
            type === "info" ? "modal-info-border" : "modal-success-border"
          }
          onClose={closeModal}
          autoCloseMs={duration}
        />
      );
    } else {

      return (
        <ModalError
          isOpen={visible}
          message={message}
          title={type === "info" ? "Información" : "Operacion exitosa"}
          type={type}
          borderClass={
            type === "info" ? "modal-info-border" : "modal-success-border"
          }
          onClose={closeModal}
          autoCloseMs={duration}
        />
      );

    }
  }
  return null;
};


  // Proveer funciones y renderizar el modal
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

