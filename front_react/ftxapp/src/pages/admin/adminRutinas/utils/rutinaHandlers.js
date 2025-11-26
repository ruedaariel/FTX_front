import {
  guardarSemanaCompleta,
  agregarEjercicioEnDia,
  agregarDiaEnSemana,
  eliminarEjercicioDeDia,
  avanzarODuplicarSemana,
} from "./rutinaUtils";

/**
 * Alterna la expansión de una semana
 */
export const toggleSemanaExpandida = (index, semanaActivaIndex, setSemanaActivaIndex) => {
  setSemanaActivaIndex(prev => (prev === index ? null : index));
};

/**
 * Guarda un día y avanza según la lógica de límite de días y semanas
 */
export const handleGuardarDia = ({
  rutinaEditable,
  semanaIndex,
  setRutinaEditable,
  setSemanaActivaIndex,
  setMostrarModalDecision,
  showModal,
}) => {
  const semanaActual = rutinaEditable.semanas[semanaIndex];
  const cantidadDias = semanaActual.dias.length;

  if (cantidadDias < 7) {
    const nuevaRutina = agregarDiaEnSemana(rutinaEditable, semanaIndex);
    setRutinaEditable(nuevaRutina);
    return;
  }

  const siguienteSemanaExiste = rutinaEditable.semanas.length > semanaIndex + 1;
  const rutinaTiene4Semanas = rutinaEditable.semanas.length >= 4;

  if (siguienteSemanaExiste) {
    setSemanaActivaIndex(semanaIndex + 1);
    showModal("Semana completa, pasando a la siguiente", "success");
    return;
  }

  if (rutinaTiene4Semanas) {
    setMostrarModalDecision(true);
    showModal("Se alcanzó el límite de 4 semanas", "info");
    return;
  }

  const nuevaRutina = avanzarODuplicarSemana(rutinaEditable, semanaIndex);
  setRutinaEditable(nuevaRutina);
  setSemanaActivaIndex(semanaIndex + 1);
  showModal("Semana completa, comenzando nueva semana", "success");
};

/**
 * Guarda una semana y avanza, completando días si faltan
 */
export const handleGuardarSemanaAvanzar = ({
  rutinaEditable,
  semanaIndex,
  setRutinaEditable,
  setSemanaActivaIndex,
  setMostrarModalDecision,
  showModal,
}) => {
  let nuevaRutina = { ...rutinaEditable };
  const semanaActual = nuevaRutina.semanas[semanaIndex];

  while (semanaActual.dias.length < 7) {
    semanaActual.dias.push({
      focus: "",
      ejerciciosRutina: [
        {
          idEjercicioBasico: "",
          repeticiones: "",
          peso: "",
          dificultad: "",
          observaciones: "",
        },
      ],
    });
  }

  const siguienteSemanaExiste = nuevaRutina.semanas.length > semanaIndex + 1;
  const rutinaTiene4Semanas = nuevaRutina.semanas.length >= 4;

  if (siguienteSemanaExiste) {
    setRutinaEditable(nuevaRutina);
    setSemanaActivaIndex(semanaIndex + 1);
    showModal("Pasando a la siguiente semana", "success");
    return;
  }

  if (rutinaTiene4Semanas) {
    setRutinaEditable(nuevaRutina);
    setMostrarModalDecision(true);
    showModal("Se alcanzó el límite de 4 semanas", "info");
    return;
  }

  nuevaRutina = avanzarODuplicarSemana(nuevaRutina, semanaIndex);
  setRutinaEditable(nuevaRutina);
  setSemanaActivaIndex(semanaIndex + 1);
  showModal("Nueva semana creada", "success");
};

/**
 * Guarda una semana individual
 */
export const handleGuardarSemana = (rutinaEditable, semanaIndex) => {
  return guardarSemanaCompleta(rutinaEditable, semanaIndex);
};

/**
 * Guarda toda la rutina (estructura completa)
 */
export const handleGuardarRutina = (rutinaEditable, setMostrarModalDecision) => {
  const payload = rutinaEditable.semanas.map((_, index) =>
    guardarSemanaCompleta(rutinaEditable, index)
  );
  console.log("Payload completo de rutina:", payload);
  setMostrarModalDecision(false);
};

/**
 * Actualiza un ejercicio específico
 */
export const handleEjercicioChange = (rutinaEditable, setRutinaEditable, semanaIndex, diaIndex, ejercicioIndex, nuevoEjercicio) => {
  const nuevaRutina = { ...rutinaEditable };
  nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina[ejercicioIndex] = nuevoEjercicio;
  setRutinaEditable(nuevaRutina);
};

/**
 * Agrega un ejercicio en una posición específica
 */
export const handleAgregarEjercicio = (rutinaEditable, setRutinaEditable, semanaIndex, diaIndex, ejercicioIndex) => {
  const nuevaRutina = agregarEjercicioEnDia(rutinaEditable, semanaIndex, diaIndex, ejercicioIndex);
  setRutinaEditable(nuevaRutina);
};

/**
 * Elimina un ejercicio en una posición específica
 */
export const handleEliminarEjercicio = (rutinaEditable, setRutinaEditable, semanaIndex, diaIndex, ejercicioIndex) => {
  const nuevaRutina = eliminarEjercicioDeDia(rutinaEditable, semanaIndex, diaIndex, ejercicioIndex);
  setRutinaEditable(nuevaRutina);
};
