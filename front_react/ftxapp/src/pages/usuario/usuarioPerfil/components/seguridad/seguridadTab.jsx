import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import "./seguridadTab.css";

const SeguridadTab = () => {
  const { register, watch, formState: { errors } } = useFormContext();

  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  // Regex: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return (
    <div className="seguridad-tab">
      <h3>Cambiar contraseña</h3>

      {/* Contraseña actual */}
      <div className="campo-form">
        <label>Contraseña actual</label>
        <div className="input-con-icono">
          <input
            type={showActual ? "text" : "password"}
            {...register("datosPersonales.passwordActual", {
              required: "La contraseña actual es obligatoria",
              pattern: {
                value: passwordRegex,
                message:
                  "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
              },
            })}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowActual(!showActual)}
          >
            {showActual ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors?.datosPersonales?.passwordActual && (
          <span className="error">
            {errors.datosPersonales.passwordActual.message}
          </span>
        )}
      </div>

      {/* Nueva contraseña */}
      <div className="campo-form">
        <label>Nueva contraseña</label>
        <div className="input-con-icono">
          <input
            type={showNueva ? "text" : "password"}
            {...register("datosPersonales.passwordNueva", {
              required: "La nueva contraseña es obligatoria",
              pattern: {
                value: passwordRegex,
                message:
                  "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
              },
            })}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowNueva(!showNueva)}
          >
            {showNueva ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors?.datosPersonales?.passwordNueva && (
          <span className="error">
            {errors.datosPersonales.passwordNueva.message}
          </span>
        )}
      </div>

      {/* Confirmar nueva contraseña */}
      <div className="campo-form">
        <label>Confirmar nueva contraseña</label>
        <div className="input-con-icono">
          <input
            type={showConfirmar ? "text" : "password"}
            {...register("datosPersonales.passwordConfirmar", {
              required: "Confirmar contraseña es obligatorio",
              pattern: {
                value: passwordRegex,
                message:
                  "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
              },
              validate: (value) =>
                value === watch("datosPersonales.passwordNueva") ||
                "Las contraseñas no coinciden",
            })}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowConfirmar(!showConfirmar)}
          >
            {showConfirmar ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors?.datosPersonales?.passwordConfirmar && (
          <span className="error">
            {errors.datosPersonales.passwordConfirmar.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SeguridadTab;



