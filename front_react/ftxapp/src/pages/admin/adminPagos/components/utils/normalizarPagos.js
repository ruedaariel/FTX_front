function normalizarPagos(pagos) {
    return pagos.map((pago) => {
      return {
        ...pago,
        fechaPago: pago.fechaPago ?? "sFecha",
        fechaVencimiento: pago.fechaVencimiento ?? "sFecha",
        metodoDePago: pago.metodoDePago ?? "sDatos",
        monto: pago.monto ?? "0.0",
      };
    });
  }
  
  export { normalizarPagos };