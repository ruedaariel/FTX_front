import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function Footer() {

    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    return (
        <>
            <footer>
                <div className="container">
                    <p>&copy; 2025 FTX Fitness. Todos los derechos reservados.</p>
                    <p>
                        <Link to="/" onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        }} className="footer-a">Inicio</Link> |
                        <Link to="/contacto" className="footer-a" onClick={() => handleNavClick()}>Contacto</Link> |

                        <a role="button" onClick={() => setShowPrivacy(true)} className="footer-a">Política de Privacidad</a> |

                        <a role="button" onClick={() => setShowTerms(true)} className="footer-a">Terminos de Servicio</a>


                    </p>
                    <div className="footer-social">
                        <a href="https://x.com/?lang=es" target="_blank " className="me-2 footer-a"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.facebook.com" target="_blank " className="me-2 footer-a"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/" target="_blank " className="me-2 footer-a"><i className="fab fa-instagram"></i></a>

                        <a href="https://www.linkedin.com/" target="_blank " className="me-2 footer-a"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://www.youtube.com/" target="_blank " className="me-2 footer-a"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
            </footer>
            <Modal contentClassName="modal-landing" show={showPrivacy} onHide={() => setShowPrivacy(false)} centered style={{ background: '#b0b0b0', color: '#232323' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Política de Privacidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Última actualización: mayo 2025</p>
                    <h5>1. Introducción</h5>
                    <p>Bienvenido/a a <strong>FTX Training
                    </strong>. Nos tomamos muy en serio tu privacidad y queremos asegurarnos de que comprendas cómo recopilamos, usamos y protegemos tu información.</p>
                    <h5>2. Información que recopilamos</h5>
                    <p>Podemos recopilar los siguientes datos cuando utilizas nuestra app:<br />

                        🔸 Datos personales (nombre, correo electrónico, edad, etc.)<br />

                        🔸 Información de progreso y actividad física<br />

                        🔸 Datos de pago (solo para planes Pro y Premium)<br />

                        🔸 Datos técnicos y de uso (dirección IP, tipo de dispositivo, etc.)</p>
                    <h5>3. Cómo utilizamos tu información</h5>
                    <p>Usamos tu información para:<br />

                        🔸 Personalizar tus rutinas y mostrar tu progreso<br />

                        🔸 Administrar tu cuenta y el acceso a diferentes planes<br />

                        🔸 Mejorar nuestros servicios y realizar análisis internos<br />

                        🔸 Registrar pagos de planes Pro y Premium<br />

                        🔸 Enviar comunicaciones relevantes, siempre con tu consentimiento</p>
                    <h5>4. Divulgación de Información</h5>
                    <p>Tu información NO será vendida ni compartida con terceros sin tu consentimiento, excepto en los siguientes casos:<br />

                        🔸 Cumplimiento legal<br />

                        🔸 Procesadores de pago y servicios relacionados<br />

                        🔸 Proveedores que nos ayudan a mejorar la plataforma</p>
                    <h5>5. Seguridad de los datos</h5>
                    <p>Implementamos medidas de seguridad para proteger tu información, pero ninguna plataforma es 100% segura. En caso de una brecha de seguridad, te informaremos oportunamente.</p>
                    <h5>6. Tus derechos</h5>
                    <p>Tienes derecho a acceder, modificar o eliminar tus datos. Para hacerlo, puedes contactarnos a [correo de soporte].</p>
                    <h5>7. Modificaciones a la política de privacidad</h5>
                    <p>Nos reservamos el derecho de actualizar esta política en el futuro. Cualquier cambio se notificará en nuestra web o por correo.</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPrivacy(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal contentClassName="modal-landing" show={showTerms} onHide={() => setShowTerms(false)} centered style={{ background: '#b0b0b0', color: '#232323' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Términos de Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Introducción</h5>
                    <p>
                        Bienvenido/a a <strong>FTX Training</strong>. Al utilizar nuestra
                        plataforma, aceptas cumplir con los siguientes términos.
                    </p>

                    <h5>Descripción del Servicio</h5>
                    <p>
                        <strong>FTX Training</strong> es una plataforma de fitness que
                        ofrece rutinas de ejercicio, seguimiento de progreso y opciones de
                        suscripción (<em>Básico, Pro y Premium</em>).
                    </p>

                    <h5>Registro y Cuentas</h5>
                    <p>🔸 Para acceder a ciertas funciones, debes crear una cuenta.</p>
                    <p>🔸 La información proporcionada debe ser precisa y actualizada.</p>
                    <p>🔸 Eres responsable de la seguridad de tu cuenta y contraseña.</p>

                    <h5>Planes y Pagos</h5>
                    <p>
                        El plan <strong>Básico</strong> es gratuito, mientras que los
                        planes <strong>Pro y Premium</strong> requieren un pago mensual.
                    </p>

                    <h5>Uso Adecuado del Servicio</h5>
                    <p>
                        No debes compartir, vender o usar ilegalmente el contenido de la
                        plataforma.
                    </p>

                    <h5>Modificaciones en los Términos</h5>
                    <p>
                        Nos reservamos el derecho de actualizar estos términos en cualquier
                        momento.
                    </p>

                    <h5>Contacto</h5>
                    <p>
                        Si tienes dudas sobre estos términos, puedes escribirnos a{" "}
                        <strong>[correo de soporte ACTUALIZAR]</strong>.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTerms(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export default Footer