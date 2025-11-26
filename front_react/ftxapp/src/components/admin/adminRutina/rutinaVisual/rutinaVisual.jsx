import React, { useState, useEffect } from "react";
import SemanaRutina from "./semanaRutina/semanaRutina";
import "./rutinaModular.css";
import { useModal } from "../../../../context/ModalContext";

// Utilidades para manipular la rutina
import {
  guardarSemanaCompleta,
  agregarEjercicioEnDia,
  agregarDiaEnSemana,
  eliminarEjercicioDeDia,
  avanzarODuplicarSemana,
} from "./../../../componentsShare/utils/rutinaUtils";

// Modal de confirmación
//import ModalDecision from "./../../../componentsShare/Modal/ModalDecision";

/**
 * Componente visual principal para editar la rutina por semanas y días
 * @param {Object} rutina - Rutina original recibida desde el padre
 * @param {string} modoRutina - Modo actual: "Crear", "Editar", "Copiar"
 * @param {Function} onRutinaEditadaChange - Callback para enviar rutina editada al padre
 */
const RutinaVisual = ({ rutina, modoRutina, onRutinaEditadaChange, onGuardarRutina }) => {
  // Estado editable de la rutina
  const [rutinaEditable, setRutinaEditable] = useState(null);

  // Índice de la semana actualmente expandida
  const [semanaActivaIndex, setSemanaActivaIndex] = useState(0);

  // Estado para mostrar modal de decisión al alcanzar límite de semanas
  //const [mostrarModalDecision, setMostrarModalDecision] = useState(false);

  // Modal global para mensajes
  const { showModal } = useModal();

  // Inicializar rutina editable al recibirla
  useEffect(() => {
  if (rutina && rutina.semanas?.length > 0) {
    const rutinaClonada = JSON.parse(JSON.stringify(rutina));

    rutinaClonada.semanas.forEach((semana) => {
      semana.dias.forEach((dia) => {
        dia.ejerciciosRutina.forEach((ej) => {
          if (!ej.idEjercicioBasico && ej.ejercicioBasico?.idEjercicioBasico) {
            ej.idEjercicioBasico = ej.ejercicioBasico.idEjercicioBasico;
          }
        });
      });
    });

    setRutinaEditable(rutinaClonada);
  }
}, [rutina]);


  

  // Propagar rutina editada al componente padre
  useEffect(() => {
    if (rutinaEditable) {
      onRutinaEditadaChange?.(rutinaEditable);
    }
  }, [rutinaEditable]);

  // Alternar expansión de semana
  const toggleSemanaExpandida = (index) => {
    setSemanaActivaIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Guardar día y avanzar si corresponde
  const handleGuardarDia = (semanaIndex, diaIndex) => {
    const semanaActual = rutinaEditable.semanas[semanaIndex];
    const cantidadDias = semanaActual.dias.length;

    if (cantidadDias < 7) {
      const nuevaRutina = agregarDiaEnSemana(rutinaEditable, semanaIndex);
      setRutinaEditable(nuevaRutina);
      return;
    }

    const siguienteSemanaExiste =
      rutinaEditable.semanas.length > semanaIndex + 1;
    const rutinaTiene4Semanas = rutinaEditable.semanas.length >= 4;

    if (siguienteSemanaExiste) {
      setSemanaActivaIndex(semanaIndex + 1);
      showModal("Semana completa, pasando a la siguiente", "success");
      return;
    }

    if (rutinaTiene4Semanas) {
      setMostrarModalDecision(true);
      showModal("Se alcanzó el límite de 4 semanas", "info");
      return;
    }

    const nuevaRutina = avanzarODuplicarSemana(rutinaEditable, semanaIndex);
    setRutinaEditable(nuevaRutina);
    setSemanaActivaIndex(semanaIndex + 1);
    showModal("Semana completa, comenzando nueva semana", "success");
  };

  // Guardar semana actual (estructura lista para backend)
  const handleGuardarSemana = (semanaIndex) => {
    const payload = guardarSemanaCompleta(rutinaEditable, semanaIndex);
    // Aquí podrías enviar el payload al backend si se desea
  };

  // Guardar semana y avanzar, completando días si faltan
  const handleGuardarSemanaAvanzar = (semanaIndex) => {
    let nuevaRutina = { ...rutinaEditable };
    const semanaActual = nuevaRutina.semanas[semanaIndex];

    // Completar hasta 7 días si faltan
    while (semanaActual.dias.length < 7) {
      semanaActual.dias.push({
        focus: "",
        ejerciciosRutina: [
          {
            idEjercicioBasico: "",
            repeticiones: "",
            peso: "",
            dificultad: "",
            observaciones: "",
          },
        ],
      });
    }

    const siguienteSemanaExiste = nuevaRutina.semanas.length > semanaIndex + 1;
    const rutinaTiene4Semanas = nuevaRutina.semanas.length >= 4;

    if (siguienteSemanaExiste) {
      setRutinaEditable(nuevaRutina);
      setSemanaActivaIndex(semanaIndex + 1);
      showModal("Pasando a la siguiente semana", "success");
      return;
    }

    if (rutinaTiene4Semanas) {
      setRutinaEditable(nuevaRutina);
      setMostrarModalDecision(true);
      showModal("Se alcanzó el límite de 4 semanas", "info");
      return;
    }

    nuevaRutina = avanzarODuplicarSemana(nuevaRutina, semanaIndex);
    setRutinaEditable(nuevaRutina);
    setSemanaActivaIndex(semanaIndex + 1);
    showModal("Nueva semana creada", "success");
  };

  // Actualizar un ejercicio específico
  const handleEjercicioChange = (
    semanaIndex,
    diaIndex,
    ejercicioIndex,
    nuevoEjercicio
  ) => {
    const nuevaRutina = { ...rutinaEditable };
    nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina[
      ejercicioIndex
    ] = nuevoEjercicio;
    setRutinaEditable(nuevaRutina);
  };

  // Agregar ejercicio en posición específica
  const handleAgregarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = agregarEjercicioEnDia(
      rutinaEditable,
      semanaIndex,
      diaIndex,
      ejercicioIndex
    );
    setRutinaEditable(nuevaRutina);
  };

  // Eliminar ejercicio en posición específica
  const handleEliminarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = eliminarEjercicioDeDia(
      rutinaEditable,
      semanaIndex,
      diaIndex,
      ejercicioIndex
    );
    setRutinaEditable(nuevaRutina);
  };

  // Guardar rutina completa (estructura lista para backend)
 /*  const handleGuardarRutinaV = () => {
    const payload = rutinaEditable.semanas.map((_, index) =>
      guardarSemanaCompleta(rutinaEditable, index)
    );
    console.log("Payload completo de rutina:", payload);
    setMostrarModalDecision(false);
  }; */

  // Validación inicial: rutina sin semanas
  if (!rutinaEditable?.semanas?.length) {
    return <p>No hay semanas cargadas.</p>;
    //showModal("No hay semanas cargadas en la rutina. \nSeleccione otra rutina por favor", "error",0,true);
  }

  console.log("RutinaEditable:", rutinaEditable);
  // Render principal
  return (
    <div className="rutina-visual">
      <div className="estado-guardar-rutina-container">
        {/* <div className="rutina-estado-container"> */}
        <div className="estado-rutina-linea">
          <div className="mensaje-estado-rutina">Estado de la Rutina:</div>
          <div className="muestra-estado-rutina">{rutina.estadoRutina}</div>
        </div>

        {/* </div> */}

        <div className="boton-guardar-rutina">
          <button
            className="btn-guardar-rutina-visual"
            onClick={onGuardarRutina}
          >
            Guardar Rutina
          </button>
        </div>
      </div>

      {/* Modal de decisión al alcanzar el límite de semanas */}
      {/* {mostrarModalDecision && (
        <ModalDecision
          isOpen={mostrarModalDecision}
          borderClass="modal-info-border"
          title="Límite alcanzado"
          message="Se alcanzó el límite de 4 semanas. ¿Querés guardar la rutina o seguir editando?"
          onDecision={(confirmar) => {
            if (confirmar) {
              handleGuardarRutinaV();
            } else {
              setMostrarModalDecision(false);
            }
          }}
        />
      )} */}

      {/* Render de cada semana */}
      {rutinaEditable.semanas.map((semana, index) => (
        <SemanaRutina
          key={index}
          semana={semana}
          nroSemana={index + 1}
          semanaIndex={index}
          esActiva={index === semanaActivaIndex}
          onEjercicioChange={handleEjercicioChange}
          onAgregarEjercicio={handleAgregarEjercicio}
          onEliminarEjercicio={handleEliminarEjercicio}
          onGuardarDia={handleGuardarDia}
          onGuardarSemana={handleGuardarSemana}
          onGuardarSemanaAvanzar={handleGuardarSemanaAvanzar}
          onToggleExpand={toggleSemanaExpandida}
        />
      ))}
    </div>
  );
};

export default RutinaVisual;
