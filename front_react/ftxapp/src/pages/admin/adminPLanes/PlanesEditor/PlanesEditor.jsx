import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./PlanesEditor.css";
import { useModal } from "../../../../context/ModalContext";
import { PlanService } from "../../../../services/planService";
import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";

const PlanesEditor = ({ planes, actualizarPlanes }) => {
  const [idEditando, setIdEditando] = useState(null);
  const { showModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditar = (plan) => {
    setIdEditando(plan.idPlan);
    reset(plan);
  };

  const handleCancelar = () => {
    setIdEditando(null);
    reset();
  };

  function transformarPlan(planOriginal) {
    return {
      nombrePlan: planOriginal.nombrePlan,
      precio: planOriginal.precio,
      descripcion: planOriginal.descripcion || "Descripción por defecto",
      beneficios: planOriginal.beneficios || "Beneficios por defecto",
    };
  }

  const onSubmit = async (data) => {
    const planTransformado = transformarPlan(data);

  await fetchGeneral({
    url: `${API_URL}/plan/update/${data.idPlan}`,
    method: "PATCH",
    body: planTransformado,
    onSuccess: () => {
      showModal("Plan actualizado correctamente", "success", 2000);
    },
    showModal,
  });

  actualizarPlanes(data);
  setIdEditando(null);
  };

  return (
    <div className="cards-grid-planes">
      {planes.map((plan) => (
        <div key={plan.idPlan} className="card-planes">
          {idEditando === plan.idPlan ? (
            <form onSubmit={handleSubmit(onSubmit)} className="form-embebida">
              <div className="card-header-planes">
                <span>ID: {plan.idPlan}</span>
                <div className="header-botones-planes">
                  <button type="submit" className="btn-guardar-planes">Guardar</button>
                  <button type="button" className="btn-cancelar-planes" onClick={handleCancelar}>Cancelar</button>
                </div>
              </div>

              <label>Nombre del Plan</label>
              <input
                {...register("nombrePlan", {
                  required: "Campo obligatorio",
                  maxLength: { value: 30, message: "Máximo 30 caracteres" },
                })}
              />
              {errors.nombrePlan && <span className="error">{errors.nombrePlan.message}</span>}

              <label>Precio</label>
              <input
                type="number"
                step="0.01"
                {...register("precio", {
                  required: "Campo obligatorio",
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  max: { value: 2000000, message: "Máximo permitido: 2.000.000" },
                })}
              />
              {errors.precio && <span className="error">{errors.precio.message}</span>}

              <label>Descripción Detallada</label>
              <textarea
                {...register("descripcion", {
                  required: "Campo obligatorio",
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
              />
              {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}

              <label>Beneficios del Plan</label>
              <textarea
                {...register("beneficios", {
                  required: "Campo obligatorio",
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
              />
              {errors.beneficios && <span className="error">{errors.beneficios.message}</span>}

              <input type="hidden" {...register("idPlan")} />
            </form>
          ) : (
            <>
              <div className="card-header-planes">
                <span>ID: {plan.idPlan}</span>
                <button onClick={() => handleEditar(plan)} className="btn-editar-planes">Editar</button>
              </div>

              <div className="nombre-planes">
                <h3>{plan.nombrePlan}</h3>
                <p className="precio">$ {parseFloat(plan.precio).toLocaleString("es-AR")}</p>
              </div>

              <div className="descripcion-planes">
                <p className="p-descripcio-beneficios-planes"><strong>Descripción:</strong></p>
                <p>{plan.descripcion}</p>
              </div>

              <div className="beneficios-planes">
                <p className="p-descripcio-beneficios-planes"><strong>Beneficios:</strong></p>
                {plan.beneficios}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanesEditor;
