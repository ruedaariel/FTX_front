// front_react/ftxapp/src/services/storageService.js

export const storageService = {
  // Guardar cualquier dato (objeto, string, número)
  setItem: (key, value) => {
    try {
      const data = typeof value === "string" ? value : JSON.stringify(value);
      sessionStorage.setItem(key, data);
    } catch (error) {
      console.error("Error guardando en sessionStorage:", error);
    }
  },

  // Obtener dato (si es JSON lo parsea automáticamente)
  getItem: (key) => {
    try {
      const data = sessionStorage.getItem(key);
      if (!data) return null;

      // Intentar parsear JSON
      try {
        return JSON.parse(data);
      } catch {
        return data; // si no es JSON, devolver string
      }
    } catch (error) {
      console.error("Error leyendo de sessionStorage:", error);
      return null;
    }
  },

  // Borrar un dato
  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error borrando de sessionStorage:", error);
    }
  },

  // Limpiar todo el sessionStorage
  clear: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error limpiando sessionStorage:", error);
    }
  },
};

// export default storageService;
