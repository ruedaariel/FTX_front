// front_react/ftxapp/src/components/pagoManualForm/pagoManualForm.jsx
import React, { useState, useEffect } from "react";
import FormField from "../form/formField";
import Button from "../form/button/button";
import { fetchGeneral } from "../componentsShare/utils/fetchGeneral";
import { useModal } from "../../context/ModalContext";

import "./pagoManualForm.css";
import PagosService from "../../services/pagoManualService";

const PagoManualForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    usuarioId: "",
    monto: "",
    diasAdicionales: "",
    metodoDePago: "",
    estado: "approved",
    fechaPago: new Date().toISOString().slice(0, 16),
    external_reference: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { showModal } = useModal(); // Modal global

  const metodoDePagoOptions = [
    { value: "efectivo", label: "Efectivo" },
    { value: "transferencia", label: "Transferencia Bancaria" },
  ];

  //  Efecto inicial para obtener usuarios al montar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // con map() hacemos listado de clientes para pasar al select
  const listaDeUsuarios = usuarios.map((usuario) => {
    // Verificamos si datosPersonales existe para evitar errores
    const nombre = usuario.datosPersonales
      ? usuario.datosPersonales.nombre
      : "Sin Nombre";
    const apellido = usuario.datosPersonales
      ? usuario.datosPersonales.apellido
      : "Sin Apellido";

    // Si queremos concatenar, usamos template literals (backticks `)
    const label = `${nombre} ${apellido} (ID: ${usuario.id})`;
    // const label = `${nombre} ${apellido}`;

    return {
      value: usuario.id,
      label: label,
    };
  });

  // console.log(listaDeUsuarios);

  //  Función para obtener usuarios desde el backend
  const obtenerUsuarios = () => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
      //mostrarModal, // solo muestra modal si hay error
      showModal, // para mostrar errores críticos
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.usuarioId ||
      isNaN(formData.usuarioId) ||
      formData.usuarioId <= 0
    ) {
      newErrors.usuarioId = "El ID del usuario debe ser un número válido";
    }

    if (
      !formData.monto ||
      isNaN(formData.monto) ||
      parseFloat(formData.monto) <= 0
    ) {
      newErrors.monto = "El monto debe ser un número positivo";
    }

    // Asignar valor por defecto si está vacío
    formData.diasAdicionales = formData.diasAdicionales || "5"; // Si está vacío, asignar "0"

    if (
      !formData.diasAdicionales ||
      isNaN(formData.diasAdicionales) ||
      parseInt(formData.diasAdicionales) <= 0
    ) {
      newErrors.diasAdicionales =
        "Los días adicionales deben ser un número positivo";
    }

    if (!formData.metodoDePago) {
      newErrors.metodoDePago = "El método de pago es requerido";
    }

    if (!formData.fechaPago) {
      newErrors.fechaPago = "La fecha de pago es requerida";
    }

    // if (!formData.external_reference.trim()) {
    //   newErrors.external_reference = "La referencia externa es requerida";
    // }

    // console.log("📋 Errores de validación:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      //  console.log("📤 entro a handleSubmit");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const dataToSend = {
        usuarioId: parseInt(formData.usuarioId),
        monto: parseFloat(formData.monto),
        diasAdicionales: parseInt(formData.diasAdicionales),
        metodoDePago: formData.metodoDePago,
        estado: formData.estado,
        fechaPago: formData.fechaPago,
        external_reference: formData.external_reference.trim(),
      };

      // console.log("📤 Enviando pago manual:", dataToSend);

      // ✨ Usar Axios - mucho más simple!
      const result = await PagosService.registrarPagoManual(dataToSend);

      // console.log("✅ Respuesta del servidor:", result);

      if (onSubmit) {
        onSubmit(result);
      }
    } catch (error) {
      console.error("❌ Error al procesar el pago:", error);
      // alert(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pago-manual-form">
      <div className="form-grid">
        {/* <FormField
          label="ID del Usuario"
          type="number"
          name="usuarioId"
          value={formData.usuarioId}
          onChange={handleInputChange}
          error={errors.usuarioId}
          placeholder="Ej: 1"
          required
        /> */}

          <FormField
          label="Nombre de Cliente"
          type="select"
          name="usuarioId"
          value={formData.usuarioId}
          onChange={handleInputChange}
          error={errors.usuarioId}
          options={listaDeUsuarios}
          placeholder="Selecciona un cliente"
          required
        />

        <FormField
          label="Monto"
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleInputChange}
          error={errors.monto}
          placeholder="Ej: 1500.50"
          step="0.01"
          required
        />

        {/* <FormField
          label="Días Adicionales"
          type="number"
          name="diasAdicionales"
          value={formData.diasAdicionales}
          onChange={handleInputChange}
          error={errors.diasAdicionales}
          placeholder="Ej: 30"
          required
        /> */}

        <FormField
          label="Método de Pago"
          type="select"
          name="metodoDePago"
          value={formData.metodoDePago}
          onChange={handleInputChange}
          error={errors.metodoDePago}
          options={metodoDePagoOptions}
          required
        />

        <FormField
          label="Fecha de Pago"
          type="datetime-local"
          name="fechaPago"
          value={formData.fechaPago}
          onChange={handleInputChange}
          error={errors.fechaPago}
          required
        />

        <FormField
          label="Referencia Externa"
          type="text"
          name="external_reference"
          value={formData.external_reference}
          onChange={handleInputChange}
          error={errors.external_reference}
          placeholder="Ej: pago-manual-001"
          // required
        />
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Cargar Pago
        </Button>
      </div>
    </form>
  );
};

export default PagoManualForm;
