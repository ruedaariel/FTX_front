
import React, { useState } from 'react';
import './Logins.css';
import { useNavigate } from 'react-router-dom';

const LoginBasico = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validarSesion = () => {
        if (!emailRegex.test(email) || password.length === 0 || !passwordRegex.test(password)) {
            alert("Usuario o contraseña incorrectos.");
            return;
        }

        if (email === "mauricio@ejemplo.com" && password === "Mauricio2025") {
            navigate("/usuario");
        } else if (email === "admin@ejemplo.com" && password === "Admin2025") {
            navigate("/admin");
        } else {
            alert(`${email} no es un usuario valido.`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <div className="video-section">
                <video autoPlay muted loop playsInline>
                    <source src="../Recursos/Videos/competenciaNeuquen.mp4" type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
            <div className="login-section login-basico">
                <h1>Bienvenido</h1>
                <p>Ingresa tus credenciales</p>
                <form id="form-login">
                    <div className="input-icon-validate">
                        <input type="email" id="email" name="email" autoComplete="email" placeholder=" correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="icon-validate" id="icon-email"></span>
                    </div>
                    <div className="input-warning" id="warn-email"></div>

                    <div className="input-icon-validate">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="off" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className={`icon-validate toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="icon-password" onClick={toggleShowPassword}></span>
                    </div>
                    <div className="input-warning" id="warn-password"></div>

                    <p className="enlace">¿Olvidaste el password? <a href="/reseteo-password">Ir a resetear</a></p>

                    <button id="iniciar" type="button" onClick={validarSesion}> Iniciar Sesion </button>
                </form>
                <p className="enlace">¿No tienes cuenta? <a href="/suscripcion">Regístrate</a></p>
            </div>
        </div>
    );
};

export default LoginBasico;
