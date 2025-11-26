/**
 * Extrae un mensaje legible desde un objeto de error.
 * - Si el mensaje es un JSON serializado, lo parsea y devuelve el campo `message`.
 * - Si el mensaje contiene "Failed to fetch", devuelve un mensaje de red amigable.
 * - Si no se puede parsear, devuelve el mensaje original.
 *
 * @param {Error} error - Objeto de error capturado en un catch
 * @returns {string} - Mensaje limpio para mostrar al usuario
 *
 * Ejemplo:
 *   const mensaje = extraerMensajeError(error);
 *   showModal(mensaje, "error", 4000, true);
 */
export const extraerMensajeError = (error) => {
  if (!error?.message) return "Ocurrió un error inesperado.";

  const mensajeOriginal = error.message;

  // Detectar error de red
  if (mensajeOriginal.includes("Failed to fetch")) {
    return "No se pudo conectar con el servidor. \n Verificá tu conexión o intentá más tarde.";
  }

  // Intentar parsear como JSON
  try {
    const parsed = JSON.parse(mensajeOriginal);
    if (parsed?.message) return parsed.message;
  } catch (e) {
    // No es JSON válido, devolvemos el mensaje original
  }

  return mensajeOriginal;
};

