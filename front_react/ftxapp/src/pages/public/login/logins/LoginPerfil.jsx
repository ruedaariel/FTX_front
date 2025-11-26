
import React, { useState, useEffect } from 'react';
import './Logins.css';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPerfil = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        actividad: 'diaria',
        peso: '',
        estatura: '',
        metas: 'perder_peso',
        restric_med: ''
    });

    const [suscripcionData, setSuscripcionData] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('datosSuscripcion'));
        if (data) {
            setSuscripcionData(data);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const grabarPerfil = async () => {
        const searchParams = new URLSearchParams(location.search);
        const dni = searchParams.get('dni');
        const email = searchParams.get('email');

        const usuarioData = {
            ...suscripcionData,
            actividadFisica: formData.actividad,
            peso: parseFloat(formData.peso),
            estatura: parseInt(formData.estatura),
            metas: formData.metas,
            restriccionesMedicas: formData.restric_med,
            dni: dni,
            email: email
        };

        console.log("Datos del usuario para registrar:", usuarioData);

        // Simulación de llamada a la API
        try {
            console.log('Simulación de registro exitoso. Redirigiendo a login_basico.html');
            alert("Tu perfil ha sido guardado exitosamente (simulado).");
            localStorage.removeItem('datosSuscripcion'); // Limpiar datos temporales
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirigir después de 2 segundos

        } catch (error) {
            console.error('Error de conexión o inesperado:', error);
            alert("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="container">
            <div className="video-section">
                <video autoPlay muted loop playsInline>
                    <source src="../Recursos/Videos/competenciaNeuquen.mp4" type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
            <div className="login-section">
                <h1>¡Carga tu perfil FTX!</h1>
                <form id="form-perfil">
                    <label htmlFor="actividad">Nivel Actividad Fisica:</label>
                    <select id="actividad" name="actividad" required value={formData.actividad} onChange={handleChange}>
                        <option value="diaria">Actividad diaria</option>
                        <option value="semanal2"> Semanal 2 veces</option>
                        <option value="semanal3"> Semanal 3 veces</option>
                        <option value="sedentario">Sedentario</option>
                    </select>

                    <div className="form-group">
                        <label htmlFor="peso">Tu peso(kg):</label>
                        <div className="input-icon-validate">
                            <input type="text" id="peso" name="peso" className="input-medium form-control" placeholder="85" autoComplete="off" value={formData.peso} onChange={handleChange} />
                            <span className="icon-validate" data-icon="peso"></span>
                        </div>
                        <div className="input-warning" data-warn="peso"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="estatura">Tu estatura(cm):</label>
                        <div className="input-icon-validate">
                            <input type="number" id="estatura" name="estatura" className="input-medium form-control" placeholder="185" autoComplete="off" required step="1" value={formData.estatura} onChange={handleChange} />
                            <span className="icon-validate" data-icon="estatura"></span>
                        </div>
                        <div className="input-warning" data-warn="estatura"></div>
                    </div>

                    <label htmlFor="metas">Tus metas:</label>
                    <select id="metas" name="metas" required value={formData.metas} onChange={handleChange}>
                        <option value="perder_peso">Perder Peso</option>
                        <option value="ganar_musculo">Ganar musculatura</option>
                        <option value="aerobico">Resistencia Aeróbica</option>
                        <option value="mantener">Mantener Estado Físico</option>
                    </select>

                    <div className="form-group">
                        <label htmlFor="restric_med">Restricciones o Condiciones Medicas:</label>
                        <div className="input-icon-validate">
                            <textarea rows="4" id="restric_med" name="restric_med" placeholder="Escribe aquí si tienes alguna condición médica relevante..." value={formData.restric_med} onChange={handleChange}></textarea>
                            <span className="icon-validate" data-icon="restric_med"></span>
                        </div>
                        <div className="input-warning" data-warn="restric_med"></div>
                    </div>

                    <button id="guardarPerfil" type="button" onClick={grabarPerfil}> Guardar Perfil </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPerfil;
