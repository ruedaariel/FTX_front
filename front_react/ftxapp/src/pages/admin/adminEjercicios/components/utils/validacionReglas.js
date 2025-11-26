//se usa en useEjercicioForms

export const VALIDACION_REGLAS = {

    nombreEjercicio: {
        required: true,
        min: 3,
        max: 60,
        regex: /^[\p{L}\p{N} ,()/%°\-\[\] ]{3,60}$/u,
        messages: {
            required: 'El nombre del ejercicio es obligatorio.',
            min: 'Debe tener al menos 3 caracteres.',
            regex: 'Contiene caracteres no válidos o longitud incorrecta (3-60).',
        }
    },

    // VALIDACION_REGLAS.js (Añadiendo reglas del Interceptor)
    imagenLink: {
        required: false,
        maxSizeMB: 2,   // 2 Megabytes (equivalente a 2097152 bytes del backend)
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'], // Nota: jpg y jpeg son el mismo mimetype
        messages: {
            maxSize: 'La imagen no debe pesar más de 2 MB.',
            invalidType: 'Solo se permiten imágenes JPG, JPEG, PNG o WEBP.',
        }
    },
    videoLink: {
        required: false, //video no obligatorio
        max: 200, // Límite  para una URL

        // Expresión regular que cubre YouTube, Vimeo y Dailymotion
        regex: /^(?:(?:https?:\/\/(?:www\.)?)(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})|vimeo\.com\/(\d+)|dailymotion\.com\/video\/([\w-]+))/,

        messages: {
            required: 'El link de video es obligatorio.',
            max: 'El enlace es demasiado largo.',
            regex: 'El formato de enlace no es válido (use YouTube, Vimeo, o Dailymotion).',
        }
    }
} 