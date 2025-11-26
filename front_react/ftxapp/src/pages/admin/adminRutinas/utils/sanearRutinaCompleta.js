/**
 * Limpia y normaliza la rutina completa antes de enviarla al backend.
 * - Reemplaza dificultad y observaciones vacíos por "--"
 * - Reemplaza descripción de semana y focus de día vacíos por "--"
 * - Elimina días sin ejercicios válidos
 * - Elimina semanas sin días válidos
 * - Elimina ejercicios duplicados por día (según idEjercicioBasico)
 * @param {Object} rutina - Objeto rutina con estructura completa
 * @returns {Object} rutina saneada
 */
export const sanearRutinaCompleta = (rutina) => {
  // Recorre todas las semanas de la rutina
  const semanasSaneadas = rutina.semanas
    .map((semana) => {
      // Recorre todos los días de la semana
      const diasValidos = semana.dias
        .map((dia) => {
          const ejerciciosUnicos = [];
          const idsVistos = new Set();

          // Recorre todos los ejercicios del día
          dia.ejerciciosRutina.forEach((ej) => {
            // Ignora ejercicios sin ID o duplicados
            if (!ej.idEjercicioBasico || idsVistos.has(ej.idEjercicioBasico)) return;

            // Marca el ID como visto
            idsVistos.add(ej.idEjercicioBasico);

            // Agrega el ejercicio normalizado
            ejerciciosUnicos.push({
              ...ej,
              dificultad: ej.dificultad?.trim() === "" ? "--" : ej.dificultad,
              observaciones: ej.observaciones?.trim() === "" ? "--" : ej.observaciones,
            });
          });

          // Si no hay ejercicios válidos, se descarta el día
          if (ejerciciosUnicos.length === 0) return null;

          // Retorna el día con focus normalizado y ejercicios filtrados
          return {
            ...dia,
            focus: dia.focus?.trim() === "" ? "--" : dia.focus,
            ejerciciosRutina: ejerciciosUnicos,
          };
        })
        // Elimina días nulos (sin ejercicios válidos)
        .filter((dia) => dia !== null);

      // Si no hay días válidos, se descarta la semana
      if (diasValidos.length === 0) return null;

      // Retorna la semana con descripción normalizada y días filtrados
      return {
        ...semana,
        descripcion: semana.descripcion?.trim() === "" ? "--" : semana.descripcion,
        dias: diasValidos,
      };
    })
    // Elimina semanas nulas (sin días válidos)
    .filter((semana) => semana !== null);

  // Retorna la rutina con semanas saneadas
  return {
    ...rutina,
    semanas: semanasSaneadas,
  };
};

