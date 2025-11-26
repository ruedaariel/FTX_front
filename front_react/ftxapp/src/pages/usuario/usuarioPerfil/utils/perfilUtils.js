// funcion normalizar fecha -> date
  export function normalizarFecha(fechaString) {
  if (!fechaString) return "";

  // console.log("fechaString", fechaString);

  var partes = fechaString.split("/");
  if (partes.length !== 3) return "";

  var dia = partes[0];
  var mes = partes[1];
  var ano = partes[2];

  return ano + "-" + mes.padStart(2, "0") + "-" + dia.padStart(2, "0");
}

// normalizar fecha para backend -> string
export function formatearFechaParaBackend(fechaInput) {
  if (!fechaInput) return "";

  var partes = fechaInput.split("-");
  if (partes.length !== 3) return "";

  var ano = partes[0];
  var mes = partes[1];
  var dia = partes[2];

  console.log( "FparaBackend "+ ano + "/" + mes + "/" + dia);

  return dia + "/" + mes + "/" + ano;
  
  
}

export function normalizarFechaParaBackend(fechaInput) {
  if (!fechaInput) return "";

  var partes = fechaInput.split("/");
  if (partes.length !== 3) return "";

  var dia = partes[0];
  var mes = partes[1];
  var ano = partes[2];

 

  console.log( "F - normalizada para Backend "+ ano + "/" + mes + "/" + dia);

  return ano + "-" + mes + "-" + dia;
  
  
}

export function mapearFormularioParaBackend(formulario) {
  // Extraer secciones conocidas del formulario
  const datosPersonalesOriginal = formulario.datosPersonales || {};
  const datosFisicosOriginal = formulario.datosFisicos || {};

  console.log("formulario.datosPersonales", formulario.datosPersonales);

  // Construir datosPersonales con idPlan plano
  const datosPersonales = {
    nombre: datosPersonalesOriginal.nombre || "",
    apellido: datosPersonalesOriginal.apellido || "",
    dni: datosPersonalesOriginal.dni || "",
    phone: datosPersonalesOriginal.phone || "",
    genero: datosPersonalesOriginal.genero || "",
    fNacimiento: formatearFechaParaBackend(datosPersonalesOriginal.fNacimiento) || "",
    imagenPerfil: datosPersonalesOriginal.imagenPerfil || "",
    idPlan: datosPersonalesOriginal.plan?.idPlan || null
  };

  // Construir datosFisicos con los campos esperados
  const datosFisicos = {
    actividadDiaria: datosFisicosOriginal.actividadDiaria || "",
    peso: datosFisicosOriginal.peso || "",
    estatura: datosFisicosOriginal.estatura || "",
    metas: datosFisicosOriginal.metas || "",
    observaciones: datosFisicosOriginal.observaciones || ""
  };

  // Construir datosBasicos con los campos que están fuera de datosPersonales y datosFisicos
  const datosBasicos = {
    // idUsuario: formulario.idUsuario || formulario.datosBasicos?.idUsuario || null,
    email: formulario.datosBasicos?.email || "",
    // rol: formulario.datosBasicos?.rol || "",
    // estado: formulario.datosBasicos.estado || "",
    password: formulario.datosPersonales.passwordNueva || "" // asegurarse que venga desde algún input
  };

  
  console.log("datosBasicos en perfilutils", datosBasicos);

  // Retornar el objeto final con la estructura que espera el backend
  return {
    datosBasicos: datosBasicos,
    datosPersonales: datosPersonales,
    datosFisicos: datosFisicos
  };
}

export function extraerCambios(original, actualizado) {
  var cambios = {};

  for (var clave in actualizado) {
    var valorActual = actualizado[clave];
    var valorOriginal = original[clave];

    // Si el valor es un objeto (y no null ni array), comparamos recursivamente
    if (
      typeof valorActual === "object" &&
      valorActual !== null &&
      !Array.isArray(valorActual)
    ) {
      var subCambios = extraerCambios(valorOriginal || {}, valorActual);

      // Si hay diferencias dentro del objeto, lo agregamos
      if (Object.keys(subCambios).length > 0) {
        cambios[clave] = subCambios;
      }
    } else {
      // Si el valor cambió, lo agregamos
      if (valorActual !== valorOriginal) {
        cambios[clave] = valorActual;
      }
    }
  }

  return cambios;
}