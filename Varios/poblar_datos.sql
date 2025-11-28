
-- =================================================================
-- Script de Población de Datos para FTX-FitnessTrainingExperience (Extendido)
-- =================================================================
-- Este script inserta una gran cantidad de datos de ejemplo para pruebas.
-- El orden de inserción es crucial para mantener la integridad referencial.
-- NOTA: Las contraseñas son de ejemplo y no están hasheadas.

-- =================================================================
-- 1. Tabla: ejercicio_basico
-- =================================================================
-- Inserta ejercicios básicos que se usarán en las rutinas.
INSERT INTO `ejercicio_basico` (`idEjercicioBasico`, `nombreEjercicio`, `observaciones`, `imagenLink`, `videoLink`) VALUES
(1, 'Press de Banca', 'Enfoque en el pectoral mayor, deltoides anterior y tríceps.', 'https://ejemplo.com/img/press_banca.jpg', 'https://ejemplo.com/vid/press_banca.mp4'),
(2, 'Sentadilla con Barra', 'Ejercicio compuesto para piernas y glúteos. Mantener la espalda recta.', 'https://ejemplo.com/img/sentadilla.jpg', 'https://ejemplo.com/vid/sentadilla.mp4'),
(3, 'Peso Muerto', 'Trabaja la cadena posterior, incluyendo isquiotibiales, glúteos y espalda baja.', 'https://ejemplo.com/img/peso_muerto.jpg', 'https://ejemplo.com/vid/peso_muerto.mp4'),
(4, 'Dominadas', 'Excelente para el desarrollo de la espalda alta y bíceps.', 'https://ejemplo.com/img/dominadas.jpg', 'https://ejemplo.com/vid/dominadas.mp4'),
(5, 'Press Militar', 'Ejercicio de hombros realizado de pie o sentado.', 'https://ejemplo.com/img/press_militar.jpg', 'https://ejemplo.com/vid/press_militar.mp4'),
(6, 'Curl de Bíceps con Barra', 'Aisla y trabaja los músculos del bíceps.', 'https://ejemplo.com/img/curl_biceps.jpg', 'https://ejemplo.com/vid/curl_biceps.mp4'),
(7, 'Remo con Barra', 'Fortalece la espalda media y los dorsales.', 'https://ejemplo.com/img/remo_barra.jpg', 'https://ejemplo.com/vid/remo_barra.mp4'),
(8, 'Prensa de Piernas', 'Alternativa a la sentadilla para enfocar en cuádriceps.', 'https://ejemplo.com/img/prensa_piernas.jpg', 'https://ejemplo.com/vid/prensa_piernas.mp4');

-- =================================================================
-- 2. Tabla: usuario
-- =================================================================
-- Inserta 15 usuarios con diferentes roles y estados.
INSERT INTO `usuario` (`id`, `email`, `password`, `rol`, `estado`) VALUES
(1, 'admin@ftx.com', 'adminpass', 'admin', 'activo'),
(2, 'juan.perez@email.com', 'juan123', 'usuario', 'activo'),
(3, 'ana.gomez@email.com', 'ana456', 'usuario', 'inactivo'),
(4, 'carlos.sanchez@email.com', 'carlos789', 'usuario', 'activo'),
(5, 'sofia.lopez@email.com', 'sofia101', 'usuario', 'activo'),
(6, 'luis.martinez@email.com', 'luis202', 'usuario', 'archivado'),
(7, 'valentina.diaz@email.com', 'valen303', 'usuario', 'activo'),
(8, 'martin.fernandez@email.com', 'martin404', 'usuario', 'inactivo'),
(9, 'camila.rodriguez@email.com', 'cami505', 'usuario', 'activo'),
(10, 'diego.gonzalez@email.com', 'diego606', 'usuario', 'activo'),
(11, 'lucia.moreno@email.com', 'luci707', 'usuario', 'activo'),
(12, 'javier.gimenez@email.com', 'javi808', 'usuario', 'inactivo'),
(13, 'isabella.alvarez@email.com', 'isa909', 'usuario', 'activo'),
(14, 'mateo.romero@email.com', 'mateo111', 'usuario', 'activo'),
(15, 'elena.navarro@email.com', 'elena222', 'usuario', 'activo');

-- =================================================================
-- 3. Tabla: datospersonales
-- =================================================================
-- Inserta datos personales para los 15 usuarios.
INSERT INTO `datospersonales` (`id`, `plan`, `nombre`, `apellido`, `dni`, `phone`, `genero`, `imagenPerfil`) VALUES
(1, 'premium', 'Admin', 'FTX', '12345678', '1122334455', 'otro', 'https://ejemplo.com/img/admin.jpg'),
(2, 'pro', 'Juan', 'Perez', '87654321', '5544332211', 'hombre', 'https://ejemplo.com/img/juan.jpg'),
(3, 'basico', 'Ana', 'Gomez', '11223344', '6677889900', 'mujer', 'https://ejemplo.com/img/ana.jpg'),
(4, 'premium', 'Carlos', 'Sanchez', '22334455', '1234567890', 'hombre', 'https://ejemplo.com/img/carlos.jpg'),
(5, 'pro', 'Sofia', 'Lopez', '33445566', '2345678901', 'mujer', 'https://ejemplo.com/img/sofia.jpg'),
(6, 'basico', 'Luis', 'Martinez', '44556677', '3456789012', 'hombre', 'https://ejemplo.com/img/luis.jpg'),
(7, 'pro', 'Valentina', 'Diaz', '55667788', '4567890123', 'mujer', 'https://ejemplo.com/img/valentina.jpg'),
(8, 'basico', 'Martin', 'Fernandez', '66778899', '5678901234', 'hombre', 'https://ejemplo.com/img/martin.jpg'),
(9, 'premium', 'Camila', 'Rodriguez', '77889900', '6789012345', 'mujer', 'https://ejemplo.com/img/camila.jpg'),
(10, 'pro', 'Diego', 'Gonzalez', '88990011', '7890123456', 'hombre', 'https://ejemplo.com/img/diego.jpg'),
(11, 'basico', 'Lucia', 'Moreno', '99001122', '8901234567', 'mujer', 'https://ejemplo.com/img/lucia.jpg'),
(12, 'premium', 'Javier', 'Gimenez', '00112233', '9012345678', 'hombre', 'https://ejemplo.com/img/javier.jpg'),
(13, 'pro', 'Isabella', 'Alvarez', '11223345', '0123456789', 'mujer', 'https://ejemplo.com/img/isabella.jpg'),
(14, 'basico', 'Mateo', 'Romero', '22334456', '1234509876', 'hombre', 'https://ejemplo.com/img/mateo.jpg'),
(15, 'pro', 'Elena', 'Navarro', '33445567', '2345610987', 'mujer', 'https://ejemplo.com/img/elena.jpg');

-- =================================================================
-- 4. Tabla: datos_fisicos
-- =================================================================
-- Inserta datos físicos para los usuarios (excluyendo al admin).
INSERT INTO `datos_fisicos` (`id`, `actividadDiaria`, `peso`, `estatura`, `metas`, `observaciones`) VALUES
(2, 'Sedentario', 80.5, 175, 'Perder peso y ganar músculo', 'Principiante, sin lesiones previas.'),
(3, 'Activo', 65.0, 168, 'Tonificar y mejorar resistencia', 'Experiencia intermedia en gimnasio.'),
(4, 'Muy Activo', 75.2, 180, 'Ganar fuerza', 'Avanzado, compite en powerlifting.'),
(5, 'Sedentario', 60.1, 165, 'Perder grasa abdominal', 'Trabajo de oficina, poco tiempo para entrenar.'),
(6, 'Activo', 85.0, 178, 'Mantenerse en forma', 'Sin metas específicas.'),
(7, 'Activo', 58.5, 163, 'Correr una maratón', 'Enfocada en cardio.'),
(8, 'Sedentario', 95.3, 182, 'Bajar de peso urgentemente', 'Recomendación médica.'),
(9, 'Muy Activo', 63.0, 170, 'Hipertrofia muscular', 'Entrena 5-6 días a la semana.'),
(10, 'Activo', 78.8, 179, 'Mejorar composición corporal', 'Estancado en el progreso.'),
(11, 'Sedentario', 70.0, 172, 'Empezar a hacer ejercicio', 'Nunca ha ido a un gimnasio.'),
(12, 'Activo', 88.0, 185, 'Ganar volumen', 'Le cuesta ganar peso.'),
(13, 'Muy Activo', 61.5, 167, 'Definición muscular', 'Preparándose para el verano.'),
(14, 'Activo', 72.0, 176, 'Mejorar en calistenia', 'Enfocado en peso corporal.'),
(15, 'Sedentario', 68.7, 169, 'Recuperarse de una lesión', 'Lesión de rodilla leve, necesita fortalecimiento.');

-- =================================================================
-- 5. Tabla: rutina
-- =================================================================
-- Inserta rutinas de ejemplo y las asocia a diferentes usuarios.
INSERT INTO `rutina` (`idRutina`, `nombreRutina`, `estadoRutina`, `id_usuario`) VALUES
(1, 'Fuerza para Principiantes - Juan', 'activa', 2),
(2, 'Tonificación General - Ana', 'proxima', 3),
(3, 'Powerlifting Avanzado - Carlos', 'activa', 4),
(4, 'Hipertrofia Total - Camila', 'activa', 9),
(5, 'Resistencia y Cardio - Valentina', 'en proceso', 7),
(6, 'Volumen para Ectomorfos - Javier', 'activa', 12),
(7, 'Acondicionamiento Físico Inicial - Lucia', 'no iniciada', 11);

-- =================================================================
-- 6. Tabla: semana
-- =================================================================
-- Inserta semanas para las rutinas creadas.
INSERT INTO `semana` (`idSemana`, `nroSemana`, `estadoSemana`, `rutinaIdRutina`) VALUES
-- Semanas para Rutina 1 (Juan)
(1, '1', 'en proceso', 1),
(2, '2', 'no iniciada', 1),
-- Semanas para Rutina 3 (Carlos)
(3, '1', 'terminada', 3),
(4, '2', 'en proceso', 3),
-- Semanas para Rutina 4 (Camila)
(5, '1', 'en proceso', 4),
-- Semanas para Rutina 5 (Valentina)
(6, '1', 'en proceso', 5);

-- =================================================================
-- 7. Tabla: dia
-- =================================================================
-- Inserta días de entrenamiento para las semanas.
INSERT INTO `dia` (`idDia`, `nroDia`, `focus`, `semanaIdSemana`) VALUES
-- Semana 1 (Rutina de Juan)
(1, '1', 'Torso', 1),
(2, '2', 'Descanso', 1),
(3, '3', 'Pierna', 1),
(4, '4', 'Descanso', 1),
(5, '5', 'Torso', 1),
-- Semana 4 (Rutina de Carlos)
(6, '1', 'Sentadilla Pesada', 4),
(7, '2', 'Press de Banca Pesado', 4),
(8, '3', 'Descanso', 4),
(9, '4', 'Peso Muerto Pesado', 4),
(10, '5', 'Accesorios', 4),
-- Semana 5 (Rutina de Camila)
(11, '1', 'Empuje (Push)', 5),
(12, '2', 'Tirón (Pull)', 5),
(13, '3', 'Pierna (Leg)', 5),
(14, '4', 'Descanso', 5),
(15, '5', 'Full Body', 5);

-- =================================================================
-- 8. Tabla: ejercicio_rutina
-- =================================================================
-- Asigna ejercicios específicos a cada día de la rutina.

-- Día 1 (Juan - Torso)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('3x10', 'Media', 50.0, 'Calentar bien.', 1, 1), -- Press de Banca
('3x12', 'Media', 45.0, 'Controlar la negativa.', 1, 7), -- Remo con Barra
('3x10', 'Baja', 25.0, 'Sin impulso.', 1, 5); -- Press Militar

-- Día 3 (Juan - Pierna)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('4x8', 'Media', 70.0, 'Profundidad completa.', 3, 2), -- Sentadilla
('3x12', 'Media', 120.0, 'Enfocar en cuádriceps.', 3, 8); -- Prensa de Piernas

-- Día 6 (Carlos - Sentadilla Pesada)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('5x3', 'Alta', 140.0, 'Usa cinturón y rodilleras.', 6, 2), -- Sentadilla
('4x8', 'Media', 180.0, 'Pausa de 1 segundo abajo.', 6, 8); -- Prensa de Piernas

-- Día 7 (Carlos - Press de Banca Pesado)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('5x3', 'Alta', 110.0, 'Con spotter de seguridad.', 7, 1); -- Press de Banca

-- Día 9 (Carlos - Peso Muerto Pesado)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('5x2', 'Muy Alta', 180.0, 'Técnica perfecta es prioridad.', 9, 3); -- Peso Muerto

-- Día 11 (Camila - Empuje)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('4x8', 'Media', 45.0, 'Rango de movimiento completo.', 11, 1), -- Press de Banca
('4x10', 'Media', 20.0, 'Controlado.', 11, 5); -- Press Militar

-- Día 12 (Camila - Tirón)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('4x8', 'Alta', 0, 'Agarre ancho.', 12, 4), -- Dominadas
('4x10', 'Media', 50.0, 'Contracción en la espalda.', 12, 7), -- Remo con Barra
('3x12', 'Baja', 25.0, 'Sin balanceo.', 12, 6); -- Curl de Bíceps

-- Día 13 (Camila - Pierna)
INSERT INTO `ejercicio_rutina` (`repeticiones`, `dificultad`, `peso`, `observaciones`, `diaIdDia`, `ejercicioBasicoIdEjercicioBasico`) VALUES
('5x5', 'Alta', 85.0, 'Enfocada en fuerza.', 13, 2), -- Sentadilla
('4x8', 'Media', 100.0, 'Sumo stance.', 13, 3); -- Peso Muerto

-- =================================================================
-- Fin del script
-- =================================================================
