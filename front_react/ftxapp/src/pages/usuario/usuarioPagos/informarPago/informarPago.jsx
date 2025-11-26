import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useModal } from "../../../../context/ModalContext";
import HeaderCrud from "../../../../components/componentsShare/header/HeaderCrud";
import "./informarPago.css"; // Asegurate de crear este archivo

const informarPago = () => {
  const { showModal } = useModal();
  const location = useLocation();
  const usuario = location.state?.usuario;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [comprobantePreview, setComprobantePreview] = useState(null);

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    showModal("Formulario enviado correctamente");
    // Aquí podrías enviar los datos al backend con fetch o axios
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComprobantePreview(URL.createObjectURL(file));
    } else {
      setComprobantePreview(null);
    }
  };

  return (
    <div className="container">
      <HeaderCrud title="Informar Pago" widthPercent={100} MostrarCerrarSesion={false} />

      <div className="pago-layout">
        {/* Formulario */}
        <form className="formulario-pago" onSubmit={handleSubmit(onSubmit)}>
          {/* <h3>Registrar Pago</h3> */}

          <div className="campo-form">
            <label>Usuario</label>
            <input type="text" value={`${usuario?.datosPersonales?.nombre} ${usuario?.datosPersonales?.apellido}`} disabled />
          </div>

          <div className="campo-form">
            <label>Fecha</label>
            <input
              type="date"
              {...register("fecha", { required: "La fecha es obligatoria" })}
            />
            {errors.fecha && <span className="error">{errors.fecha.message}</span>}
          </div>

          <div className="campo-form">
            <label>Monto</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ej: 1500.00"
              {...register("monto", {
                required: "El monto es obligatorio",
                min: { value: 1, message: "Debe ser mayor a 0" },
              })}
            />
            {errors.monto && <span className="error">{errors.monto.message}</span>}
          </div>

          <div className="campo-form">
            <label>Tipo de Pago</label>
            <select {...register("tipoPago", { required: true })}>
              <option value="Transferencia">Transferencia Bancaria</option>
              {/* <option value="Efectivo">Efectivo</option> */}
              <option value="MercadoPago">MercadoPago</option>
            </select>
          </div>

          <div className="campo-form">
            {/* <div className="fila-imagen-acciones"> */}
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept=".jpg,.png"
                  onChange={handleFileChange}
                />
                Seleccionar comprobante
              </label>
                       <p className="formato-imagen">
              Seleccionar imagen con formato JPG, PNG. Máx: 5MB
            </p>     
            </div>
            {errors.comprobante && (
              <span className="error">{errors.comprobante.message}</span>
            )}
          {/* </div> */}

          <button className="btn-guardar-pago" type="submit">Guardar Pago</button>
        </form>

        {/* Preview del comprobante */}
        <div className="preview-comprobante">
          <h4>Vista previa del comprobante</h4>
          {comprobantePreview ? (
            <iframe src={comprobantePreview} title="Comprobante" className="preview-frame" />
          ) : (
            <p>No se ha seleccionado ningún archivo</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default informarPago;

