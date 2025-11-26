import React from "react";
import { useFormContext } from "react-hook-form";
import "./datosFisicos.css";

const DatosFisicosTab = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="formulario-fisicos">
      {/* Sección: Estatura y Peso */}
      <div className="peso-estatura">
        <div className="campo-form">
          <label>Estatura (cm)</label>
          <input
            type="number"
            placeholder="Ej: 170"
            {...register("datosFisicos.estatura", {
              required: "Campo obligatorio",
              min: { value: 50, message: "Mínimo 50 cm" },
              max: { value: 250, message: "Máximo 250 cm" },
            })}
          />
          {errors?.datosFisicos?.estatura && (
            <span className="error">{errors.datosFisicos.estatura.message}</span>
          )}
        </div>

        <div className="campo-form">
          <label>Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Ej: 65.5"
            {...register("datosFisicos.peso", {
              required: "Campo obligatorio",
              min: { value: 30, message: "Mínimo 30 kg" },
              max: { value: 300, message: "Máximo 150 kg" },
            })}
          />
          {errors?.datosFisicos?.peso && (
            <span className="error">{errors.datosFisicos.peso.message}</span>
          )}
        </div>
      </div>

      {/* Sección: Actividad diaria y Metas */}
      <div className="actividad-metas">
        <div className="campo-form">
          <label>Actividad diaria</label>
          <input
            placeholder="Ej: Caminatas diarias, gimnasio 3 veces por semana"
            {...register("datosFisicos.actividadDiaria", {
              required: "Este campo es obligatorio",
              minLength: { value: 1, message: "Debe tener al menos 1 caracteres" },
              maxLength: { value: 100, message: "No puede superar los 100 caracteres" },
              pattern: {
                value: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/,
                message: "Solo se permiten letras, números y espacios",
              },
            })}
          />
          {errors?.datosFisicos?.actividadDiaria && (
            <span className="error">{errors.datosFisicos.actividadDiaria.message}</span>
          )}
        </div>

        <div className="campo-form">
          <label>Metas</label>
          <select {...register("datosFisicos.metas", { required: true })}>
            <option value="">-- Seleccione una meta --</option>
            <option value="Perder Peso">Perder Peso</option>
            <option value="Ganar masa muscular">Ganar masa muscular</option>
            <option value="Resistencia Aeróbica">Resistencia Aeróbica</option>
            <option value="Mantener Estado Fisico">Mantener Estado Fisico</option>
          </select>
          {errors?.datosFisicos?.metas && (
            <span className="error">Campo obligatorio</span>
          )}
        </div>
      </div>

      {/* Sección: Observaciones adicionales */}
      <div className="observaciones-boton">
        <div className="campo-form">
          <label>Observaciones</label>
          <textarea
            placeholder="Ej: enfermedades preexistentes, lesiones, sino indicar lo contrario"
            {...register("datosFisicos.observaciones", {
              required: "Este campo es obligatorio",
              maxLength: { value: 300, message: "Máximo 300 caracteres" },
              validate: (value) => {
                if (value === "") return true;
                if (value.length < 10)
                  return "Debe tener al menos 3 caracteres";
                if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,()\-]+$/.test(value)) {
                  return "Solo se permiten letras, números y signos básicos";
                }
                return true;
              },
            })}
          />
          {errors?.datosFisicos?.observaciones && (
            <span className="error">{errors.datosFisicos.observaciones.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatosFisicosTab;


