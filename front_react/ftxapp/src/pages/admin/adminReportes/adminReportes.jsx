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

// Helpers para fecha
const obtenerAnioFiltro = () => {
  const hoy = new Date();
  return String(hoy.getFullYear()).slice(-2); // últimos 2 dígitos
};

const obtenerMesFiltro = () => {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = String(hoy.getFullYear()).slice(-2);
  return `${mes}/${anio}`;
};

const ResumenPagos = ({ dataUsuarios, dataPagos }) => {
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    leerPagosDesdeURL(
      "http://localhost:8000/apiFtx/pagos/impagos",
      setUsuarios,
      showModal,
      normalizarPagos
    );
  }, []);

  useEffect(() => {
    leerPagosDesdeURL(
      "http://localhost:8000/apiFtx/pagos",
      setPagos,
      showModal
    );
  }, []);

  const TotalPagos = [...pagos];
  console.log(usuarios);
  const usuariosUnicosImpagos = [...new Set(usuarios.map((p) => p.usuarioId))];
  console.log("Usuarios UNicos",usuariosUnicosImpagos.length);

  // Filtros dinámicos
  const ANIO_FILTRO = obtenerAnioFiltro();
  const MES_FILTRO = obtenerMesFiltro();

  const calcularMetricas = (TotalPagos) => {
    let totalActivos = 0;
    let totalArchivados = 0;
    let totalPagosMes = 0;
    let totalPagosGeneral = 0;

    TotalPagos.forEach((user) => {
      if (user.estadoUsuario === "activo") {
        totalActivos++;
      } else if (
        user.estadoUsuario === "archivado" ||
        user.estadoUsuario === "inactivo"
      ) {
        totalArchivados++;
      }
    });

    TotalPagos.forEach((pago) => {
      const monto = parseFloat(pago.monto);
      totalPagosGeneral += monto;

      if (pago.fechaPago !== "sFecha" && pago.fechaPago.endsWith(MES_FILTRO)) {
        totalPagosMes += monto;
      }
    });

    return {
      totalActivos,
      totalArchivados,
      totalPagosMes,
      totalPagosGeneral,
    };
  };

  const { totalActivos, totalArchivados, totalPagosMes, totalPagosGeneral } =
    calcularMetricas(TotalPagos);

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
              <p className="usuarios-inactivos">Archivados/Inactivos: {totalArchivados}</p>
            </div>
            <div className="usuarios-estado-detalles">
              
              <p className="usuarios-impagos">Activos sin pagar al dia de hoy: {usuariosUnicosImpagos.length}</p>
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

      <div className="grafico-barras-pagos-mensuales">
        <h2>📊 Resumen de Pagos</h2>
        <GraficoPagosMensuales pagos={TotalPagos} year={ANIO_FILTRO} />
      </div>
    </div>
  );
};

export default ResumenPagos;

