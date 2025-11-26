import React from "react";
import "./PagosListados.css";

const PagosListados = ({ pagos }) => {
  return (
    <div className="pagos-wrapper">
      {/* Vista tipo tabla (desktop) */}
      <div className="pagos-grid desktop-only">
        <div className="pago-card encabezado">
          <span>Fecha de Pago</span>
          <span>Vencimiento</span>
          <span>Método</span>
          <span>Monto</span>
          <span>Referencia</span>
        </div>
        {pagos.map((pago) => (
          <div key={pago.idPagos} className="pago-card">
            <span>{pago.fechaPago}</span>
            <span>{pago.fechaVencimiento}</span>
            <span>{pago.metodoDePago}</span>
            <span>$ {parseFloat(pago.monto).toLocaleString("es-AR")}</span>
            <span>{pago.referencia || "-"}</span>
          </div>
        ))}
      </div>

      {/* Vista tipo card (mobile) */}
      <div className="pagos-cards mobile-only">
        {pagos.map((pago) => (
          <div key={pago.idPagos} className="pago-card-mobile">
            <p><strong>Fecha de Pago:</strong> {pago.fechaPago}</p>
            <p><strong>Vencimiento:</strong> {pago.fechaVencimiento}</p>
            <p><strong>Método:</strong> {pago.metodoDePago}</p>
            <p><strong>Monto:</strong> $ {parseFloat(pago.monto).toLocaleString("es-AR")}</p>
            <p><strong>Referencia:</strong> {pago.referencia || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagosListados;

