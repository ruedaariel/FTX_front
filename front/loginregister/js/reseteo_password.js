/*-- ==========================================================================
   Archivo: login.js
   Descripción: Lee el correo que se ingresa en reseteo_password y envia un correo. Maneja el modal aclaratorio
   ========================================================================== */

function reseteo() {
  // Leo los datos ingresados
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value;

  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {

  mostrarModal("Error de Validación", "Por favor, ingresa un formato de correo electrónico válido.", "warning", true);
    

    return; // Detener la ejecución si la validación falla
  }

  // Si el formato es correcto, configurar y mostrar modal de confirmación de reseteo
  
  mostrarModal("Confirmación de Reseteo",`Se ha enviado una clave temporaria a <strong>${emailValue}</strong>.
  
  <br><br>Por favor, revisa tu bandeja de entrada (o la carpeta de spam) y sigue las instrucciones del correo.<br>`, "success", true);

  /*
  GENERAR LA CLAVE
  MODIFICAR EN el BE
  */
  const emailDestino = 'ruedaar.suscripciones@gmail.com';
    let asuntoCorreo = `Reseteo de contraseña FTX para: ${emailValue}`;
    let cuerpoCorreo = `Solicitud de reseteo de contraseña para el correo: ${emailValue}\n\n`;
    cuerpoCorreo += `Por favor, siga las instrucciones enviadas a esta dirección para completar el proceso.\n\n`;
    cuerpoCorreo += `(Este es un mensaje automático generado para la simulación de envío. En un sistema real, aquí iría un enlace de reseteo único o un código.)\n`;
    cuerpoCorreo += `Clave temporal simulada: 123456\n`;
    cuerpoCorreo += `----------------------------------\n`;
    cuerpoCorreo += `Este es una clave temporaria. Al ingresar se te pedirá cambiarla.`; 

   const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;

  // Intentar abrir el cliente de correo
   window.location.href = mailtoLink;
}
