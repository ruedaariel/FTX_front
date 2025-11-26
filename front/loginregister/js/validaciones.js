//espera a que el DOM esté completamente cargado y lanza los listener para hacer validaciones en linea
document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById("form-registro");
    //escucha cuando hay un input en el form
    contenedor.addEventListener('input', function (event) {
        const input = event.target;

        // Validar nombreRutina (texto con por lo menos 3 caracteres)
        if (input.id === "apellido") {
            validarTextoLibre(input, /^.{2,}$/, "Debe tener al menos 2 caracteres");
        }

        if (input.id === "nombre") {
            validarTextoLibre(input, /^.{2,}$/, "Debe tener al menos 2 caracteres");
        }

        if (input.id === "dni") {
            validarTextoLibre(input, /^\d{7,8}$/, "Debe tener 7 u 8 dígitos sin puntos");
        }

        if (input.id === "fechaNacimiento") {
            const fechaNacimiento = new Date(input.value);
            const hoy = new Date();
            let valido = true;
            let mensaje = "";

            if (isNaN(fechaNacimiento.getTime())) {
                valido = false;
                mensaje = "Fecha de nacimiento inválida";
            } else if (fechaNacimiento > hoy) {
                valido = false;
                mensaje = "La fecha de nacimiento no puede ser futura";
            } else {
                const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                const mes = hoy.getMonth() - fechaNacimiento.getMonth();
                const dia = hoy.getDate() - fechaNacimiento.getDate();

                if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
                    valido = false;
                    mensaje = "Debes tener al menos 18 años";
                }
            }
            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "email") {
            const valor = input.value.trim();

            // Validar formato general de email + que termine en ".com"
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const valido = regexEmail.test(valor) && valor.toLowerCase().endsWith('.com');

            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            const mensaje = "El correo debe ser válido y terminar en .com";

            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "phone") {
            validarTextoLibre(input, /^\d{10}$/, "El teléfono debe tener entre 7 y 10 dígitos numéricos");
        }

    });

    document.getElementById('form-registro').addEventListener('submit', function (e) {
        e.preventDefault(); // prevenir envío si hay errores
        let valido = true;
        let mensajes = [];
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const dniInput = document.getElementById('dni');
        const fechaNacimientoInput = document.getElementById('fechaNacimiento');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const pesoInput = document.getElementById('peso');        // Si existen
        const estaturaInput = document.getElementById('estatura');
        // Validaciones
        if (!/^.{2,}$/.test(nombreInput.value.trim())) {
            valido = false;
            mensajes.push("Nombre inválido");
        }

        if (!/^.{2,}$/.test(apellidoInput.value.trim())) {
            valido = false;
            mensajes.push("Apellido inválido");
        }

        if (!/^\d{7,8}$/.test(dniInput.value.trim())) {
            valido = false;
            mensajes.push("DNI inválido");
        }

        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const hoy = new Date();
        if (isNaN(fechaNacimiento.getTime()) || fechaNacimiento > hoy) {
            valido = false;
            mensajes.push("Fecha de nacimiento inválida o futura");
        } else {
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            const dia = hoy.getDate() - fechaNacimiento.getDate();

            if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
                valido = false;
                mensajes.push("Debes tener al menos 18 años");
            }
        }

        const emailVal = emailInput.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(regexEmail.test(emailVal) && emailVal.toLowerCase().endsWith('.com'))) {
            valido = false;
            mensajes.push("Email inválido");
        }

        const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
        if (!/^\d{10}$/.test(phoneVal)) {
            valido = false;
            mensajes.push("Teléfono inválido");
        }

        if (pesoInput && pesoInput.value && !/^\d{2,3}(\.\d{1,2})?$/.test(pesoInput.value.trim())) {
            valido = false;
            mensajes.push("Peso inválido");
        }

        if (estaturaInput && estaturaInput.value && !/^\d{2,3}$/.test(estaturaInput.value.trim())) {
            valido = false;
            mensajes.push("Estatura inválida");
        }

        // Mostrar resultado en el modal
        if (!valido) {
            const mensajeHTML = mensajes.map(msg => `• ${msg}`).join("<br>");
            mostrarModal("Formulario inválido", mensajeHTML, "warning", false);
        } else {

            mostrarModal("Registro exitoso", "Todos los campos fueron validados correctamente.", "success", false);
            //ver si grabamos en el BE y pasamos al siguiente formulario eldni (o id, no se) y el mail (para enviar contraseña)
            //se puede pasar con loscalStorage (mejor)
            const dni = document.getElementById("dni").value.trim();
            const email = document.getElementById("email").value.trim();

            const url = `login_perfil.html?dni=${encodeURIComponent(dni)}&email=${encodeURIComponent(email)}`;
            window.location.href = url;

        }
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
});

