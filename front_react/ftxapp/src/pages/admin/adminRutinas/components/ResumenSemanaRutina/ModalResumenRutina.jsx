import React, { useState } from "react";
import "./ModalResumenRutina.css";
import ResumenSemanasRutina from "./ResumenSemanasRutina";

/**
 * ModalResumenRutina
 * Muestra un resumen visual de la rutina y, si el modo es "Crear",
 * permite al usuario indicar si la rutina está completa.
 * Al confirmar, modifica el estado de la rutina según la respuesta.
 */
const ModalResumenRutina = ({
  isOpen,
  onClose,
  rutina,
  onConfirmar,
  modoRutina,
}) => {
  // Estado local para registrar si el usuario considera la rutina completa
  const [rutinaCompleta, setRutinaCompleta] = useState(null); // null | true | false

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  console.log("ModalResumenRutina - Rutina recibida:", rutina);


  /**
   * handleConfirmar
   * Lógica que se ejecuta al confirmar el guardado desde el modal.
   * Modifica el estado de la rutina según la respuesta del usuario.
   */
  const handleConfirmar = () => {
    const rutinaModificada = { ...rutina };

    if (modoRutina === "Crear" || modoRutina === "Copiar") {
      console.log("Estado Rutina Crear antes:", rutina.estadoRutina);
      console.log("Usuario Crear ID:", rutina.idUsuario);
      // Si el usuario dijo que la rutina está completa
      if (rutinaCompleta === true) {
        rutinaModificada.estadoRutina =
          rutina.idUsuario !== "" ? "proxima" : "completa";
      } else {
        rutinaModificada.estadoRutina = "en proceso";
      }

      console.log("Estado Rutina después:", rutinaModificada.estadoRutina);
      console.log("Usuario ID:", rutinaModificada.idUsuario);
    }

    if (modoRutina === "Editar") {
      console.log("Estado Rutina antes:", rutina.estadoRutina);
      console.log("Usuario ID:", rutina.idUsuario);

      // Si el usuario dijo que la rutina está completa
      if (rutinaCompleta === true) {
        if (rutina.estadoRutina === "en proceso") {
          rutinaModificada.estadoRutina =
            rutina.idUsuario !== "" ? "proxima" : "completa";
        } else {
          rutinaModificada.estadoRutina = "en proceso";
        }
      }
    } 
    
    console.log("Estado Rutina después:", rutinaModificada.estadoRutina);
      console.log("Usuario ID:", rutinaModificada.idUsuario);
    
    // Ejecutar callback con la rutina modificada
    onConfirmar(rutinaModificada);
  };

  return (
    <div className="modal-resumen-overlay">
      <div className="modal-resumen-content">
        <div className="modal-resumen-header">
        <h4>Resumen de la Rutina: {rutina.nombreRutina}</h4>
        <h5>Estado de la Rutina: {rutina.estadoRutina}</h5>
        </div>

        {/* Visualización de la rutina por semanas y días */}
        <ResumenSemanasRutina rutina={rutina} />

        {/* Pregunta condicional solo si se está creando una rutina */}
        {modoRutina !== "" && (
          <div className="pregunta-rutina-completa">
            <div className="texto-pregunta-completa">
            ¿La rutina está completa?
            </div>
            <div className="opciones-pregunta-completa">
            <label>
              <input
                type="radio"
                name="rutinaCompleta"
                value="si"
                checked={rutinaCompleta === true}
                onChange={() => setRutinaCompleta(true)}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="rutinaCompleta"
                value="no"
                checked={rutinaCompleta === false}
                onChange={() => setRutinaCompleta(false)}
              />
              No
            </label>
            </div>
          </div>
        )}

        

        {/* Botones de acción del modal */}
        <div className="botones-modal-rutina-completa">
         
          <button
            className="btn-confirmar-modal-rutina-completa"
            onClick={handleConfirmar}
            disabled={rutinaCompleta === null}

          >
            Guardar Rutina
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResumenRutina;
