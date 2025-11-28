import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
import DatosPersonalesTab from "../../usuario/usuarioPerfil/components/datospersonales/datosPersonales.jsx";
import DatosFisicosTab from "../../usuario/usuarioPerfil/components/datosfisicos/datosFisicos.jsx";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import { useModal } from "../../../context/ModalContext.jsx";
import { useNavigate } from "react-router-dom";
import "./RegistroUsuario.css";

function RegistroUsuario() {
  const [activeStep, setActiveStep] = useState("plan");
  const [planesDisponibles, setPlanesDisponibles] = useState([]);
  const { showModal } = useModal();
  const navigate = useNavigate();

  const methods = useForm({ mode: "onBlur" });
  const {
    register,
    trigger,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/plan/all",
      method: "GET",
      onSuccess: (data) => setPlanesDisponibles(data),
      showModal,
    });
  }, []);

  const avanzarPaso = async (destino) => {
    let camposAValidar = [];

    if (activeStep === "plan") {
      camposAValidar = ["datosPersonales.idPlan"];
    } else if (activeStep === "personales") {
      camposAValidar = [
        "datosPersonales.nombre",
        "datosPersonales.apellido",
        "datosPersonales.dni",
        "datosBasicos.email",
        "datosPersonales.phone",
        "datosPersonales.fNacimiento",
        "datosPersonales.genero",
      ];
    } else if (activeStep === "fisicos") {
      camposAValidar = [
        "datosFisicos.peso",
        "datosFisicos.estatura",
        "datosFisicos.actividadDiaria",
        "datosFisicos.metas",
        "datosFisicos.observaciones",
      ];
    }

    const valido = await trigger(camposAValidar);

    if (valido) {
      setActiveStep(destino);
    } else {
      showModal("Completa los campos obligatorios antes de continuar", "error", 2000);
    }
  };

  const handleValidarFisicosYRegistrar = async () => {
    const camposFisicos = [
      "datosFisicos.peso",
      "datosFisicos.estatura",
      "datosFisicos.actividadDiaria",
      "datosFisicos.metas",
      "datosFisicos.observaciones",
    ];

    const valido = await trigger(camposFisicos);
    if (valido) {
      handleRegistro();
    } else {
      showModal("Completa los campos obligatorios antes de crear tu cuenta", "error", 2500);
    }
  };

  const handleRegistro = async () => {
    const datos = getValues();

    const payload = {
      datosBasicos: {
        email: datos.datosBasicos.email,
        rol: "usuario",
      },
      datosPersonales: {
        ...datos.datosPersonales,
        idPlan: parseInt(datos.datosPersonales.idPlan),
      },
      datosFisicos: datos.datosFisicos,
    };

    console.log("payload", payload);

    await fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/register",
      method: "POST",
      body: payload,
      showModal,
      onSuccess: () => {
        showModal(
          "¡Felicitaciones!  por dar este primer paso. \n \n Recibirás instrucciones en tu correo",
          "success",
          2000
        );
        navigate("/login"); // se redirige al login después del registro
      },
    });
  };

  return (
    <div className="container">
      <HeaderCrud title="Registro de Usuario" widthPercent={100} />
      <div className="registro-progreso">
        <div className={`paso ${activeStep === "plan" ? "activo" : ""}`}>1. Plan</div>
        <div className={`paso ${activeStep === "personales" ? "activo" : ""}`}>2. Personales</div>
        <div className={`paso ${activeStep === "fisicos" ? "activo" : ""}`}>3. Físicos</div>
      </div>

      <FormProvider {...methods}>
        <form
          className="registro-usuario-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const valido = await trigger();
            if (valido) {
              handleRegistro();
            } else {
              showModal("Completa todos los campos obligatorios antes de crear tu cuenta", "error", 2500);
            }
          }}
        >
          <div className="registro-tabs">
            <button
              type="button"
              className={`tab-base ${activeStep === "plan" ? "tab-activa" : ""}`}
              onClick={() => avanzarPaso("plan")}
            >
              Selección de Plan
            </button>
            <button
              type="button"
              className={`tab-base ${activeStep === "personales" ? "tab-activa" : ""}`}
              onClick={() => avanzarPaso("personales")}
            >
              Datos Personales
            </button>
            <button
              type="button"
              className={`tab-base ${activeStep === "fisicos" ? "tab-activa" : ""}`}
              onClick={() => avanzarPaso("fisicos")}
            >
              Datos Físicos
            </button>
          </div>

          <div className="registro-tab-contenido">
            {activeStep === "plan" && (
              <div className="fila-plan">
                <div className="campo-select-plan">
                  <label className="label-selector-planes-registro">Selecciona tu plan</label>
                  <select {...register("datosPersonales.idPlan", { required: true })}>
                    <option value="">- Elegir un plan -</option>
                    {planesDisponibles.map((plan) => (
                      <option key={plan.idPlan} value={plan.idPlan}>
                        {plan.nombrePlan} - ${plan.precio} / mes
                      </option>
                    ))}
                  </select>
                </div>
                <div className="boton-ver-detalles">
                  <button type="button" onClick={() => navigate("/admin/planes")}>
                    Ver detalles de planes
                  </button>
                </div>
              </div>
            )}

            {activeStep === "personales" && <DatosPersonalesTab />}
            {activeStep === "fisicos" && <DatosFisicosTab />}
          </div>

          <div className="boton-guardar-registro">
            {activeStep === "fisicos" ? (
              <button type="button" className="btn-guardar-registro" onClick={handleValidarFisicosYRegistrar}>
                Crear cuenta
              </button>
            ) : (
              <button
                type="button"
                className="btn-guardar-registro"
                onClick={() => avanzarPaso(activeStep === "plan" ? "personales" : "fisicos")}
              >
                Siguiente
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default RegistroUsuario;


