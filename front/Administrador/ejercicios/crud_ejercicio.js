// Mock data para ejercicios
let mockEjercicios = [
    { id: 1, nombre: "Press Banca", observaciones: "Mantener la espalda recta.", imagenLink: "../../Recursos/Imagenes/Ejercicio_PressBanca.jpg", videoLink: "https://www.youtube.com/watch?v=jlFl7WJ1TzI&t=6s" },
    { id: 2, nombre: "Sentadillas", observaciones: "Profundidad hasta 90 grados.", imagenLink: "../../Recursos/Imagenes/Ejercicio_Sentadillas.png", videoLink: "https://www.youtube.com/watch?v=BjixzWEw4EY&t=2s" },
    { id: 3, nombre: "Dominadas", observaciones: "Agarre ancho.", imagenLink: "../../Recursos/Imagenes/Ejercicio_Dominada.jpg", videoLink: "https://www.youtube.com/watch?v=8mhDd9Ahl1M&t=87s" },
    { id: 4, nombre: "Peso Muerto", observaciones: "Técnica estricta.", imagenLink: "../../Recursos/Imagenes/Ejercicio_PesoMuerto.png", videoLink: "https://www.youtube.com/watch?v=0XL4cZR2Ink" },
    { id: 5, nombre: "Remo con Barra", observaciones: "Espalda recta, movimiento controlado.", imagenLink: "../../Recursos/Imagenes/Ejercicio_RemoConBarra.png", videoLink: "https://www.facebook.com/share/v/1AjuZeVNvH/" },
];


const ruta = '../../Recursos/Imagenes/';
modoActualizar = false;

//Cuando se carga la pagina, se carga los ejercicios y muestra el primer ejercicio por defecto
document.addEventListener('DOMContentLoaded', () => {
    cargaSelectEjercicios();
    // Seleccionar y cargar el primer ejercicio al cargar la página
    if (mockEjercicios.length > 0) {
        const selectElement = document.getElementById('nombreEjercicio');
        selectElement.value = mockEjercicios[0].nombre;
        // Disparar el evento 'change' para cargar los datos del primer ejercicio
        selectElement.dispatchEvent(new Event('change'));
    }
});


//Cuando cambia el nombre del ejercicio, si es "Nuevo", se carga un ej en blanco (CREA UN NUEVO EJERCICIO), sino carga uno existente (LISTA O MODIFICA)
document.getElementById('nombreEjercicio').addEventListener('change', function () {
    const selectedExerciseName = this.value;
    const form = document.getElementById('ejercicioForm');
    //si habia alguna checked previo, lo elimina
    limpiarValidacionesFormulario();
    if (selectedExerciseName === 'Nuevo') {
        // Limpiar campos si se selecciona "Nuevo"
        modoActualizar = false;
        form.reset();
        document.getElementById('nombre_ejercicio').value = ''; // Asegurar que el campo de nombre esté vacío
        document.getElementById('imagenPreview').src = '../../Recursos/Imagenes/FTX (2).jpg'; // Restaurar imagen por defecto
        document.getElementById('videoPreview').src = ''; // Limpiar video preview
    } else {
        // Cargar datos del ejercicio seleccionado
        modoActualizar = true;
        const selectedExercise = mockEjercicios.find(ej => ej.nombre === selectedExerciseName);

        if (selectedExercise) {
            document.getElementById('nombre_ejercicio').value = selectedExercise.nombre;
            document.getElementById('observaciones').value = selectedExercise.observaciones;
            //  por seguridad, el navegador no permite visualizar el nombre (pq es de tipo file)
            document.getElementById('imagenLink').value = "";
            document.getElementById('videoLink').value = selectedExercise.videoLink;

            // Actualizar vistas previas
            document.getElementById('imagenPreview').src = selectedExercise.imagenLink;
            document.getElementById('videoPreview').src = selectedExercise.videoLink;
        }
    }
});

//ELIMINA Ejercicio -
document.querySelector('.btn-danger').addEventListener('click', function () {
    const selectElement = document.getElementById('nombreEjercicio');
    const selectedExerciseName = selectElement.value;


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
                text: "La rutina fue eliminada.",
               // icon: "success",
                background: '#4a4a4a',
                 color: '#F0F0F0',
               // claseParaSweetAlert: {}
            });

            if (selectedExerciseName === 'Nuevo') {
                //no se guarda, automaticamente se elimina
            } else {
                // codigo sweet alert
                //se elimina del arreglo  - LUEGO ELIMINAR DEL BE
                const indexToRemove = mockEjercicios.findIndex(ej => ej.nombre === selectedExerciseName);

                if (indexToRemove !== -1) {
                    mockEjercicios.splice(indexToRemove, 1);
                    cargaSelectEjercicios(); // Actualizar el select

                    // Seleccionar el primer ejercicio o "Nuevo" si no hay ejercicios
                    if (mockEjercicios.length > 0) {
                        selectElement.value = mockEjercicios[0].nombre;
                        selectElement.dispatchEvent(new Event('change')); // Cargar datos del nuevo ejercicio seleccionado
                    } else {
                        selectElement.value = 'Nuevo';
                        document.getElementById('ejercicioForm').reset(); // Limpiar formulario
                        document.getElementById('nombre_ejercicio').value = '';
                        document.getElementById('imagenPreview').src = '../Recursos/Imagenes/FTX (2).jpg';
                        document.getElementById('videoPreview').src = '';
                    }
                    //alert(`Ejercicio "${selectedExerciseName}" eliminado.`);
                    //  mostrarModal("Informacion:", `Ejercicio "${selectedExerciseName}" eliminado.`, "info", true);
                } else {
                    //alert(`No se encontró el ejercicio "${selectedExerciseName}".`);
                    mostrarModal("Error:", `No se encontró el ejercicio "${selectedExerciseName}".`, "warning", true);
                }
                //si bien la logica anterior anda bien, si tiene check (validacion) permanecen tanto si se carga un ejercicio vacio  como un ejercicio del arreglo
                //location.reload();
                //form.reset();
            }
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            return
        }
    });
   // location.reload();
    // fin codigo sweet alert
    //     mostrarModal("Informacion:","Ejercicio eliminado","info",true);
    //   return;
}

   

);


// GUARDA ejercicio
document.getElementById('ejercicioForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envio por defecto

    const selectElement = document.getElementById('nombreEjercicio');
    const selectedName = selectElement.value;

    const nuevoEjercicio = {
        nombre: document.getElementById('nombre_ejercicio').value.trim(),
        observaciones: document.getElementById('observaciones').value.trim(),
        imagenLink: document.getElementById('imagenPreview').src,
        videoLink: document.getElementById('videoLink').value.trim()
    };
    //se controla si ya existe el nombre en el arreglo
    if (modoActualizar == false) {
        const existe = mockEjercicios.some(ej => ej.nombre === nuevoEjercicio.nombre);

        if (existe) {
            //alert('Ya existe un ejercicio con ese nombre.');
            mostrarModal("Aviso:", "Ya existe un ejercicio con ese nombre.", "info", true);
            return;
        }
        mockEjercicios.push(nuevoEjercicio);
        //alert(`Ejercicio "${nuevoEjercicio.nombre}" creado con éxito.`);
        mostrarModal("Informacion:", `Ejercicio "${nuevoEjercicio.nombre}" creado con éxito.`, "success", true);

    } else {
        const index = mockEjercicios.findIndex(ej => ej.nombre === selectedName);
        if (index !== -1) {
            console.log(nuevoEjercicio);
            mockEjercicios[index] = nuevoEjercicio;
            console.log(mockEjercicios[index]);
            //alert(`Ejercicio "${nuevoEjercicio.nombre}" actualizado correctamente.`);
            mostrarModal("Informacion:", `Ejercicio "${nuevoEjercicio.nombre}" actualizado correctamente.`, "success", true);
        } else {
            //alert('No se pudo actualizar: ejercicio no encontrado.');
            mostrarModal("Error:", "No se pudo actualizar: ejercicio no encontrado.", "warning", true);
        }
    }

    //el codigo comentariado, trata de reiniciar la pagina sin el reload, pero no funciona bien
    /*     // Actualizar el select con los nuevos datos
           limpiarValidacionesFormulario(); 
         cargaSelectEjercicios();
         selectElement.value = nuevoEjercicio.nombre;
         selectElement.dispatchEvent(new Event('change'));*/

    //location.reload();

});

// cuando cambia la imagen del ejercicio, se previsualiza
document.addEventListener('DOMContentLoaded', function () {
    const imagenLink = document.getElementById('imagenLink');
    const imagenPreview = document.getElementById('imagenPreview');

    //verifica que exista los elmentos antes de activar el listener
    if (imagenLink && imagenPreview) {
        imagenLink.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagenPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                imagenPreview.src = ruta + 'usuario.png';
            }
        });
    }
});

/* --------------------------------------------------------FUNCIONES ------------------------------------------------------*/

//Rellena el select de los ejercicios existentes
function cargaSelectEjercicios() {
    const selectElement = document.getElementById('nombreEjercicio');
    // Limpiar opciones existentes excepto "Nuevo"
    selectElement.innerHTML = '<option value="Nuevo">Nuevo</option>';

    mockEjercicios.forEach(ejercicio => {
        const option = document.createElement('option');
        option.value = ejercicio.nombre;
        option.textContent = ejercicio.nombre;
        selectElement.appendChild(option);
    });
}

//saca los simbolos de valido o invalido, pero no funciona... lo dejo para ver si lo puedo hacer andar y sacar el location.reload
function limpiarValidacionesFormulario() {
    const form = document.getElementById('ejercicioForm');
    form.classList.remove('was-validated');
    const campos = form.querySelectorAll('.is-valid, .is-invalid');
    campos.forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });
}


//Permite previsualizar video (convierte la url cargada para poder mostrarlo en <iframe>)
function previsualizarVideo() {
    const input = document.getElementById('videoLink');
    const url = input.value.trim();
    const iframe = document.getElementById('videoPreview');

    if (!url) {
        iframe.src = '';
        iframe.style.display = 'none';
        return;
    }

    //youtube no deja mostrar en una pagina local sus videos, se tiene que usar <iframe> con formato embed
    const youtubeId = extraerIdYoutube(url);

    if (youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
        iframe.style.display = 'block';
    } else if (esVideoDirecto(url)) {
        // Si es .mp4, .webm, etc., lo mostramos con <video> en lugar de iframe
        iframe.src = url;
        iframe.style.display = 'block';
    } else {
        iframe.src = '';
        iframe.style.display = 'none';
        //alert('El enlace ingresado no es válido para previsualización.');
        mostrarModal("Error:", "El enlace ingresado no es válido para previsualización.", "warning", true);
    }
}

//Transforma la url de youtube en formato embed
function extraerIdYoutube(url) {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
}

//controla que tenga formato de video
function esVideoDirecto(url) {
    return /\.(mp4|webm|ogg)$/i.test(url);
}
