

document.addEventListener("DOMContentLoaded", function () {
    initNav();

});

/*para que se cierre el menú cuando se elije una opción (por defecto Bootstrap no contrae el menu)*/
function initNav() {
    const navLinks = document.querySelectorAll(".navbar-nav a"); // Todas las opciones del menú
    const navbarToggler = document.querySelector(".navbar-toggler"); // Botón hamburguesa

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarToggler.classList.contains("collapsed")) {
                return; // Si ya está cerrado, no hacemos nada
            }
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click(); // Simula un clic en el botón hamburguesa para cerrar el menú
            }
        });
    });
};







