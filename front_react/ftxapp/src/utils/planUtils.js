// front_react/ftxapp/src/utils/planUtils.js

/**
 * Parsea una cadena de beneficios separados por comas
 * @param {string} beneficiosString - String con beneficios separados por ", "
 * @returns {string[]} Array de beneficios individuales
 */
export const parsearBeneficios = (beneficiosString) => {
  if (!beneficiosString || typeof beneficiosString !== "string") {
    return [];
  }

  return beneficiosString
    .split(",")
    .map((beneficio) => beneficio.trim())
    .filter((beneficio) => beneficio.length > 0);
};

/**
 * Formatea el precio para mostrar
 * @param {number} precio - Precio numérico
 * @returns {string} Precio formateado
 */
export const formatearPrecio = (precio) => {
  // console.log("precio en formatearPrecio en PlanUtils.js", precio);
  // console.log(typeof precio);
  if (!precio || typeof +precio !== "number") {
    return "$0";
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
};

/**
 * Obtiene todos los beneficios únicos de todos los planes
 * @param {Array} planes - Array de planes
 * @returns {string[]} Array de todos los beneficios únicos
 */
export const obtenerTodosBeneficios = (planes) => {
  if (!Array.isArray(planes)) {
    return [];
  }

  const todosBeneficios = new Set();

  planes.forEach((plan) => {
    const beneficios = parsearBeneficios(plan.beneficios);
    beneficios.forEach((beneficio) => todosBeneficios.add(beneficio));
  });

  return Array.from(todosBeneficios);
};

/**
 * Verifica si un plan tiene un beneficio específico (versión más estricta)
 * @param {Object} plan - Objeto del plan
 * @param {string} beneficio - Beneficio a verificar
 * @returns {boolean} True si el plan tiene el beneficio
 */
export const planTieneBeneficio = (plan, beneficio) => {
  if (!plan || !beneficio) {
    return false;
  }

  const beneficiosPlan = parsearBeneficios(plan.beneficios);

  // Normalizar strings para comparación más precisa
  const beneficioNormalizado = beneficio.toLowerCase().trim();

  return beneficiosPlan.some((b) => {
    const beneficioPlanNormalizado = b.toLowerCase().trim();

    // Comparación exacta primero
    if (beneficioPlanNormalizado === beneficioNormalizado) {
      return true;
    }

    // Si el beneficio del plan contiene el beneficio buscado (o viceversa)
    // pero con un umbral más alto para evitar falsos positivos
    const longitudMinima = Math.min(
      beneficioNormalizado.length,
      beneficioPlanNormalizado.length
    );

    if (longitudMinima > 10) {
      // Solo para beneficios de texto largo
      return (
        beneficioPlanNormalizado.includes(beneficioNormalizado) ||
        beneficioNormalizado.includes(beneficioPlanNormalizado)
      );
    }

    return false;
  });
};

/**
 * Ordena los planes por precio (menor a mayor)
 * @param {Array} planes - Array de planes
 * @returns {Array} Planes ordenados por precio
 */
export const ordenarPlanesPorPrecio = (planes) => {
  if (!Array.isArray(planes)) {
    return [];
  }

  return [...planes].sort((a, b) => (a.precio || 0) - (b.precio || 0));
};

/**
 * Encuentra el plan con más beneficios
 * @param {Array} planes - Array de planes
 * @returns {Object|null} Plan con más beneficios
 */
export const planConMasBeneficios = (planes) => {
  if (!Array.isArray(planes) || planes.length === 0) {
    return null;
  }

  return planes.reduce((planMaximo, planActual) => {
    const beneficiosActuales = parsearBeneficios(planActual.beneficios);
    const beneficiosMaximos = parsearBeneficios(planMaximo.beneficios);

    return beneficiosActuales.length > beneficiosMaximos.length
      ? planActual
      : planMaximo;
  });
};
