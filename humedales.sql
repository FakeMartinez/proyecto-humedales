-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: fdb28.awardspace.net
-- Generation Time: Jan 08, 2022 at 07:15 PM
-- Server version: 5.7.20-log
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `3595824_humedales`
--

-- --------------------------------------------------------

--
-- Table structure for table `bandas`
--

CREATE TABLE `bandas` (
  `Id_banda` varchar(11) NOT NULL,
  `Id_raster` int(11) NOT NULL,
  `presiones` varchar(20) NOT NULL,
  `máximo` varchar(20) NOT NULL,
  `mínimo` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bandas`
--

INSERT INTO `bandas` (`Id_banda`, `Id_raster`, `presiones`, `máximo`, `mínimo`, `tipo`) VALUES
('B1', 1, '-', '65535', '0', 'PixelType'),
('B2', 1, '-', '65535', '0', 'PixelType'),
('B3', 1, '-', '65535', '0', 'PixelType'),
('B4', 1, '-', '65535', '0', 'PixelType');

-- --------------------------------------------------------

--
-- Table structure for table `complejo`
--

CREATE TABLE `complejo` (
  `Id_complejo` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complejo`
--

INSERT INTO `complejo` (`Id_complejo`, `Nombre`) VALUES
(2, 'Regimiento de caballería Tanque 7'),
(52, 'Complejo Termal Daniel Tisocco');

-- --------------------------------------------------------

--
-- Table structure for table `contiene_fauna`
--

CREATE TABLE `contiene_fauna` (
  `Id_humedal` int(11) NOT NULL,
  `fecha_rel` date NOT NULL,
  `Id_fauna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contiene_fauna`
--

INSERT INTO `contiene_fauna` (`Id_humedal`, `fecha_rel`, `Id_fauna`) VALUES
(7, '0000-00-00', 7),
(7, '0000-00-00', 9),
(8, '0000-00-00', 7),
(8, '0000-00-00', 8),
(8, '0000-00-00', 9),
(8, '0000-00-00', 10),
(8, '0000-00-00', 11),
(9, '2022-01-04', 9);

-- --------------------------------------------------------

--
-- Table structure for table `contiene_flora`
--

CREATE TABLE `contiene_flora` (
  `Id_humedal` int(11) NOT NULL,
  `fecha_rel` date NOT NULL,
  `Id_flora` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contiene_flora`
--

INSERT INTO `contiene_flora` (`Id_humedal`, `fecha_rel`, `Id_flora`) VALUES
(7, '0000-00-00', 1),
(8, '0000-00-00', 1),
(9, '0000-00-00', 2),
(9, '2022-01-04', 2),
(7, '0000-00-00', 3),
(8, '0000-00-00', 3),
(9, '2022-01-04', 3),
(7, '0000-00-00', 4),
(8, '0000-00-00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `contiene_presiones`
--

CREATE TABLE `contiene_presiones` (
  `Id_humedal` int(11) NOT NULL,
  `fecha_rel` date NOT NULL,
  `Id_presiones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contiene_presiones`
--

INSERT INTO `contiene_presiones` (`Id_humedal`, `fecha_rel`, `Id_presiones`) VALUES
(8, '0000-00-00', 6),
(8, '0000-00-00', 7),
(7, '0000-00-00', 10),
(8, '0000-00-00', 10),
(9, '2022-01-04', 10),
(7, '0000-00-00', 11),
(8, '0000-00-00', 11),
(9, '2022-01-04', 11);

-- --------------------------------------------------------

--
-- Table structure for table `cuenca`
--

CREATE TABLE `cuenca` (
  `Id_cuenca` int(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Superficie` float NOT NULL,
  `Tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cuenca`
--

INSERT INTO `cuenca` (`Id_cuenca`, `Nombre`, `Superficie`, `Tipo`) VALUES
(5, 'Mocoretá', 3.785, 'Exorreica');

-- --------------------------------------------------------

--
-- Table structure for table `fauna`
--

CREATE TABLE `fauna` (
  `Id_fauna` int(20) NOT NULL,
  `NombreColoquial` varchar(20) NOT NULL,
  `NombreCientífico` varchar(20) NOT NULL,
  `Descripción` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fauna`
--

INSERT INTO `fauna` (`Id_fauna`, `NombreColoquial`, `NombreCientífico`, `Descripción`) VALUES
(7, 'Tero', 'Vanellus Chilensis', 'Su aspecto es el de un ave pequeña, de colores poco llamativos pero muy elegante y estilizada, coronado por un pequeño y fino copete.'),
(8, 'Pato', 'Anatinae', 'Pato es el nombre común para ciertas aves de la familia Anatidae, principalmente de la subfamilia Anatinae y dentro de ella del género Anas. No son un grupo monofilético, ya que no se incluyen los cisnes ni los gansos.'),
(9, 'Carpincho', 'Hydrochoerus', 'Tiene un cuerpo pesado en forma de barril y una cabeza pequeña, con un pelaje pardo rojizo en la parte superior del cuerpo que se vuelve pardo amarillo en la parte inferior suele encontrarse pelaje con puntos o petequias en el lomo.'),
(10, 'Ganzo', 'Anserinae', 'Se llama comúnmente gansos u ocas a algunas aves de la subfamilia Anserinae, de la familia Anatidae, aunque también se denomina así a algunas aves de la subfamilia Tadorninae.'),
(11, 'Chajá', 'Chauna torquata', 'El cuerpo parece una especie de pavo con cresta, pico pequeño y afilado y una especie de collar en el cuello. Las patas son robustas y largas, de color rosado, y la parte de alrededor de los ojos es rojiza. Vive en parejas y en ocasiones en grupos de alrededor de cien individuos.');

-- --------------------------------------------------------

--
-- Table structure for table `flora`
--

CREATE TABLE `flora` (
  `Id_flora` int(20) NOT NULL,
  `NombreColoquial` varchar(20) NOT NULL,
  `NombreCientífico` varchar(20) NOT NULL,
  `Descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flora`
--

INSERT INTO `flora` (`Id_flora`, `NombreColoquial`, `NombreCientífico`, `Descripcion`) VALUES
(1, 'Algas', 'NaturaLista', 'clorofíceas'),
(2, 'Helecho', 'Polypodiophyta', ''),
(3, 'Lirios Acuaticos', 'Eichhornia crassipes', 'El jacinto de agua, lirio acuático, flor de bora, buchón de agua, camalote, aguapey, lechuguín​ tarope, tarulla o reyna, es una planta acuática de la familia de las Pontederiaceae.  Tiene bulbos con aire que le permiten flotar y da flores moradas.'),
(4, 'Lenteja de agua', 'Lemnoideae', 'La lenteja de agua es una planta monoica, con flores unisexuales. Las flores masculinas están constituidas por un solo estambre y las flores femeninas consisten en un pistilo formado por un solo carpelo. El periantio está ausente.');

-- --------------------------------------------------------

--
-- Table structure for table `fotográfica`
--

CREATE TABLE `fotográfica` (
  `Id_fotografia` int(11)  NOT NULL,
  `descripción` varchar(200) NOT NULL,
  `id_imagen` int(11) NOT NULL,
  `zona de captura` int(11) NOT NULL,
  `id_flora` int(11) DEFAULT NULL,
  `id_fauna` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fotográfica`
--

INSERT INTO `fotográfica` (`Id_fotografia`, `descripción`, `id_imagen`, `zona de captura`, `id_flora`, `id_fauna`) VALUES
(1, 'Arroyo Chajarí', 2, 0, NULL, NULL),
(2, 'Flora de "El Lago"', 3, 0, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `humedal`
--

CREATE TABLE `humedal` (
  `Id_humedal` int(20) NOT NULL,
  `fecha_rel` date NOT NULL,
  `Id_complejo` int(11) NOT NULL,
  `Id_cuenca` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Conductividad` float NOT NULL,
  `Ancho` float NOT NULL,
  `O2 disuelto` float NOT NULL,
  `Calidad de H2O` varchar(20) NOT NULL,
  `Diversidad vegetal` varchar(20) NOT NULL,
  `Observaciones` varchar(50) NOT NULL,
  `Regimen hidrológico` varchar(20) NOT NULL,
  `Turbidez` varchar(20) NOT NULL,
  `Largo` float NOT NULL,
  `pH` float NOT NULL,
  `Color` varchar(20) NOT NULL,
  `Fuente` varchar(20) NOT NULL,
  `Tiempo` varchar(20) NOT NULL,
  `Superficie` float NOT NULL,
  `Temperatura H2O` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `humedal`
--

INSERT INTO `humedal` (`Id_humedal`, `fecha_rel`, `Id_complejo`, `Id_cuenca`, `Nombre`, `Conductividad`, `Ancho`, `O2 disuelto`, `Calidad de H2O`, `Diversidad vegetal`, `Observaciones`, `Regimen hidrológico`, `Turbidez`, `Largo`, `pH`, `Color`, `Fuente`, `Tiempo`, `Superficie`, `Temperatura H2O`) VALUES
(7, '0000-00-00', 52, 5, 'Arroyo Chajari', 34, 216, 416, 'Conservado', 'Conservado', '', 'Conservado', '', 216, 8, '', 'Natural', 'Permanente', 650, 25),
(8, '0000-00-00', 52, 5, 'El lago', 0, 162.5, 0, 'Alterado', 'Conservado', 'Al noreste se observa flora característica de cont', 'Conservado', '', 162, 0, '', 'Artificial', 'Permanente', 600, 0),
(9, '0000-00-00', 52, 5, 'Yacare Guasu-Termas', 0, 0, 0, 'Alterado', 'Conservado', 'Pasa por zona urbana, es recreativo', 'Conservado', '', 0, 0, '', 'Natural', 'Permanente', 0, 0),
(9, '2022-01-04', 52, 5, 'Yacare Guasu-Termas', 85, 267, 1045, 'Conservado', 'Conservado', '-', 'Alterado', 'Alterado', 123, 7, 'Azul con marrón', 'Natural', 'Permanente', 521, 30);

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `Id_imagen` int(11) NOT NULL,
  `Id_humedal` int(11) NOT NULL,
  `fecha_rel` date NOT NULL,
  `Coordenada x` double NOT NULL,
  `Coordenadas Y` double NOT NULL,
  `Dimensión` varchar(11) NOT NULL,
  `Fecha` date NOT NULL,
  `PATH` varchar(20) NOT NULL,
  `Representación del color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imagen`
--

INSERT INTO `imagen` (`Id_imagen`, `Id_humedal`, `fecha_rel`, `Coordenada x`, `Coordenadas Y`, `Dimensión`, `Fecha`, `PATH`, `Representación del color`) VALUES
(1, 9, '0000-00-00', 0, 0, '0', '2019-11-14', 'C:\\Users\\pc\\Desktop\\', ''),
(2, 7, '0000-00-00', 0, 0, '500', '2020-07-01', 'ima/Imagen.jpg', ''),
(3, 8, '0000-00-00', 0, 0, '500', '2021-05-11', 'ima/Img548.jpg', ''),
(4, 9, '0000-00-00', 0, 0, '500', '2020-07-01', 'ima/Img8.jpg', '');

-- --------------------------------------------------------

--
-- Table structure for table `investiga`
--

CREATE TABLE `investiga` (
  `Id_miembro` int(20) NOT NULL,
  `Id_humedal` int(20) NOT NULL,
  `fecha_rel` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investiga`
--

INSERT INTO `investiga` (`Id_miembro`, `Id_humedal`, `fecha_rel`) VALUES
(1, 7, '0000-00-00'),
(3, 7, '0000-00-00'),
(1, 8, '0000-00-00'),
(4, 9, '0000-00-00'),
(2, 9, '2022-01-04'),
(3, 9, '2022-01-04');

-- --------------------------------------------------------

--
-- Table structure for table `miembro`
--

CREATE TABLE `miembro` (
  `Id_miembro` int(20) NOT NULL,
  `Id_Persona` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `miembro`
--

INSERT INTO `miembro` (`Id_miembro`, `Id_Persona`) VALUES
(3, '10000000'),
(4, '10000001'),
(5, '10000011'),
(1, '20456548'),
(2, '20625154');

-- --------------------------------------------------------

--
-- Table structure for table `objeto_geometry`
--

CREATE TABLE `objeto_geometry` (
  `SRID` int(11) NOT NULL,
  `Etiquetas` varchar(20) NOT NULL,
  `Tipo geométrico` geometry NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `objeto_geometry`
--

INSERT INTO `objeto_geometry` (`SRID`, `Etiquetas`, `Tipo geométrico`) VALUES
(1, 'Etiqueta', '�\0\0\0\0\0Y�O0�L�A���>�'),
(2, 'Rio3', '{\0\0\0\0\0\0\0\0\0\0\0\0\0\0b��\0\0\0\0@��@\0\0\0\0\0b��\0\0\0\0�#�@');

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `Id_persona` varchar(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Teléfono` varchar(20) NOT NULL,
  `Dirección` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `persona`
--

INSERT INTO `persona` (`Id_persona`, `Nombre`, `Correo`, `Teléfono`, `Dirección`) VALUES
('10000000', 'Carlos Nuñez', 'CarlosNuñez@gmail.com', '345612345', 'Av En su casa 345'),
('10000001', 'Liliana Taborda', 'LilianaTabor@gmail.com', '345654321', 'Av dondevive 2001'),
('10000011', 'Alejandro Rellán', 'AlejandroRel@gmail.com', '345610100', 'sucasita 94'),
('20456548', 'Maria Ines Ciciliani', 'draciciliani@hotmail.com ', '345645458', 'Av 9 de julio y Belgrano 3333'),
('20625154', 'Omar Panozzo', 'omarpanozzo@gmail.com ', '3456515458', ' Las calandrias 1234'),
('30639648849', 'Ejército argentino', '', '34568659641', ''),
('30999035678', 'Municipalidad', 'municipiochajari@chajari.gov', '3456420135', 'Salvarredy 1430');

-- --------------------------------------------------------

--
-- Table structure for table `presiones`
--

CREATE TABLE `presiones` (
  `Id_presiones` int(20) NOT NULL,
  `Tipo` varchar(20) NOT NULL,
  `Observacion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `presiones`
--

INSERT INTO `presiones` (`Id_presiones`, `Tipo`, `Observacion`) VALUES
(6, 'Turismo', ''),
(7, 'Pesca', ''),
(8, 'Drenaje', ''),
(9, 'Forestación', ''),
(10, 'Civilización', ''),
(11, 'Ganadería', ''),
(12, 'Actividad  agrícola', ''),
(13, 'Construcciones', '');

-- --------------------------------------------------------

--
-- Table structure for table `propietario`
--

CREATE TABLE `propietario` (
  `Id_propietario` int(20) NOT NULL,
  `Id_persona` varchar(20) NOT NULL,
  `Id_complejo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `propietario`
--

INSERT INTO `propietario` (`Id_propietario`, `Id_persona`, `Id_complejo`) VALUES
(1, '30639648849', 2),
(2, '30999035678', 52);

-- --------------------------------------------------------

--
-- Table structure for table `raster`
--

CREATE TABLE `raster` (
  `CRS` int(11) NOT NULL,
  `Data set` varchar(20) NOT NULL,
  `id_imagen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `raster`
--

INSERT INTO `raster` (`CRS`, `Data set`, `id_imagen`) VALUES
(1, 'Phantom 4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `representa_geometria`
--

CREATE TABLE `representa_geometria` (
  `SRID` int(11) NOT NULL,
  `Id_humedal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `representa_geometria`
--

INSERT INTO `representa_geometria` (`SRID`, `Id_humedal`) VALUES
(1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `Id_rol` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`Id_rol`, `descripcion`) VALUES
(1, 'Asesor/a'),
(2, 'Director/a'),
(3, 'Subdirector/a'),
(4, 'Agente de laboratorio'),
(5, 'Agente Informático'),
(6, 'Miembro del proyecto');

-- --------------------------------------------------------

--
-- Table structure for table `tiene_rol`
--

CREATE TABLE `tiene_rol` (
  `Id_miembro` int(20) NOT NULL,
  `Id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tiene_rol`
--

INSERT INTO `tiene_rol` (`Id_miembro`, `Id_rol`) VALUES
(1, 2),
(2, 5),
(3, 6),
(4, 4),
(5, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bandas`
--
ALTER TABLE `bandas`
  ADD PRIMARY KEY (`Id_banda`),
  ADD KEY `id_imagen` (`Id_raster`);

--
-- Indexes for table `complejo`
--
ALTER TABLE `complejo`
  ADD PRIMARY KEY (`Id_complejo`);

--
-- Indexes for table `contiene_fauna`
--
ALTER TABLE `contiene_fauna`
  ADD UNIQUE KEY `Id_humedal_2` (`Id_humedal`,`fecha_rel`,`Id_fauna`) USING BTREE,
  ADD KEY `Id_humedal` (`Id_humedal`,`Id_fauna`),
  ADD KEY `Id_fauna` (`Id_fauna`),
  ADD KEY `fecha_rel` (`fecha_rel`);

--
-- Indexes for table `contiene_flora`
--
ALTER TABLE `contiene_flora`
  ADD UNIQUE KEY `contiene_flora_ibfk_1` (`Id_humedal`,`fecha_rel`,`Id_flora`) USING BTREE,
  ADD KEY `Id_humedal` (`Id_humedal`,`Id_flora`),
  ADD KEY `Id_flora` (`Id_flora`);

--
-- Indexes for table `contiene_presiones`
--
ALTER TABLE `contiene_presiones`
  ADD UNIQUE KEY `contiene_presiones_ibfk_1` (`Id_humedal`,`fecha_rel`,`Id_presiones`) USING BTREE,
  ADD KEY `Id_humedal` (`Id_humedal`,`Id_presiones`),
  ADD KEY `Id_presiones` (`Id_presiones`);

--
-- Indexes for table `cuenca`
--
ALTER TABLE `cuenca`
  ADD PRIMARY KEY (`Id_cuenca`);

--
-- Indexes for table `fauna`
--
ALTER TABLE `fauna`
  ADD PRIMARY KEY (`Id_fauna`);

--
-- Indexes for table `flora`
--
ALTER TABLE `flora`
  ADD PRIMARY KEY (`Id_flora`);

--
-- Indexes for table `fotográfica`
--
ALTER TABLE `fotográfica`
  ADD PRIMARY KEY (`Id_fotografia`) AUTO_INCREMENT,
  ADD KEY `id_imagen` (`id_imagen`,`id_flora`,`id_fauna`),
  ADD KEY `id_flora` (`id_flora`),
  ADD KEY `id_fauna` (`id_fauna`);

--
-- Indexes for table `humedal`
--
ALTER TABLE `humedal`
  ADD PRIMARY KEY (`Id_humedal`,`fecha_rel`) USING BTREE,
  ADD KEY `Id_complejo` (`Id_complejo`,`Id_cuenca`),
  ADD KEY `Id_cuenca` (`Id_cuenca`);

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`Id_imagen`),
  ADD KEY `Id_humedal` (`Id_humedal`,`fecha_rel`) USING BTREE;

--
-- Indexes for table `investiga`
--
ALTER TABLE `investiga`
  ADD UNIQUE KEY `investiga_ibfk_1` (`Id_humedal`,`fecha_rel`,`Id_miembro`) USING BTREE,
  ADD KEY `Id_miembro` (`Id_miembro`,`Id_humedal`),
  ADD KEY `Id_humedal` (`Id_humedal`);

--
-- Indexes for table `miembro`
--
ALTER TABLE `miembro`
  ADD PRIMARY KEY (`Id_miembro`),
  ADD KEY `Id_Persona` (`Id_Persona`);

--
-- Indexes for table `objeto_geometry`
--
ALTER TABLE `objeto_geometry`
  ADD PRIMARY KEY (`SRID`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`Id_persona`);

--
-- Indexes for table `presiones`
--
ALTER TABLE `presiones`
  ADD PRIMARY KEY (`Id_presiones`);

--
-- Indexes for table `propietario`
--
ALTER TABLE `propietario`
  ADD PRIMARY KEY (`Id_propietario`),
  ADD KEY `Id_persona` (`Id_persona`),
  ADD KEY `Id_complejo` (`Id_complejo`);

--
-- Indexes for table `raster`
--
ALTER TABLE `raster`
  ADD PRIMARY KEY (`CRS`),
  ADD UNIQUE KEY `id_imagen` (`id_imagen`);

--
-- Indexes for table `representa_geometria`
--
ALTER TABLE `representa_geometria`
  ADD KEY `Id_humedal` (`Id_humedal`),
  ADD KEY `SRID` (`SRID`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`Id_rol`);

--
-- Indexes for table `tiene_rol`
--
ALTER TABLE `tiene_rol`
  ADD KEY `Id_miembro` (`Id_miembro`,`Id_rol`),
  ADD KEY `Id_rol` (`Id_rol`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bandas`
--
ALTER TABLE `bandas`
  ADD CONSTRAINT `bandas_ibfk_1` FOREIGN KEY (`Id_raster`) REFERENCES `raster` (`CRS`);

--
-- Constraints for table `contiene_fauna`
--
ALTER TABLE `contiene_fauna`
  ADD CONSTRAINT `contiene_fauna_ibfk_1` FOREIGN KEY (`Id_humedal`,`fecha_rel`) REFERENCES `humedal` (`Id_humedal`, `fecha_rel`),
  ADD CONSTRAINT `contiene_fauna_ibfk_2` FOREIGN KEY (`Id_fauna`) REFERENCES `fauna` (`Id_fauna`);

--
-- Constraints for table `contiene_flora`
--
ALTER TABLE `contiene_flora`
  ADD CONSTRAINT `contiene_flora_ibfk_1` FOREIGN KEY (`Id_humedal`,`fecha_rel`) REFERENCES `humedal` (`Id_humedal`, `fecha_rel`),
  ADD CONSTRAINT `contiene_flora_ibfk_2` FOREIGN KEY (`Id_flora`) REFERENCES `flora` (`Id_flora`);

--
-- Constraints for table `contiene_presiones`
--
ALTER TABLE `contiene_presiones`
  ADD CONSTRAINT `contiene_presiones_ibfk_1` FOREIGN KEY (`Id_humedal`,`fecha_rel`) REFERENCES `humedal` (`Id_humedal`, `fecha_rel`),
  ADD CONSTRAINT `contiene_presiones_ibfk_2` FOREIGN KEY (`Id_presiones`) REFERENCES `presiones` (`Id_presiones`);

--
-- Constraints for table `fotográfica`
--
ALTER TABLE `fotográfica`
  ADD CONSTRAINT `fotográfica_ibfk_1` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`Id_imagen`),
  ADD CONSTRAINT `fotográfica_ibfk_2` FOREIGN KEY (`id_flora`) REFERENCES `flora` (`Id_flora`),
  ADD CONSTRAINT `fotográfica_ibfk_3` FOREIGN KEY (`id_fauna`) REFERENCES `fauna` (`Id_fauna`);

--
-- Constraints for table `humedal`
--
ALTER TABLE `humedal`
  ADD CONSTRAINT `humedal_ibfk_1` FOREIGN KEY (`Id_complejo`) REFERENCES `complejo` (`Id_complejo`),
  ADD CONSTRAINT `humedal_ibfk_2` FOREIGN KEY (`Id_cuenca`) REFERENCES `cuenca` (`Id_cuenca`);

--
-- Constraints for table `imagen`
--
ALTER TABLE `imagen`
  ADD CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`Id_humedal`) REFERENCES `humedal` (`Id_humedal`);

--
-- Constraints for table `investiga`
--
ALTER TABLE `investiga`
  ADD CONSTRAINT `investiga_ibfk_1` FOREIGN KEY (`Id_humedal`,`fecha_rel`) REFERENCES `humedal` (`Id_humedal`, `fecha_rel`),
  ADD CONSTRAINT `investiga_ibfk_2` FOREIGN KEY (`Id_miembro`) REFERENCES `miembro` (`Id_miembro`);

--
-- Constraints for table `miembro`
--
ALTER TABLE `miembro`
  ADD CONSTRAINT `miembro_ibfk_1` FOREIGN KEY (`Id_Persona`) REFERENCES `persona` (`Id_persona`);

--
-- Constraints for table `propietario`
--
ALTER TABLE `propietario`
  ADD CONSTRAINT `propietario_ibfk_2` FOREIGN KEY (`Id_complejo`) REFERENCES `complejo` (`Id_complejo`),
  ADD CONSTRAINT `propietario_ibfk_3` FOREIGN KEY (`Id_persona`) REFERENCES `persona` (`Id_persona`);

--
-- Constraints for table `raster`
--
ALTER TABLE `raster`
  ADD CONSTRAINT `raster_ibfk_1` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`Id_imagen`);

--
-- Constraints for table `representa_geometria`
--
ALTER TABLE `representa_geometria`
  ADD CONSTRAINT `representa_geometria_ibfk_1` FOREIGN KEY (`Id_humedal`) REFERENCES `humedal` (`Id_humedal`),
  ADD CONSTRAINT `representa_geometria_ibfk_2` FOREIGN KEY (`SRID`) REFERENCES `objeto_geometry` (`SRID`);

--
-- Constraints for table `tiene_rol`
--
ALTER TABLE `tiene_rol`
  ADD CONSTRAINT `tiene_rol_ibfk_1` FOREIGN KEY (`Id_rol`) REFERENCES `rol` (`Id_rol`),
  ADD CONSTRAINT `tiene_rol_ibfk_2` FOREIGN KEY (`Id_miembro`) REFERENCES `miembro` (`Id_miembro`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
