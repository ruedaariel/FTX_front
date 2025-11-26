import { fetchGeneral } from "../../../../../components/componentsShare/utils/fetchGeneral";

function leerPagosDesdeURL(url, setPagos, showModal, normalizador) {
  fetchGeneral({
    url,
    method: "GET",
    onSuccess: (data) => {
      const datosFinales = normalizador ? normalizador(data) : data;
      setPagos(datosFinales);
    },
    onError: () => {
      showModal("Error al cargar los pagos", "error", 3000);
    },
    showModal,
  });
}

export { leerPagosDesdeURL };
