import React, { useState, useEffect } from "react";
import SemanaRutina from "./semanaRutina/semanaRutina";
import "./rutinaModular.css";
import { useModal } from "../../../../context/ModalContext";

// Handlers externos
import {
  toggleSemanaExpandida,
  handleGuardarDia,
  handleGuardarSemana,
  handleGuardarSemanaAvanzar,
  handleGuardarRutina,
  handleEjercicioChange,
  handleAgregarEjercicio,
  handleEliminarEjercicio,
} from "../../../componentsShare/utils/rutinaHandlers";

/**
 * Componente visual principal para editar la rutina por semanas y días
 */
const RutinaVisual = ({ rutina, modoRutina, onRutinaEditadaChange }) => {
  const [rutinaEditable, setRutinaEditable] = useState(null);
  const [semanaActivaIndex, setSemanaActivaIndex] = useState(0);
  const [mostrarModalDecision, setMostrarModalDecision] = useState(false);
  const { showModal } = useModal();

  // Inicializar rutina editable al recibirla
  useEffect(() => {
    if (rutina) {
      setRutinaEditable(rutina);
    }
  }, [rutina]);

  // Propagar rutina editada al componente padre
  useEffect(() => {
    if (rutinaEditable) {
      onRutinaEditadaChange?.(rutinaEditable);
    }
  }, [rutinaEditable]);

  // Validación inicial
  if (!rutinaEditable?.semanas?.length) {
    return <p>No hay semanas cargadas.</p>;
  }

  return (
    <div className="rutina-visual">
      {/* Modal de decisión al alcanzar el límite de semanas */}
      {mostrarModalDecision && (
        <ModalDecision
          isOpen={mostrarModalDecision}
          borderClass="modal-info-border"
          title="Límite alcanzado"
          message="Se alcanzó el límite de 4 semanas. ¿Querés guardar la rutina o seguir editando?"
          onDecision={(confirmar) => {
            if (confirmar) {
              handleGuardarRutina(rutinaEditable, setMostrarModalDecision);
            } else {
              setMostrarModalDecision(false);
            }
          }}
        />
      )}

      {/* Render de cada semana */}
      {rutinaEditable.semanas.map((semana, index) => (
        <SemanaRutina
          key={index}
          semana={semana}
          nroSemana={index + 1}
          semanaIndex={index}
          esActiva={index === semanaActivaIndex}
          onEjercicioChange={(...args) =>
            handleEjercicioChange(rutinaEditable, setRutinaEditable, ...args)
          }
          onAgregarEjercicio={(...args) =>
            handleAgregarEjercicio(rutinaEditable, setRutinaEditable, ...args)
          }
          onEliminarEjercicio={(...args) =>
            handleEliminarEjercicio(rutinaEditable, setRutinaEditable, ...args)
          }
          onGuardarDia={(semanaIndex, diaIndex) =>
            handleGuardarDia({
              rutinaEditable,
              semanaIndex,
              setRutinaEditable,
              setSemanaActivaIndex,
              setMostrarModalDecision,
              showModal,
            })
          }
          onGuardarSemana={(index) =>
            handleGuardarSemana(rutinaEditable, index)
          }
          onGuardarSemanaAvanzar={(index) =>
            handleGuardarSemanaAvanzar({
              rutinaEditable,
              semanaIndex: index,
              setRutinaEditable,
              setSemanaActivaIndex,
              setMostrarModalDecision,
              showModal,
            })
          }
          onToggleExpand={(index) =>
            toggleSemanaExpandida(index, semanaActivaIndex, setSemanaActivaIndex)
          }
        />
      ))}
    </div>
  );
};

export default RutinaVisual;

