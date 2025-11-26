-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 192.168.0.59    Database: pruebaftx
-- ------------------------------------------------------
-- Server version	8.4.6-0ubuntu0.25.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Pagos`
--

DROP TABLE IF EXISTS `Pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pagos` (
  `id_pagos` int NOT NULL AUTO_INCREMENT,
  `fecha_pago` timestamp NOT NULL,
  `estado` varchar(32) NOT NULL,
  `dias_adicionales` int NOT NULL DEFAULT '0',
  `metodo_de_pago` enum('tarjeta','mercadopago','transferencia','efectivo') NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id_pagos`),
  KEY `FK_8d380528d3215498a4ef329c8c7` (`usuario_id`),
  CONSTRAINT `FK_8d380528d3215498a4ef329c8c7` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pagos`
--

LOCK TABLES `Pagos` WRITE;
/*!40000 ALTER TABLE `Pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_fisicos`
--

DROP TABLE IF EXISTS `datos_fisicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_fisicos` (
  `id` int NOT NULL,
  `peso` decimal(6,3) NOT NULL,
  `estatura` int NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `actividad_diaria` varchar(30) NOT NULL,
  `metas` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo','archivado') NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_fisicos`
--

LOCK TABLES `datos_fisicos` WRITE;
/*!40000 ALTER TABLE `datos_fisicos` DISABLE KEYS */;
INSERT INTO `datos_fisicos` VALUES (1,80.000,180,'Tiene alergia al polen','Gimnasio 3 veces por semana','Ganar masa muscular','activo'),(2,80.000,180,'Tiene alergia al polen','Gimnasio 3 veces por semana','Ganar masa muscular','archivado'),(3,65.500,165,'Sin restricciones médicas','Oficina','Tonificar','activo'),(4,78.200,175,'Hipertensión controlada','Delivery','Bajar de peso','activo'),(5,55.000,160,'','Estudiante','Mejorar resistencia','activo'),(16,65.500,165,'problemas de rodilla y varices','Oficina','Bajar de peso','activo'),(17,65.500,165,'Sin restricciones médicas','Oficina','Tonificar','activo'),(19,65.500,165,'Sin restricciones médicas','Oficina','Tonificar','activo'),(20,65.500,165,'Sin restricciones médicas','Oficina','Tonificar','activo');
/*!40000 ALTER TABLE `datos_fisicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datospersonales`
--

DROP TABLE IF EXISTS `datospersonales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datospersonales` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `genero` enum('hombre','mujer','otro') NOT NULL,
  `f_nacimiento` date DEFAULT NULL,
  `imagen_perfil` varchar(255) NOT NULL DEFAULT 'usuario.png',
  `estado` enum('activo','inactivo','archivado') NOT NULL DEFAULT 'activo',
  `plan_id_plan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e8c31ddc16c8e5dfefe47d460ca` (`plan_id_plan`),
  CONSTRAINT `FK_e8c31ddc16c8e5dfefe47d460ca` FOREIGN KEY (`plan_id_plan`) REFERENCES `plan` (`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datospersonales`
--

LOCK TABLES `datospersonales` WRITE;
/*!40000 ALTER TABLE `datospersonales` DISABLE KEYS */;
INSERT INTO `datospersonales` VALUES (1,'Glach','Gch','12345678','1123456789','mujer','2015-09-11','https://miapp.com/perfiles/juan.jpg','activo',2),(2,'Glach','Gch','12345678','1123456789','mujer','2015-09-11','https://miapp.com/perfiles/juan.jpg','archivado',2),(3,'María','Gómez','12345678','1123456789','mujer','1990-05-11','maria.jpg','activo',1),(4,'Juan','Pérez','87654321','1134567890','hombre','1985-11-02','juan.png','activo',2),(5,'Carla','López','23456789','1145678901','mujer','1995-07-19','carla.jpeg','activo',3),(16,'María Luisa','Gómez Fernandez','17342282','1123456789','mujer','2002-02-06','maria.jpg','activo',3),(17,'Gladys','Gómez Fernandez','12345678','1123456789','mujer','1990-05-11','maria.jpg','activo',1),(19,'Ariel','Rueda','17342282','1123456789','hombre','1965-06-20','1758236359381-ariel.jpeg','activo',1),(20,'Gladys','HHHHH','16998400','1123452222','mujer','1965-06-20','usuario.png','activo',1);
/*!40000 ALTER TABLE `datospersonales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia`
--

DROP TABLE IF EXISTS `dia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia` (
  `id_dia` int NOT NULL AUTO_INCREMENT,
  `nro_dia` varchar(1) NOT NULL,
  `focus` varchar(255) NOT NULL,
  `semana_id_semana` int DEFAULT NULL,
  PRIMARY KEY (`id_dia`),
  KEY `FK_e7fc87289f12535bfc7ded23d95` (`semana_id_semana`),
  CONSTRAINT `FK_e7fc87289f12535bfc7ded23d95` FOREIGN KEY (`semana_id_semana`) REFERENCES `semana` (`id_semana`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia`
--

LOCK TABLES `dia` WRITE;
/*!40000 ALTER TABLE `dia` DISABLE KEYS */;
/*!40000 ALTER TABLE `dia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicio_basico`
--

DROP TABLE IF EXISTS `ejercicio_basico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ejercicio_basico` (
  `id_ejercicio_basico` int NOT NULL AUTO_INCREMENT,
  `nombre_ejercicio` varchar(60) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `imagen_link` varchar(255) DEFAULT NULL,
  `video_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_ejercicio_basico`),
  UNIQUE KEY `IDX_69df2566fd028d03fe70c7c43a` (`nombre_ejercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicio_basico`
--

LOCK TABLES `ejercicio_basico` WRITE;
/*!40000 ALTER TABLE `ejercicio_basico` DISABLE KEYS */;
INSERT INTO `ejercicio_basico` VALUES (1,'Peso Muerto','enderezar la espalda sacando pecho','1758212186849-Ejercicio_PesoMuerto.png','https://www.youtube.com/watch?v=0XL4cZR2Ink&t=2s'),(2,'Sentadilla','Separa los pies del ancho de los hombros, lleva los glúteos hacia abajo y hacia atrás, manteniendo la espalda neutra y el pecho abierto','1757981561831-Ejecicio_Sentadillas.webp','https://www.youtube.com/watch?v=BjixzWEw4EY'),(3,'Dominada','Fortalece primero los trapecios, dorsales, core y biceps','1757981877847-Ejercicio_Dominada.jpg','https://www.youtube.com/watch?v=M7cBPfhbfSY'),(4,'Press Banca','Mantén los pies firmes en el suelo para estabilidad, baja la barra controladamente a la parte baja del pecho, mantén las muñecas alineadas con los codos','1757982017002-Ejercicio_PressBanca.jpg','https://www.youtube.com/watch?v=jlFl7WJ1TzI'),(5,'Remo con barra','Mantén la espanda recta contrayendo el core','1757982199712-Ejercicio_RemoConBarra.png','https://www.youtube.com/watch?v=P_kNA_HElgA'),(6,'Curl de biceps','Mantener la espalda recta y los codos pegados al cuerpo','1758212598817-curl_biceps.png','https://www.youtube.com/watch?v=HU2lghjU29Y&t=1s'),(7,'Triceps con mancuerna','Mantener el codo lo mas arriba posible, tratando que quede pegado a la cabeza','1758212952910-triceps_mancuerna.png','https://www.youtube.com/watch?v=fQ-KB40W3d8&t=1s'),(8,'Jalon al pecho','Saca pecho cuando ejecutes el movimiento descendente','1758213713379-jalon-al-pecho.png','https://www.youtube.com/watch?v=1JiNvChA0_Q');
/*!40000 ALTER TABLE `ejercicio_basico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicio_rutina`
--

DROP TABLE IF EXISTS `ejercicio_rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ejercicio_rutina` (
  `id_ejercicio_rutina` int NOT NULL AUTO_INCREMENT,
  `repeticiones` varchar(30) NOT NULL,
  `dificultad` varchar(30) NOT NULL,
  `peso` decimal(6,3) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `dia_id_dia` int DEFAULT NULL,
  `ejercicio_basico_id_ejercicio_basico` int DEFAULT NULL,
  PRIMARY KEY (`id_ejercicio_rutina`),
  KEY `FK_c9d9eb80d21b2dfeeebb18be1c5` (`dia_id_dia`),
  KEY `FK_2ebabf91110068663bdf6b559e7` (`ejercicio_basico_id_ejercicio_basico`),
  CONSTRAINT `FK_2ebabf91110068663bdf6b559e7` FOREIGN KEY (`ejercicio_basico_id_ejercicio_basico`) REFERENCES `ejercicio_basico` (`id_ejercicio_basico`) ON DELETE RESTRICT,
  CONSTRAINT `FK_c9d9eb80d21b2dfeeebb18be1c5` FOREIGN KEY (`dia_id_dia`) REFERENCES `dia` (`id_dia`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicio_rutina`
--

LOCK TABLES `ejercicio_rutina` WRITE;
/*!40000 ALTER TABLE `ejercicio_rutina` DISABLE KEYS */;
/*!40000 ALTER TABLE `ejercicio_rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_plan`
--

DROP TABLE IF EXISTS `historico_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_plan` (
  `id_plan_historico` int NOT NULL AUTO_INCREMENT,
  `id_plan_origen` int NOT NULL,
  `nombre_plan` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `f_cambio_inicio` timestamp NOT NULL,
  `f_cambio_fin` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `detalle_cambio` varchar(255) NOT NULL,
  `plan_id_plan` int DEFAULT NULL,
  PRIMARY KEY (`id_plan_historico`),
  UNIQUE KEY `IDX_0b37dbb7e61493287029e052e4` (`nombre_plan`),
  KEY `FK_ffb49f865fec2ed469cf547686a` (`plan_id_plan`),
  CONSTRAINT `FK_ffb49f865fec2ed469cf547686a` FOREIGN KEY (`plan_id_plan`) REFERENCES `plan` (`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_plan`
--

LOCK TABLES `historico_plan` WRITE;
/*!40000 ALTER TABLE `historico_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1756154970040,'Initial1756154970040'),(2,1756219430839,'Initial1756219430839'),(3,1757193704782,'Initial1757193704782'),(4,1757431244307,'Initial1757431244307'),(5,1757431368327,'Initial1757431368327'),(6,1757431419194,'Initial1757431419194'),(7,1757542056870,'Initial1757542056870'),(8,1757597796198,'Initial1757597796198'),(9,1757721018732,'Initial1757721018732'),(10,1757721313504,'Initial1757721313504'),(11,1758324700450,'Initial1758324700450'),(12,1758330299944,'Initial1758330299944');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id_plan` int NOT NULL AUTO_INCREMENT,
  `nombre_plan` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `f_cambio` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id_plan`),
  UNIQUE KEY `IDX_4af6652e9452359006447a6a05` (`nombre_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'Plan Pro','Acceso a rutinas personalizadas',30000.00,'2025-09-10 21:00:00.000000'),(2,'Plan Premiun','Acceso a rutinas personalizadas, consejos, atencion personalizada',120000.00,'2025-09-10 21:00:00.000000'),(3,'Plan Basico','Acceso a rutinas genericas',15000.00,'2025-09-10 21:00:00.000000');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutina`
--

DROP TABLE IF EXISTS `rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutina` (
  `id_rutina` int NOT NULL AUTO_INCREMENT,
  `estado_rutina` enum('activa','finalizada','proxima','en proceso','borrada') NOT NULL,
  `f_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `f_ultimo_acceso` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `f_baja` timestamp NULL DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_rutina` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rutina`),
  UNIQUE KEY `IDX_798f7ffeb59bd5210d77155b4f` (`nombre_rutina`),
  KEY `FK_f629865afcc50d26cf7fad6b892` (`id_usuario`),
  CONSTRAINT `FK_f629865afcc50d26cf7fad6b892` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutina`
--

LOCK TABLES `rutina` WRITE;
/*!40000 ALTER TABLE `rutina` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semana`
--

DROP TABLE IF EXISTS `semana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semana` (
  `id_semana` int NOT NULL AUTO_INCREMENT,
  `nro_semana` varchar(1) NOT NULL,
  `estado_semana` enum('en proceso','terminada','no iniciada') NOT NULL,
  `rutina_id_rutina` int DEFAULT NULL,
  PRIMARY KEY (`id_semana`),
  KEY `FK_0c017aa74410505ad6fb4176294` (`rutina_id_rutina`),
  CONSTRAINT `FK_0c017aa74410505ad6fb4176294` FOREIGN KEY (`rutina_id_rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semana`
--

LOCK TABLES `semana` WRITE;
/*!40000 ALTER TABLE `semana` DISABLE KEYS */;
/*!40000 ALTER TABLE `semana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `rol` enum('usuario','admin') NOT NULL DEFAULT 'usuario',
  `estado` enum('activo','inactivo','archivado') NOT NULL DEFAULT 'activo',
  `f_baja` timestamp NULL DEFAULT NULL,
  `f_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `f_ultimo_acceso` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `datos_personales_id` int DEFAULT NULL,
  `datos_fisicos_id` int DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2863682842e688ca198eb25c12` (`email`),
  UNIQUE KEY `REL_9ef85d51e2b9120cbcd50dd083` (`datos_personales_id`),
  UNIQUE KEY `REL_599ab045d0bb25e6ad0eb8482a` (`datos_fisicos_id`),
  CONSTRAINT `FK_599ab045d0bb25e6ad0eb8482a5` FOREIGN KEY (`datos_fisicos_id`) REFERENCES `datos_fisicos` (`id`),
  CONSTRAINT `FK_9ef85d51e2b9120cbcd50dd083d` FOREIGN KEY (`datos_personales_id`) REFERENCES `datospersonales` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'gch@correo.com','usuario','activo',NULL,'2025-09-13 00:04:00.021159','2025-09-13 00:04:00.000000',1,1,'Gch123123'),(2,'aaa@correo.com','usuario','archivado','2025-09-15 21:25:44','2025-09-13 23:38:31.362200','2025-09-16 00:25:43.000000',2,2,'Gch123123'),(3,'maria.gomez@example.com','usuario','activo',NULL,'2025-09-14 14:01:42.669175','2025-09-14 14:01:42.000000',3,3,'Maria1234'),(4,'juan.perez@example.com','usuario','activo',NULL,'2025-09-14 14:05:34.051066','2025-09-14 14:05:34.000000',4,4,'Juan1234'),(5,'carla.lopez@example.com','usuario','activo',NULL,'2025-09-14 14:06:49.319615','2025-09-14 14:06:49.000000',5,5,'Carla1234'),(6,'admin@ejemplo.com','admin','activo',NULL,'2025-09-14 14:15:38.035600','2025-09-14 14:15:38.035600',NULL,NULL,'Admin2025'),(7,'admin2@ejemplo.com','admin','activo',NULL,'2025-09-14 23:42:07.481615','2025-09-14 23:42:07.481615',NULL,NULL,'$2b$10$BUnZfJXUWST25JveCoCgp.c11UZqWG5CIrh6Z6mGAWfXonRAPFaGC'),(16,'maria.gomez.fernandez@example.com','usuario','activo',NULL,'2025-09-15 23:04:56.036884','2025-09-19 00:03:16.000000',16,16,'$2b$10$DVIFpW/.fvzpYNMSvvs/ie8zFQSA0/HG.1iC4AyGk7mVLbgX4jU5G'),(17,'profherreratic@gmail.com','usuario','activo',NULL,'2025-09-15 23:35:42.119761','2025-09-15 23:35:42.000000',17,17,'$2b$10$B382uIiEYwp24egMASuAKOlSfuAOV8GI3FjMQTHS41Owmfc0vxWjS'),(19,'ruedaar@gmail.com','usuario','activo',NULL,'2025-09-17 14:20:37.682323','2025-09-17 14:20:37.000000',19,19,'$2b$10$S.sOgxlLaNXIfKIBJLEWu.t6m9BGNeeKzElviZuRXeZduxBZu94uO'),(20,'gch.gch.2023@gmail.com','usuario','activo',NULL,'2025-09-20 00:02:11.057474','2025-09-20 00:02:11.000000',20,20,'$2b$10$Aennk.jUezrVj.PuI68w5Ox0IupZVSUnZmbHkdYMV1/S.IlH9yHQ.');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 22:07:57
