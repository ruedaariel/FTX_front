import React from 'react'
import { useState } from "react";
import './style_contacto.css'
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';

const contacto = () => {
    const [form, setForm] = useState({
        nombreCompleto: '',
        correoElectronico: '',
        asunto: '',
        mensaje: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: undefined }));
    };

    const validate = () => {
        const err = {};
        if (!form.nombreCompleto.trim()) err.nombreCompleto = 'El nombre es obligatorio';
        if (!form.correoElectronico.trim()) err.correoElectronico = 'El correo es obligatorio';
        else if (!/^\S+@\S+\.\S+$/.test(form.correoElectronico)) err.correoElectronico = 'Correo inválido';
        if (!form.asunto.trim()) err.asunto = 'El asunto es obligatorio';
        if (!form.mensaje.trim()) err.mensaje = 'El mensaje es obligatorio';
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        const err = validate();
        if (Object.keys(err).length) {
            setErrors(err);
            return;
        }

        setLoading(true);
        try {

            // Cambiar a enviar a BE (cuando haya tiempo)
            const emailDestino = 'profherreratic@gmail.com';
            const asuntoCorreo = `Consulta de: ${form.nombreCompleto} - ${form.asunto}`;
            let cuerpoCorreo = `Has recibido un nuevo mensaje de contacto a través de tu sitio web:\n\n`;
            cuerpoCorreo += `Nombre Completo: ${form.nombreCompleto}\n`;
            cuerpoCorreo += `Correo Electrónico: ${form.correoElectronico}\n`;
            cuerpoCorreo += `Asunto: ${form.asunto}\n`;
            cuerpoCorreo += `Mensaje:\n${form.mensaje}\n\n`;
            cuerpoCorreo += `----------------------------------\nEste es un mensaje generado automáticamente.`;
            const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;
            window.location.href = mailtoLink;

            setStatus('success');
            setForm({ nombreCompleto: '', correoElectronico: '', asunto: '', mensaje: '' });
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderCrud title="Contacto"/>

            <div className="contact-container container mt-0 pt-5">
                <div className="row">
                    {/*  Columna Izquierda: Información de Contacto  */}
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <div className="contact-info-card">
                            <h2>Hablá con nosotros</h2>
                            <div className="info-item mt-3">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Calle Falsa 123, Ciudad Fitness, CP 45678</p>
                            </div>
                            <div className="info-item mt-3">
                                <i className="fas fa-phone-alt"></i>
                                <p>+34 900 123 456</p>
                            </div>
                            <div className="info-item mt-3">
                                <i className="fas fa-envelope"></i>
                                <p>contacto@ftxfitness.com</p>
                            </div>
                            <p className="info-item mt-4">Estamos listos para ayudarte con tus metas de fitness. Completá el formulario o
                                utilizá nuestros canales directos.</p>
                            <div className="social-icons-contact mt-3">
                                <a className="social-icon" href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                <a className="social-icon" href="https://x.com/"><i className="fab fa-twitter"></i></a>
                                <a className="social-icon" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                                <a className="social-icon" href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                <a className="social-icon" href="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></a>

                            </div>
                        </div>
                    </div>

                    {/*   Columna Derecha: Formulario de Contacto  */}
                    <div className="col-lg-7">
                        <div className="contact-form-card">
                            <h2>Envíanos un Mensaje</h2>
                            <p className="form-subtitle">Responderemos a tu consulta lo antes posible.</p>

                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.nombreCompleto ? 'is-invalid' : ''}`}
                                        id="nombreCompleto"
                                        placeholder="Tu nombre completo"
                                        autoComplete="name"
                                        value={form.nombreCompleto}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.nombreCompleto && <div className="invalid-feedback">{errors.nombreCompleto}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.correoElectronico ? 'is-invalid' : ''}`}
                                        id="correoElectronico"
                                        placeholder="tuemail@ejemplo.com"
                                        autoComplete="email"
                                        required
                                        value={form.correoElectronico}
                                        onChange={handleChange}
                                    />
                                    {errors.correoElectronico && <div className="invalid-feedback">{errors.correoElectronico}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="asunto" className="form-label">Asunto</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.asunto ? 'is-invalid' : ''}`}
                                        id="asunto"
                                        placeholder="Asunto de tu consulta"
                                        autoComplete="off"
                                        required
                                        value={form.asunto}
                                        onChange={handleChange}
                                    />
                                    {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                    <textarea
                                        className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                                        id="mensaje"
                                        rows="5"
                                        placeholder="Escribe tu mensaje aquí..."
                                        autoComplete="off"
                                        required
                                        value={form.mensaje}
                                        onChange={handleChange}
                                    />
                                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Enviando...' : 'Enviar Consulta'}
                                </button>
                            </form>

                            {status === 'success' && <div className="alert alert-success mt-3">Consulta enviada correctamente.</div>}
                            {status === 'error' && <div className="alert alert-danger mt-3">Error al enviar la consulta. Intenta más tarde.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default contacto