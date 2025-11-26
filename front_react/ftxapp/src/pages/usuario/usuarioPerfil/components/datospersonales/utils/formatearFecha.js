/**
 * Convierte una fecha en string (ISO, UTC, etc.) a formato YYYY-MM-DD para inputs tipo date
 * @param {string | Date} fechaOriginal
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export const aInputDate = (fechaOriginal) => {
  if (!fechaOriginal) return "";
  const fecha = new Date(fechaOriginal);
  if (isNaN(fecha)) return "";
  return fecha.toISOString().split("T")[0];
};

/**
 * Convierte una fecha del input tipo date (YYYY-MM-DD) a string ISO para guardar
 * @param {string} fechaInput
 * @returns {string} Fecha en formato ISO (ej: 2025-11-02T00:00:00.000Z)
 */
export const aFechaISO = (fechaInput) => {
  if (!fechaInput) return "";
  const fecha = new Date(fechaInput);
  if (isNaN(fecha)) return "";
  return fecha.toISOString();
};
