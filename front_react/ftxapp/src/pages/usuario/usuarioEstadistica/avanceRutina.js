export const calcularAvancePorSemana = (rutina) => {
  return rutina.semanas.map((semana) => {
    let hechos = 0;
    let total = 0;

    semana.dias.forEach((dia) => {
      dia.ejerciciosRutina.forEach((ej) => {
        total++;
        if (ej.ejercicioHecho) hechos++;
      });
    });

    const porcentaje = total ? Math.round((hechos / total) * 100) : 0;

    return {
      nroSemana: semana.nroSemana,
      porcentaje,
      hechos,
      total,
      dias: semana.dias,
    };
  });
};

