
/*-- ==========================================================================
   Archivo: modificar_perfil.js
   Descripción: permite cambiar la imagen de perfil del ususario y el manejo de las solapas (cada solapa agrupa distintos datos)
   ========================================================================== */

//codigo para cambiar la imagen de perfil
const perfilImagenInput = document.getElementById('perfilImagenInput');
const perfilImagenPreview = document.getElementById('perfilImagenPreview');

if (perfilImagenInput && perfilImagenPreview) {
    perfilImagenInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                perfilImagenPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            perfilImagenPreview.src = '../../Recursos/IconosLogos/usuario.png'; // Imagen por defecto
        }
    });
}

//permite el manejo de las solapas
function abrirPestañaPerfil(evt, pestañanombre) {
    var i, pestañaContentenido, pestañalinks;
    pestañaContentenido = document.getElementsByClassName("pestaña-item");
    for (i = 0; i < pestañaContentenido.length; i++) {
        pestañaContentenido[i].style.display = "none";
        pestañaContentenido[i].classList.remove("active");
    }
    pestañalinks = document.getElementsByClassName("pestaña-link");
    for (i = 0; i < pestañalinks.length; i++) {
        pestañalinks[i].classList.remove("active");
    }
    document.getElementById(pestañanombre).style.display = "block";
    document.getElementById(pestañanombre).classList.add("active");
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// Mostrar la primera solapa por defecto
document.addEventListener('DOMContentLoaded', function () {
    // Activar la primera solapa por defecto
    const firstpestañaLink = document.querySelector(".pestaña-buttons .pestaña-link");
    if (firstpestañaLink) {
        firstpestañaLink.click(); // Simula un clic para activar la lógica 
    }
});