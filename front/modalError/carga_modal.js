// carga_modal.js es un archivo JavaScript que maneja la lógica de un modal 
// genérico para mostrar mensajes de error, éxito o información.  
// Este modal se utiliza para proporcionar retroalimentación al usuario 
// sobre acciones realizadas, como errores de validación o confirmaciones de éxito.
// Para su uso se debe incluir en el HTML un modal con el id "genericModal"

//      <div id="genericModal" class="modal">
//        <div class="modal-content">
//            <span class="close-button">&times;</span>
//            <h1 id="genericModalTitle"></h1>
//            <p id="genericModalMessage"></p>
//        </div>
//      </div>
//
// ademas de <script src="./carga_modal.js"></script>
//<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
// <link rel="stylesheet" href="./style_reseteo_modal.css">
// ==========================================================================
// incluye una funcion mostrarModal(title, message, status, recargar) que permite mostrar 
// el modal con un título, un mensaje y un estado (warning,success o info) y si se recarga la pagina o no (recargar: boolean).

// *********************** modal ***********************

// Obtener referencias a los elementos del modal
const genericModal = document.getElementById("genericModal");
const genericModalTitle = document.getElementById("genericModalTitle");
const genericModalMessage = document.getElementById("genericModalMessage");
let recargar = true;

//console.log("Inicializacion; ",recargar); 

let closeButton = null;
if (genericModal) {
  closeButton = genericModal.querySelector(".close-button");
}

// Event listeners para cerrar el modal
/* if (closeButton) {
  closeButton.addEventListener("click", cerrarModal);
} */

closeButton.addEventListener("click", function () {
  cerrarModal(recargar);
});

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === genericModal) {
   
    cerrarModal(recargar);
  }
});

// Función para mostrar el modal
function mostrarModal(title, message, status, reload) {
  //   console.log("Intentando mostrar modal...");
  //   console.log("genericModalTitle:", genericModalTitle);
  //   console.log("genericModalMessage:", genericModalMessage);
  //   console.log("genericModal:", genericModal);
  //   console.log("Title to set:", title);
  //   console.log("Message to set:", message);

  //console.log("Recargando - antes; ",reload); 
  recargar = reload;
  //console.log("Recargando - Modificando; ",recargar); 
  
  // seteo modal en modo error
  const modalContent = genericModal.querySelector(".modal-content");
  modalContent.classList.add("modal-error-border");

  if (status === "success") {
    // Agregar clase para borde verde para indicar exito
    //const modalContent = genericModal.querySelector(".modal-content");
    modalContent.classList.remove("modal-error-border");
    modalContent.classList.add("modal-success-border");
  }

  if (status === "info") {
    // Agregar clase para borde amarillo para indicar informacion
    //const modalContent = genericModal.querySelector(".modal-content");
    modalContent.classList.remove("modal-error-border");
    modalContent.classList.add("modal-info-border");
  }
  genericModalTitle.textContent = title;
  genericModalMessage.innerHTML = message; // Usar innerHTML para interpretar <br>
  genericModal.style.display = "flex"; // Cambiado a flex para centrar
  
}

// Función para cerrar el modal
function cerrarModal(recargar) {
  

  //console.log("Recargando la página...", recargar); 

  if (genericModal) {
    genericModal.style.display = "none"; // O usa classList.remove('show')
    if (recargar) {
      // Recargar la página al cerrar el modal 
         
      location.reload();
    }

  }
}




