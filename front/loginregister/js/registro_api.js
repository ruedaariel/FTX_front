// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Función para recopilar todos los datos y enviarlos a la API
async function registrarUsuario() {
    // Datos de login_suscripcion.html (obtenidos de la URL)
    const dni = getUrlParameter('dni');
    const email = getUrlParameter('email');
    // Aquí deberíamos obtener el resto de los datos de suscripción si se hubieran pasado por URL o localStorage
    // Por simplicidad, asumimos que solo DNI y Email son pasados para identificar al usuario.
    // En un escenario real, se usaría localStorage o una sesión para pasar todos los datos de suscripción.

    // Datos de login_perfil.html
    const actividad = document.getElementById('actividad').value;
    const peso = document.getElementById('peso').value;
    const estatura = document.getElementById('estatura').value;
    const metas = document.getElementById('metas').value;
    const restric_med = document.getElementById('restric_med').value;

    // Recuperar datos de localStorage si se guardaron en login_suscripcion.html
    const datosSuscripcion = JSON.parse(localStorage.getItem('datosSuscripcion')) || {};

    const usuarioData = {
        plan: datosSuscripcion.plan || '',
        apellido: datosSuscripcion.apellido || '',
        nombre: datosSuscripcion.nombre || '',
        dni: dni, // Usamos el DNI de la URL como fuente principal
        fechaNacimiento: datosSuscripcion.fechaNacimiento || '',
        email: email, // Usamos el email de la URL como fuente principal
        phone: datosSuscripcion.phone || '',
        genero: datosSuscripcion.genero || '',
        actividadFisica: actividad,
        peso: parseFloat(peso),
        estatura: parseInt(estatura),
        metas: metas,
        restriccionesMedicas: restric_med
    };

    console.log("Datos del usuario para registrar:", usuarioData);

    // Simulación de llamada a la API
    try {
        // const response = await fetch('URL_DE_TU_API/registro', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(usuarioData),
        // });

        // if (response.ok) {
        //     const result = await response.json();
        //     console.log('Registro exitoso:', result);
        //     mostrarModal("Registro Completo", "Tu perfil ha sido guardado exitosamente.", "success", false);
        //     // Redirigir al login básico o a la página de inicio
        //     window.location.href = 'login_basico.html';
        // } else {
        //     const errorData = await response.json();
        //     console.error('Error en el registro:', errorData);
        //     mostrarModal("Error de Registro", errorData.message || "Hubo un problema al registrar tu perfil.", "error", false);
        // }

        // Simulación de éxito para desarrollo
        console.log('Simulación de registro exitoso. Redirigiendo a login_basico.html');
        mostrarModal("Registro Completo", "Tu perfil ha sido guardado exitosamente (simulado).", "success", false);
        localStorage.removeItem('datosSuscripcion'); // Limpiar datos temporales
        setTimeout(() => {
            window.location.href = 'login_basico.html';
        }, 2000); // Redirigir después de 2 segundos
        
    } catch (error) {
        console.error('Error de conexión o inesperado:', error);
        mostrarModal("Error de Conexión", "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.", "error", false);
    }
}