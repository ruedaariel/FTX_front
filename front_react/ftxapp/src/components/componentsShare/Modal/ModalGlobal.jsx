// src/componentsShare/Modal/ModalGlobal.jsx
import { useModal } from "../../../context/ModalContext";
import ModalInfoTemporizado from "./ModalInfoTemporizado";
import '../Modal/modalError/ModalError.css'; // Usá tus estilos existentes

const ModalGlobal = () => {
  const { visible, message, duration,type } = useModal();

  const borderClassMap = {
  info: "modal-info-border",
  error: "modal-error-border",
  success: "modal-success-border",
};


  return (
    visible && (
      <ModalInfoTemporizado
        isOpen={visible}
        title="Información"
        message={message}
        onClose={() => {}}
        autoCloseMs={duration}
        borderClass={borderClassMap[type] || "modal-info-border"}

      />
    )
  );
};

export default ModalGlobal;
