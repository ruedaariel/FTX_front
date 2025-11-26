import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function politica_privacidad() {
 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5> Política de Privacidad</h5>
                        <p> Última actualización: mayo 2025</p>

                        <h5>1. Introducción</h5>
                        <p>Bienvenido/a a <strong>FTX Training</strong>. Nos tomamos muy en serio tu privacidad y
                            queremos
                            asegurarnos de que comprendas cómo recopilamos, usamos y protegemos tu información.</p>

                        <h5>2. Información que recopilamos</h5>
                        <p> Podemos recopilar los siguientes datos cuando utilizas nuestra app:</p>
                        <p>🔹 Datos personales (nombre, correo electrónico, edad, etc.)</p>
                        <p>🔹 Información de progreso y actividad física</p>
                        <p>🔹 Datos de pago (solo para planes Pro y Premium)</p>
                        <p>🔹 Datos técnicos y de uso (dirección IP, tipo de dispositivo, etc.)</p>

                        <h5>3. Cómo utilizamos tu información</h5>
                        <p>Usamos tu información para:</p>
                        <p>🔹 Personalizar tus rutinas y mostrar tu progreso</p>
                        <p>🔹 Administrar tu cuenta y el acceso a diferentes planes</p>
                        <p>🔹 Mejorar nuestros servicios y realizar análisis internos</p>
                        <p>🔹 Registrar pagos de planes Pro y Premium</p>
                        <p>🔹 Enviar comunicaciones relevantes, siempre con tu consentimiento</p>

                        <h5>4. Divulgación de Información</h5>
                        <p>Tu información NO será vendida ni compartida con terceros sin tu consentimiento, excepto en
                            los siguientes casos:</p>
                        <p>🔹 Cumplimiento legal</p>
                        <p>🔹 Procesadores de pago y servicios relacionados</p>
                        <p>🔹 Proveedores que nos ayudan a mejorar la plataforma</p>
                        <h5>5. Seguridad de los datos</h5>

                        <p>Implementamos medidas de seguridad para proteger tu información, pero ninguna plataforma es
                            100% segura. En caso de una brecha de seguridad, te informaremos oportunamente.</p>

                        <h5>6. Tus derechos</h5>
                        <p>Tienes derecho a acceder, modificar o eliminar tus datos. Para hacerlo, puedes contactarnos a
                            <strong>[correo de soporte]</strong>.
                        </p>

                        <h5>7. Modificaciones a la política de privacidad</h5>
                        <p>Nos reservamos el derecho de actualizar esta política en el futuro. Cualquier cambio se
                            notificará en nuestra web o por correo.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cerrar</Button>
          
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default politica_privacidad;