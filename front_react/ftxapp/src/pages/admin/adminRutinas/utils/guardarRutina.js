import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
import { extraerMensajeError } from "../../../../components/componentsShare/utils/extraerMensajeError";

/**
 * Guarda una rutina en el backend, ya sea en modo "Crear" o "Editar".
 *
 * @param {string} idRutina - ID de la rutina (solo en modo Editar)
 * @param {object} rutina - Objeto rutina ya transformado
 * @param {string} modoRutina - "Crear" o "Editar"
 * @param {function} showModal - Función del ModalContext para mostrar mensajes
 * @returns {Promise<object|null>} - Datos de respuesta si fue exitoso, o null si falló
 */
export const guardarRutinaEnBackend = async (idRutina, rutina, modoRutina, showModal) => {
  const baseUrl = "http://localhost:8000/apiFtx/rutina";
  const url =
    modoRutina === "Editar"
      ? `${baseUrl}/update/${idRutina}`
      : `${baseUrl}/register`;

  const method = modoRutina === "Editar" ? "PUT" : "POST";

  let resultado = null;

  await fetchGeneral({
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
  });

  return resultado;
};

