-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-01-2022 a las 21:15:48
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `humedales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `complejo`
--

CREATE TABLE `complejo` (
  `id_complejo` int(11) NOT NULL,
  `nombre_complejo` varchar(35) DEFAULT NULL,
  `prop_complejo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `complejo`
--

INSERT INTO `complejo` (`id_complejo`, `nombre_complejo`, `prop_complejo`) VALUES
(0, '', ''),
(2, 'Estancia La Torre', ''),
(25, 'Parque Termal', ''),
(52, 'Complejo Municipal', 'Pedro Galimberti '),
(66, 'Aero Club Chajarí', ''),
(95, 'Quinta Los Teros', ''),
(112, 'Complejo Velez', 'Velez'),
(222, 'Complejo el loko', 'el loko'),
(441, 'Complejo Tres Hermanas', 'Jose Adolfo Repetto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenca`
--

CREATE TABLE `cuenca` (
  `id_cuenca` int(11) NOT NULL,
  `nombre_cuenca` varchar(100) DEFAULT NULL,
  `sup_cuenca` int(11) NOT NULL,
  `ext_cuenca` varchar(30) NOT NULL,
  `tipo_cuenca` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuenca`
--

INSERT INTO `cuenca` (`id_cuenca`, `nombre_cuenca`, `sup_cuenca`, `ext_cuenca`, `tipo_cuenca`) VALUES
(0, '', 0, '', ''),
(111, 'Cuenca Amazon', 8888, '6633', 'Nose '),
(238, 'Cuenca Termal', 222, '333', 'Cuenca Termal'),
(452, 'Cuenca Mocoreta ', 0, '0', ''),
(555, 'Cuenca Mesopotámica', 2000, '30000', 'Hidrográfica'),
(639, 'Cuenca Mar del plata', 0, '0', ''),
(888, '', 0, '', ''),
(999, 'Cuenca Velez', 855, '9666', 'Cuenca Hidrográfica ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fauna`
--

CREATE TABLE `fauna` (
  `nom_coloquial_fauna` varchar(50) NOT NULL,
  `nom_cientifico_fauna` varchar(50) NOT NULL,
  `carac_fauna` varchar(200) NOT NULL,
  `img_fauna` varchar(50) DEFAULT NULL,
  `id_fauna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fauna`
--

INSERT INTO `fauna` (`nom_coloquial_fauna`, `nom_cientifico_fauna`, `carac_fauna`, `img_fauna`, `id_fauna`) VALUES
('Rana', 'Amfibius Ranus?', 'Es una rana', 'images/fauna/rana.jpg', 1),
('Carpincho', 'Carpinchus', 'Es un carpincho', 'images/fauna/carpincho.jpg', 2),
('Sapo', 'Sapuz??', 'Es un sapo', 'images/fauna/sapo.jpg', 3),
('Iguana', 'Lagartijus Iguanus? ', 'Animal vertebrado de cuatro patas con forma de lagartija...', 'images/fauna/iguana.jpg', 4),
('Tero', 'Terus?', 'Es un tero', 'images/fauna/tero.jpg', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fauna_humedal`
--

CREATE TABLE `fauna_humedal` (
  `id_humedal` int(11) NOT NULL,
  `id_fauna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fauna_humedal`
--

INSERT INTO `fauna_humedal` (`id_humedal`, `id_fauna`) VALUES
(10, 3),
(10, 1),
(10, 2),
(11, 3),
(11, 1),
(11, 4),
(8, 1),
(12, 1),
(5, 1),
(13, 4),
(13, 2),
(14, 3),
(14, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flora`
--

CREATE TABLE `flora` (
  `id_flora` int(11) NOT NULL,
  `nom_coloquial_flora` varchar(50) NOT NULL,
  `nom_cientifico_flora` varchar(50) NOT NULL,
  `carac_flora` varchar(200) NOT NULL,
  `img_flora` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `flora`
--

INSERT INTO `flora` (`id_flora`, `nom_coloquial_flora`, `nom_cientifico_flora`, `carac_flora`, `img_flora`) VALUES
(1, 'Algas', 'Algirum Marinum?', 'Son algas', 'images/flora/algas.jpg'),
(2, 'Lirios Acuaticos', 'Eichhornia crassipes', 'El jacinto de agua, lirio acuático, flor de bora, buchón de agua, camalote, aguapey, lechuguín​ tarope, tarulla o reyna, es una planta acuática de la familia de las Pontederiaceae. Tiene bulbos con ai', 'images/flora/lirio.jpg'),
(3, 'Lentejas de Agua', 'Lemnoideae', 'La lenteja de agua es una planta monoica, con flores unisexuales. Las flores masculinas están constituidas por un solo estambre y las flores femeninas consisten en un pistilo formado por un solo carpe', 'images/flora/lentejas de agua.jpg'),
(4, 'Capalote', 'Capalote', 'Es un camalote jeje', 'images/flora/camalote.jpg'),
(5, 'Diente de león', 'Diente de león', 'Flor en las que al soplarla se desvanece...', 'images/flora/diente de leon.jpg'),
(6, 'Helecho', 'Helecho', 'Es un helecho...', 'images/flora/helecho.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flora_humedal`
--

CREATE TABLE `flora_humedal` (
  `id_humedal` int(11) NOT NULL,
  `id_flora` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `flora_humedal`
--

INSERT INTO `flora_humedal` (`id_humedal`, `id_flora`) VALUES
(10, 3),
(11, 5),
(11, 1),
(8, 1),
(12, 1),
(5, 1),
(8, 6),
(13, 2),
(13, 1),
(13, 2),
(14, 1),
(14, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `humedal`
--

CREATE TABLE `humedal` (
  `id_humedal` int(11) NOT NULL,
  `id_cuenca` int(11) DEFAULT NULL,
  `id_complejo` int(11) DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `largo` int(11) DEFAULT NULL,
  `ancho` int(11) DEFAULT NULL,
  `coorx` double DEFAULT NULL,
  `coory` double DEFAULT NULL,
  `fuente` varchar(35) DEFAULT NULL,
  `tiempo` varchar(35) DEFAULT NULL,
  `diversidad_vegetal` varchar(35) DEFAULT NULL,
  `regimen_hidrologico` varchar(35) DEFAULT NULL,
  `calidad_agua` varchar(35) DEFAULT NULL,
  `carac_inclusion` varchar(200) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `humedal`
--

INSERT INTO `humedal` (`id_humedal`, `id_cuenca`, `id_complejo`, `nombre`, `largo`, `ancho`, `coorx`, `coory`, `fuente`, `tiempo`, `diversidad_vegetal`, `regimen_hidrologico`, `calidad_agua`, `carac_inclusion`, `observaciones`) VALUES
(1, 452, 25, 'Laguna_artificial_chajarí', 50, 25, -30.743154, -58.014824, 'Artificial', 'Permanente', 'Muy Alterado', 'Conservado', 'Muy Alterado', 'Características Generales', 'Nada por ahora...'),
(2, 639, 2, 'Pileta_chajarí', 150, 500, -30.744971, -57.960284, 'Artificial', 'Temporal', 'Muy Alterado', 'Conservado', 'Muy Alterado', 'Noseeeee', 'Datos, datos, bla, bla bla...'),
(3, 452, 66, 'Humedal_chajarí', 200, 30, -30.730659, -58.000088, 'Natural', 'Permanente', 'Alterado', 'Conservado', 'Muy Alterado', 'Características del humedal en cuestión', 'Obs...'),
(4, 639, 2, 'Humedal La Torre', 200, 300, -30.728851, -57.965412, 'Artificial', 'Permanente', 'Conservado', 'Alterado', 'Conservado', '********Hola*///////////////', 'Nada que ver acaaaaa'),
(5, 888, 25, 'Parque Tacuarí', 500, 300, -30.754864, -57.981763, 'Artificial', 'Temporal', 'Alterado', 'Muy Alterado', 'Alterado', 'TErmasssssssss SIIII', 'Son las termas pa...'),
(6, 0, 0, 'Charco de Prueba \"Alta\"', 300, 250, -30.700073, -57.99614, 'Artificial', 'Permanente', 'Alterado', 'Muy Alterado', 'Muy Alterado', 'Datos de prueba', 'Es una prueba, de datos '),
(7, 452, 66, 'Charco de Prueba \"Alta\" II', 520, 250, -30.70059, -57.989788, 'Artificial', 'Permanente', 'Alterado', 'Conservado', 'Muy Alterado', 'Otros datos de prueba jaja', 'Que se yo...'),
(8, 111, 95, 'Charco de Prueba \"Alta\" ', 300, 200, -30.756884, -57.952881, 'Natural', 'Permanente', 'Conservado', 'Alterado', 'Muy Alterado', 'OHHHHHH', 'Cambiado'),
(10, 555, 52, 'Pileta de purificación ', 255, 966, -30.744196, -57.959404, 'Natural', 'Temporal', 'Muy Alterado', 'Alterado', 'Conservado', 'Purificación ', 'Si, purifica el agua'),
(11, 999, 112, 'Vélez Sarsfield ', 300, 800, -30.756478, -57.976956, 'Artificial', 'Temporal', 'Conservado', 'Muy Alterado', 'Alterado', 'El velez', 'Cancha del Velez'),
(12, 238, 95, 'weqwe', 0, 0, 0, 0, 'Artificial', 'Permanente', 'Alterado', 'Alterado', 'Alterado', 'Esta roto creo', 'Nose, esta roto o algo...'),
(13, 238, 222, 'Humedal ja', 200, 500, -30.754745, -57.982149, 'Artificial', 'Permanente', 'Conservado', 'Muy Alterado', 'Alterado', 'JAHAHA', 'humedal jaja '),
(14, 238, 95, 'Humedal op', 300, 200, -30.778197, -58.000603, 'Natural', 'Permanente', 'Conservado', 'Alterado', 'Conservado', 'Está yendo para el lado del barrio citricola', '?¡¿');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_humedal`
--

CREATE TABLE `img_humedal` (
  `id_humedal` int(11) NOT NULL,
  `img_humedal` varchar(50) NOT NULL,
  `nom_img` varchar(30) NOT NULL,
  `desc_img` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `img_humedal`
--

INSERT INTO `img_humedal` (`id_humedal`, `img_humedal`, `nom_img`, `desc_img`) VALUES
(1, 'img/humedal_1', '', ''),
(1, 'img/humedal_1.2', '', ''),
(5, 'img/lago.jpg', '', ''),
(5, 'img/parque.jpg', '', ''),
(10, 'img/pileta.jpg', '', ''),
(10, 'images/pileta.jpg', '', ''),
(14, 'images/humedal1.jpg', 'Zona Humedal', 'Parte principal de la zona del humedal...');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indices_saprobios`
--

CREATE TABLE `indices_saprobios` (
  `id_indice` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `descripción` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ind_humedal`
--

CREATE TABLE `ind_humedal` (
  `id_humedal` int(11) NOT NULL,
  `id_indice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presion`
--

CREATE TABLE `presion` (
  `id_presion` int(11) NOT NULL,
  `tipo_presion` varchar(50) NOT NULL,
  `obs_presion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presion`
--

INSERT INTO `presion` (`id_presion`, `tipo_presion`, `obs_presion`) VALUES
(1, 'Ganaderia', '...'),
(2, 'Agricultura', ''),
(3, 'Turismo', '...'),
(4, 'Etc', '...'),
(5, 'Pesca', 'Pesca es...'),
(6, 'Reserva', 'Es reserva...'),
(7, 'Recursos Naturales', 'Representa los recursos energéticos y de subsistencia...'),
(8, 'Recreación ', 'Hace referencia a actividades recreativas...'),
(9, 'Deportes', 'Hace referencia a actividades deportivas...'),
(10, 'Termal', 'termas...');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presion_humedal`
--

CREATE TABLE `presion_humedal` (
  `id_presion` int(11) NOT NULL,
  `id_humedal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presion_humedal`
--

INSERT INTO `presion_humedal` (`id_presion`, `id_humedal`) VALUES
(1, 6),
(3, 6),
(2, 7),
(1, 7),
(6, 10),
(7, 10),
(9, 11),
(8, 11),
(3, 11),
(1, 12),
(1, 5),
(6, 13),
(3, 13),
(2, 14),
(1, 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `complejo`
--
ALTER TABLE `complejo`
  ADD PRIMARY KEY (`id_complejo`);

--
-- Indices de la tabla `cuenca`
--
ALTER TABLE `cuenca`
  ADD PRIMARY KEY (`id_cuenca`);

--
-- Indices de la tabla `fauna`
--
ALTER TABLE `fauna`
  ADD PRIMARY KEY (`id_fauna`);

--
-- Indices de la tabla `fauna_humedal`
--
ALTER TABLE `fauna_humedal`
  ADD KEY `id_humedal` (`id_humedal`),
  ADD KEY `id_fauna` (`id_fauna`);

--
-- Indices de la tabla `flora`
--
ALTER TABLE `flora`
  ADD PRIMARY KEY (`id_flora`);

--
-- Indices de la tabla `flora_humedal`
--
ALTER TABLE `flora_humedal`
  ADD KEY `id_humedal` (`id_humedal`),
  ADD KEY `id_flora` (`id_flora`);

--
-- Indices de la tabla `humedal`
--
ALTER TABLE `humedal`
  ADD PRIMARY KEY (`id_humedal`),
  ADD KEY `id_cuenca` (`id_cuenca`),
  ADD KEY `id_complejo` (`id_complejo`);

--
-- Indices de la tabla `img_humedal`
--
ALTER TABLE `img_humedal`
  ADD KEY `id_humedal` (`id_humedal`);

--
-- Indices de la tabla `indices_saprobios`
--
ALTER TABLE `indices_saprobios`
  ADD PRIMARY KEY (`id_indice`);

--
-- Indices de la tabla `ind_humedal`
--
ALTER TABLE `ind_humedal`
  ADD KEY `id_humedal` (`id_humedal`),
  ADD KEY `id_indice` (`id_indice`);

--
-- Indices de la tabla `presion`
--
ALTER TABLE `presion`
  ADD PRIMARY KEY (`id_presion`);

--
-- Indices de la tabla `presion_humedal`
--
ALTER TABLE `presion_humedal`
  ADD KEY `id_presion` (`id_presion`),
  ADD KEY `id_humedal` (`id_humedal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fauna`
--
ALTER TABLE `fauna`
  MODIFY `id_fauna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `flora`
--
ALTER TABLE `flora`
  MODIFY `id_flora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `presion`
--
ALTER TABLE `presion`
  MODIFY `id_presion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fauna_humedal`
--
ALTER TABLE `fauna_humedal`
  ADD CONSTRAINT `fauna_humedal_ibfk_1` FOREIGN KEY (`id_fauna`) REFERENCES `fauna` (`id_fauna`),
  ADD CONSTRAINT `fauna_humedal_ibfk_2` FOREIGN KEY (`id_humedal`) REFERENCES `humedal` (`id_humedal`);

--
-- Filtros para la tabla `flora_humedal`
--
ALTER TABLE `flora_humedal`
  ADD CONSTRAINT `flora_humedal_ibfk_1` FOREIGN KEY (`id_flora`) REFERENCES `flora` (`id_flora`),
  ADD CONSTRAINT `flora_humedal_ibfk_2` FOREIGN KEY (`id_humedal`) REFERENCES `humedal` (`id_humedal`);

--
-- Filtros para la tabla `humedal`
--
ALTER TABLE `humedal`
  ADD CONSTRAINT `humedal_ibfk_1` FOREIGN KEY (`id_cuenca`) REFERENCES `cuenca` (`id_cuenca`),
  ADD CONSTRAINT `humedal_ibfk_2` FOREIGN KEY (`id_complejo`) REFERENCES `complejo` (`id_complejo`);

--
-- Filtros para la tabla `img_humedal`
--
ALTER TABLE `img_humedal`
  ADD CONSTRAINT `img_humedal_ibfk_1` FOREIGN KEY (`id_humedal`) REFERENCES `humedal` (`id_humedal`);

--
-- Filtros para la tabla `ind_humedal`
--
ALTER TABLE `ind_humedal`
  ADD CONSTRAINT `ind_humedal_ibfk_1` FOREIGN KEY (`id_humedal`) REFERENCES `humedal` (`id_humedal`),
  ADD CONSTRAINT `ind_humedal_ibfk_2` FOREIGN KEY (`id_indice`) REFERENCES `indices_saprobios` (`id_indice`);

--
-- Filtros para la tabla `presion_humedal`
--
ALTER TABLE `presion_humedal`
  ADD CONSTRAINT `presion_humedal_ibfk_1` FOREIGN KEY (`id_presion`) REFERENCES `presion` (`id_presion`),
  ADD CONSTRAINT `presion_humedal_ibfk_2` FOREIGN KEY (`id_humedal`) REFERENCES `humedal` (`id_humedal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
