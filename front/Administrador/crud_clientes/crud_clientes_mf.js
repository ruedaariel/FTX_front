/*-- ==========================================================================
   Archivo: crud_clientes.js
   Descripción: contiene toda la logica de los botones (distintas acciones:
   buscar/filtrar, agregar, modificar, eliminar).
   Crea las vistas para mostrar el listado de clientes tanto en mobile como en desktop
   ========================================================================== */

// Datos iniciales de clientes
let clientes = [
    { DNI: 12345678, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@example.com", telefono: "1122334455", plan: "Premium", estado: "Activo" },
    { DNI: 39848773, nombre: "María", apellido: "Gómez", correo: "maria.gomez@example.com", telefono: "1133445566", plan: "Básico", estado: "Inactivo" },
    { DNI: 37255346, nombre: "Carlos", apellido: "Rodríguez", correo: "carlos.rodriguez@example.com", telefono: "1144556677", plan: "Intermedio", estado: "Activo" }
];

// Referencias a elementos del DOM
const listaClienteMobile = document.getElementById('listaClienteMobile');
const cuerpoTablaClientes = document.getElementById('cuerpoTablaClientes');
const modalCliente = document.getElementById('modalCliente');
const closeButton = document.querySelector('.close-btn');
const clienteForm = document.getElementById('clienteForm');
const tituloModal = document.getElementById('tituloModal');
const btnPpalModal = document.getElementById('btnPpalModal'); // Botón principal del modal (Guardar/Buscar)
const btnEliminarCliente = document.getElementById('btnEliminarCliente');
const btnNuevoCliente = document.getElementById('btnNuevoCliente');
const btnDeBusqueda = document.getElementById('btnDeBusqueda'); // Nuevo botón para abrir modal de búsqueda
const mensajeDiv = document.getElementById('mensaje');

let tipoModalActivo = 'agregar'; // 'agregar', 'editar', 'buscar'
let clienteIdActual = null; // Para almacenar el Nro del cliente que se está editando

// Referencias a los campos del formulario y sus mensajes de error
const nroInput = document.getElementById('nro'); // Corregido de 'DNI' a 'nro'
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const correoInput = document.getElementById('correo');
const telefonoInput = document.getElementById('telefono'); // Nuevo input de teléfono
const planInput = document.getElementById('plan');
const estadoInput = document.getElementById('estado');

const nroError = document.getElementById('nro-error');
const nombreError = document.getElementById('nombre-error');
const apellidoError = document.getElementById('apellido-error');
const correoError = document.getElementById('correo-error');
const telefonoError = document.getElementById('telefono-error'); // Nuevo mensaje de error para teléfono
const planError = document.getElementById('plan-error');
const estadoError = document.getElementById('estado-error');


/* ---------------------------- LISTENERS -----------------------------------------*/
// Función para abrir el modal en modo "nuevo cliente"
btnNuevoCliente.addEventListener('click', () => {
    tipoModalActivo = 'agregar';
    tituloModal.textContent = 'Nuevo Cliente';
    btnPpalModal.textContent = 'Guardar';
    btnEliminarCliente.style.display = 'none'; // Ocultar botón eliminar para nuevos clientes
    clienteForm.reset();
    resetearErrores();
    clienteIdActual = null;
    nroInput.disabled = false; // Habilitar Nro para nuevos clientes //OJO ESTO LO VEMOS BIEN CUANDO CONECTEMOS CON BACKEND
    // Establecer todos los campos como requeridos para el modo 'agregar'
    setearComoRequerido(true);
    modalCliente.style.display = 'flex';
});


// Función para abrir el modal en modo "buscar"
btnDeBusqueda.addEventListener('click', () => {
    tipoModalActivo = 'buscar';
    tituloModal.textContent = 'Buscar Clientes';
    btnPpalModal.textContent = 'Buscar';
    btnEliminarCliente.style.display = 'none'; // Ocultar botón eliminar en modo búsqueda
    clienteForm.reset(); // Limpiar campos para nueva búsqueda
    resetearErrores();
    clienteIdActual = null; 
    nroInput.disabled = false; // Habilitar Nro para búsqueda
    // Establecer todos los campos como NO requeridos para el modo 'buscar'
    setearComoRequerido(false);
    modalCliente.style.display = 'flex';
});


// Cierra el modal
closeButton.addEventListener('click', () => {
    modalCliente.style.display = 'none';
    clienteForm.reset();
    resetearErrores();
    clienteIdActual = null;
    // No resetear tipoModalActivo aquí, se establecerá al abrir el modal de nuevo
});


// Cierra el modal si se hace clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalCliente) {
        modalCliente.style.display = 'none';
        clienteForm.reset();
        resetearErrores();
        clienteIdActual = null;
    }
});


// Manejar el envío del formulario (Guardar/Actualizar/Buscar)
clienteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (tipoModalActivo === 'buscar') {
        RealizarBusqueda();
        return; // Salir de la función después de la búsqueda
    }

    // Si no es modo búsqueda, validar el formulario
    if (!validarForm()) {
        return;
    }

    const datosCliente = {
        DNI: parseInt(nroInput.value), // Usar DNI en lugar de nro
        nombre: nombreInput.value.trim(),
        apellido: apellidoInput.value.trim(),
        correo: correoInput.value.trim(),
        telefono: telefonoInput.value.trim(), // Incluir teléfono
        plan: planInput.value,
        estado: estadoInput.value
    };

    if (tipoModalActivo === 'editar') {
        // Actualizar cliente existente
        const index = clientes.findIndex(c => c.DNI === clienteIdActual); // Buscar por DNI
        if (index !== -1) {
            clientes[index] = datosCliente;
            showmensaje('Cliente actualizado exitosamente.', 'exito');
        }
    } else if (tipoModalActivo === 'agregar') {
        // Agregar nuevo cliente
        clientes.push(datosCliente);
        showmensaje('Cliente agregado exitosamente.', 'exito');
    }

    renderizarClientes();
    modalCliente.style.display = 'none';
    clienteForm.reset();
    clienteIdActual = null;
});

// Manejar la eliminación de cliente desde el modal
btnEliminarCliente.addEventListener('click', () => {
    if (clienteIdActual !== null) {
        borrarCliente(clienteIdActual);
    }
});

// Borra el filtro
btnResetFiltro.addEventListener('click', () => {
    // Renderizar clientes al cargar la página
    renderizarClientes();
});


/* ------------------------------------ FUNCIONES --------------------------------------*/
// Función para eliminar un cliente
function borrarCliente(dni) { // Cambiado nro a dni
     //if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
     // HACER MODAL PARA LA CONFIRMACION
        clientes = clientes.filter(cliente => cliente.DNI !== dni); // Filtrar por DNI
        renderizarClientes();
        showmensaje('Cliente eliminado exitosamente.', 'exito');
        modalCliente.style.display = 'none';
        clienteForm.reset();
        clienteIdActual = null;
      //  mostrarModal("Aviso", "Cliente eliminado exitosamente","success", false)
      //borrar el otro aviso y dejar este modal (agregar modal.html, css y js)
    
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

// Función para renderizar la lista de clientes (cards para mobile, tabla para desktop)
function renderizarClientes(clientesFiltrados = clientes) {
    //Crea las cards para Mobile (Cards)
    listaClienteMobile.innerHTML = '';
    clientesFiltrados.forEach(cliente => {
        const card = document.createElement('div');
        card.classList.add('card-cliente');
        card.innerHTML = `
                    <h3>${cliente.nombre} ${cliente.apellido} (#${cliente.DNI})</h3>
                    <p><strong>Correo:</strong> ${cliente.correo}</p>
                    <p><strong>Teléfono:</strong> ${cliente.telefono || 'N/A'}</p>
                    <p><strong>Plan:</strong> ${cliente.plan}</p>
                    <p><strong>Estado:</strong> ${cliente.estado}</p>
                    <button class="actions-icon" onclick="abrirModalParaEditar(${cliente.DNI})" title="Editar Cliente">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                `;
        listaClienteMobile.appendChild(card);
    });

    // Renderizar para Desktop (Tabla)
    cuerpoTablaClientes.innerHTML = '';
    clientesFiltrados.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${cliente.DNI}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.telefono || 'N/A'}</td>
                    <td>${cliente.plan}</td>
                    <td>${cliente.estado}</td>
                    <td class="celda-botones">
                        <button onclick="abrirModalParaEditar(${cliente.DNI})">Editar</button>
                        <button class="delete-btn" onclick="borrarCliente(${cliente.DNI})">Eliminar</button>
                    </td>
                `;
        cuerpoTablaClientes.appendChild(row);
    });
}

// Función para abrir el modal en modo "editar cliente"
function abrirModalParaEditar(dni) {
    tipoModalActivo = 'editar';
    const cliente = clientes.find(c => c.DNI === dni);
    if (cliente) {
        tituloModal.textContent = 'Editar Cliente';
        btnPpalModal.textContent = 'Guardar Cambios';
        btnEliminarCliente.style.display = 'inline-block'; // Mostrar botón eliminar

        nroInput.value = cliente.DNI;
        nombreInput.value = cliente.nombre;
        apellidoInput.value = cliente.apellido;
        correoInput.value = cliente.correo;
        telefonoInput.value = cliente.telefono; 
        planInput.value = cliente.plan;
        estadoInput.value = cliente.estado;

        nroInput.disabled = true; // Deshabilitar Nro al editar
        clienteIdActual = dni;
        resetearErrores();
        // Establecer todos los campos como requeridos para el modo 'edit'
        setearComoRequerido(true);
        modalCliente.style.display = 'flex';
    }
}

// Función para establecer si los campos del formulario son requeridos
function setearComoRequerido(esRequerido) {
    nroInput.required = esRequerido;
    nombreInput.required = esRequerido;
    apellidoInput.required = esRequerido;
    correoInput.required = esRequerido;
    planInput.required = esRequerido;
    estadoInput.required = esRequerido;
}

// Función para validar el formulario (solo para agregar/editar)
function validarForm() {
    // Si el modo actual es 'buscar', no se aplica validación de campos requeridos
    if (tipoModalActivo === 'buscar') {
        return true;
    }

    let esValido = true;
    resetearErrores();

    // Validar DNI (nroInput)
    if (!nroInput.value.trim()) {
        nroError.textContent = 'El DNI es requerido.';
        esValido = false;
    } else if (!/^\d+$/.test(nroInput.value.trim())) {
        nroError.textContent = 'El DNI solo puede contener números.';
        esValido = false;
    } else if (nroInput.value.trim().length > 8) {
        nroError.textContent = 'El DNI no puede tener más de 8 números.';
        esValido = false;
    } else if (nroInput.value.trim().length < 7) {
        nroError.textContent = 'El DNI tiene que tener al menos 7 números.';
        esValido = false;
    } else if (tipoModalActivo === 'agregar' && clientes.some(c => c.DNI === parseInt(nroInput.value.trim()))) {
        nroError.textContent = 'Ya existe un cliente con este DNI.';
        esValido = false;
    }

    // Validar Nombre (nombreInput)
    if (!nombreInput.value.trim()) {
        nombreError.textContent = 'El Nombre es requerido.';
        esValido = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(nombreInput.value.trim())) {
        nombreError.textContent = 'El Nombre debe tener al menos 2 caracteres y solo puede contener letras y espacios.';
        esValido = false;
    }

    // Validar Apellido (apellidoInput)
    if (!apellidoInput.value.trim()) {
        apellidoError.textContent = 'El Apellido es requerido.';
        esValido = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(apellidoInput.value.trim())) {
        apellidoError.textContent = 'El Apellido debe tener al menos 2 caracteres y solo puede contener letras y espacios.';
        esValido = false;
    }

    // Validar Correo (correoInput)
    if (!correoInput.value.trim()) {
        correoError.textContent = 'El Correo es requerido.';
        esValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value.trim()) || !correoInput.value.trim().includes('.com')) {
        correoError.textContent = 'El Correo debe tener un formato válido (ej: usuario@dominio.com).';
        esValido = false;
    }

    // Validar Teléfono (telefonoInput) - No es requerido
    if (telefonoInput.value.trim() && !/^\d{10}$/.test(telefonoInput.value.trim())) {
        telefonoError.textContent = 'El Teléfono solo puede contener números y guiones.';
        esValido = false;
    } else {
        const phoneDigits = telefonoInput.value.trim().replace(/\D/g, '');
        if (phoneDigits.length > 10) {
            telefonoError.textContent = 'El Teléfono no puede tener más de 10 números.';
            esValido = false;
        }
    }


    // Validar Plan (planInput)
    if (!planInput.value) {
        planError.textContent = 'Debe seleccionar un Plan.';
        esValido = false;
    }

    // Validar Estado (estadoInput)
    if (!estadoInput.value) {
        estadoError.textContent = 'Debe seleccionar un Estado.';
        esValido = false;
    }

    return esValido;
}

// Función para resetear los mensajes de error del formulario
function resetearErrores() {
    nroError.textContent = '';
    nombreError.textContent = '';
    apellidoError.textContent = '';
    correoError.textContent = '';
    telefonoError.textContent = ''; // Resetear error de teléfono
    planError.textContent = '';
    estadoError.textContent = '';
}

// Función para realizar la búsqueda (anteriormente en searchBtn click)
function RealizarBusqueda() {
    const nroFilter = nroInput.value.trim();
    const nombreFilter = nombreInput.value.trim().toLowerCase();
    const apellidoFilter = apellidoInput.value.trim().toLowerCase();
    const correoFilter = correoInput.value.trim().toLowerCase();
    const telefonoFilter = telefonoInput.value.trim().toLowerCase(); // Nuevo filtro de teléfono
    const planFilter = planInput.value;
    const estadoFilter = estadoInput.value;

    const clientesFiltrados = clientes.filter(client => {
        const matchNro = nroFilter ? client.DNI.toString().includes(nroFilter) : true;
        const matchNombre = nombreFilter ? client.nombre.toLowerCase().includes(nombreFilter) : true;
        const matchApellido = apellidoFilter ? client.apellido.toLowerCase().includes(apellidoFilter) : true;
        const matchCorreo = correoFilter ? client.correo.toLowerCase().includes(correoFilter) : true;
        const matchTelefono = telefonoFilter ? (client.telefono || '').toLowerCase().includes(telefonoFilter) : true; // Filtrar por teléfono
        const matchPlan = planFilter ? client.plan === planFilter : true;
        const matchEstado = estadoFilter ? client.estado === estadoFilter : true;

        return matchNro && matchNombre && matchApellido && matchCorreo && matchTelefono && matchPlan && matchEstado;
    });
    renderizarClientes(clientesFiltrados);
    modalCliente.style.display = 'none'; // Cerrar modal después de buscar
    clienteForm.reset(); // Limpiar campos del modal
}
// Renderizar clientes al cargar la página
renderizarClientes();