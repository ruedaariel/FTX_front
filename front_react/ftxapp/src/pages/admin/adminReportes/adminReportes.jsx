
// ResumenPagos.js
import React, { useEffect, useState } from "react";
import { leerPagosDesdeURL } from "../../admin/adminPagos/components/utils/leerPagosDesdeURL";
import { normalizarPagos } from "../../admin/adminPagos/components/utils/normalizarPagos";
import { useModal } from "../../../context/ModalContext";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import { IoPeople } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import GraficoPagosMensuales from "./components/GraficoPagosMensuales/GraficoPagosMensuales";

import "./adminReportes.css";

/* -----------------------------
   Helpers para fecha
----------------------------- */

// Devuelve el año actual en formato de 2 dígitos (ej: "25")
const obtenerAnioFiltro = () => {
  const hoy = new Date();
  return String(hoy.getFullYear()).slice(-2);
};

// Devuelve el mes/año actual en formato "MM/YY" (ej: "12/25")
const obtenerMesFiltro = () => {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = String(hoy.getFullYear()).slice(-2);
  return `${mes}/${anio}`;
};

/* -----------------------------
   Componente principal
----------------------------- */

const ResumenPagos = ({ dataUsuarios, dataPagos }) => {
  const [pagos, setPagos] = useState([]);     // Pagos registrados
  const [usuarios, setUsuarios] = useState([]); // Usuarios con impagos
  const { showModal } = useModal();

  /* -----------------------------
     Cargar datos desde API
  ----------------------------- */

  // Cargar usuarios con impagos
  useEffect(() => {
    leerPagosDesdeURL(
      "http://localhost:8000/apiFtx/pagos/impagos",
      setUsuarios,
      showModal,
      normalizarPagos
    );
  }, []);

  // Cargar todos los pagos
  useEffect(() => {
    leerPagosDesdeURL(
      "http://localhost:8000/apiFtx/pagos",
      setPagos,
      showModal
    );
  }, []);

  /* -----------------------------
     Procesamiento de datos
  ----------------------------- */

  // Unir pagos y usuarios impagos en un solo array
  const TotalPagos = [...pagos, ...usuarios];

  // Usuarios únicos con impagos (id + estado)
  const usuariosUnicosImpagos = [
    ...new Map(
      usuarios.map((p) => [
        `${p.usuarioId}-${p.estadoUsuario}`,
        { usuarioId: p.usuarioId, estadoUsuario: p.estadoUsuario },
      ])
    ).values(),
  ];

  
  const usuariosUnicos = [
    ...new Map(
      TotalPagos.map((p) => [
        `${p.usuarioId}-${p.estadoUsuario}`,
        { usuarioId: p.usuarioId, estadoUsuario: p.estadoUsuario },
      ])
    ).values(),
  ];

  /* -----------------------------
     Funciones de cálculo
  ----------------------------- */

  // Contar usuarios activos vs archivados/inactivos
  const calcularEstadoUsuarios = (usuariosUnicos) => {
    let totalActivos = 0;
    let totalArchivados = 0;

    usuariosUnicos.forEach((user) => {
      if (user.estadoUsuario === "activo") {
        totalActivos++;
      } else if (
        user.estadoUsuario === "archivado" ||
        user.estadoUsuario === "inactivo"
      ) {
        totalArchivados++;
      }
    });

    return { totalActivos, totalArchivados };
  };

  // Calcular métricas de pagos (mes actual y total general)
  const calcularMetricas = (TotalPagos) => {
    let totalPagosMes = 0;
    let totalPagosGeneral = 0;

    TotalPagos.forEach((pago) => {
      const monto = parseFloat(pago.monto);
      totalPagosGeneral += monto;

      // Filtrar pagos del mes actual
      if (pago.fechaPago !== "sFecha" && pago.fechaPago.endsWith(MES_FILTRO)) {
        totalPagosMes += monto;
      }
    });

    return { totalPagosMes, totalPagosGeneral };
  };

  /* -----------------------------
     Variables calculadas
  ----------------------------- */

  const ANIO_FILTRO = obtenerAnioFiltro();
  const MES_FILTRO = obtenerMesFiltro();

  const { totalPagosMes, totalPagosGeneral } = calcularMetricas(TotalPagos);
  const { totalActivos, totalArchivados } = calcularEstadoUsuarios(usuariosUnicos);

  // Renombrar resultados para impagos
  const { totalActivos: ImpagosActivos, totalArchivados: ImpagosArchivados } =
    calcularEstadoUsuarios(usuariosUnicosImpagos);

  /* -----------------------------
     Render
  ----------------------------- */

  return (
    <div className="container">
      <HeaderCrud
        title=" Reportes y Resúmenes"
        widthPercent={100}
        MostrarCerrarSesion={false}
      />

      <div className="resumen-container">
        <div className="resumen-grid">
          {/* Estado de Usuarios */}
          <div className="resumen-card estado-card">
            <h3>
              <IoPeople /> Estado de Usuarios
            </h3>
            <div className="usuarios-estado-detalles">
              <p className="usuarios-activos">Activos: {totalActivos}</p>
              <p className="usuarios-inactivos">
                Archivados/Inactivos: {totalArchivados}
              </p>
            </div>
            <div className="usuarios-estado-detalles">
              <p className="usuarios-impagos">
                Activos sin pagar al día de hoy: {ImpagosActivos}
              </p>
            </div>
          </div>

          {/* Total de Pagos del mes actual */}
          <div className="resumen-card pagos-card">
            <h3>
              <FaMoneyBillTrendUp /> {`Pagos del mes: ${MES_FILTRO}`}
            </h3>
            <p className="monto-total">
              Total: $ {totalPagosMes.toLocaleString("es-AR")}
            </p>
            <p className="nota-total">
              Total de Pagos Registrados en este año:{" "}
              {totalPagosGeneral.toLocaleString("es-AR")}
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de pagos mensuales */}
      <div className="grafico-barras-pagos-mensuales">
        <h2>📊 Resumen de Pagos</h2>
        <GraficoPagosMensuales pagos={TotalPagos} year={ANIO_FILTRO} />
      </div>
    </div>
  );
};

export default ResumenPagos;

