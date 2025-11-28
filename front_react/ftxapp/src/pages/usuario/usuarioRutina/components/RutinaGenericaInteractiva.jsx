import React, { useState } from "react";
import DiaItem from "./DiaItem";
import "./RutinaInteractiva.css";
import {useModal} from "../../../../context/ModalContext";
import { fetchGeneral } from '../../../../components/componentsShare/utils/fetchGeneral';
import API_URL from "../../../../config/api";

const RutinaInteractiva = ({ rutina: rutinaInicial }) => {
  const [rutina, setRutina] = useState(() => rutinaInicial || { semanas: [] });

  
  
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(0);
  const [diaSeleccionado, setDiaSeleccionado] = useState(0);

  const semanas = Array.isArray(rutina?.semanas) ? rutina.semanas : [];
  const semanaActual = semanas[semanaSeleccionada] || null;
  const dias = Array.isArray(semanaActual?.dias) ? semanaActual.dias : [];
  const diaActual = dias[diaSeleccionado] || null;
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  // Modal global para mensajes
    const { showModal } = useModal();


  const actualizarEjercicioBackend = async (idEjercicio) => {
    
    const ejercicio = {ejercicioHecho:true};

    await fetchGeneral({
      url: `${API_URL}/ejrutina/update/${idEjercicio}`,
      method: "PATCH",
      body: ejercicio ,
      // showModal,
      // onSuccess: () => {
      //   showModal("Perfil actualizado correctamente", "success", 2000, true);
      // },
    });
  };




  const handleSeleccionEjercicio = (ejercicio) => {
    if (
      ejercicioSeleccionado?.idEjercicioRutina === ejercicio.idEjercicioRutina
    ) {
      setEjercicioSeleccionado(null); // contraer si ya está seleccionado
    } else {
      setEjercicioSeleccionado(ejercicio); // expandir si es otro
    }
  };

const handleToggleEjercicioHecho = (idEjercicioRutina) => {

  console.log("%cIdEjercicio:", "color: yellow; font-weight: bold;", idEjercicioRutina);

showModal(
      `¿Quieres marcar este ejercicio como hecho?`,
      "decision",
      0,
      true,
      (respuesta) => {
        if (!respuesta) return;

    setRutina((prevRutina) => {
      const nuevaRutina = {
      ...prevRutina,
        semanas: prevRutina.semanas.map((semana) => ({
          ...semana,
          dias: semana.dias.map((dia) => ({
            ...dia,
            ejerciciosRutina: dia.ejerciciosRutina.map((ej) =>
            ej.idEjercicioRutina === idEjercicioRutina && !ej.ejercicioHecho
              ? { ...ej, ejercicioHecho: true }
              : ej
          ),
        })),
      })),
    };
    
    console.log("%cRutina actualizada:", "color: blue; font-weight: bold;", nuevaRutina);
    return nuevaRutina;
  });
      }
    );
    
    actualizarEjercicioBackend(idEjercicioRutina);
};


console.log("Rutina actualizada:", rutina);


  return (
    <div className="rutina-interactiva-container">
      {/* Botones de semana */}
      <div className="semana-selector">
        {semanas.map((semana, index) => (
          <button
            key={semana.idSemana}
            className={`boton-semana ${
              index === semanaSeleccionada ? "activo" : ""
            }`}
            onClick={() => {
              setSemanaSeleccionada(index);
              setDiaSeleccionado(0);
            }}
          >
            Semana {semana.nroSemana}
          </button>
        ))}
      </div>

      {/* Contenido de la semana */}
      <div className="contenido-semana">
        {/* <h3>Semana {semanaActual?.nroSemana}</h3> */}

        {/* Botones de día */}
        <div className="dia-selector">
          {dias.map((dia, index) => (
            <button
              key={dia.idDia}
              className={`boton-dia ${
                index === diaSeleccionado ? "activo" : ""
              }`}
              onClick={() => setDiaSeleccionado(index)}
            >
              Día {dia.nroDia}
            </button>
          ))}
        </div>

        {/* Contenido del día */}
        <div className="contenido-dia-info">
          {diaActual ? (
            <div className="contenido-dia">
              {/* <h4>Focus: {diaActual.focus || "—"}</h4> */}
              <DiaItem
                dia={diaActual}
                onSeleccionEjercicio={handleSeleccionEjercicio}
                ejercicioSeleccionado={ejercicioSeleccionado}
                onToggleEjercicioHecho={handleToggleEjercicioHecho}
              />
              {/* <DiaItem dia={diaActual}  /> */}
            </div>
          ) : (
            <div className="contenido-dia">
              <p>No hay datos para este día.</p>
            </div>
          )}

          <div className="contenido-dia-focus-imagen">
            

            {ejercicioSeleccionado?.ejercicioBasico?.imagenLink ? (
              <img
                src={ejercicioSeleccionado.ejercicioBasico.imagenLink}
                alt={ejercicioSeleccionado.ejercicioBasico.nombreEjercicio}
                className="imagen-ejercicio"
              />
            ) : (
              <p>Seleccioná un ejercicio para ver su datos e imagen.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RutinaInteractiva;
