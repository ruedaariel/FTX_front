// Importa el helper que transforma la estructura interna de la rutina en el formato esperado por el backend
import { transformarRutinaCompleta } from "./rutinaUtils.js";

// Define una función que arma el objeto final que se enviará al backend, según el modo actual
export const armarRutinaParaGuardar = ({
  rutinaFinal,
  modoRutina,
  datosRutinaUsuario,
  estado,
  
}) => {
  // Transforma las semanas de la rutina usando el helper, agregando nroSemana, nroDia, etc.
  const semanasTransformadas = transformarRutinaCompleta(rutinaFinal);

  // Construye la base del objeto con nombre, estado y semanas
  const rutinaBase = {
    nombreRutina: datosRutinaUsuario.nombreRutina,
    estadoRutina: estado,
    semanas: semanasTransformadas,
     
  };

  /* console.log("%cmodoRutinaBase ----->","color: brown; font-weight: bold;",modoRutina);
  console.log("%crutinaBase ----->","color: brown; font-weight: bold;",rutinaBase);
  console.log("%cmodoRutinaFinal ----->","color: brown; font-weight: bold;",rutinaFinal); */

  // En modo "Copiar", el ID de usuario se deja en null
  if (modoRutina === "Copiar") {

    /* console.log("%cmodo rutina ----->","color: red; font-weight: bold;",modoRutina);
    console.log("%cdatosRutinaUsuario.idUsuario ----->","color: red; font-weight: bold;",datosRutinaUsuario.idUsuario);
    console.log("%cdatosRutinaUsuario ----->","color: red; font-weight: bold;",datosRutinaUsuario); */
    
    rutinaBase.idUsuario = parseInt(datosRutinaUsuario.idUsuario);

    //rutinaBase.idUsuario = null;
  } else {
    // En modo "Crear" o "Editar", se asigna el ID del usuario (convertido a número)
    //rutinaBase.idUsuario = parseInt(datosRutinaUsuario.nombreUsuario);
    
    /* console.log("%cmodo rutina ----->","color: yellow; font-weight: bold;",modoRutina);
    console.log("%cdatosRutinaUsuario.idUsuario ----->","color: yellow; font-weight: bold;",datosRutinaUsuario.idUsuario);
    console.log("%cdatosRutinaUsuario ----->","color: yellow; font-weight: bold;",datosRutinaUsuario); */

    rutinaBase.idUsuario = datosRutinaUsuario.idUsuario===""? null: parseInt(datosRutinaUsuario.idUsuario);
    

  }

  //console.log("%crutinaBase ----->","color: red; font-weight: bold;",rutinaBase);
  // Devuelve el objeto completo listo para enviar al backend
  return rutinaBase;
};

