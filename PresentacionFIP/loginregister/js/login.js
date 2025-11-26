/*-- ==========================================================================
   Archivo: login.js
   Descripción: Lee el correo que se ingresa en reseteo_password y envia un correo. Maneja el modal aclaratorio
   ========================================================================== */
function reseteo() {
    const emailInput = document.getElementById('email');
    const modal = document.getElementById('resetModal');
    const modalEmailElement = document.getElementById('modalEmail');

    const emailValue = emailInput.value;

    if (!emailValue) {
        alert("Por favor, ingresa tu dirección de correo electrónico.");
        emailInput.focus();
        return;
    }

    const emailDestino = 'ruedaar.suscripciones@gmail.com';
    let asuntoCorreo = `Reseteo de contraseña FTX para: ${emailValue}`;
    let cuerpoCorreo = `Solicitud de reseteo de contraseña para el correo: ${emailValue}\n\n`;
    cuerpoCorreo += `Por favor, siga las instrucciones enviadas a esta dirección para completar el proceso.\n\n`;
    cuerpoCorreo += `(Este es un mensaje automático generado para la simulación de envío. En un sistema real, aquí iría un enlace de reseteo único o un código.)\n`;
    cuerpoCorreo += `Clave temporal simulada: 123456\n`;
    cuerpoCorreo += `----------------------------------\n`;
    cuerpoCorreo += `Este es una clave temporaria. Al ingresar se te pedirá cambiarla.`;

    // const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;

    // Intentar abrir el cliente de correo
    // window.location.href = mailtoLink;

    // Mostrar el modal
    modalEmailElement.textContent = emailValue;
    modal.style.display = 'flex';
     
}

// Configuración de los listeners para cerrar el modal (se ejecuta una vez que el DOM está cargado)
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('resetModal');
    const closeButton = document.querySelector('.modal .close-button');

    if (modal && closeButton) {
        // Cerrar el modal al hacer clic en el botón de cerrar (X)
        closeButton.onclick = function () {
            modal.style.display = 'none';
            window.location.href = "./login_basico.html";
        }

        // Cerrar el modal al hacer clic fuera del contenido del modal
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                window.location.href = "./login_basico.html";

            }
        }
    } else {
        if (!modal) console.error("El modal con ID 'resetModal' no fue encontrado al configurar cierres.");
        if (!closeButton) console.error("El botón de cerrar del modal no fue encontrado al configurar cierres.");
    }

   
  
});

