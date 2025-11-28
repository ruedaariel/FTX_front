import React, { useEffect, useState } from "react";
import "./ejercicioRutina.css";
import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useModal } from "../../../../../context/ModalContext";

/**
 * Componente que representa un ejercicio dentro de un día de rutina.
 * Permite seleccionar el ejercicio, ingresar repeticiones, peso, dificultad y observaciones.
 * Incluye validaciones y acciones para agregar o eliminar el ejercicio.
 */
const EjercicioRutina = ({
  ejercicio, // Objeto con datos del ejercicio actual
  onChange, // Callback para actualizar el ejercicio
  onAgregar, // Callback para agregar un nuevo ejercicio
  onEliminar, // Callback para eliminar el ejercicio actual
  index, // Índice del ejercicio en la lista
}) => {
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
  const [errorRepeticiones, setErrorRepeticiones] = useState("");
  const [errorPeso, setErrorPeso] = useState("");
  const { showModal } = useModal();

  // Cargar lista de ejercicios disponibles desde el backend
  useEffect(() => {
    fetchGeneral({
      url: `${API_URL}/ejbasico/all`,
      method: "GET",
      onSuccess: (data) => setEjerciciosDisponibles(data),
      showModal
    });
  }, []);

  /**
   * Maneja cambios en los campos del ejercicio
   */
  const handleFieldChange = (field, value) => {
    // Permitir borrar el campo
    if (value === "") {
      if (field === "repeticiones") setErrorRepeticiones("");
      if (field === "peso") setErrorPeso("");
      onChange(index, { ...ejercicio, [field]: value });
      return;
    }

    // Validación de repeticiones (formato: 5 x 12)
    if (field === "repeticiones") {
      const regex = /^([1-9]|10)\s*x\s*([1-9]|1[0-9]|2[0-5])$/;
      if (!regex.test(value)) {
        setErrorRepeticiones("Formato inválido. Ej: 5 x 12 (máx 10x25)");
      } else {
        setErrorRepeticiones("");
      }
      onChange(index, { ...ejercicio, [field]: value });
      return;
    }

    // Validación de peso (entre 1 y 500 kg)
    if (field === "peso") {
      const pesoNum = parseFloat(value);
      if (isNaN(pesoNum) || pesoNum < 0 || pesoNum > 500) {
        setErrorPeso("Peso inválido. Debe ser entre 0 y 500 kg");
      } else {
        setErrorPeso("");
      }
      onChange(index, { ...ejercicio, [field]: pesoNum });
      return;
    }

    // Otros campos sin validación
    onChange(index, { ...ejercicio, [field]: value });
  };

  /**
   * Valida y agrega el ejercicio actual
   */
  const handleAgregarValidado = () => {
    const { idEjercicioBasico, repeticiones, peso, dificultad, observaciones } =
      ejercicio;

    if (!idEjercicioBasico) {
      showModal(
        "Debés seleccionar un ejercicio antes de agregar.",
        "error",
        0,
        true
      );
      return;
    }

    if (!repeticiones || repeticiones.trim() === "") {
      showModal(
        "Ingresá repeticiones en formato válido (Ej: 5 x 12).",
        "error",
        0,
        true
      );
      return;
    }

     

    if (peso === null || peso === undefined || peso === "" || parseFloat(peso) < 0) {
        
      showModal("Ingresá un peso válido mayor o igual a 0.", "error", 0, true);
      return;
    }

    // Normalizar dificultad y observaciones
    const dificultadFinal = dificultad?.trim() === "" ? "--" : dificultad;
    const observacionesFinal =
      observaciones?.trim() === "" ? "--" : observaciones;

    // Actualizar ejercicio antes de agregar
    onChange(index, {
      ...ejercicio,
      dificultad: dificultadFinal,
      observaciones: observacionesFinal,
    });

    onAgregar(index);
  };
  
  // Verificar si el ejercicio actual está en la lista
  const ejercicioActual = ejerciciosDisponibles.find(
    (ej) =>
      ej.idEjercicioBasico === ejercicio.idEjercicioBasico?.idEjercicioBasico
  );

  // Si no está, crear una opción temporal
  const opcionesEjercicio = ejercicioActual
    ? ejerciciosDisponibles
    : [
        {
          idEjercicioBasico: `temp-${index}`, //para salver la unicidad de los renders
        nombreEjercicio: ejercicio.ejercicioBasico?.nombreEjercicio || "Ejercicio seleccionado",
        },
        ...ejerciciosDisponibles,
      ];

      // console.log("EjercicioRutina - Ejercicio recibido:", ejercicio);


  return (
    <div className="ejercicio-rutina-row">
      {/* Selector de ejercicio */}
      <div className="ejercicio-rutina-field">
        <label>Ejercicio</label>
        <select
          value={ejercicio.idEjercicioBasico || ""}
          onChange={(e) =>
            handleFieldChange("idEjercicioBasico", parseInt(e.target.value))
          }
        >
          {opcionesEjercicio.map((ej) => (
            <option key={ej.idEjercicioBasico} value={ej.idEjercicioBasico}>
              {ej.nombreEjercicio}
            </option>
          ))}
        </select>
      </div>

      {/* Campo de repeticiones */}
      <div className="ejercicio-rutina-field">
        <label
          htmlFor={`repeticiones-${index}`}
          title="Formato: series x repeticiones. Ej: 5 x 12"
        >
          Repeticiones
        </label>
        <input
          id={`repeticiones-${index}`}
          type="text"
          value={ejercicio.repeticiones || ""}
          onChange={(e) => handleFieldChange("repeticiones", e.target.value)}
          className={errorRepeticiones ? "input-error" : ""}
        />
        {errorRepeticiones && <p className="error-text">{errorRepeticiones}</p>}
      </div>

      {/* Campo de peso */}
      <div className="ejercicio-rutina-field">
        <label htmlFor={`peso-${index}`} title="Máximo permitido: 500 kg">
          Peso (kg)
        </label>
        <input
          id={`peso-${index}`}
          type="number"
          value={ejercicio.peso ?? ""}
          onChange={(e) => handleFieldChange("peso", e.target.value)}
          className={errorPeso ? "input-error" : ""}
        />
        {errorPeso && <p className="error-text">{errorPeso}</p>}
      </div>

      {/* Campo de dificultad */}
      <div className="ejercicio-rutina-field">
        <label>Dificultad</label>
        <input
          type="text"
          value={ejercicio.dificultad || ""}
          placeholder="RPE, RIR o % de peso"
          onChange={(e) => handleFieldChange("dificultad", e.target.value)}
        />
      </div>

      {/* Campo de observaciones */}
      <div className="ejercicio-rutina-field observaciones">
        <label>Observaciones</label>
        <textarea
          value={ejercicio.observaciones || ""}
          onChange={(e) => handleFieldChange("observaciones", e.target.value)}
        />
      </div>

      {/* Acciones: agregar y eliminar */}
      <div className="ejercicio-rutina-actions">
        <button
          className="btn-ejercicio-agregar"
          onClick={handleAgregarValidado}
        >
          <FaPlus className="icon-agregar" />
        </button>

        <button
          className="btn-ejercicio-eliminar"
          onClick={() => onEliminar(index)}
        >
          <FaTrash className="icon-eliminar" />
        </button>
      </div>
    </div>
  );
};

export default EjercicioRutina;
