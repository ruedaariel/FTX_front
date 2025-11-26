import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { calcularAvancePorSemana } from "./avanceRutina";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend,
} from "chart.js";
import "./avanceRutina.css";

//  Registro de elementos necesarios para los gráficos
Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

//  Configuración global de estilos para todos los gráficos
Chart.defaults.color = "#f0f0f0"; // texto general
Chart.defaults.font.family = "Segoe UI";
Chart.defaults.font.size = 15;

Chart.defaults.plugins.legend.position = "bottom";
Chart.defaults.plugins.legend.labels.color = "#f0f0f0";
Chart.defaults.plugins.legend.labels.font = {
  size: 13,
  weight: "600",
};

Chart.defaults.plugins.tooltip.backgroundColor = "#333";
Chart.defaults.plugins.tooltip.titleColor = "#ff6f00";
Chart.defaults.plugins.tooltip.bodyColor = "#f0f0f0";
Chart.defaults.plugins.tooltip.borderColor = "#ff6f00";
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.legend.labels.boxWidth = 12;
Chart.defaults.plugins.legend.labels.padding = 8;
Chart.defaults.plugins.legend.align = "center";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = "circle";



Chart.defaults.responsive = true;

Chart.defaults.animation = {
  duration: 800,
  easing: "easeOutQuart",
};


//  Estilos reutilizables para ejes en gráficos con escalas
const opcionesEjes = {
  scales: {
    x: {
      ticks: { color: "#ffffff" },
      grid: { color: "#f4ae52" },
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: "#ffffff" },
      grid: { color: "#f4ae52" },
    },
  },
};

const AvanceRutina = ({ rutina }) => {
  const semanas = calcularAvancePorSemana(rutina);

  //  Frases motivacionales según porcentaje de avance
  const fraseMotivacional = (porcentaje) => {
    if (porcentaje === 0) return "¡Empezá hoy!";
    if (porcentaje < 50) return "¡Buen comienzo!";
    if (porcentaje < 100) return "¡Ya casi estás!";
    return "¡Completado! ";
  };

  //  Datos para gráfico general por semana
  const etiquetas = semanas.map((s) => `Semana ${s.nroSemana}`);
  const completados = semanas.map((s) => s.hechos);
  const pendientes = semanas.map((s) => s.total - s.hechos);
  const totalCompletados = completados.reduce((a, b) => a + b, 0);
  const totalPendientes = pendientes.reduce((a, b) => a + b, 0);

  const doughnutData = {
    labels: ["Completados", "Pendientes"],
    datasets: [
      {
        data: [totalCompletados, totalPendientes],
        backgroundColor: ["#ff6f00", "#6c757d"],
      },
    ],
  };

  const barData = {
    labels: etiquetas,
    datasets: [
      {
        label: "Completados",
        data: completados,
        backgroundColor: "#ff6f00",
      },
      {
        label: "Pendientes",
        data: pendientes,
        backgroundColor: "#6c757d",
      },
    ],
  };

  //  Genera datos para gráfico diario por semana
  const generarBarraPorDia = (semana) => {
    const labels = semana.dias.map((dia) => `Día ${dia.nroDia}`);
    const completados = semana.dias.map(
      (dia) => dia.ejerciciosRutina.filter((ej) => ej.ejercicioHecho).length
    );
    const pendientes = semana.dias.map(
      (dia) => dia.ejerciciosRutina.filter((ej) => !ej.ejercicioHecho).length
    );

    return {
      labels,
      datasets: [
        {
          label: "Completados",
          data: completados,
          backgroundColor: "#ff6f00",
        },
        {
          label: "Pendientes",
          data: pendientes,
          backgroundColor: "#6c757d",
        },
      ],
    };
  };

  return (
    <div className="avance-rutina">
      {/* Título principal con nombre de rutina */}
      {/* <h2 className="h2-estadisticas">{`${rutina.nombre} este es tu Avance`}</h2> */}

      {/*  Gráficos generales */}
      <div className="graficos">
        <div className="grafico">
          <h3 className="h3-estadisticas">Avance Total</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div className="grafico">
          <h3 className="h3-estadisticas">Avance por Semana</h3>
          <Bar data={barData} options={opcionesEjes} />
        </div>
      </div>

      {/* Gráficos diarios por semana en grilla 2x2 */}
      <h2 className="h2-estadisticas">Avance Diario por Semana</h2>
      <div className="grid-semanas">
        {semanas.map((semana, i) => (
          <div key={i} className="grafico-semana">
            <h4 className="h4-estadisticas">Semana {semana.nroSemana}</h4>
            <Bar data={generarBarraPorDia(semana)} options={opcionesEjes} />

            {/* Barra de progreso */}
            <div className="barra">
              <div
                className="progreso"
                style={{ width: `${semana.porcentaje}%` }}
              >
                {semana.porcentaje}%
              </div>
            </div>
            <p className="frase">{fraseMotivacional(semana.porcentaje)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvanceRutina;

