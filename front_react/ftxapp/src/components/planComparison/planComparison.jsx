// front_react/ftxapp/src/components/planComparison/planComparison.jsx
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  obtenerTodosBeneficios,
  planTieneBeneficio,
} from "../../utils/planUtils";
import "./planComparison.css";

const PlanComparison = ({ planes }) => {
  if (!planes || planes.length === 0) {
    return (
      <div className="plan-comparison">
        <div className="text-center py-5">
          <p className="text-muted">No hay planes disponibles para comparar</p>
        </div>
      </div>
    );
  }

  const todosBeneficios = obtenerTodosBeneficios(planes);

  // Función para debug - imprime los beneficios de cada plan
  const debugBeneficios = () => {
    console.log("=== DEBUG BENEFICIOS ===");
    planes.forEach((plan) => {
      console.log(`Plan: ${plan.nombrePlan}`);
      console.log(`Beneficios raw: ${plan.beneficios}`);
      console.log(
        `Beneficios parseados:`,
        plan.beneficios?.split(",").map((b) => b.trim())
      );
      console.log("---");
    });
    console.log("Todos los beneficios únicos:", todosBeneficios);
    console.log("======================");
  };

  // Ejecutar debug en desarrollo
  React.useEffect(() => {
    debugBeneficios();
  }, [planes]);

  return (
    <div className="plan-comparison">
      <div className="comparison-header">
        <h3 className="comparison-title">Compara los Planes en Detalle</h3>
      </div>

      <div className="comparison-table-container">
        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Características</th>
                {planes.map((plan) => (
                  <th key={plan.idPlan} className="plan-column">
                    {plan.nombrePlan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todosBeneficios.map((beneficio, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  <td className="feature-cell">{beneficio}</td>
                  {planes.map((plan) => {
                    const tieneBeneficio = planTieneBeneficio(plan, beneficio);
                    return (
                      <td key={plan.idPlan} className="plan-cell">
                        {tieneBeneficio ? (
                          <FaCheck className="check-icon" title="Incluido" />
                        ) : (
                          <FaTimes className="cross-icon" title="No incluido" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Fila adicional para mostrar precios */}
              <tr className="price-row">
                <td className="feature-cell price-label">Precio mensual</td>
                {planes.map((plan) => (
                  <td key={plan.idPlan} className="plan-cell price-cell">
                    <span className="price-value">
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(plan.precio)}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
