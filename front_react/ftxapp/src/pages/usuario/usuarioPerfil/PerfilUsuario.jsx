// Importación de React y hooks
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Estilos específicos para esta vista
import "./perfilUsuario.css";

// Hook de formularios
import { useForm, FormProvider } from "react-hook-form";

// Componentes reutilizables
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";

// Secciones del perfil
import ImagenTab from "./components/imagensuscripcion/imagenTab.jsx";
import DatosPersonalesTab from "./components/datospersonales/datosPersonales.jsx";
import DatosFisicosTab from "./components/datosfisicos/datosFisicos";
import SeguridadTab from "./components/seguridad/seguridadTab.jsx";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import { useModal } from "../../../context/ModalContext.jsx";
import API_URL from "../../../config/api.js";

// Helpers para transformación y comparación de datos
import {
  normalizarFecha,
  formatearFechaParaBackend,
  normalizarFechaParaBackend,
  mapearFormularioParaBackend,
  extraerCambios
} from "./utils/perfilUtils.js";

function PerfilUsuario() {
  const [activeTab, setActiveTab] = useState("imagen");
  const { showModal } = useModal();
  const location = useLocation();
  const usuario = location.state?.usuario;

  console.log("usuario", usuario);

  const methods = useForm({
    defaultValues: {
      datosBasicos: {
        idUsuario: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
        password: "",
      },
      datosPersonales: {
        ...usuario.datosPersonales,
        fNacimiento: normalizarFecha(usuario.datosPersonales.fNacimiento),
      },
      datosFisicos: {
        ...usuario.datosFisicos,
      },
    },
    mode: "onBlur",
  });

  const { getValues, handleSubmit } = methods;

  // Datos originales para comparar cambios
  const original = {
    datosBasicos: {
      idUsuario: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado,
      password: "",
    },
    datosPersonales: {
      ...usuario.datosPersonales,
      idPlan: usuario.datosPersonales.plan?.idPlan || null,
      fNacimiento: usuario.datosPersonales.fNacimiento,
    },
    datosFisicos: usuario.datosFisicos,
  };

  const handleGuardarPerfil = async (data) => {
    const datosTransformados = mapearFormularioParaBackend(data);
    const cambios = extraerCambios(original, datosTransformados);

    console.log("cambios-----", cambios);

    if (cambios.datosPersonales?.fNacimiento) {
      cambios.datosPersonales.fNacimiento = normalizarFechaParaBackend(
        cambios.datosPersonales.fNacimiento
      );
    }

    console.log("cambios despues de normalizar fecha", cambios);

    await fetchGeneral({
      url: `${API_URL}/usuario/update/${usuario.id}`,
      method: "PATCH",
      body: cambios,
      showModal,
      onSuccess: () => {
        showModal("Perfil actualizado correctamente", "success", 2000, true);
      },
    });
  };

  return (
    <div className="container">
      <HeaderCrud
        title={`${getValues("datosPersonales.nombre")}, esta es tu página de perfil`}
        widthPercent={100}
      />

      <FormProvider {...methods}>
        <form
          className="perfil-usuario-container"
          onSubmit={handleSubmit(handleGuardarPerfil)}
        >
          {/* Navegación por pestañas */}
          <div className="perfil-usuario-header">
            <div className="perfil-tabs">
              <button
                type="button"
                className={`tab-base ${activeTab === "imagen" ? "tab-activa sin-borde-inferior" : ""}`}
                onClick={() => setActiveTab("imagen")}
              >
                Imagen y Suscripción
              </button>
              <button
                type="button"
                className={`tab-base ${activeTab === "personales" ? "tab-activa sin-borde-inferior" : ""}`}
                onClick={() => setActiveTab("personales")}
              >
                Datos Personales
              </button>
              <button
                type="button"
                className={`tab-base ${activeTab === "fisicos" ? "tab-activa sin-borde-inferior" : ""}`}
                onClick={() => setActiveTab("fisicos")}
              >
                Datos Físicos
              </button>
              <button
                type="button"
                className={`tab-base ${activeTab === "seguridad" ? "tab-activa sin-borde-inferior" : ""}`}
                onClick={() => setActiveTab("seguridad")}
              >
                Seguridad
              </button>
            </div>
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="perfil-tab-contenido">
            {activeTab === "imagen" && <ImagenTab />}
            {activeTab === "personales" && <DatosPersonalesTab />}
            {activeTab === "fisicos" && <DatosFisicosTab />}
            {activeTab === "seguridad" && <SeguridadTab />}
          </div>

          {/* Botón de guardado */}
          <div className="boton-guardar-perfil">
            <button type="submit" className="btn-guardar-perfil-usuario">
              Guardar cambios
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default PerfilUsuario;

