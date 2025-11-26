import React, { useState } from "react";
import "./PagosListadosHistorial.css";

const PagosListadosHistorial = ({ pagos }) => {
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null);

  function formatearMonto(monto) {
    if (monto == null || monto === "") return "$ 0.00";
    const numero = Number(monto);
    if (isNaN(numero)) return "$ 0.00";
    return "$ " + numero.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="pagos-wrapper">
      {/* Vista tipo tabla (desktop) */}
      <div className="pagos-grid desktop-only">
        <div className="pago-card encabezado">
          <span>Nombre</span>
          <span>Estado</span>
          <span>Fecha de Pago</span>
          <span>Vencimiento</span>
          <span>Método</span>
          <span>Monto</span>
        </div>
        {pagos.map((pago, index) => (
          <div key={index} className="pago-card">
            <span>{pago.nombre} {pago.apellido}</span>
            <span>{pago.estadoUsuario}</span>
            <span>{pago.fechaPago}</span>
            <span>{pago.fechaVencimiento || "-"}</span>
            <span>{pago.metodoDePago}</span>
            <span>{formatearMonto(pago.monto)}</span>
          </div>
        ))}
      </div>

      {/* Vista colapsable (mobile) */}
      <div className="pagos-cards mobile-only">
        {pagos.map((pago, index) => {
          const estaExpandida = tarjetaExpandida === index;
          return (
            <div
              key={index}
              className={`pago-card-mobile ${estaExpandida ? "expandido" : ""}`}
              onClick={() =>
                setTarjetaExpandida(estaExpandida ? null : index)
              }
            >
              <p className="pago-resumen">
                <strong>{pago.nombre} {pago.apellido}</strong> — {pago.estadoUsuario}
              </p>
              {estaExpandida && (
                <div className="pago-detalle">
                  <p><strong>Fecha de Pago:</strong> {pago.fechaPago}</p>
                  <p><strong>Vencimiento:</strong> {pago.fechaVencimiento || "-"}</p>
                  <p><strong>Método:</strong> {pago.metodoDePago}</p>
                  <p><strong>Monto:</strong> {formatearMonto(pago.monto)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PagosListadosHistorial;
