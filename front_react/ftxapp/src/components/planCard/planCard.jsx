// front_react/ftxapp/src/components/planCard/planCard.jsx
import React from "react";
import Button from "../form/button/button";
import { parsearBeneficios, formatearPrecio } from "../../utils/planUtils";
import "./planCard.css";

const PlanCard = ({
  plan,
  isPopular = false,
  onSelectPlan,
  className = "",
}) => {
  const beneficios = parsearBeneficios(plan.beneficios);
  const precioFormateado = formatearPrecio(plan.precio);

  const handleSelectPlan = () => {
    if (onSelectPlan) {
      onSelectPlan(plan);
    }
  };

  const getButtonText = () => {
    if (isPopular) {
      return "Obtener Mi Rutina";
    }
    return plan.nombrePlan?.toLowerCase().includes("premium")
      ? "Comenzar Transformación"
      : "Seleccionar Plan";
  };

  const getButtonVariant = () => {
    if (isPopular) {
      return "warning";
    }
    return plan.nombrePlan?.toLowerCase().includes("premium")
      ? "light"
      : "outline-primary";
  };

  return (
    <div
      className={`plan-card ${
        isPopular ? "plan-card--popular" : ""
      } ${className}`}
    >
      {isPopular && (
        <div className="popular-badge">
          <span className="badge bg-warning text-dark">Más Popular</span>
        </div>
      )}

      <div className="plan-card__header">
        <h2
          className={`plan-card__title ${isPopular ? "fw-bold" : "text-muted"}`}
        >
          {plan.nombrePlan}
        </h2>
        <p className="plan-card__price">
          {precioFormateado}
          <span className="plan-card__price-period">/mes</span>
        </p>
        <p className="plan-card__description">{plan.descripcion}</p>
      </div>

      <div className="plan-card__body">
        <ul className="plan-card__benefits">
          {beneficios.map((beneficio, index) => (
            <li key={index} className="plan-card__benefit-item">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              {beneficio}
            </li>
          ))}
        </ul>

        <Button
          variant={getButtonVariant()}
          className="plan-card__button"
          onClick={handleSelectPlan}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
