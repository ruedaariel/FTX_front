import React, { useEffect, useState } from "react";

import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../../context/ModalContext";
import HeaderCrud from "../../../../components/componentsShare/header/HeaderCrud";
import GrupoRadios from "../../../../components/componentsShare/grupoRadios/grupoRadios";
import ListasPagosHistorial from "../components/listadosHistorialPagos/listadosHistorialPagos";
import SelectNombres from "../components/SelectorNombres/SelectorNombres";
import { leerPagosDesdeURL } from "../components/utils/leerPagosDesdeURL";
import "./adminHistorialPagos.css";

const VistaPagos = () => {
  const [pagos, setPagos] = useState([]);
  const { showModal } = useModal();
  const [filtrarListado, setFiltrarListado] = useState("Mes Actual");
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("");
  // Estado para el nombre seleccionado
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");

  

  useEffect(() => {
  leerPagosDesdeURL(
    "http://localhost:8000/apiFtx/pagos",
    setPagos,
    showModal,
    
  );
}, []);


  const metodosUnicos = [...new Set(pagos.map((p) => p.metodoDePago))];
  console.log("Métodos únicos:", metodosUnicos);

  // Generar nombres únicos
  const nombresApellidosUnicos = [
    ...new Set(pagos.map((p) => `${p.nombre} ${p.apellido}`)),
  ];

  const nombresApellidos = pagos.map((p) => `${p.nombre} ${p.apellido}`);
  console.log("Nombres y Apellidos:", nombresApellidos);

  const opcionesRadios = [
    "Todos",
    "Mes Actual",
    "Mes Anterior",
    ...metodosUnicos,
  ];

  console.log("Métodos únicos:", metodosUnicos);

  // Función para filtrar pagos según el criterio seleccionado y el nombre
  function filtrarPagos(pagos, criterio, nombreSeleccionado) {
    const ahora = new Date();
    const mesActual = ahora.getMonth();
    const añoActual = ahora.getFullYear();

    return pagos.filter((pago) => {
      const [dia, mes, año] = pago.fechaPago.split("/").map(Number);
      const fechaPago = new Date(`20${año}`, mes - 1, dia);

      // Filtrar por nombre si está seleccionado
      if (
        nombreSeleccionado &&
        `${pago.nombre} ${pago.apellido}` !== nombreSeleccionado
      ) {
        return false;
      }

      // Mostrar todos
      if (criterio === "Todos") {
        return true;
      }

      // Mes actual
      if (criterio === "Mes Actual") {
        return (
          fechaPago.getMonth() === mesActual &&
          fechaPago.getFullYear() === añoActual
        );
      }

      // Mes anterior
      if (criterio === "Mes Anterior") {
        const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
        const añoAnterior = mesActual === 0 ? añoActual - 1 : añoActual;
        return (
          fechaPago.getMonth() === mesAnterior &&
          fechaPago.getFullYear() === añoAnterior
        );
      }

      // Métodos de pago (efectivo, transferencia, etc.)
      return pago.metodoDePago === criterio;
    });
  }

  //   console.log("Pagos cargados:", pagos);
  console.log("Filtrar listado:", filtrarListado);
  return (
    <div className="container">
      <HeaderCrud
        title="Historial de Pagos"
        widthPercent={100}
        MostrarCerrarSesion={false}
      />

      <div className="encabezado-historial-pagos">
        <GrupoRadios
          opciones={opcionesRadios}
          valorSeleccionado={filtrarListado}
          onChange={setFiltrarListado}
          nombreGrupo="HistorialPagos"
        />

        {/* Select de nombres */}
        <SelectNombres
          opciones={nombresApellidosUnicos}
          valorSeleccionado={nombreSeleccionado}
          onChange={setNombreSeleccionado}
        />
      </div>

      {/* Listado filtrado por criterio y nombre */}
      <ListasPagosHistorial
        pagos={filtrarPagos(pagos, filtrarListado, nombreSeleccionado)}
      />
    </div>
  );
};

export default VistaPagos;
