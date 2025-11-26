
import React, { useState } from 'react';
import './Logins.css';
import { useNavigate } from 'react-router-dom';

const LoginSuscripcion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        plan: 'basico',
        apellido: '',
        nombre: '',
        dni: '',
        fechaNacimiento: '',
        email: '',
        phone: '',
        genero: 'hombre'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de validación que se encuentra en validaciones.js
        // Por simplicidad, asumiré que la validación es exitosa y navegaré a la siguiente página.
        localStorage.setItem('datosSuscripcion', JSON.stringify(formData));
        navigate(`/login-perfil?dni=${formData.dni}&email=${formData.email}`);
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
                <h1>¡Hazte un FTX!</h1>
                <p>Conviértete en un FTX ahora mismo</p>
                <form id="form-registro" onSubmit={handleSubmit}>
                    <label htmlFor="plan">Plan:</label>
                    <select id="plan" name="plan" required value={formData.plan} onChange={handleChange}>
                        <option value="basico">Básico - 0 USD/ARS</option>
                        <option value="pro">Pro - 25 USD/ARS</option>
                        <option value="premiun">Premiun - 50 USD/ARS</option>
                    </select>

                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <div className="input-icon-validate">
                            <input type="text" id="apellido" name="apellido" placeholder="Tu apellido" autoComplete="family-name" className="form-control" required value={formData.apellido} onChange={handleChange} />
                            <span className="icon-validate" data-icon="apellido"></span>
                        </div>
                        <div className="input-warning text-danger" data-warn="apellido"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <div className="input-icon-validate">
                            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" className="form-control" required value={formData.nombre} onChange={handleChange} />
                            <span className="icon-validate" data-icon="nombre"></span>
                        </div>
                        <div className="input-warning text-danger" data-warn="nombre"></div>
                    </div>

                    <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <div className="input-icon-validate">
                                <input type="text" id="dni" name="dni" className="input-medium form-control" placeholder="Tu DNI (sin puntos)" autoComplete="off" required value={formData.dni} onChange={handleChange} />
                                <span className="icon-validate" data-icon="dni"></span>
                            </div>
                            <div className="input-warning text-danger" data-warn="dni"></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                            <div className="input-icon-validate">
                                <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control" required value={formData.fechaNacimiento} onChange={handleChange} />
                                <span className="icon-validate" data-icon="fechaNacimiento"></span>
                            </div>
                            <div className="input-warning text-danger" data-warn="fechaNacimiento"></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <div className="input-icon-validate">
                            <input type="email" id="email" name="email" placeholder="tuemail@ejemplo.com" className="form-control" autoComplete="email" required value={formData.email} onChange={handleChange} />
                            <span className="icon-validate" data-icon="email"></span>
                        </div>
                        <div className="input-warning" data-warn="email"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <div className="input-group input-icon-validate">
                            <span className="prefijo">+54</span>
                            <input type="tel" id="phone" name="phone" className="form-control" placeholder="5555555555" autoComplete="tel" required value={formData.phone} onChange={handleChange} />
                            <span className="icon-validate" data-icon="phone"></span>
                        </div>
                        <div className="input-warning" data-warn="phone"></div>
                    </div>

                    <label>Género:</label>
                    <div className="radio-group">
                        <label htmlFor="hombre">
                            <input type="radio" id="hombre" name="genero" value="hombre" checked={formData.genero === 'hombre'} onChange={handleChange} /> Hombre
                        </label>
                        <label htmlFor="mujer">
                            <input type="radio" id="mujer" name="genero" value="mujer" checked={formData.genero === 'mujer'} onChange={handleChange} /> Mujer
                        </label>
                        <label htmlFor="otro">
                            <input type="radio" id="otro" name="genero" value="otro" checked={formData.genero === 'otro'} onChange={handleChange} /> Otro
                        </label>
                    </div>

                    <button type="submit">Siguiente</button>
                </form>

                <p className="enlace">¿Ya eres un FTX? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
};

export default LoginSuscripcion;
