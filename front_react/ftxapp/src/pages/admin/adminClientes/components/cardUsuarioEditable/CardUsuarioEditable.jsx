import React, { useState, useEffect } from "react";
import "./CardUsuarioEditable.css";
import { FaInfoCircle } from "react-icons/fa";
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral.js";
import { useModal } from "../../../../../context/ModalContext.jsx";
import { data } from "react-router";
import API_URL from "../../../../../config/api.js";

// Componente principal que permite editar los datos de un usuario
function CardUsuarioEditable({
  usuario, // Datos del usuario a editar
  activeTab, // Pestaña activa por usuario
  setActiveTab, // Función para cambiar la pestaña activa
  onGuardar, // Función que se ejecuta al guardar cambios
}) {
  const tab = activeTab[usuario.id]; // Pestaña activa para este usuario
  // Estado para controlar errores de validación
  const [errores, setErrores] = useState({ email: false });

  // Referencia al input de email para enfocarlo en caso de error
  const emailInputRef = React.useRef(null);

  // Estado para mostrar/ocultar el tooltip del ícono de información
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  // Estado que almacena los planes disponibles obtenidos del backend
  const [planesDisponibles, setPlanesDisponibles] = useState([]);

  const { showModal } = useModal(); // Modal global

  // Estado que contiene todos los datos editables del usuario
  const [formData, setFormData] = useState({
    ...usuario,
    ...usuario.datosPersonales,
    ...usuario.datosFisicos,
    planId: usuario.datosPersonales?.plan?.idPlan || null,
    planNombre: usuario.datosPersonales?.plan?.nombrePlan || "",
    emailConfirmacion: usuario.email || "", // ← nuevo campo
  });

  const [bodyCambios, setBodyCambios] = useState({
    estado: "",
    email: "",
    plan: "",
  });

  // ejemplo de llamado a fetchGeneral
  /* fetchGeneral({
      url,
      method,
      body: rutina,
      showModal,
      onSuccess: (data) => {
        resultado = data;
      },
      onError: (err) => {
        const mensaje = extraerMensajeError(err);
        console.error("Error al guardar rutina:", mensaje);
      },
    }); */

  useEffect(() => {
    const obtenerPlanes = async () => {
      await fetchGeneral({
        url: `${API_URL}/plan/all`,
        method: "GET",
        onSuccess: (data) => setPlanesDisponibles(data),
        //onSuccess: (data) => setPlanesDisponibles(data),
        showModal, // solo muestra modal si hay error
      });

      /* try {
        const response = await fetch(`${API_URL}/plan/all`);
        if (!response.ok) throw new Error("Error al obtener planes");
        const data = await response.json();

        setPlanesDisponibles(data); // ← guarda el arreglo de planes
      } catch (error) {
        console.error(" Falló la carga de planes:", error);
      } */
    };

    obtenerPlanes();
  }, []);

  useEffect(() => {
    const planSeleccionado = planesDisponibles.find(
      (p) => p.idPlan === Number(formData.planId)
    );
    setPlanActual(planSeleccionado?.nombrePlan || "—");
  }, [formData.planId, planesDisponibles]);

  // Estado para mostrar el nombre del plan actual
  const [planActual, setPlanActual] = useState(formData.plan);

  // Función que actualiza los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "planId") {
      setBodyCambios((prev) => ({ ...prev, plan: value }));
    }

    if (name === "estado")
      setBodyCambios((prev) => ({
        ...prev,
        estado: e.target.value,
      })); // Actualiza el estado en bodyCambios

    if (name === "email")
      setBodyCambios((prev) => ({
        ...prev,
        email: e.target.value,
      })); // Actualiza el estado en bodyCambios
  };

  //funcion que filtra los campos no vacíos de un objeto
  const filtrarCamposNoVacios = (obj) => {
    const resultado = {};

    Object.entries(obj).forEach(([clave, valor]) => {
      if (valor !== null && valor !== "" && valor !== undefined) {
        resultado[clave] = valor;
      }
    });

    return resultado;
  };

  // Función que valida el formato del email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Función que se ejecuta al hacer clic en “Guardar”
  const handleGuardar = () => {
    const emailValido = validarEmail(formData.email);
    const emailsCoinciden = formData.email === formData.emailConfirmacion;

    // Si el email es inválido o no coincide, mostrar error
    if (!emailValido || !emailsCoinciden) {
      setErrores({ email: true });
      emailInputRef.current?.select();
      return;
    }
    // Si todo está bien, limpiar errores y  guarda en bodyCambios el email ingresado

    setErrores({ email: false });

    onGuardar(filtrarCamposNoVacios(bodyCambios));
  };

  // Renderizado principal del componente
  return (
    <div className="card-usuario-editable">
      <div className="tabs-usuario-editable">
        {["basicos", "personales", "fisicos"].map((tipo) => (
          <button
            key={tipo}
            className={`tab-btn-editable ${tab === tipo ? "active" : ""}`}
            onClick={() =>
              setActiveTab((prev) => ({ ...prev, [usuario.id]: tipo }))
            }
          >
            {tipo === "basicos"
              ? "Básicos"
              : tipo === "personales"
              ? "Datos Personales"
              : "Datos Físicos"}
          </button>
        ))}
      </div>

      <div className="contenido-tab-editable">
        {tab === "basicos" && (
          <div className="basicos-grid-editable">
            <div className="col-imagen-editable">
              <div className="juego-box-editable">
                <img
                  src={formData.imagenPerfil || "/img/default-juego.png"}
                  alt="Imagen de juego"
                  className="juego-imagen-editable"
                />
              </div>
            </div>
            <div className="col-datos-editable">
              <div className="dato-linea-editable">
                <strong>
                  Plan Actual:{" "}
                  <span className="plan-actual-color">
                    {formData.planNombre}
                  </span>
                </strong>
                <select
                  name="planId"
                  value={formData.planId}
                  onChange={handleChange}
                >
                  <option value="">— Seleccionar plan —</option>
                  {planesDisponibles.map((plan) => (
                    <option key={plan.idPlan} value={plan.idPlan}>
                      {`${plan.nombrePlan} ($ ${plan.precio})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="dato-linea-editable">
              <strong>Estado:</strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  onClick={(e) => {
                    const { name, value } = e.target;
                    setBodyCambios((prev) => ({ ...prev, [name]: value }));
                  }}
                >
                  {/* Opción por defecto - Asegúrate de que formData.estado sea "" inicialmente */}
                  <option value="" >
                    Seleccione un estado
                  </option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  {/* <option value="archivado">Archivado</option> */}
                </select>

                {/* Ícono con tooltip */}
                <div className="tooltip-container">
                  <FaInfoCircle
                    className="icono-react-info"
                    onClick={() => setMostrarTooltip((prev) => !prev)}
                  />
                  {mostrarTooltip && (
                    <div className="tooltip-text">
                      El estado define si el usuario puede acceder (activo),
                      está inactivo o fue eliminado (archivado).
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="fila-email-editable">
              <div className="grupo-email-editable">
                <strong>Email:</strong>
              </div>
              <div className="input-email-wrapper">
                <input
                  ref={emailInputRef}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-email-editable ${
                    errores.email ? "input-error" : ""
                  }`}
                />
                {errores.email && (
                  <div className="mensaje-error-email">
                    ⚠️ El formato del email no es válido.
                  </div>
                )}
              </div>
            </div>

            <div className="fila-email-editable">
              <div className="grupo-email-editable">
                <strong>Reingresar Email:</strong>
              </div>
              <div className="input-email-wrapper">
                <input
                  name="emailConfirmacion"
                  value={formData.emailConfirmacion}
                  onChange={handleChange}
                  className={`input-email-editable ${
                    errores.email ? "input-error" : ""
                  }`}
                />
                {errores.email && (
                  <div className="mensaje-error-email">
                    ⚠️ El email no es válido o no coincide.
                  </div>
                )}
              </div>
            </div>

            <div className="fila-inferior-1-editable">
              <div className="dato-horizontal-editable">
                <strong>Nombre:</strong>{" "}
                <span>
                  {usuario.datosPersonales?.nombre || "—"}{" "}
                  {usuario.datosPersonales?.apellido || "—"}
                </span>
              </div>
            </div>
          </div>
        )}

        {tab === "personales" && (
          <>
            <div className="dato-linea-personales-editable">
              <strong>DNI:</strong> {usuario.datosPersonales?.dni || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Teléfono:</strong> {usuario.datosPersonales?.phone || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Género:</strong> {usuario.datosPersonales?.genero || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Fecha Nacimiento:</strong>{" "}
              {usuario.datosPersonales?.fNacimiento || "—"}
            </div>
          </>
        )}

        {tab === "fisicos" && (
          <>
            <div className="dato-linea-personales-editable">
              <strong>Peso (Kg.):</strong> {usuario.datosFisicos?.peso || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Estatura (cm):</strong>{" "}
              {usuario.datosFisicos?.estatura || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Actividad Diaria:</strong>{" "}
              {usuario.datosFisicos?.actividadDiaria || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Metas:</strong> {usuario.datosFisicos?.metas || "—"}
            </div>
            <div className="dato-linea-personales-editable">
              <strong>Observaciones:</strong>{" "}
              {usuario.datosFisicos?.observaciones || "—"}
            </div>
          </>
        )}
      </div>

      <div className="acciones-card-editable">
        <button
          className="btn-guardar-cambios-editable"
          onClick={handleGuardar}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default CardUsuarioEditable;
