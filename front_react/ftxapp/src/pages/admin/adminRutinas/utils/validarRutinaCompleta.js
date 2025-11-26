export const validarRutinaCompleta = (rutina) => {
  const errores = [];

  if (!rutina.nombreRutina?.trim()) {
    errores.push("La rutina debe tener un nombre.");
  }

  if (rutina.idUsuario === undefined || rutina.idUsuario === null) {
    errores.push("Debe especificarse un ID de usuario.");
  }

  if (!Array.isArray(rutina.semanas) || rutina.semanas.length === 0) {
    errores.push("La rutina debe tener al menos una semana.");
  }

  rutina.semanas?.forEach((semana, semanaIndex) => {
    if (!Array.isArray(semana.dias) || semana.dias.length === 0) {
      errores.push(`La semana ${semanaIndex + 1} no tiene días.`);
      return;
    }

    semana.dias.forEach((dia, diaIndex) => {
      if (!Array.isArray(dia.ejerciciosRutina) || dia.ejerciciosRutina.length === 0) {
        errores.push(`El día ${diaIndex + 1} de la semana ${semanaIndex + 1} no tiene ejercicios.`);
        return;
      }

      dia.ejerciciosRutina.forEach((ej, ejIndex) => {
        if (!ej.idEjercicioBasico) {
          errores.push(`Falta el ID del ejercicio en semana ${semanaIndex + 1}, día ${diaIndex + 1}, ejercicio ${ejIndex + 1}.`);
        }
        if (!ej.repeticiones?.trim()) {
          errores.push(`Faltan repeticiones en semana ${semanaIndex + 1}, día ${diaIndex + 1}, ejercicio ${ejIndex + 1}.`);
        }
        if (ej.peso === "" || ej.peso === null || ej.peso === undefined) {
          errores.push(`Falta el peso en semana ${semanaIndex + 1}, día ${diaIndex + 1}, ejercicio ${ejIndex + 1}.`);
        }
        if (!ej.dificultad?.trim()) {
          errores.push(`Falta la dificultad en semana ${semanaIndex + 1}, día ${diaIndex + 1}, ejercicio ${ejIndex + 1}.`);
        }
      });
    });
  });

  return errores;
};
