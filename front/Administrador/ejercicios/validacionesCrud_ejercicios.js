/* Permite la validacion en en crud_ejercicio.html*/

//espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById("ejercicioForm");
    //escucha cuando hay un input en el form
    contenedor.addEventListener('input', function (event) {
        const input = event.target;


        // Validar nombreEjercicio (texto con 2 o mas caracteres, con simbolos ,()/%°-[], max 60 caract.
        if (input.id === "nombre_ejercicio") {
            validarTextoLibre(input, /^[\p{L}\p{N} ,()/%°\-\[\]]{2,60}$/u, "Debe tener al menos 3 caracteres");
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
