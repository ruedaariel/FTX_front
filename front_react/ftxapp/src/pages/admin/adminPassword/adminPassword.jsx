import React, { useState, useEffect } from "react";
import "./adminPassword.css";
import logoNaranja from "../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png";
import ftxImage13 from "../../../assets/Recursos/Imagenes/FTX_13.jpg";
import { useModal } from "../../../context/ModalContext";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminPassword = () => {
  const { showModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  // console.log("Usuario para cambiar contraseña:", usuario);

  // Estados locales para los campos
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");

  // Estados para visibilidad de cada input
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  // Regex: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  const validarPasswords = () => {
    if (!passwordActual || !passwordNueva || !passwordConfirmar) {
      showModal("Todos los campos son obligatorios", "error", 0,true);
      return false;
    }
    if (!passwordRegex.test(passwordNueva)) {
      showModal(
        "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
        "error",
        0,true
      );
      return false;
    }
    if (passwordNueva !== passwordConfirmar) {
      
      showModal("Las contraseñas no coinciden", "error", 0,true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarPasswords()) return;

    const cambios = {
      datosBasicos: {
        password: passwordNueva,
      },
    };

    try {
      await fetchGeneral({
        url: `${API_URL}/usuario/update/${usuario.id}`,
        method: "PATCH",
        body: cambios,
        showModal,
        onSuccess: () => {
          showModal(
            "Contraseña actualizada correctamente. Iniciá sesión con tu nueva clave.",
            "success",
            3000,
            true
          );
          navigate("/login");
        },
      });
    } catch (error) {
      showModal(
        "Hubo un error al actualizar la contraseña. Verificá los datos e intentá nuevamente.",
        "error",
        0,
        true
      );
    }
  };

  return (
    <div className="reset-container">
      {/* Lado izquierdo: imagen motivacional */}
      <div className="reset-left">
        <img src={ftxImage13} alt="Imagen motivacional" className="reset-image" />
        <img src={logoNaranja} alt="Logo FTX" className="reset-logo" />
        <div className="reset-texto">
          <h2>FTX</h2>
          <p>Gestiona el cambio de tu clave de ingreso</p>
        </div>
      </div>

      {/* Lado derecho: formulario */}
      <div className="reset-right">
        <div className="reset-form-container-primer-cambio">
          <h2>Cambio de contraseña</h2>
          <p>Completá los campos para actualizar tu clave de acceso.</p>

          <form className="reset-form-primer-cambio" onSubmit={handleSubmit}>
            {/* Contraseña actual */}
            <div className="campo-form">
              <label>Contraseña actual</label>
              <div className="input-con-icono">
                <input
                  type={showActual ? "text" : "password"}
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowActual(!showActual)}
                >
                  {showActual ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div className="campo-form">
              <label>Nueva contraseña</label>
              <div className="input-con-icono">
                <input
                  type={showNueva ? "text" : "password"}
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowNueva(!showNueva)}
                >
                  {showNueva ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="campo-form">
              <label>Confirmar nueva contraseña</label>
              <div className="input-con-icono">
                <input
                  type={showConfirmar ? "text" : "password"}
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowConfirmar(!showConfirmar)}
                >
                  {showConfirmar ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="reset-links">
              <button className="actualizar-button" type="submit">
                Actualizar contraseña
              </button>
              <button
                type="button"
                className="actualizar-button"
                onClick={() => navigate("/login")}
              >
                Ir a Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPassword;

