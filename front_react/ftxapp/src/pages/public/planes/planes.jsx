// front_react/ftxapp/src/pages/public/planes/planes.jsx
import React, { useState, useEffect } from "react";
import { PlanService } from "../../../services/planService";
import PlanCard from "../../../components/planCard/planCard";
import PlanComparison from "../../../components/planComparison/planComparison";
import { ordenarPlanesPorPrecio } from "../../../utils/planUtils";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import "./planes.css";
import { useModal } from "../../../context/ModalContext";

const Planes = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showModal } = useModal();

  useEffect(() => {
    cargarPlanes();
  }, []);

  const cargarPlanes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PlanService.obtenerTodosLosPlanes();

      // Ordenar planes por precio para mostrar en orden lógico
      const planesOrdenados = ordenarPlanesPorPrecio(data);
      setPlanes(planesOrdenados);
    } catch (err) {
      console.error("Error al cargar planes:", err);
      setError(err.message || "Error al cargar los planes");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    console.log("Plan seleccionado:", plan);
    // Aquí puedes agregar lógica para navegar a otra página o abrir un modal
    // Por ejemplo: navigate('/checkout', { state: { plan } });
    showModal(`Has seleccionado el plan: ${plan.nombrePlan}`, "success", 2000);
    // alert(`Has seleccionado el plan: ${plan.nombrePlan}`);
  };

  const determinarPlanPopular = (planes) => {
    // El plan popular será el del medio (índice 1) si hay 3 o más planes
    // o el segundo plan si hay menos
    if (planes.length >= 3) {
      return 1; // Índice del plan del medio
    } else if (planes.length === 2) {
      return 1; // Segundo plan
    }
    return -1; // No hay plan popular si solo hay uno
  };

  if (loading) {
    return (
      <div className="planes-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando planes...</span>
            </div>
            <p className="mt-3 text-muted">Cargando planes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="planes-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">¡Oops! Algo salió mal</h4>
              <p>{error}</p>
              <button className="btn btn-outline-danger" onClick={cargarPlanes}>
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const planPopularIndex = determinarPlanPopular(planes);

  return (
    <div className="container">
      <HeaderCrud title=" Planes Disponibles" widthPercent={100} />
    <div className="planes-page">
      <div className="container py-5">

        {/* Encabezado */}
        <header className="planes-header">
          <h1 className="planes-title">Elige tu Plan Ideal</h1>
          <p className="planes-subtitle">
            Tenemos un plan perfecto para cada necesidad. Comienza gratis o
            elige el poder de nuestras opciones Pro y Premium.
          </p>
        </header>

        {/* Tarjetas de Planes */}
        <div className="planes-grid">
          {planes.length > 0 ? (
            planes.map((plan, index) => (
              <div key={plan.idPlan} className="plan-grid-item">
                <PlanCard
                  plan={plan}
                  isPopular={index === planPopularIndex}
                  onSelectPlan={handleSelectPlan}
                  className={
                    plan.nombrePlan?.toLowerCase().includes("premium")
                      ? "plan-card--premium"
                      : ""
                  }
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <p className="text-muted">
                  No hay planes disponibles en este momento.
                </p>
                <button className="btn btn-primary" onClick={cargarPlanes}>
                  Recargar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabla Comparativa */}
        {planes.length > 0 && <PlanComparison planes={planes} />}
      </div>
    </div>
    </div>
  );
};

export default Planes;
