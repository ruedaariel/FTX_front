
import React, { useState } from 'react';
//import './Logins.css';
import { useNavigate } from 'react-router-dom';

const ReseteoPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const reseteo = () => {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un formato de correo electrónico válido.");
            return;
        }

        alert(`Se ha enviado una clave temporaria a ${email}.\n\nPor favor, revisa tu bandeja de entrada (o la carpeta de spam) y sigue las instrucciones del correo.`);

        const emailDestino = 'ruedaar.suscripciones@gmail.com';
        let asuntoCorreo = `Reseteo de contraseña FTX para: ${email}`;
        let cuerpoCorreo = `Solicitud de reseteo de contraseña para el correo: ${email}\n\n`;
        cuerpoCorreo += `Por favor, siga las instrucciones enviadas a esta dirección para completar el proceso.\n\n`;
        cuerpoCorreo += `(Este es un mensaje automático generado para la simulación de envío. En un sistema real, aquí iría un enlace de reseteo único o un código.)\n`;
        cuerpoCorreo += `Clave temporal simulada: 123456\n`;
        cuerpoCorreo += `----------------------------------\n`;
        cuerpoCorreo += `Este es una clave temporaria. Al ingresar se te pedirá cambiarla.`;

        const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;

        window.location.href = mailtoLink;
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
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>No importa, ingresá tu mail y te enviaremos una nueva contraseña</p>
                <br /><br />
                <form id="resetForm">
                    <input type="email" id="email" name="email" required placeholder=" correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="icon-validate" id="icon-email"></span>
                    <div className="input-warning" id="warn-email"></div>

                    <button id="resetear" type="button" onClick={reseteo}> Resetear </button>

                    <button id="cerrar" type="button" onClick={() => navigate('/login')}> volver </button>
                </form>
            </div>
        </div>
    );
};

export default ReseteoPassword;
