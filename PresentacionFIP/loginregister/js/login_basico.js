/*-- ==========================================================================
   Archivo: login_basico.js
   Descripción: Permite el manejo del modal de error de login_basico.html, 
   redirige la entrada al home del usuario o al home del admin
   ========================================================================== */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

/* ¿Qué hace esta expresión?
^ y $ indican el inicio y fin de la cadena.
(?=.*[a-z]) asegura que haya al menos una letra minúscula.
(?=.*[A-Z]) asegura que haya al menos una letra mayúscula.
(?=.*\d) asegura que haya al menos un dígito.
[A-Za-z\d]{8,} asegura que la contraseña tenga al menos 8 caracteres y solo contenga letras (mayúsculas o minúsculas) y números. */



// Manejo del modal de error y redirección al home del usuario o del administrador

function validarSesion() {
  /* leo los datos ingresado */
  
  const password = document.getElementById("password").value;
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value;

  

  // Validar formato de email o contrseña no nula
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!emailRegex.test(emailValue) || password.length === 0 || !passwordRegex.test(password)) {
    
    
    mostrarModal("Error de Validación","Usuario o contraseña incorrectos.","warning",true);

    return; // Detener la ejecución si la validación falla
  }

  /* valido que sea un usuario existente y lo envio a home_usuario*/
  /* caso contrario muestro modal de error*/

  if (emailValue === "mauricio@ejemplo.com" && password === "Mauricio2025") {
    window.location.href = "../Usuario/home_usuario.html"; // Redirige al home del usuario
  } else if (emailValue === "admin@ejemplo.com" && password === "Admin2025") {
    window.location.href = "../Administrador/home_administrador.html"; // Redirige al home del administrador
  } else {

    mostrarModal("Error de Validación",`${emailValue} no es un usuario valido.`, "warning",true);
  }
}

function grabarPerfil (){

  
mostrarModal("Guardar Perfil","Perfil de Usuario grabado correctamente.", "success",true);
//window.location.href = "../Usuario/home_usuario.html"; // Redirige al home del usuario

setTimeout(() => {
    window.location.href = "../Usuario/home_usuario.html"; // Redirige al home del usuario
  }, 2000); // 2000 milisegundos = 2 segundos



}

// ==========================================================================
//  Manejo de Eventos y Lógica de UI
// ==========================================================================


document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('icon-password');

    // El icono inicial ya está en el HTML con la clase fa-eye

    togglePasswordIcon.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Alternar las clases de Font Awesome
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});
