/* Para envio del correo en la pagina de Contacto */
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombreCompleto').value;
    const email = document.getElementById('correoElectronico').value;
    const asuntoFormulario = document.getElementById('asunto').value; // Renombrado para evitar conflicto con la variable 'asunto' del mailto
    const mensaje = document.getElementById('mensaje').value;

    // Dirección de correo de destino
    const emailDestino = 'profherreratic@gmail.com';

    // Asunto del correo
    let asuntoCorreo = `Consulta de: ${nombre} - ${asuntoFormulario}`;

    // Cuerpo del correo
    let cuerpoCorreo = `Has recibido un nuevo mensaje de contacto a través de tu sitio web:\n\n`;
    cuerpoCorreo += `Nombre Completo: ${nombre}\n`;
    cuerpoCorreo += `Correo Electrónico: ${email}\n`;
    cuerpoCorreo += `Asunto: ${asuntoFormulario}\n`;
    cuerpoCorreo += `Mensaje:\n${mensaje}\n\n`;
    cuerpoCorreo += `----------------------------------\n`;
    cuerpoCorreo += `Este es un mensaje generado automáticamente.`;

    // Codificar los componentes para la URL mailto
    const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;
    Swal.fire('Se abrirá tu cliente de correo para enviar el mensaje. Por favor, revisa y envía el correo.');
    // Abrir el cliente de correo

    setTimeout(function () {
        window.location.href = mailtoLink; /*para darle tiempo a que lea el mensaje anterior*/
        window.location.href = "index.html";
    }, 3000);
});