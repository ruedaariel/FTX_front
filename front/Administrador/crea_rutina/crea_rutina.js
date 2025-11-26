const rutinaVacia = {
  nombreRutina: "",
  usuario: "",
  semanas: {
    semana1: { dia1: [], dia2: [], dia3: [], dia4: [], dia5: [], dia6: [], dia7: [] },
    semana2: { dia1: [], dia2: [], dia3: [], dia4: [], dia5: [], dia6: [], dia7: [] },
    semana3: { dia1: [], dia2: [], dia3: [], dia4: [], dia5: [], dia6: [], dia7: [] },
    semana4: { dia1: [], dia2: [], dia3: [], dia4: [], dia5: [], dia6: [], dia7: [] }
  }
};
let rutinaCompleta = rutinaVacia;
let modoActualizacion = false;
const nombresRutinas = ["Rutina A", "Rutina B", "Rutina C", "Rutina D"]; //ver cómo la devuelve el BE, tal vez devuela un arreglo de (nombre, id)


//carga el Select de buscarRutina cuando se carga la pagina
document.addEventListener("DOMContentLoaded", function () {
  const selectRutinas = document.getElementById("buscarRutina");

  nombresRutinas.forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    selectRutinas.appendChild(option);
  });

  const buscarRutina = document.getElementById('buscarRutina');
  const radioOptionsContainer = document.getElementById('radioOptionsContainer');
  const plantillaRadio = document.getElementById('plantillaRadio');
  const editableRadio = document.getElementById('editableRadio');
  const overlay = document.getElementById('overlay');
  const rutinaForm = document.getElementById('rutinaForm');

  buscarRutina.addEventListener('change', () => {
    radioOptionsContainer.style.display = 'block';
    overlay.style.display = 'block';
  });

  plantillaRadio.addEventListener('change', () => {
    if (plantillaRadio.checked) {
      overlay.style.display = 'none';
      disableFormElements(true);
    }
  });

  editableRadio.addEventListener('change', () => {
    if (editableRadio.checked) {
      overlay.style.display = 'none';
      disableFormElements(false);
    }
  });

  function disableFormElements(disable) {
    const formElements = rutinaForm.elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = disable;
    }
  }
});

// actualiza el label del boton "Grabar ejercicio Dia x / Semana y" al cargar la página y al eliminar una rutina
actualizarTextoBotonAgregar();


//Detecta la seleccion de rutina en el Select buscarRutina y la carga
document.getElementById("buscarRutina").addEventListener("change", function () {
  const nombre = this.value;
  modoActualizacion = true;
  //buscar en el BE y traer los datos
  cargarRutinaDesdeMock(nombre);
});



// cada vez que se cambia semana o dia se actaliza boton "Agregar Ejercicio Día x/Semana y" -----
document
  .getElementById("semana")
  .addEventListener("change", function () {
    actualizarTextoBotonAgregar();
    cargaEjerciciosDeUnDia()
  });
document
  .getElementById("dia")
  .addEventListener("change", function () {
    actualizarTextoBotonAgregar();
    cargaEjerciciosDeUnDia()
  });



// agrega event listener a boton guardaDia (para GUARDAR LOS EJERCICIOS DE UN DIA) -----------
document.getElementById("guardaDia").addEventListener("click", function () {
  guardarDiaActual();
});



// agrega event listeners a los ejercicios cargados en la pagina (botones + y x) -------
document
  .querySelectorAll("#ejerciciosContainer .ejercicio-item")
  .forEach(addEventListenersToEjercicioItem);



// toma el formulario total para procesar la rutina completa (GUARDAR RUTINA) ----------
document.getElementById("guardarRutina").addEventListener("click", () => {
  const form = document.getElementById("rutinaForm");

  const formData = new FormData(form);
  const nombreRutina = formData.get("nombreRutina");
  const nombreUsuario = formData.get("nombreUsuario");

  rutinaCompleta.nombreRutina = nombreRutina;
  rutinaCompleta.nombreUsuario = nombreUsuario;

  console.log("Rutina completa a enviar:", rutinaCompleta);
  //alert("Rutina completa lista para enviar. Verifique la consola para los datos.");

  if (modoActualizacion) {
    //manda a actualizar a la b/d
  } else {
    //manda a crear a la b/D
  }

  mostrarModal("Informacion", "Rutina guardada", "success", true)
  // resetea formulario una vez enviada la rutina a la b/D

  setTimeout(function () {

    form.reset();
    resetearForm();
  }, 2000);

});


// evento boton ELIMINAR RUTINA ----------------------------------------------------------
document.getElementById("eliminarRutina").addEventListener("click", () => {
  const form = document.getElementById("rutinaForm");

  //const confirmar = confirm("¿Estás seguro de que querés eliminar toda la rutina?");
  //mostrarModal("Confirmación", "¿Estás seguro de que querés eliminar toda la rutina?", "info", false);

  // codigo sweet alert
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Estas seguro?",
    text: "No lo podrás revertir",
    background: '#4a4a4a',
    color: '#F0F0F0',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, bórralo",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Borrado!",
        text: "El ejercicio fue eliminado.",
         color: '#F0F0F0',
         color: '#F0F0F0',
        icon: "success"
      });
      form.reset();
      resetearForm(); //en resetearForm esta  rutinaCompleta = rutinaVacia;

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      return
    }
  });
  // fin codigo sweet alert




  /* if (!confirmar) return;
 
 
   form.reset();
   resetearForm(); //en resetearForm esta  rutinaCompleta = rutinaVacia;
 
   if (modoActualizacion) {
     //borrar en el BE
   }
   //alert("Rutina eliminada");
   mostrarModal("Informacion", "Rutina eliminada", "success", true);
 
   console.log("Rutina completa a enviar:", rutinaCompleta);*/

});


// ------------------------------------------ FUNCIONES --------------------------------------------------------------------
function cargarRutinaDesdeMock(nombre) {
  if (nombre === rutinaCargada.nombreRutina) {
    console.log("vamos bien");
    document.getElementById("nombreRutina").value = rutinaCargada.nombreRutina;
    document.getElementById("nombreUsuario").value = rutinaCargada.usuario; //ver si se puede cambiar el nombreUsuario o si se debe bloquear

    //hacer funcion para cargar los ejercicios de una dada semana, un dado dia desde rutinaCargada
    rutinaCompleta = rutinaCargada;
    cargaEjerciciosDeUnDia();
  } else {
    mostrarModal("Aviso", "Rutina no encontrada", "error", true);
  }

}


//hacer funcion para cargar los ejercicios de una dada semana, un dado dia desde rutinaCargada
function cargaEjerciciosDeUnDia() {
  const semanaSelect = document.getElementById("semana").value.trim();
  const diaSelect = document.getElementById("dia").value.trim();

  const ejercicios = rutinaCompleta.semanas[semanaSelect][diaSelect];
  //const ejercicios = rutinaCargada.semanas?.[semanaSelect]?.[diaSelect] ;
  console.log(ejercicios);
  // Vaciar contenedor
  const contenedor = document.getElementById("ejerciciosContainer");
  contenedor.innerHTML = "";


  if (ejercicios.length === 0) {
    contenedor.innerHTML = `<div class="ejercicio-item form-section">${agregarEjEnBlanco()}</div>`;
    addEventListenersToEjercicioItem(document.querySelector("#ejerciciosContainer .ejercicio-item"));
    return;
  }

  // Cargar cada ejercicio al contenedor
  ejercicios.forEach(ej => {
    const div = document.createElement("div");
    div.classList.add("ejercicio-item", "form-section");
    div.innerHTML = agregarEjEnBlanco();
    contenedor.appendChild(div);
    console.log("nombreEjercicio");
    console.log(ej);
    div.querySelector('[name="nombreEjercicio[]"]').value = ej.nombreEjercicio.trim();
    div.querySelector('[name="repeticiones[]"]').value = ej.repeticiones;
    div.querySelector('[name="peso[]"]').value = ej.peso;
    div.querySelector('[name="dificultad[]"]').value = ej.dificultad;
    div.querySelector('[name="observaciones[]"]').value = ej.observaciones;

    addEventListenersToEjercicioItem(div);
  });

}

// Funcion agrega event listeners a los botones agregar eliminar ejercicio (botones + y x)
function addEventListenersToEjercicioItem(item) {
  const agregarBtn = item.querySelector(".agregar-fila-btn"); // boton sumar una fila de ejercicio
  const eliminarBtn = item.querySelector(".eliminar-fila-btn"); // boton elimiar fila de ejercicio

  agregarBtn.addEventListener("click", function () {
    agregarFilaDespues(item);
  });

  eliminarBtn.addEventListener("click", function () {
    eliminarFila(item);
  });
}

// --------------------------- ESTA Fe SE PRODRIA REUTILIZAR EN CARGAEJERCICIOS DE UN DIA -------------------
// Funcion agrega una fila de ejercicio debajo
function agregarFilaDespues(itemActual) {
  const nuevoEjercicioDiv = document.createElement("div");
  nuevoEjercicioDiv.classList.add("ejercicio-item", "form-section");
  nuevoEjercicioDiv.innerHTML = agregarEjEnBlanco();
  itemActual.parentNode.insertBefore(nuevoEjercicioDiv, itemActual.nextSibling);
  addEventListenersToEjercicioItem(nuevoEjercicioDiv);
}

function eliminarFila(item) {
  // Ahora recibe el item del ejercicio
  item.remove(); // Elimina el item completo
}

// Funcion actualiza texto de boton "Agregar Ejercicio Día x/Semana y"
function actualizarTextoBotonAgregar() {
  const semanaSelect = document.getElementById("semana"); // lee nro de semana
  const diaSelect = document.getElementById("dia"); // lee nro de dia
  const agregarFilaButton = document.getElementById("guardaDia");

  const semanaSeleccionada =
    semanaSelect.options[semanaSelect.selectedIndex].text;
  const diaSeleccionado = diaSelect.options[diaSelect.selectedIndex].text;

  agregarFilaButton.textContent = `Grabar ejercicios de ${semanaSeleccionada} / ${diaSeleccionado}`;
}

// Funcion que guarda los ejercicios de una semana y dia
function guardarDiaActual() {
  const semanaSelect = document.getElementById("semana");
  const diaSelect = document.getElementById("dia");
  const semanaSeleccionada = semanaSelect.value; // usa el valor
  const diaSeleccionado = diaSelect.value; // Usa el valor


  // crea e inicaliza la estructura de la semana y dia si no existe - 
  // escenario1: estamos comenzando una semana nueva -> objeto vacio (dias y ejercicios)
  if (!rutinaCompleta.semanas[semanaSeleccionada]) {
    rutinaCompleta.semanas[semanaSeleccionada] = {};
  }
  // escenario 2: comenzamos un dia nuevo -> arreglo de ejercicios inicializa en vacio
  if (!rutinaCompleta.semanas[semanaSeleccionada][diaSeleccionado]) {
    rutinaCompleta.semanas[semanaSeleccionada][diaSeleccionado] = [];
  }

  const ejerciciosDelDia = [];
  document
    .querySelectorAll("#ejerciciosContainer .ejercicio-item")
    .forEach((item) => { //para cada div de un ejercicio (de un determinado dia)
      const nombreEjercicio = item.querySelector(
        'select[name="nombreEjercicio[]"]'
      ).value;
      const repeticiones = item.querySelector(
        'input[name="repeticiones[]"]'
      ).value;
      const peso = item.querySelector('input[name="peso[]"]').value;
      const dificultad = item.querySelector(
        'input[name="dificultad[]"]'
      ).value;
      const observaciones = item.querySelector(
        'textarea[name="observaciones[]"]'
      ).value;

      // guarda los ejercicios
      ejerciciosDelDia.push({
        nombreEjercicio: nombreEjercicio,
        repeticiones: repeticiones,
        peso: peso,
        dificultad: dificultad,
        observaciones: observaciones,
      });
      console.log(ejerciciosDelDia);
    });

  // alamacena los ejecicios para un  día dado
  rutinaCompleta.semanas[semanaSeleccionada][diaSeleccionado] = ejerciciosDelDia;

  console.log(`Ejercicios guardados para ${semanaSeleccionada} / ${diaSeleccionado}:`, ejerciciosDelDia);
  console.log("Rutina completa actual:", rutinaCompleta);

  /* CREO QUE ES MEJOR DEJAR EL EJERCICIO CARGADO Y QUE CAMBIE CUANDO EL USUARIO CARQUE EL DIA ----------
  // reseta el formularios con un ejercicio en blanco

  const ejerciciosContainer = document.getElementById("ejerciciosContainer");
  ejerciciosContainer.innerHTML = `
    <div class="ejercicio-item form-section">
      ${agregarEjEnBlanco()}
    </div>
  `;
  // agrega  event listeners a los nuevos ejercicio agregados
  addEventListenersToEjercicioItem(
    document.querySelector("#ejerciciosContainer .ejercicio-item")
  );*/

  //alert(`Ejercicios para ${semanaSeleccionada} / ${diaSeleccionado} guardados.`);

  mostrarModal("Informacion", `Ejercicios para ${semanaSeleccionada} / ${diaSeleccionado} guardados.`, "success", false)

  //alert(`Ejercicios para ${semanaSeleccionada} / ${diaSeleccionado} guardados.`);
}

// inicializa el contener de ejercicios con un ejercicio en blanco y su correspondiente lietener
function resetearForm() {
  location.reload();
  /*
    const ejerciciosContainer = document.getElementById("ejerciciosContainer");
    ejerciciosContainer.innerHTML = `
      <div class="ejercicio-item form-section">
        ${agregarEjEnBlanco()}
      </div>
    `;
  
    actualizarTextoBotonAgregar();
  
    addEventListenersToEjercicioItem(
      document.querySelector("#ejerciciosContainer .ejercicio-item")
    );
    // pone rutina en blanco para un nuevo ingreso
    rutinaCompleta = rutinaVacia;
  
    //********************************VER SI ANTES SE GUARDÖ UNA RUTINA NUEVA ¿NO DEBERIA VOLVERSE A CARGAR EL SELECT DE RUTINAS??????
    // OJO PUEDE SER MUY COSTOSO */
}

function agregarEjEnBlanco() {
  return `
    <div class="row"> <!-- Contenedor row -->
                            <div class="col-md-2 form-group"> <!-- Columna para Nombre del Ejercicio -->
                                <label for="nombreEjercicio">Ejercicio</label>
                                <select name="nombreEjercicio[]" class="form-select" required>
                                    <option value="Press Banca">Press Banca</option>
                                    <option value="Press Inclinado con Mancuernas">Press Inclinado con Mancuernas
                                    </option>
                                    <option value="Aperturas en Máquina">Aperturas en Máquina</option>
                                    <option value="abdominales">Abdominales</option>
                                    <option value="Pecho">Pecho</option>
                                    <option value="Peso Muerto">Peso Muerto</option>
                                    <option value="Dominadas">Dominadas</option>
                                    <option value="Remo con Barra">Remo con Barra</option>
                                    <option value="Remo en Polea Baja">Remo en Polea Baja</option>
                                    <option value="Sentadilla">Sentadilla</option>
                                    <option value="Prensa 45°">Prensa 45°</option>
                                    <option value="Extensiones de Cuádriceps">Extensiones de Cuádriceps</option>
                                    <option value="Curl Femoral">Curl Femoral</option>
                                    <option value="Elevación de Talones (Gemelos)">Elevación de Talones (Gemelos)
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-2 form-group"> <!-- Columna para Repeticiones -->
                                <label for="repeticiones">Repeticiones</label>
                                <div class="input-icon-validate">
                                    <input type="text" name="repeticiones[]" class="form-control" required
                                        placeholder="3x10">
                                    <span class="icon-validate" data-icon="repeticiones"></span>
                                </div>
                                <div class="input-warning text-danger" data-warn="repeticiones" style="display:none;">
                                </div>
                            </div>
                            <div class="col-md-2 form-group"> <!-- Columna para Peso -->
                                <label for="peso">Peso (kg):</label>
                                <div class="input-icon-validate">
                                    <input type="text" name="peso[]" class="form-control" required placeholder="20">
                                    <span class="icon-validate" data-icon="peso"></span>
                                </div>
                                <div class="input-warning text-danger" data-warn="peso" style="display:none;"></div>
                            </div>
                            <div class="col-md-2 form-group"> <!-- Columna para Dificultad -->
                                <label for="dificultad">Dificultad</label>
                                <div class="input-icon-validate">
                                    <input type="text" name="dificultad[]" class="form-control" required
                                        placeholder="RPE, RIR o % de peso">
                                    <span class="icon-validate" data-icon="dificultad"></span>
                                </div>
                                <div class="warn-validate text-danger" data-warn="dificultad" style="display:none;">
                                </div>
                            </div>
                            <div class="col-md-3 form-group"> <!-- Columna para Observaciones -->
                                <label for="observaciones">Observaciones</label>
                                <textarea name="observaciones[]" class="form-control"></textarea>
                            </div>
                            <div class="col-md-1 acciones-ejercicio"> <!-- Dentro del row, como columna -->
                                <div class="form-label">Acción</div> <!-- Nueva etiqueta -->
                                <div> <!-- Contenedor para los botones -->
                                    <button type="button" class="btn btn-success btn-sm agregar-fila-btn">+</button>
                                    <button type="button" class="btn btn-danger btn-sm eliminar-fila-btn">x</button>
                                </div>
                            </div>
                        </div> <!-- Fin del contenedor row -->
  `
}

