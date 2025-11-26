
/* const guardarSemanaCompleta = (rutina, semanaIndex) => {
  const semana = rutina.semanas[semanaIndex];

  const payload = {
    nroSemana: semanaIndex + 1,
    estadoSemana: semana.estadoSemana || "en proceso",
    descripcion: semana.descripcion || "",
    dias: semana.dias.map((dia, diaIndex) => ({
      nroDia: diaIndex + 1,
      focus: dia.focus || "",
      ejercicios: dia.ejerciciosRutina.map((ej) => ({
        idEjercicioBasico: ej.idEjercicioBasico,
        repeticiones: ej.repeticiones,
        peso: ej.peso,
        dificultad: ej.dificultad,
        observaciones: ej.observaciones
      }))
    }))
  };



  return payload;
}; */

const guardarSemanaCompleta = (rutina, semanaIndex) => {
  const semana = rutina.semanas[semanaIndex];

  return {
    nroSemana: semanaIndex + 1,
    estadoSemana: semana.estadoSemana || "en proceso",
    descripcion: semana.descripcion || "",
    dias: semana.dias.map((dia, diaIndex) => ({
      nroDia: diaIndex + 1,
      focus: dia.focus || "",
      ejercicios: dia.ejerciciosRutina.map((ej) => ({
        idEjercicioBasico: ej.idEjercicioBasico,
        repeticiones: ej.repeticiones,
        peso: ej.peso,
        dificultad: ej.dificultad,
        observaciones: ej.observaciones,
      })),
    })),
  };
};


const agregarDiaEnSemana = (rutina, semanaIndex) => {
  const nuevaRutina = { ...rutina };

  nuevaRutina.semanas = [...rutina.semanas];
  nuevaRutina.semanas[semanaIndex] = {
    ...rutina.semanas[semanaIndex],
    dias: [...rutina.semanas[semanaIndex].dias]
  };

  nuevaRutina.semanas[semanaIndex].dias.push({
    focus: "",
    ejerciciosRutina: [
      {
        idEjercicioBasico: "",
        repeticiones: "",
        peso: "",
        dificultad: "",
        observaciones: ""
      }
    ]
  });

  return nuevaRutina;
};

const agregarEjercicioEnDia = (rutina, semanaIndex, diaIndex, ejercicioIndex) => {
  const nuevaRutina = { ...rutina };

  nuevaRutina.semanas = [...rutina.semanas];
  nuevaRutina.semanas[semanaIndex] = {
    ...rutina.semanas[semanaIndex],
    dias: [...rutina.semanas[semanaIndex].dias]
  };
  nuevaRutina.semanas[semanaIndex].dias[diaIndex] = {
    ...nuevaRutina.semanas[semanaIndex].dias[diaIndex],
    ejerciciosRutina: [
      ...nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina
    ]
  };

  nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina.splice(
    ejercicioIndex + 1,
    0,
    {
      idEjercicioBasico: "",
      repeticiones: "",
      peso: "",
      dificultad: "",
      observaciones: ""
    }
  );

  return nuevaRutina;
};

const eliminarEjercicioDeDia = (rutina, semanaIndex, diaIndex, ejercicioIndex) => {
  const nuevaRutina = { ...rutina };

  nuevaRutina.semanas = [...rutina.semanas];
  nuevaRutina.semanas[semanaIndex] = {
    ...rutina.semanas[semanaIndex],
    dias: [...rutina.semanas[semanaIndex].dias]
  };
  nuevaRutina.semanas[semanaIndex].dias[diaIndex] = {
    ...nuevaRutina.semanas[semanaIndex].dias[diaIndex],
    ejerciciosRutina: [
      ...nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina
    ]
  };

  nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina.splice(ejercicioIndex, 1);

  return nuevaRutina;
};

const agregarDiaEnSemanaConLimite = (rutina, semanaIndex) => {
  const nuevaRutina = { ...rutina };
  nuevaRutina.semanas = [...rutina.semanas];

  const semanaActual = nuevaRutina.semanas[semanaIndex];

  if (semanaActual.dias.length < 7) {
    // ✅ Agregar nuevo día a la semana actual
    const nuevaSemana = {
      ...semanaActual,
      dias: [...semanaActual.dias]
    };

    nuevaSemana.dias.push({
      focus: "",
      ejerciciosRutina: [
        {
          idEjercicioBasico: "",
          repeticiones: "",
          peso: "",
          dificultad: "",
          observaciones: ""
        }
      ]
    });

    nuevaRutina.semanas[semanaIndex] = nuevaSemana;
  } else {
    // ✅ No agregar más días, crear nueva semana
    nuevaRutina.semanas.push({
      estadoSemana: "en proceso",
      descripcion: "",
      dias: [
        {
          focus: "",
          ejerciciosRutina: [
            {
              idEjercicioBasico: "",
              repeticiones: "",
              peso: "",
              dificultad: "",
              observaciones: ""
            }
          ]
        }
      ]
    });
  }

  return nuevaRutina;
};

const avanzarODuplicarSemana = (rutina, semanaIndex) => {
  const nuevaRutina = { ...rutina };
  nuevaRutina.semanas = [...rutina.semanas];

  const siguienteSemana = rutina.semanas[semanaIndex + 1];
  const siguienteSemanaExiste = !!siguienteSemana;

  const yaExisteSemanaVacia =
    siguienteSemana &&
    siguienteSemana.dias.length === 1 &&
    siguienteSemana.dias[0].ejerciciosRutina.length === 1 &&
    !siguienteSemana.dias[0].ejerciciosRutina[0].idEjercicioBasico;

  if (siguienteSemanaExiste || yaExisteSemanaVacia) {
    return nuevaRutina;
  }

  // ✅ Crear nueva semana
  nuevaRutina.semanas.push({
    estadoSemana: "en proceso",
    descripcion: "",
    dias: [
      {
        focus: "",
        ejerciciosRutina: [
          {
            idEjercicioBasico: "",
            repeticiones: "",
            peso: "",
            dificultad: "",
            observaciones: ""
          }
        ]
      }
    ]
  });
  console.log("Creando nueva semana...");


  return nuevaRutina;
};

const diaTieneEjercicios = (dia) =>
  dia.ejerciciosRutina.some((ej) => ej.idEjercicioBasico && ej.idEjercicioBasico !== "");

const transformarRutinaCompleta = (rutina) =>
  rutina.semanas.map((semana, semanaIndex) => ({
    nroSemana: String(semanaIndex + 1),
    estadoSemana: semana.estadoSemana || "en proceso",
    /* descripcion: semana.descripcion || "", */
    dias: semana.dias.map((dia, diaIndex) => ({
      nroDia: String(diaIndex + 1),
      focus: dia.focus || "",
      ejerciciosRutina: dia.ejerciciosRutina.map((ej) => ({
        idEjercicioBasico: ej.idEjercicioBasico,
        repeticiones: ej.repeticiones,
        peso: parseFloat(ej.peso),
        dificultad: ej.dificultad,
        observaciones: ej.observaciones || "",
      })),
    })),
  }));


export {
  agregarEjercicioEnDia,
  eliminarEjercicioDeDia,
  agregarDiaEnSemana,
  guardarSemanaCompleta,
  agregarDiaEnSemanaConLimite,
  avanzarODuplicarSemana,
  diaTieneEjercicios,
  transformarRutinaCompleta
};

