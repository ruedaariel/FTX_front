import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import "./datosImagenSuscripcion.css";
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../../../context/ModalContext";
import { extraerMensajeError } from "../../../../../components/componentsShare/utils/extraerMensajeError";

const ImagenTab = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  // Estado para la imagen de perfil
  const [previewImagen, setPreviewImagen] = useState(
    watch("datosPersonales.imagenPerfil")
  );
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // Estado para los planes disponibles y el plan seleccionado
  const [planesDisponibles, setPlanesDisponibles] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState("");

  // Acceso al modal global
  const { showModal } = useModal();

  // Obtener el plan actual del formulario
  const plan = watch("datosPersonales.plan");
  const idPlanActual = watch("datosPersonales.plan.idPlan");

  // Buscar el plan actual en la lista de planes disponibles, o usar el que viene del backend
  const planActual =
    planesDisponibles.find((p) => p.idPlan === parseInt(idPlanActual)) || plan || {};

  // Cargar los planes disponibles desde el backend al montar el componente
  useEffect(() => {
    fetchGeneral({
      url: `${API_URL}/plan/all`,
      method: "GET",
      onSuccess: (data) => {
        setPlanesDisponibles(data);
      },
      showModal,
    });
  }, []);

  // Manejar el cambio de imagen de perfil
  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tiposPermitidos = ["image/jpeg", "image/png"];
    const tamañoMaximo = 5 * 1024 * 1024; // 5MB

    if (!tiposPermitidos.includes(file.type)) {
      showModal("Formato inválido. Solo se permiten imágenes JPG o PNG.", "error", 0, true);
      return;
    }

    if (file.size > tamañoMaximo) {
      showModal("La imagen excede el tamaño máximo de 5MB.", "error", 0, true);
      return;
    }

    // Si pasa la validación, se actualiza el preview y se guarda automáticamente
    setImagenSeleccionada(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImagen(previewURL);
    setValue("datosPersonales.imagenPerfil", previewURL);

    const idUsuario = watch("datosBasicos.idUsuario");

    const url = `${API_URL}/usuario/${idUsuario}/imagen-perfil`;
    const method = "PATCH";

    const formData = new FormData();
    formData.append("imagenPerfil", file);

    await fetchGeneral({
      url,
      method,
      body: formData,
      showModal,
      onSuccess: () => {
        showModal("Imagen actualizada correctamente", "success", 2000);
      },
      onError: (err) => {
        const mensaje = extraerMensajeError(err);
        console.error("Error al guardar Imagen:", mensaje);
      },
    });
  };

  return (
    <div className="imagen-tab">
      <div className="imagen-plan-precio">
        {/* Sección izquierda: imagen de perfil */}
        <div className="imagen-perfil-container">
          <h4 className="h4-cambiar-imagen">Cambiar Imagen</h4>
          <img src={previewImagen} alt="Perfil" className="imagen-perfil" />

          <div className="input-mensaje">
            <div className="fila-imagen-acciones">
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept=".jpg,.png"
                  onChange={handleImagenChange}
                />
                Seleccionar archivo
              </label>
              <p className="formato-imagen">
                Seleccionar imagen con formato JPG, PNG. Máx: 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Sección derecha: información del plan */}
        <div className="div-password">
          <div className="plan-precio">
            <div className="plan-descripcion">
              <h1>{planActual.nombrePlan}</h1>
              <p>
                <strong>Descripción:</strong> {planActual.descripcion}
              </p>
            </div>
            <div className="precio">
              <h1>${parseFloat(planActual.precio || 0).toLocaleString("es-AR")}</h1>
              <p>por mes</p>
            </div>
          </div>

          {/* Selector de nuevo plan */}
          <div className="selector-plan">
            <label className="label-selector-plan">Selecciona tu nuevo plan:</label>
            <select
              id="plan"
              className="dropdown-plan"
              value={planSeleccionado}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setPlanSeleccionado(id);

                const nuevoPlan = planesDisponibles.find((p) => p.idPlan === id);
                if (nuevoPlan) {
                  setValue("datosPersonales.plan", nuevoPlan);
                }
              }}
            >
              <option value="">-- Elegí un plan --</option>
              {planesDisponibles.map((plan) => (
                <option key={plan.idPlan} value={plan.idPlan}>
                  {`${plan.nombrePlan}  <->   $ ${parseFloat(plan.precio).toLocaleString("es-AR")}`}
                </option>
              ))}
            </select>

            {/* Detalle del plan seleccionado */}
            {planSeleccionado && (
              <div className="detalle-plan">
                {planesDisponibles
                  .filter((p) => p.idPlan === parseInt(planSeleccionado))
                  .map((p) => (
                    <div key={p.idPlan}>
                      <p className="planes-descripcion">
                        <strong>Descripción:</strong> {p.descripcion}
                      </p>
                      <p className="planes-descripcion">
                        <strong>Beneficios:</strong> {p.beneficios}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagenTab;

