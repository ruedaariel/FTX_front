/*-- ==========================================================================
   Archivo: modificar_perfil.js
   Descripción: Permite cambiar la imagen de perfil del usuario, manejar las solapas (cada solapa agrupa distintos datos) y cargar/validar datos.
   ========================================================================== */

// ==========================================================================
//  Variables y Referencias del DOM
// ==========================================================================

// Ruta base para las imágenes de perfil
const ruta = "../../Recursos/Imagenes/";

// Referencias a los elementos de la imagen de perfil
const perfilImagenInput = document.getElementById("perfilImagenInput");
const perfilImagenPreview = document.getElementById("perfilImagenPreview");

// Referencias a los campos de contraseña 
const contrasenaInput = document.getElementById("contrasena");
const verifContrasena = document.getElementById("verficaContrasena");


// Expresión regular para validar contraseñas 
// Requisitos: Al menos una letra mayúscula, Al menos un número, Al menos una letra minúscula, Tenga entre 9 y 16 caracteres.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const validacionesCampos = {
  apellido: [/^.{2,}$/, "El apellido debe tener al menos 2 caracteres"],
  nombre: [/^.{2,}$/, "El nombre debe tener al menos 2 caracteres"],
  dni: [/^\d{7,8}$/, "El dni debe tener 7 u 8 dígitos sin puntos"],
  phone: [/^\d{10}$/, "El teléfono debe tener entre 7 y 10 dígitos numéricos"],
  estatura: [/^(?:5\d|[6-9]\d|1\d{2}|2[0-6]\d|27[0-2])$/, "Estatura entre 50 y 272 cm"],
  email: [/^[^\s@]+@[^\s@]+\.(com|net|org)$/, "Formato de email no válido"],
  peso: [/^(?:[1-9]\d{1,2})(?:\.\d{1,3})?$/, "Debe ingresar un peso entre 30 y 150 kg"],
  estatura: [/^\d{2,3}$/, "La estatura debe estar entre 50 y 250 cm"],
  restric_med: [/^.{3,}$/, "En restricciones medicas sevdebe escribir al menos 3 caracteres"]
  
};

/* ¿Qué hace esta expresión?
^ y $ indican el inicio y fin de la cadena.
(?=.*[a-z]) asegura que haya al menos una letra minúscula.
(?=.*[A-Z]) asegura que haya al menos una letra mayúscula.
(?=.*\d) asegura que haya al menos un dígito.
[A-Za-z\d]{8,} asegura que la contraseña tenga al menos 8 caracteres y solo contenga letras (mayúsculas o minúsculas) y números. */


// ==========================================================================
//  Manejo de Eventos
// ==========================================================================

// Event listener para cambiar la imagen de perfil cuando se selecciona un archivo
if (perfilImagenInput && perfilImagenPreview) {
  perfilImagenInput.addEventListener("change", function (event) {
    // Se ejecuta cuando cambia el archivo seleccionado
    const file = event.target.files[0];
    if (file) {
      // Si es un archivo, se carga y se previsualiza
      const reader = new FileReader();
      reader.onload = function (e) {
        perfilImagenPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Si no se selecciona archivo, se muestra la imagen por defecto
      perfilImagenPreview.src = ruta + "usuario.png";
    }
  });
}

// Event listener para verificar la contraseña actual al perder el foco del input
if (contrasenaInput) {
  contrasenaInput.addEventListener("blur", function () {
    console.log("Evento blur disparado en contrasenaInput."); // Log para verificar si el listener se dispara
    verificarContrasenaBackend();
  });
}

// Event listener para validar las contraseñas al perder el foco del input de verificación
if (verifContrasena) {
  verifContrasena.addEventListener("blur", function () {
    validarContrasenas();
  });
}

// Lógica para mostrar/ocultar contraseñas al hacer clic en los iconos
const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("mousedown", function (e) {
    e.preventDefault(); // Evita que el foco se pierda

    const targetId = this.dataset.target;
    const passwordInput = document.getElementById(targetId);

    // Alternar el tipo de input entre 'password' y 'text'
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Alternar el ícono de ojo abierto/cerrado
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");

    // Asegura que el input mantenga el foco
    passwordInput.focus();
  });
});

// Lógica para mostrar las condiciones de contraseña al interactuar con info-icon
const infoIcons = document.querySelectorAll(".info-icon");
infoIcons.forEach((icon) => {
  const conditionsRaw = icon.dataset.info;
  // Formatear las condiciones para el modal (reemplaza // por - y \n por <br>)
  const conditionsFormatted = conditionsRaw
    .replace(/\/\//g, "- ")
    .replace(/\n/g, "<br>");

  // Mostrar modal al hacer clic en el icono de información
  icon.addEventListener("click", function () {
    mostrarModal("Condiciones de Contraseña", conditionsFormatted, "info", false);
  });
});

// Event listener para el envío del formulario de perfil
document.getElementById("perfilForm").addEventListener("submit", function (event) {
 
  event.preventDefault();

  const pestañaActiva = document.querySelector(".pestaña-item.active");
  if (!pestañaActiva) {
    console.warn("No se encontró ninguna pestaña activa.");
    return; // Detener si no hay pestaña activa
  }

  const formData = {};
  let tieneError = false; // Bandera para verificar si hay errores en la pestaña activa
  let errorMessages = []; // Array para acumular mensajes de error de cualquier tipo

  // Validar contraseña actual si se está en la pestaña de Imagen y Suscripción y el campo no está vacío
  if (pestañaActiva.id === "imagenSuscripcion" && contrasenaInput && // Usar contrasenaInput en lugar de contrasenaActualInput
    contrasenaInput.value) {
    if (!passwordRegex.test(contrasenaInput.value)) {
      errorMessages.push(
        "La contraseña actual no cumple con los requisitos de formato."
      );
      tieneError = true;
    }
  }

  // Validar y recolectar datos según la pestaña activa
  if (pestañaActiva.id === "imagenSuscripcion") {
    // La validación de nueva contraseña y confirmación se maneja por eventos de input individuales (blur)
    // Solo recolectar datos de esta pestaña
    const inputs = pestañaActiva.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.name) { formData[input.name] = input.value; }
    });
  } else
    if (pestañaActiva.id === "datosPersonales") {
      console.log("Pestaña activa: Datos Personales");
      const inputs = pestañaActiva.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        const valor = input.value.trim();
        const id = input.id;
        if (input.required && !valor) {
          label = input.previousElementSibling?.textContent.replace(":", "").trim() || id;//utiliza el label envez del input, es + lindo, entendible
          errorMessages.push(`El campo "${label}" es requerido.`);
          tieneError = true; // Marcar que hay errores
        }
        if (validacionesCampos[id]) { //busca la exp reg y el mens de error en el arreglo
          const [regex, mensaje] = validacionesCampos[id];
          if (!regex.test(valor)) {
            errorMessages.push(mensaje);
            tieneError = true;
          }
        }
        if (input.name) { //chequea que exista (no undefined) y guarda el valor en formData
          formData[input.name] = input.value;
        }
      });
    } else if (pestañaActiva.id === "datosFisicos") {
      console.log("Pestaña activa: Datos Físicos");
      const inputs = pestañaActiva.querySelectorAll(
        "input, select, textarea"
      );
      inputs.forEach((input) => {
        const valor = input.value.trim();
        const id = input.id;

        if (input.required && !input.value.trim()) {
          const label = input.previousElementSibling?.textContent.replace(":", "").trim() || id;
          errorMessages.push(`El campo "${label}" es requerido.`);
          tieneError = true; 
        }
        if (input.id === "peso") { 
          if (validacionesCampos[input.id]) { //busca la exp reg y el mens de error en el arreglo
            const [regex, mensaje] = validacionesCampos[id];
            if (!regex.test(valor) || parseInt(input.value.trim()) < 30 || parseInt(input.value.trim()) > 150) {
              errorMessages.push(mensaje);
              tieneError = true;
            }
          }
        } else {
          if (input.id === "estatura") {
            if (validacionesCampos[id]) { //busca la exp reg y el mens de error en el arreglo
              const [regex, mensaje] = validacionesCampos[id];
              if (!regex.test(valor) || parseInt(input.value.trim()) < 50 || parseInt(input.value.trim()) > 250) {
                errorMessages.push(mensaje);
                tieneError = true;
              }
            }
          } else {
            if (validacionesCampos[id]) { //busca la exp reg y el mens de error en el arreglo
              const [regex, mensaje] = validacionesCampos[id];
              if (!regex.test(valor)) {
                errorMessages.push(mensaje);
                tieneError = true;
              }
            }
          }

        }
        if (input.name) {
          formData[input.name] = input.value;
        }
      });
    }

  // Si hay errores acumulados, mostrar el modal de errores y detener el envío
  if (errorMessages.length > 0) {
    mostrarModal("Errores de Validación", errorMessages.join("<br>"), "error", false);
    return;
  }

  // Si no hay errores, proceder con el envío de datos (simulado o real)
  console.log("Datos del formulario a enviar:", formData);
  
  // enviar datos al backend
  

  mostrarModal("Éxito", "Datos guardados exitosamente.", "success", false);
});


// ==========================================================================
//  Funciones de Manejo de UI (Solapas)
// ==========================================================================

// Función para abrir una pestaña de perfil específica
function abrirPestañaPerfil(evt, pestañanombre) {
  var i, pestañaContentenido, pestañalinks;

  // Oculta todos los contenidos de las pestañas y remueve la clase 'active'
  pestañaContentenido = document.getElementsByClassName("pestaña-item");
  for (i = 0; i < pestañaContentenido.length; i++) {
    pestañaContentenido[i].style.display = "none";
    pestañaContentenido[i].classList.remove("active");
  }

  // Remueve la clase 'active' de todos los enlaces de las pestañas
  pestañalinks = document.getElementsByClassName("pestaña-link");
  for (i = 0; i < pestañalinks.length; i++) {
    pestañalinks[i].classList.remove("active");
  }

  // Muestra el contenido de la pestaña seleccionada y agrega la clase 'active'
  document.getElementById(pestañanombre).style.display = "block";
  document.getElementById(pestañanombre).classList.add("active");

  // Agrega la clase 'active' al enlace de la pestaña que disparó el evento
  if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");

  // Muestra los datos correspondientes a la pestaña activa
  if (pestañanombre == "datosPersonales") {
    mostrarDatosPersonales();
  } else if (pestañanombre == "datosFisicos") {
    mostrarDatosFisicos();
  } else if (pestañanombre == "imagenSuscripcion") { // Asegurar que se llama a la función correcta
    mostrarImagenSuscripcion();
  }
}

// Función para mostrar los datos de la pestaña Imagen y Suscripción
function mostrarImagenSuscripcion() {
  // Verifica si perfilData está definido (asumiendo que viene de otro lado)
  if (typeof perfilData === "undefined") {
    console.warn("No se encontró perfilData. ");
    return;
  }

  // Cargar imagen y plan desde perfilData
  document.getElementById("perfilImagenPreview").src = ruta + perfilData.imagen;
  document.getElementById("plan").value = perfilData.plan;
}

// Función para mostrar los datos de la pestaña Datos Personales
function mostrarDatosPersonales() {
  // Verifica si perfilData está definido
  if (typeof perfilData === "undefined") {
    console.warn("No se encontró perfilData. ");
    return;
  }
  // Cargar campos personales desde perfilData
  document.getElementById("nombre").value = perfilData.nombre;
  document.getElementById("apellido").value = perfilData.apellido;
  document.getElementById("dni").value = perfilData.dni;
  document.getElementById("email").value = perfilData.email;
  document.getElementById("phone").value = perfilData.telefono;
}

// Función para mostrar los datos de la pestaña Datos Físicos
function mostrarDatosFisicos() {
  // Verifica si perfilData está definido
  if (typeof perfilData === "undefined") {
    console.warn("No se encontró perfilData. ");
    return;
  }
  // Carga los datos físicos desde perfilData
  document.getElementById("peso").value = perfilData.peso;
  document.getElementById("estatura").value = perfilData.estatura;
  document.getElementById("metas").value = perfilData.metas;
  document.getElementById("restric_med").value = perfilData.restric_med;
}


// ==========================================================================
//  Funciones de Validación
// ==========================================================================

// Función para verificar la contraseña actual en el backend (TODO)
function verificarContrasenaBackend() {
  const contrasenaActual = document.getElementById("contrasena").value;
  console.log(
    "Verificando contraseña actual en el backend:",
    contrasenaActual
  );

  

}

// Función para validar que las nuevas contraseñas coincidan y cumplan el formato
function validarContrasenas() {
  const nuevaContrasenaInput = document.getElementById("nuevaContrasena");
  const verificaContrasenaInput =
    document.getElementById("verficaContrasena");

  // Verifica si los elementos existen antes de acceder a su valor
  if (!nuevaContrasenaInput || !verificaContrasenaInput) {
    console.warn("Elementos de contraseña no encontrados.");
    return;
  }

  const nuevaContrasena = nuevaContrasenaInput.value;
  const verificaContrasena = verificaContrasenaInput.value;

  // Si ambos campos están vacíos, no se realiza validación
  if (nuevaContrasena === "" && verificaContrasena === "") {
    return;
  }

  // Verifica si las contraseñas no coinciden
  if (nuevaContrasena !== verificaContrasena) {
    mostrarModal("Aviso! ", "Las Contraseñas no coinciden", "warning", false);
    return; // Detener la validación si no coinciden
  }

  // Verifica si la nueva contraseña cumple con el formato requerido
  if (!passwordRegex.test(nuevaContrasena)) {
    mostrarModal("Aviso! ", "La contraseña ingresada no cumple con las condiciones", "warning", false);
    nuevaContrasenaInput.focus();
    return; 
  }
}


// ==========================================================================
//  Inicialización
// ==========================================================================

// Cuando el documento se carga completamente, se selecciona la primer pestaña por defecto
document.addEventListener("DOMContentLoaded", function () {
 

  // Mostrar la primera solapa por defecto simulando un clic
  const firstpestañaLink = document.querySelector(
    ".pestaña-buttons .pestaña-link"
  );
  if (firstpestañaLink) {
    firstpestañaLink.click(); // Simula un clic para activar la lógica de la pestaña
  }
});

