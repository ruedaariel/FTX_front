import React, { useState } from 'react';

import './LoginBasico.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from '../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png';
import video from '../../../assets/Recursos/Videos/competenciaNeuquen.mp4';



const LoginBasico = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [warnEmail, setWarnEmail] = useState('');
    const [warnPassword, setWarnPassword] = useState('');

    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        borderClass: ''
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset warnings
        setWarnEmail('');
        setWarnPassword('');

        if (!emailRegex.test(email)) {
            setWarnEmail('Por favor, introduce un email válido.');
            isValid = false;
        }

        if (!passwordRegex.test(password)) {
            setWarnPassword('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
            isValid = false;
        }
        
        if (password.length === 0) {
            setWarnPassword('La contraseña no puede estar vacía.');
            isValid = false;
        }


        if (!isValid) {
            setModal({
                isOpen: true,
                title: 'Error de Validación',
                message: 'Usuario o contraseña incorrectos.',
                borderClass: 'modal-error-border'
            });
            return;
        }

        // Lógica de autenticación (hardcoded como en el original)
        if (email === 'mauricio@ejemplo.com' && password === 'Mauricio2025') {
            // En una app real, aquí usarías react-router-dom para navegar
            // Ejemplo: navigate('/usuario/home');
            console.log('Redirigiendo a home_usuario.html');
            window.location.href = '../Usuario/home_usuario.html'; 
        } else if (email === 'admin@ejemplo.com' && password === 'Admin2025') {
            console.log('Redirigiendo a home_administrador.html');
            window.location.href = '../Administrador/home_administrador.html';
        } else {

            
            setModal({
                isOpen: true,
                title: 'Error de Acceso',
                message: `${email} no es un usuario válido o la contraseña es incorrecta.`,
                borderClass: 'modal-error-border'
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, title: '', message: '', borderClass: ''  });
        
    };

    return (
        <div className="login-body">
            <header className="login-header">
                <nav className="navbar navbar-dark">
                    {/* Idealmente, usar Link de react-router-dom */}
                    <a className="navbar-brand" href="../index.html">
                        <img src={Logo} alt="logo FTX" />
                        FTX
                    </a>
                </nav>
            </header>

            <div className="login-container">
                <div className="video-section">
                    <video autoPlay muted loop playsInline>
                        <source src={video} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                </div>
                <div className="login-section login-basico">
                    <h1>Bienvenido</h1>
                    <p>Ingresa tus credenciales</p>
                    <form id="form-login" onSubmit={handleLogin}>
                        <div className="input-icon-validate">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Correo"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-warning">{warnEmail}</div>

                        <div className="input-icon-validate">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                autoComplete="off"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className={`icon-validate toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></span>
                        </div>
                        <div className="input-warning">{warnPassword}</div>

                        <p className="enlace">
                            ¿Olvidaste el password? <a href="reseteo_password.html">Ir a resetear</a>
                        </p>

                        <button id="iniciar" type="submit">Iniciar Sesión</button>
                    </form>
                    <p className="enlace">
                        ¿No tienes cuenta? <a href="login_suscripcion.html">Regístrate</a>
                    </p>
                </div>
            </div>

            {modal.isOpen && (
                <div id="genericModal" className="modal">
                    {/* <div className="modal-content"> */}
                    <div className={`modal-content ${modal.borderClass || ''}`}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h1 id="genericModalTitle">{modal.title}</h1>
                        <p id="genericModalMessage">{modal.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginBasico;
