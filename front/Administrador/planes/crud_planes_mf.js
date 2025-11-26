/*-- ==========================================================================
   Archivo: crud_planes.js
   Descripción: contiene toda la logica de los botones (distintas acciones:
   buscar/filtrar, agregar, modificar, eliminar).
   Crea las vistas para mostrar el listado de planes tanto en mobile como en desktop
   ========================================================================== */

// Datos iniciales de planes
let planes = [
    { id: 1, nombre: "Premium", descripcion: "Acceso completo a todas las funciones", precio: 29.99, duracion: "Mensual", estado: "Activo" },
    { id: 2, nombre: "Básico", descripcion: "Acceso limitado a funciones esenciales", precio: 9.99, duracion: "Mensual", estado: "Activo" },
    { id: 3, nombre: "Intermedio", descripcion: "Acceso a funciones avanzadas", precio: 19.99, duracion: "Anual", estado: "Inactivo" }
];

// Referencias a elementos del DOM
const listaPlanMobile = document.getElementById('listaPlanMobile');
const cuerpoTablaPlanes = document.getElementById('cuerpoTablaPlanes');
const modalPlan = document.getElementById('modalPlan');
const closeButton = document.querySelector('.close-btn');
const planForm = document.getElementById('planForm');
const tituloModal = document.getElementById('tituloModal');
const btnPpalModal = document.getElementById('btnPpalModal'); // Botón principal del modal (Guardar/Buscar)
const btnEliminarPlan = document.getElementById('btnEliminarPlan');
const btnNuevoPlan = document.getElementById('btnNuevoPlan');
const btnDeBusqueda = document.getElementById('btnDeBusqueda'); // Nuevo botón para abrir modal de búsqueda
const mensajeDiv = document.getElementById('mensaje');

let tipoModalActivo = 'agregar'; // 'agregar', 'editar', 'buscar'
let planIdActual = null; // Para almacenar el ID del plan que se está editando

// Referencias a los campos del formulario y sus mensajes de error
const idPlanInput = document.getElementById('idPlan');
const nombrePlanInput = document.getElementById('nombrePlan');
const descripcionInput = document.getElementById('descripcion');
const precioInput = document.getElementById('precio');
const duracionInput = document.getElementById('duracion');
const estadoInput = document.getElementById('estado');

const idPlanError = document.getElementById('idPlan-error');
const nombrePlanError = document.getElementById('nombrePlan-error');
const descripcionError = document.getElementById('descripcion-error');
const precioError = document.getElementById('precio-error');
const duracionError = document.getElementById('duracion-error');
const estadoError = document.getElementById('estado-error');

// Función para renderizar la lista de planes (cards para mobile, tabla para desktop)
function renderizarPlanes(planesFiltrados = planes) {
    //Crea las cards para Mobile (Cards)
    listaPlanMobile.innerHTML = '';
    planesFiltrados.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('card-plan');
        card.innerHTML = `
                    <h3>${plan.nombre}</h3>
                    <p><strong>Descripción:</strong> ${plan.descripcion}</p>
                    <p><strong>Precio:</strong> $${plan.precio.toFixed(2)}</p>
                    <p><strong>Duración:</strong> ${plan.duracion}</p>
                    <p><strong>Estado:</strong> ${plan.estado}</p>
                    <button class="actions-icon" onclick="abrirModalParaEditar(${plan.id})" title="Editar Plan">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                `;
        listaPlanMobile.appendChild(card);
    });

    // Renderizar para Desktop (Tabla)
    cuerpoTablaPlanes.innerHTML = '';
    planesFiltrados.forEach(plan => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${plan.nombre}</td>
                    <td>${plan.descripcion}</td>
                    <td>$${plan.precio.toFixed(2)}</td>
                    <td>${plan.duracion}</td>
                    <td>${plan.estado}</td>
                    <td class="celda-botones">
                        <button onclick="abrirModalParaEditar(${plan.id})">Editar</button>
                        <button class="delete-btn" onclick="borrarPlan(${plan.id})">Eliminar</button>
                    </td>
                `;
        cuerpoTablaPlanes.appendChild(row);
    });
}

// Función para abrir el modal en modo "nuevo plan"
btnNuevoPlan.addEventListener('click', () => {
    tipoModalActivo = 'agregar';
    tituloModal.textContent = 'Nuevo Plan';
    btnPpalModal.textContent = 'Guardar Plan';
    btnEliminarPlan.style.display = 'none'; // Ocultar botón eliminar para nuevos planes
    planForm.reset();
    resetearErrores();
    planIdActual = null;
    idPlanInput.disabled = false; // Habilitar ID para nuevos planes
    // Establecer todos los campos como requeridos para el modo 'agregar'
    setearComoRequerido(true);
    modalPlan.style.display = 'flex';
});

// Función para abrir el modal en modo "editar plan"
function abrirModalParaEditar(id) {
    tipoModalActivo = 'editar';
    const plan = planes.find(p => p.id === id);
    if (plan) {
        tituloModal.textContent = 'Editar Plan';
        btnPpalModal.textContent = 'Guardar Cambios';
        btnEliminarPlan.style.display = 'inline-block'; // Mostrar botón eliminar

        idPlanInput.value = plan.id;
        nombrePlanInput.value = plan.nombre;
        descripcionInput.value = plan.descripcion;
        precioInput.value = plan.precio;
        duracionInput.value = plan.duracion;
        estadoInput.value = plan.estado;

        idPlanInput.disabled = true; // Deshabilitar ID al editar
        planIdActual = id;
        resetearErrores();
        // Establecer todos los campos como requeridos para el modo 'edit'
        setearComoRequerido(true);
        modalPlan.style.display = 'flex';
    }
}

// Función para abrir el modal en modo "buscar"
btnDeBusqueda.addEventListener('click', () => {
    tipoModalActivo = 'buscar';
    tituloModal.textContent = 'Buscar Planes';
    btnPpalModal.textContent = 'Buscar';
    btnEliminarPlan.style.display = 'none'; // Ocultar botón eliminar en modo búsqueda
    planForm.reset(); // Limpiar campos para nueva búsqueda
    resetearErrores();
    planIdActual = null; // No hay plan específico editando
    idPlanInput.disabled = false; // Habilitar ID para búsqueda
    // Establecer todos los campos como NO requeridos para el modo 'buscar'
    setearComoRequerido(false);
    modalPlan.style.display = 'flex';
});

// Función para establecer si los campos del formulario son requeridos
function setearComoRequerido(esRequerido) {
    // idPlanInput.required = esRequerido; // ID is hidden and handled internally
    nombrePlanInput.required = esRequerido;
    descripcionInput.required = esRequerido;
    precioInput.required = esRequerido;
    duracionInput.required = esRequerido;
    estadoInput.required = esRequerido;
}

// Cierra el modal
closeButton.addEventListener('click', () => {
    modalPlan.style.display = 'none';
    planForm.reset();
    resetearErrores();
    planIdActual = null;
    // No resetear tipoModalActivo aquí, se establecerá al abrir el modal de nuevo
});

// Cierra el modal si se hace clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalPlan) {
        modalPlan.style.display = 'none';
        planForm.reset();
        resetearErrores();
        planIdActual = null;
    }
});

// Función para validar el formulario (solo para agregar/editar)
function validarForm() {
    // Si el modo actual es 'buscar', no se aplica validación de campos requeridos
    if (tipoModalActivo === 'buscar') {
        return true;
    }

    let esValido = true;
    resetearErrores();

    // Validar ID (hidden field, handled internally)
    // if (!idPlanInput.value.trim()) {
    //     idPlanError.textContent = 'El ID es requerido.';
    //     esValido = false;
    // } else if (!/^\d+$/.test(idPlanInput.value.trim())) {
    //     idPlanError.textContent = 'El ID solo puede contener números.';
    //     esValido = false;
    // } else if (tipoModalActivo === 'agregar' && planes.some(p => p.id === parseInt(idPlanInput.value.trim()))) {
    //     idPlanError.textContent = 'Ya existe un plan con este ID.';
    //     esValido = false;
    // }

    // Validar Nombre
    if (!nombrePlanInput.value.trim()) {
        nombrePlanError.textContent = 'El Nombre es requerido.';
        esValido = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(nombrePlanInput.value.trim())) {
        nombrePlanError.textContent = 'El Nombre debe tener al menos 2 caracteres y solo puede contener letras y espacios.';
        esValido = false;
    }

    // Validar Descripción
    if (!descripcionInput.value.trim()) {
        descripcionError.textContent = 'La Descripción es requerida.';
        esValido = false;
    }

    // Validar Precio
    if (!precioInput.value.trim()) {
        precioError.textContent = 'El Precio es requerido.';
        esValido = false;
    } else if (isNaN(precioInput.value) || parseFloat(precioInput.value) < 0) {
        precioError.textContent = 'El Precio debe ser un número válido y positivo.';
        esValido = false;
    }

    // Validar Duración
    if (!duracionInput.value) {
        duracionError.textContent = 'Debe seleccionar una Duración.';
        esValido = false;
    }

    // Validar Estado
    if (!estadoInput.value) {
        estadoError.textContent = 'Debe seleccionar un Estado.';
        esValido = false;
    }

    return esValido;
}

// Función para resetear los mensajes de error del formulario
function resetearErrores() {
    // idPlanError.textContent = ''; // ID is hidden
    nombrePlanError.textContent = '';
    descripcionError.textContent = '';
    precioError.textContent = '';
    duracionError.textContent = '';
    estadoError.textContent = '';
}

// Función para realizar la búsqueda
function RealizarBusqueda() {
    // const idFilter = idPlanInput.value.trim(); // ID is hidden, not used for direct filtering
    const nombreFilter = nombrePlanInput.value.trim().toLowerCase();
    const descripcionFilter = descripcionInput.value.trim().toLowerCase();
    const precioFilter = precioInput.value.trim();
    const duracionFilter = duracionInput.value;
    const estadoFilter = estadoInput.value;

    const planesFiltrados = planes.filter(plan => {
        // const matchId = idFilter ? plan.id.toString().includes(idFilter) : true; // ID is hidden
        const matchNombre = nombreFilter ? plan.nombre.toLowerCase().includes(nombreFilter) : true;
        const matchDescripcion = descripcionFilter ? plan.descripcion.toLowerCase().includes(descripcionFilter) : true;
        const matchPrecio = precioFilter ? plan.precio.toString().includes(precioFilter) : true;
        const matchDuracion = duracionFilter ? plan.duracion === duracionFilter : true;
        const matchEstado = estadoFilter ? plan.estado === estadoFilter : true;

        return matchNombre && matchDescripcion && matchPrecio && matchDuracion && matchEstado;
    });
    renderizarPlanes(planesFiltrados);
    modalPlan.style.display = 'none'; // Cerrar modal después de buscar
    planForm.reset(); // Limpiar campos del modal
}


// Manejar el envío del formulario (Guardar/Actualizar/Buscar)
planForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (tipoModalActivo === 'buscar') {
        RealizarBusqueda();
        return; // Salir de la función después de la búsqueda
    }

    // Si no es modo búsqueda, validar el formulario
    if (!validarForm()) {
        return;
    }

    const datosPlan = {
        id: parseInt(idPlanInput.value),
        nombre: nombrePlanInput.value.trim(),
        descripcion: descripcionInput.value.trim(),
        precio: parseFloat(precioInput.value),
        duracion: duracionInput.value,
        estado: estadoInput.value
    };

    if (tipoModalActivo === 'editar') {
        // Actualizar plan existente
        const index = planes.findIndex(p => p.id === planIdActual);
        if (index !== -1) {
            planes[index] = datosPlan;
            showmensaje('Plan actualizado exitosamente.', 'exito');
        }
    } else if (tipoModalActivo === 'agregar') {
        // Agregar nuevo plan
        const newId = planes.length > 0 ? Math.max(...planes.map(p => p.id)) + 1 : 1;
        datosPlan.id = newId;
        planes.push(datosPlan);
        showmensaje('Plan agregado exitosamente.', 'exito');
    }

    renderizarPlanes();
    modalPlan.style.display = 'none';
    planForm.reset();
    planIdActual = null;
});

// Manejar la eliminación de plan desde el modal
btnEliminarPlan.addEventListener('click', () => {
    if (planIdActual !== null) {
        borrarPlan(planIdActual);
    }
});

// Borra el filtro
btnResetFiltro.addEventListener('click', () => {
    // Renderizar planes al cargar la página
renderizarPlanes();
});


// Función para eliminar un plan
function borrarPlan(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este plan?')) {
        planes = planes.filter(plan => plan.id !== id);
        renderizarPlanes();
        showmensaje('Plan eliminado exitosamente.', 'exito');
        modalPlan.style.display = 'none';
        planForm.reset();
        planIdActual = null;
    }
}

// Función para mostrar mensajes
function showmensaje(msg, tipo) {
    mensajeDiv.textContent = msg;
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.style.display = 'block';
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

// Renderizar planes al cargar la página
renderizarPlanes();