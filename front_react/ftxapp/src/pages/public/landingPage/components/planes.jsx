import React, { useState, useEffect } from "react";
import { PlanService } from "../../../../services/planService";
import { useNavigate } from "react-router-dom";
import {
  parsearBeneficios,
  formatearPrecio,
  ordenarPlanesPorPrecio,
} from "../../../../utils/planUtils";

function Planes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const determinarPlanPopular = (planes) => {
    // El plan popular será el del medio (índice 1) si hay 3 o más planes
    if (planes.length >= 3) {
      return 1; // Índice del plan del medio
    } else if (planes.length === 2) {
      return 1; // Segundo plan
    }
    return -1; // No hay plan popular si solo hay uno
  };

  const handleSelectPlan = (plan) => {
    console.log("Plan seleccionado:", plan);
    // Aquí puedes agregar lógica para navegar a registro
    navigate("/public/registro");
    // alert(`Has seleccionado el plan: ${plan.nombrePlan}`);
  };

  if (loading) {
    return (
      <section id="planes">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Mis Planes</h2>
            <h3 className="section-subheading">
              Encuentra el plan perfecto para ti.
            </h3>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando planes...</span>
            </div>
            <p className="mt-3 text-muted">Cargando planes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="planes">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Mis Planes</h2>
            <h3 className="section-subheading">
              Encuentra el plan perfecto para ti.
            </h3>
          </div>
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">¡Oops! Algo salió mal</h4>
              <p>{error}</p>
              <button className="btn btn-outline-danger" onClick={cargarPlanes}>
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const planPopularIndex = determinarPlanPopular(planes);

  return (
    <section id="planes">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Mis Planes</h2>
          <h3 className="section-subheading">
            Encuentra el plan perfecto para ti.
          </h3>
        </div>

        {/* Contenido de Planes Dinámico */}
        <div className="row justify-content-center">
          {planes.length > 0 ? (
            planes.map((plan, index) => {
              const beneficios = parsearBeneficios(plan.beneficios);
              const precioFormateado = formatearPrecio(plan.precio);
              const isPopular = index === planPopularIndex;

              return (
                <div key={plan.idPlan} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className={`card h-100  ${
                      isPopular ? "border-2 popular-plan" : "border-0"
                    } card-landing-hover`}
                  >
                    <div className="card-body-landing text-center p-4 card-landing-hover">
                      <h5 className="card-title-landing fs-3 text-uppercase">
                        {plan.nombrePlan}
                      </h5>
                      <h6 className="card-price display-4 fw-bold">
                        {precioFormateado}
                        <span className="period fs-6">/mes</span>
                      </h6>
                      <hr className="my-4" />
                      <ul className="list-unstyled mb-4">
                        {beneficios.map((beneficio, beneficioIndex) => (
                          <li key={beneficioIndex} className="mb-2">
                            <span className="fa-li">
                              <i className="fas fa-check text-success"></i>
                            </span>
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                      <div className="d-grid">
                        <button
                          onClick={() => handleSelectPlan(plan)}
                          className="btn mi-boton text-uppercase"
                        >
                          {isPopular ? "Obtener Mi Rutina" : "Registrarse"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
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
      </div>
    </section>
  );
}

export default Planes;
