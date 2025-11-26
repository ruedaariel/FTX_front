//espera a que el DOM esté completamente cargado y lanza los listener para hacer validaciones en linea
document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById("form-perfil");
    //escucha cuando hay un input en el form
    contenedor.addEventListener('input', function (event) {
        const input = event.target;

        if (input.id === "peso") { //peso entre 30 y 150, numeros reales con hasta 3 decimales
            const valor = input.value.trim();
            const numero = parseFloat(valor);
            const regex = /^(?:[1-9]\d{1,2})(?:\.\d{1,3})?$/;

            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            const mensaje = "Debe ingresar un peso entre 30 y 150 kg";

            // Verificamos regex primero y luego rango
            const valido = regex.test(valor) && numero >= 30 && numero <= 150;

            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "estatura") { //numero entero entre 50 y 250
            const valor = input.value.trim();
            const numero = parseInt(valor);
            const regex = /^\d{2,3}$/; // permite entre 2 y 3 dígitos numéricos

            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            const mensaje = "La estatura debe estar entre 50 y 250 cm";

            // Validar que tenga solo números y esté en el rango fisiológico aceptado
            const valido = regex.test(valor) && numero >= 50 && numero <= 250;

            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "restric_med") {

            validarTextoLibre(
                input,
                /^.{3,}$/, // al menos 3 caracteres, incluyendo espacios
                "Debe escribir al menos 3 caracteres"
            );
        }

    });





});

function validarTextoLibre(input, regex, mensajeError) {
    const campo = input.name.replace("[]", "");
    const grupo = input.closest(".form-group");
    const icon = grupo.querySelector(`[data-icon="${campo}"]`);
    const warn = grupo.querySelector(`[data-warn="${campo}"]`);

    const valor = input.value.trim();
    const valido = regex.test(valor);

    actualizarEstado(valido, icon, warn, mensajeError);
}

function actualizarEstado(valido, icon, warn, mensaje) {
    console.log(warn);

    if (valido) {
        icon.className = "icon-validate valid";
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
        warn.style.display = "none";
        warn.textContent = "";
    } else {
        icon.className = "icon-validate invalid";
        icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        warn.style.display = "block";
        warn.textContent = mensaje;
    }
}

function grabarPerfil() {
    const actividad = document.getElementById('actividad');
    const metas = document.getElementById('metas');
    const pesoInput = document.getElementById('peso');
    const estaturaInput = document.getElementById('estatura');
    const restricMedInput = document.getElementById('restric_med');

    let valido = true;
    let mensajes = [];

    // Validar selección de actividad (por seguridad)
    if (!actividad.value) {
        valido = false;
        mensajes.push("Debe seleccionar un nivel de actividad física");
    }

    // Validar selección de metas
    if (!metas.value) {
        valido = false;
        mensajes.push("Debe seleccionar una meta de entrenamiento");
    }

    // Validar peso (entre 30 y 150, hasta 3 decimales)
    const pesoVal = pesoInput.value.trim();
    const pesoNum = parseFloat(pesoVal);
    const regexPeso = /^(?:[1-9]\d{1,2})(?:\.\d{1,3})?$/;
    if (!regexPeso.test(pesoVal) || pesoNum < 30 || pesoNum > 150) {
        valido = false;
        mensajes.push("Peso inválido (debe estar entre 30 y 150 kg)");
    }

    // Validar estatura (entre 50 y 272 cm)
    const estaturaVal = estaturaInput.value.trim();
    const estaturaNum = parseInt(estaturaVal);
    const regexEstatura = /^\d{2,3}$/;
    if (!regexEstatura.test(estaturaVal) || estaturaNum < 50 || estaturaNum > 250) {
        valido = false;
        mensajes.push("Estatura inválida (debe estar entre 50 y 250 cm)");
    }

    // Validar restricción médica (mínimo 3 caracteres si se completa)
    const restricVal = restricMedInput.value.trim();
    console.log("restricVal", restricVal);
    if (restricVal.length < 3) {
        valido = false;
        mensajes.push("Debe ingresar al menos 3 caracteres. Si no tiene restriccione, escribir 'ninguna'");
    }

    // Mostrar resultado
    if (!valido) {
        const mensajeHTML = mensajes.map(msg => `• ${msg}`).join("<br>");
        mostrarModal("Formulario inválido", mensajeHTML, "warning", false);
    } else {
        //generar la contraseña y guardar todo en el BE
        //mandar al BE y rogar que sea success 
        mostrarModal("Perfil guardado", "Todos los campos han sido validados correctamente.", "success", false);
        mostrarModal("Importante!", "Por cuestiones de seguridad, se enviará la contraseña via mail. Por favor verificá tu casilla de correo. Cuando ingreses, puedes cambiar la contraseña en tu perfil", "info", true);
        setTimeout(() => {
            window.location.href = "./login_basico.html";
        }, 4000); // Espera 3 segundos

    }
}
