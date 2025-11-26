import React, { useEffect, useRef, useState } from "react";
import "./ModalEditarUsuario.css";
import CardUsuarioEditable from "../cardUsuarioEditable/CardUsuarioEditable";


function ModalEditarUsuario({ usuario, onClose, onGuardar }) {
  const modalRef = useRef(null);
  // const [formData, setFormData] = useState({usuario});
  const [activeTab, setActiveTab] = useState({ [usuario.id]: "basicos" });

  const [formData, setFormData] = useState({
  email: usuario.email || "",
  emailConfirmacion: usuario.email || "",
  // otros campos...
});


// console.log("Renderizando ModalEditarUsuario con datos:", formData)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.nombre || !formData.apellido) {
      alert("Por favor completá los campos obligatorios.");
      return;
    }
    onGuardar(formData);
  };

  // console.log("Renderizando ModalEditarUsuario con datos:", formData);

  return (
    <div className="modal-overlay-editar">
  <div className="modal-overlay-editar">
  <div className="modal-contenido-editar" ref={modalRef}>
    <CardUsuarioEditable
      usuario={usuario}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onGuardar={(datosActualizados) => {
        onGuardar(datosActualizados);
        onClose();
      }}
      handleEliminarClick={() => {
        // Si querés permitir eliminar desde el modal
        alert("Eliminar desde el modal no está habilitado.");
      }}
    />
    <div className="modal-botones-editar">
      <button type="button" className="btn-cerrar-modal-editar" onClick={onClose}>Cerrar</button>
    </div>
  </div>
</div>
</div>

  );
}

export default ModalEditarUsuario;
