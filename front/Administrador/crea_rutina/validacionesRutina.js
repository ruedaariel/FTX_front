/* Permite la validacion en en crea_rutina.js*/

//espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById("rutinaForm");
    //escucha cuando hay un input en el form
    contenedor.addEventListener('input', function (event) {
        const input = event.target;
        

        // Validar campo de peso
        if (input.name === "peso[]") {
            validarPeso(input);
        }

        // Validar repeticiones - permite 1o mas digitos y grupos de x seguido por 1 o mas digitos o nada (no grupos)
        if (input.name === "repeticiones[]") {
            validarTextoLibre(input, /^(?:\d+(?:x\d+)*)$/, "Formato inválido (ej: 3x10)");
        }

        // Validar dificultad (puede ser % o texto, algo no vacio)
        if (input.name === "dificultad[]") {
            validarTextoLibre(input, /^.+$/, "Ingrese una dificultad");
        }

        // Validar nombreRutina (texto con por lo menos 3 caracteres)
        if (input.id === "nombreRutina") {
            validarTextoLibre(input, /^.{3,}$/, "Debe tener al menos 3 caracteres");
        }
    });

    function validarPeso(input) {
        const grupo = input.closest(".form-group");
        const icon = grupo.querySelector('[data-icon="peso"]');
        const warn = grupo.querySelector('[data-warn="peso"]');

        const valor = input.value.trim();
        //controla que sea numero entre 1 y 3 cifras menor que 500 (puede ser 0, pero no 01, por ej)
        const regexPeso =/^(0|[1-9]\d{0,2}|500)(\.\d{1,3})?$/;
        //const regexPeso = /^(?:0|[1-9]?\d{1,2}|500)(?:\.\d{1,2})?$/;
        const numero = parseFloat(valor);
        const valido = regexPeso.test(valor) && numero <= 500;

        actualizarEstado(valido, icon, warn, "Ingrese un número (ej: 80 o 80.5)");
    }

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
