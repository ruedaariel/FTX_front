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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicio_basico`
--

LOCK TABLES `ejercicio_basico` WRITE;
/*!40000 ALTER TABLE `ejercicio_basico` DISABLE KEYS */;
INSERT INTO `ejercicio_basico` VALUES (1,'Peso Muerto','enderezar la espalda sacando pecho',NULL,'https://www.youtube.com/watch?v=0XL4cZR2Ink&t=2s'),(2,'Sentadilla','Separa los pies del ancho de los hombros, lleva los glúteos hacia abajo y hacia atrás, manteniendo la espalda neutra y el pecho abierto','1757981561831-Ejecicio_Sentadillas.webp','https://www.youtube.com/watch?v=BjixzWEw4EY'),(3,'Dominada','Fortalece primero los trapecios, dorsales, core y biceps','1757981877847-Ejercicio_Dominada.jpg','https://www.youtube.com/watch?v=M7cBPfhbfSY'),(4,'Press Banca','Mantén los pies firmes en el suelo para estabilidad, baja la barra controladamente a la parte baja del pecho, mantén las muñecas alineadas con los codos','1757982017002-Ejercicio_PressBanca.jpg','https://www.youtube.com/watch?v=jlFl7WJ1TzI'),(5,'Remo con barra','Mantén la espanda recta contrayendo el core','1757982199712-Ejercicio_RemoConBarra.png','https://www.youtube.com/watch?v=P_kNA_HElgA');
/*!40000 ALTER TABLE `ejercicio_basico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-15 21:32:08
