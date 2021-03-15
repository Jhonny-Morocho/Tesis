-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2021 at 01:18 AM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demox`
--

-- --------------------------------------------------------

--
-- Table structure for table `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `fk_provincia` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ciudad`
--

INSERT INTO `ciudad` (`id`, `fk_provincia`, `nombre`) VALUES
(1, 1, 'CUENCA'),
(2, 1, 'GIRÓN'),
(3, 1, 'GUALACEO'),
(4, 1, 'NABÓN'),
(5, 1, 'PAUTE'),
(6, 1, 'PUCARA'),
(7, 1, 'SAN FERNANDO'),
(8, 1, 'SANTA ISABEL'),
(9, 1, 'SIGSIG'),
(10, 1, 'OÑA'),
(11, 1, 'CHORDELEG'),
(12, 1, 'EL PAN'),
(13, 1, 'SEVILLA DE ORO'),
(14, 1, 'GUACHAPALA'),
(15, 1, 'CAMILO PONCE ENRÍQUEZ'),
(16, 2, 'GUARANDA'),
(17, 2, 'CHILLANES'),
(18, 2, 'CHIMBO'),
(19, 2, 'ECHEANDÍA'),
(20, 2, 'SAN MIGUEL'),
(21, 2, 'CALUMA'),
(22, 2, 'LAS NAVES'),
(23, 3, 'AZOGUES'),
(24, 3, 'BIBLIÁN'),
(25, 3, 'CAÑAR'),
(26, 3, 'LA TRONCAL'),
(27, 3, 'EL TAMBO'),
(28, 3, 'DÉLEG'),
(29, 3, 'SUSCAL'),
(30, 4, 'TULCÁN'),
(31, 4, 'BOLÍVAR'),
(32, 4, 'ESPEJO'),
(33, 4, 'MIRA'),
(34, 4, 'MONTÚFAR'),
(35, 4, 'SAN PEDRO DE HUACA'),
(36, 5, 'LATACUNGA'),
(37, 5, 'LA MANÁ'),
(38, 5, 'PANGUA'),
(39, 5, 'PUJILI'),
(40, 5, 'SALCEDO'),
(41, 5, 'SAQUISILÍ'),
(42, 5, 'SIGCHOS'),
(43, 6, 'RIOBAMBA'),
(44, 6, 'ALAUSI'),
(45, 6, 'COLTA'),
(46, 6, 'CHAMBO'),
(47, 6, 'CHUNCHI'),
(48, 6, 'GUAMOTE'),
(49, 6, 'GUANO'),
(50, 6, 'PALLATANGA'),
(51, 6, 'PENIPE'),
(52, 6, 'CUMANDÁ'),
(53, 7, 'MACHALA'),
(54, 7, 'ARENILLAS'),
(55, 7, 'ATAHUALPA'),
(56, 7, 'BALSAS'),
(57, 7, 'CHILLA'),
(58, 7, 'EL GUABO'),
(59, 7, 'HUAQUILLAS'),
(60, 7, 'MARCABELÍ'),
(61, 7, 'PASAJE'),
(62, 7, 'PIÑAS'),
(63, 7, 'PORTOVELO'),
(64, 7, 'SANTA ROSA'),
(65, 7, 'ZARUMA'),
(66, 7, 'LAS LAJAS'),
(67, 8, 'ESMERALDAS'),
(68, 8, 'ELOY ALFARO'),
(69, 8, 'MUISNE'),
(70, 8, 'QUININDÉ'),
(71, 8, 'SAN LORENZO'),
(72, 8, 'ATACAMES'),
(73, 8, 'RIOVERDE'),
(74, 8, 'LA CONCORDIA'),
(75, 9, 'GUAYAQUIL'),
(76, 9, 'ALFREDO BAQUERIZO MORENO'),
(77, 9, 'BALAO'),
(78, 9, 'BALZAR'),
(79, 9, 'COLIMES'),
(80, 9, 'DAULE'),
(81, 9, 'DURÁN'),
(82, 9, 'EL EMPALME'),
(83, 9, 'EL TRIUNFO'),
(84, 9, 'MILAGRO'),
(85, 9, 'NARANJAL'),
(86, 9, 'NARANJITO'),
(87, 9, 'PALESTINA'),
(88, 9, 'PEDRO CARBO'),
(89, 9, 'SAMBORONDÓN'),
(90, 9, 'SANTA LUCÍA'),
(91, 9, 'SALITRE'),
(92, 9, 'SAN JACINTO DE YAGUACHI'),
(93, 9, 'PLAYAS'),
(94, 9, 'SIMÓN BOLÍVAR'),
(95, 9, 'CORONEL MARCELINO MARIDUEÑA'),
(96, 9, 'LOMAS DE SARGENTILLO'),
(97, 9, 'NOBOL'),
(98, 9, 'GENERAL ANTONIO ELIZALDE'),
(99, 9, 'ISIDRO AYORA'),
(100, 10, 'IBARRA'),
(101, 10, 'ANTONIO ANTE'),
(102, 10, 'COTACACHI'),
(103, 10, 'OTAVALO'),
(104, 10, 'PIMAMPIRO'),
(105, 10, 'SAN MIGUEL DE URCUQUÍ'),
(106, 11, 'LOJA'),
(107, 11, 'CALVAS'),
(108, 11, 'CATAMAYO'),
(109, 11, 'CELICA'),
(110, 11, 'CHAGUARPAMBA'),
(111, 11, 'ESPÍNDOLA'),
(112, 11, 'GONZANAMÁ'),
(113, 11, 'MACARÁ'),
(114, 11, 'PALTAS'),
(115, 11, 'PUYANGO'),
(116, 11, 'SARAGURO'),
(117, 11, 'SOZORANGA'),
(118, 11, 'ZAPOTILLO'),
(119, 11, 'PINDAL'),
(120, 11, 'QUILANGA'),
(121, 11, 'OLMEDO'),
(122, 12, 'BABAHOYO'),
(123, 12, 'BABA'),
(124, 12, 'MONTALVO'),
(125, 12, 'PUEBLOVIEJO'),
(126, 12, 'QUEVEDO'),
(127, 12, 'URDANETA'),
(128, 12, 'VENTANAS'),
(129, 12, 'VÍNCES'),
(130, 12, 'PALENQUE'),
(131, 12, 'BUENA FÉ'),
(132, 12, 'VALENCIA'),
(133, 12, 'MOCACHE'),
(134, 12, 'QUINSALOMA'),
(135, 13, 'PORTOVIEJO'),
(136, 13, 'BOLÍVAR'),
(137, 13, 'CHONE'),
(138, 13, 'EL CARMEN'),
(139, 13, 'FLAVIO ALFARO'),
(140, 13, 'JIPIJAPA'),
(141, 13, 'JUNÍN'),
(142, 13, 'MANTA'),
(143, 13, 'MONTECRISTI'),
(144, 13, 'PAJÁN'),
(145, 13, 'PICHINCHA'),
(146, 13, 'ROCAFUERTE'),
(147, 13, 'SANTA ANA'),
(148, 13, 'SUCRE'),
(149, 13, 'TOSAGUA'),
(150, 13, '24 DE MAYO'),
(151, 13, 'PEDERNALES'),
(152, 13, 'OLMEDO'),
(153, 13, 'PUERTO LÓPEZ'),
(154, 13, 'JAMA'),
(155, 13, 'JARAMIJÓ'),
(156, 13, 'SAN VICENTE'),
(157, 14, 'MORONA'),
(158, 14, 'GUALAQUIZA'),
(159, 14, 'LIMÓN INDANZA'),
(160, 14, 'PALORA'),
(161, 14, 'SANTIAGO'),
(162, 14, 'SUCÚA'),
(163, 14, 'HUAMBOYA'),
(164, 14, 'SAN JUAN BOSCO'),
(165, 14, 'TAISHA'),
(166, 14, 'LOGROÑO'),
(167, 14, 'PABLO SEXTO'),
(168, 14, 'TIWINTZA'),
(169, 15, 'TENA'),
(170, 15, 'ARCHIDONA'),
(171, 15, 'EL CHACO'),
(172, 15, 'QUIJOS'),
(173, 15, 'CARLOS JULIO AROSEMENA TOLA'),
(174, 16, 'PASTAZA'),
(175, 16, 'MERA'),
(176, 16, 'SANTA CLARA'),
(177, 16, 'ARAJUNO'),
(178, 17, 'QUITO'),
(179, 17, 'CAYAMBE'),
(180, 17, 'MEJIA'),
(181, 17, 'PEDRO MONCAYO'),
(182, 17, 'RUMIÑAHUI'),
(183, 17, 'SAN MIGUEL DE LOS BANCOS'),
(184, 17, 'PEDRO VICENTE MALDONADO'),
(185, 17, 'PUERTO QUITO'),
(186, 18, 'AMBATO'),
(187, 18, 'BAÑOS DE AGUA SANTA'),
(188, 18, 'CEVALLOS'),
(189, 18, 'MOCHA'),
(190, 18, 'PATATE'),
(191, 18, 'QUERO'),
(192, 18, 'SAN PEDRO DE PELILEO'),
(193, 18, 'SANTIAGO DE PÍLLARO'),
(194, 18, 'TISALEO'),
(195, 19, 'ZAMORA'),
(196, 19, 'CHINCHIPE'),
(197, 19, 'NANGARITZA'),
(198, 19, 'YACUAMBI'),
(199, 19, 'YANTZAZA'),
(200, 19, 'EL PANGUI'),
(201, 19, 'CENTINELA DEL CÓNDOR'),
(202, 19, 'PALANDA'),
(203, 19, 'PAQUISHA'),
(204, 20, 'SAN CRISTÓBAL'),
(205, 20, 'ISABELA'),
(206, 20, 'SANTA CRUZ'),
(207, 21, 'LAGO AGRIO'),
(208, 21, 'GONZALO PIZARRO'),
(209, 21, 'PUTUMAYO'),
(210, 21, 'SHUSHUFINDI'),
(211, 21, 'SUCUMBÍOS'),
(212, 21, 'CASCALES'),
(213, 21, 'CUYABENO'),
(214, 22, 'ORELLANA'),
(215, 22, 'AGUARICO'),
(216, 22, 'LA JOYA DE LOS SACHAS'),
(217, 22, 'LORETO'),
(218, 23, 'SANTO DOMINGO'),
(219, 24, 'SANTA ELENA'),
(220, 24, 'LA LIBERTAD'),
(221, 24, 'SALINAS'),
(222, 10, 'LAS GOLONDRINAS'),
(223, 13, 'MANGA DEL CURA'),
(224, 9, 'EL PIEDRERO');

-- --------------------------------------------------------

--
-- Table structure for table `cursos_capacitaciones`
--

CREATE TABLE `cursos_capacitaciones` (
  `id` int(11) NOT NULL,
  `fk_pais` int(11) NOT NULL,
  `fk_estudiante` int(11) NOT NULL,
  `nom_evento` varchar(100) NOT NULL,
  `tipo_evento` int(11) NOT NULL,
  `auspiciante` varchar(120) NOT NULL,
  `horas` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_culminacion` date NOT NULL,
  `evidencia_url` varchar(200) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_cu` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cursos_capacitaciones`
--

INSERT INTO `cursos_capacitaciones` (`id`, `fk_pais`, `fk_estudiante`, `nom_evento`, `tipo_evento`, `auspiciante`, `horas`, `fecha_inicio`, `fecha_culminacion`, `evidencia_url`, `estado`, `external_cu`, `created_at`, `updated_at`) VALUES
(1, 5, 14, 'SAPEx', 1, 'sdffsd', 14, '2020-09-06', '2020-10-31', '/dfdgf/dfgfgdfgd', 0, 'asdaassdasasdasdas', '2021-03-09 18:09:45', '2021-03-13 02:57:20'),
(3, 5, 14, 'PC REPARACION xxxx', 1, 'UNL', 120, '2021-05-05', '2021-06-05', 'cdffdsfsdf', 1, 'Cu83783b36-338d-44fb-92ba-9d887fb18942', '2021-03-09 18:38:24', '2021-03-13 00:34:27'),
(4, 5, 14, 'Wbinar app', 1, 'UNL', 120, '2021-05-05', '2021-06-05', 'cdffdsfsdf', 1, 'Cua4774fad-444b-4b22-826b-c23e00f7adb8', '2021-03-09 18:39:14', '2021-03-09 18:39:14'),
(5, 5, 14, 'Wbinar app', 2, 'UNL', 120, '2021-05-05', '2021-06-05', 'cdffdsfsdf', 1, 'Cua616e90c-0943-40ff-95db-c32e0c7349d7', '2021-03-09 18:39:39', '2021-03-09 18:39:39'),
(6, 5, 14, 'Wbinar app', 1, 'UNL', 120, '2021-05-05', '2021-06-05', 'cdffdsfsdf', 1, 'Cu28824298-c809-4a0e-bb37-730e723a1a16', '2021-03-09 18:39:45', '2021-03-09 18:39:45'),
(7, 5, 14, 'PC REPARACION', 1, 'UNL', 120, '2021-05-05', '2021-06-05', 'cdffdsfsdf', 1, 'Cu3ea56ea1-d197-40bb-9ba9-3c94b11093c0', '2021-03-12 22:34:41', '2021-03-12 22:34:41'),
(8, 1, 14, 'CURSO DE DJ', 1, 'Municio de loja', 2, '2021-03-12', '2021-03-02', '1615607836arbol-sintactico.pdf', 0, 'Cu40c5d433-c832-40ab-9a80-ce0def5d09e4', '2021-03-12 22:57:16', '2021-03-13 02:59:31'),
(9, 13, 14, 'EL MIJIN', 2, 'DEL LOJA', 9, '2021-03-09', '2021-03-10', '1615612762arbol-sintactico.pdf', 1, 'Cu4ddfa52b-93d6-4655-a910-ed8216be1432', '2021-03-13 00:19:22', '2021-03-13 01:45:20');

-- --------------------------------------------------------

--
-- Table structure for table `docente`
--

CREATE TABLE `docente` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `tipo_docente` int(11) NOT NULL,
  `external_do` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `empleador`
--

CREATE TABLE `empleador` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `razon_empresa` varchar(100) NOT NULL,
  `tipo_empresa` varchar(100) NOT NULL,
  `actividad_ruc` varchar(100) NOT NULL,
  `num_ruc` varchar(100) NOT NULL,
  `cedula` varchar(100) NOT NULL,
  `nom_representante_legal` varchar(100) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `observaciones` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_em` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `empleador`
--

INSERT INTO `empleador` (`id`, `fk_usuario`, `razon_empresa`, `tipo_empresa`, `actividad_ruc`, `num_ruc`, `cedula`, `nom_representante_legal`, `ciudad`, `provincia`, `telefono`, `direccion`, `observaciones`, `estado`, `external_em`, `created_at`, `updated_at`) VALUES
(14, 64, 'UNL', 'UNL', 'INKNK', '52148824841312344', '1105116899', 'Rosa de los Angeles  Ordóñez Granda ', 'Loja', 'Loja', 'Loja', 'Loja', 'Muy bien', 1, 'Em73da1c2d-0b62-450d-b0d7-25822ccf5aac', '2021-03-09 01:46:11', '2021-03-09 20:40:31'),
(15, 61, 'EERSSA', 'UNL', 'DGFD', '52148824841312344', 'lOJA', 'Rosa de los Angeles  Ordóñez Granda ', 'Loja', 'Loja', 'Loja', 'Loja', 'Muy bien', 1, 'Ema8383c7a-212f-4544-b473-1933ef370788', '2021-03-09 20:39:36', '2021-03-09 20:41:58');

-- --------------------------------------------------------

--
-- Table structure for table `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `genero` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion_domicilio` varchar(200) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `external_es` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estudiante`
--

INSERT INTO `estudiante` (`id`, `fk_usuario`, `nombre`, `apellido`, `cedula`, `telefono`, `genero`, `fecha_nacimiento`, `direccion_domicilio`, `observaciones`, `external_es`, `estado`, `created_at`, `updated_at`) VALUES
(14, 56, 'Jhonny9cxvvcxxc', 'Morocho9X', '110511681', '099820021', 1, '1993-03-19', 'Los rosalesX', '', 'Es3aa844a8-f3e6-4bc2-ad1c-9210bd669e32', 0, '2021-03-04 15:34:08', '2021-03-09 20:38:02'),
(15, 49, 'Jhonny2', 'Morocho2', '1105116899', '099820201', 0, '2021-03-08', 'Los rosales', ' no , hhbh', 'adssadsasdadsasdasad', 0, '2021-03-05 21:46:01', '2021-03-09 00:42:52'),
(20, 51, 'Jhonny6', 'Morcho6', '1105116899', '0685251345', 0, '2021-02-05', 'saddasdas', '', 'Es3ef047d5-31ee-4eae-bed8-ffbd59c3cc61', 0, '2021-03-05 22:07:23', '2021-03-06 18:04:05'),
(35, 57, 'Jhonny', 'Morocho', '1105116899', '+33998202201', 0, '2021-03-07', 'knLPO,L', '', 'Ese08e6042-e7e6-4d5b-8bfa-400681216ff6', 0, '2021-03-07 17:49:02', '2021-03-07 17:49:02'),
(42, 62, 'Rosa de los Angeles ', 'Ordoñez Granda', '1105034266', '0992450297', 1, '2021-03-09', 'Isidro Ayora Bajo', 'Bien', 'Es2e1adfed-89cb-4fd8-b536-b3666f37a9d2', 1, '2021-03-09 00:39:20', '2021-03-09 00:47:22'),
(43, 50, 'Jhonny', 'Morocho', '1105116899', '0998200210', 1, '1993-03-09', 'Los rosales', 'Buen trabajo', 'Es6e0932d0-8479-4d17-bed3-44ec88cc9e8e', 0, '2021-03-09 01:03:00', '2021-03-09 01:03:00');

-- --------------------------------------------------------

--
-- Table structure for table `oferta_laboral`
--

CREATE TABLE `oferta_laboral` (
  `id` int(11) NOT NULL,
  `fk_empleador` int(11) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `obervaciones` varchar(100) NOT NULL,
  `requisitos` varchar(500) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_of` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `oferta_laboral`
--

INSERT INTO `oferta_laboral` (`id`, `fk_empleador`, `puesto`, `descripcion`, `lugar`, `obervaciones`, `requisitos`, `estado`, `external_of`, `created_at`, `updated_at`) VALUES
(4, 14, 'Ing Comercio', 'Se encita ing en comerico', 'Av. Paltas', 'Validado', '                    <ul>                       <li>Buena presencia</li>                       <li>Ganas de trabaar</li>                       <li>List item three</li>                       <li>List item four</li>                     </ul>                   ', 1, 'Cudc2f3fb5-29d8-4b13-8211-cde8a67fda02', '2021-03-13 15:57:00', '2021-03-13 15:57:00'),
(5, 14, 'Ing Comercio', 'Se encita ing en comerico', 'Av. Paltas', 'Validado', '                    <ul>                       <li>Buena presencia</li>                       <li>Ganas de trabaar</li>                       <li>List item three</li>                       <li>List item four</li>                     </ul>                   ', 1, 'Cu04524f0a-4395-4196-88c8-3535de5502ca', '2021-03-13 15:57:43', '2021-03-13 15:57:43'),
(6, 14, 'Ing Comercio', 'Se encita ing en comerico', 'Av. Paltas', 'Validado', '                    <ul>                       <li>Buena presencia</li>                       <li>Ganas de trabaar</li>                       <li>List item three</li>                       <li>List item four</li>                     </ul>                   ', 1, 'Cu4ac4f44d-e380-4705-a53d-7e9a5349944e', '2021-03-13 15:59:00', '2021-03-13 15:59:00'),
(7, 14, 'Ing Comercio', 'Se encita ing en comerico', 'Av. Paltas', 'Validado', '                    <ul>\r\n                      <li>Buena presencia</li>\r\n                      <li>Ganas de trabaar</li>\r\n                      <li>List item three</li>\r\n                      <li>List item four</li>\r\n                    </ul>\r\n                  ', 1, 'Cu910bb98b-7b08-49fd-a765-922493d2c6ee', '2021-03-14 03:32:15', '2021-03-14 03:32:15'),
(8, 15, 'sfs', 'sds', 'sd', '', '                    <ul>\r\n                      <li>Buena presencia</li>\r\n                      <li>Ganas de trabaar</li>\r\n                      <li>List item three</li>\r\n                      <li>List item four</li>\r\n                    </ul>\r\n                  ', 0, 'Cu0408e8dd-e4ba-460b-b93b-c1fe3e1707f6', '2021-03-14 03:52:12', '2021-03-14 03:52:12'),
(9, 15, 'sfs', 'sds', 'sd', '', '                    <ul>\r\n                      <li>Buena presencia</li>\r\n                      <li>Ganas de trabaar</li>\r\n                      <li>List item three</li>\r\n                      <li>List item four</li>\r\n                    </ul>\r\n                  ', 0, 'Cu611a43be-0027-42ea-ab3a-042638231573', '2021-03-14 03:52:42', '2021-03-14 03:52:42'),
(10, 15, 'Ing sistemas', 'Se necesita ing en sistemas con conocimietno en java scrip', 'Av eduadro kigman ', '', '                    <ul>\n                      <li>Buena presencia</li>\n                      <li>Ganas de trabaar</li>\n                      <li>List item three</li>\n                      <li>List item four</li>\n                    </ul>\n                  ', 0, 'Cu00d55e92-8f86-4cce-ab1c-1ffe8cbdb55d', '2021-03-14 03:55:43', '2021-03-14 03:55:43'),
(11, 15, 'Ing en conomia', 'Mayo de 20 años que sepa menajr xxx', 'Anv ,Catramtapt', '', '                    <ul>\n                      <li>Buenasafsdffds</li>\n                      <li>AUSTIASTAS</li>\n                      <li>List item three</li>\n                      <li>List item four</li>\n                    </ul>\n                  ', 0, 'Cu724418d4-75a2-4960-ba6b-665ccb24f8cf', '2021-03-14 04:01:14', '2021-03-14 04:01:14'),
(12, 14, 'Ing Comercio', 'Se encita ing en comerico', 'Av. Paltas', 'Validado', 'sadasdas', 1, 'Cud6b18d6f-4dff-4963-94b0-fba4fc06dd1e', '2021-03-14 13:27:36', '2021-03-14 13:27:36'),
(13, 14, 'Mecaninoc', 'Se necesito mecaquino', 'Orillas del zamora', '', '                    <ul>\n                      <li>List item one</li>\n                      <li>List item twoasd</li>\n                      <li>List item threeadsa</li>\n                      <li>List item fourdsa</li>\n                    </ul>\n                  ', 0, 'Cu7af5ec2f-51ae-4c39-ba0e-880a4c392ebb', '2021-03-14 14:42:11', '2021-03-14 14:42:11'),
(14, 14, 'Admistrador de redes', 'Se necesita ing en admisnitracion de redes vlan', 'Zamora ', '', '                    <ul>\n                      <li>Cocimiento en cnna</li>\n                      <li>Conocimiento de datacenter</li>\n                    </ul>\n                  ', 0, 'Cu248ff8d5-001f-4951-8f0e-e19ab5866068', '2021-03-14 18:01:13', '2021-03-14 18:01:13');

-- --------------------------------------------------------

--
-- Table structure for table `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `iso` char(2) CHARACTER SET utf8 DEFAULT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paises`
--

INSERT INTO `paises` (`id`, `iso`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'AF', 'Afganistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(2, 'AX', 'Islas Gland', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(3, 'AL', 'Albania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(4, 'DE', 'Alemania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(5, 'AD', 'Andorra', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(6, 'AO', 'Angola', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(7, 'AI', 'Anguilla', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(8, 'AQ', 'Antártida', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(9, 'AG', 'Antigua y Barbuda', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(10, 'AN', 'Antillas Holandesas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(11, 'SA', 'Arabia Saudí', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(12, 'DZ', 'Argelia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(13, 'AR', 'Argentina', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(14, 'AM', 'Armenia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(15, 'AW', 'Aruba', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(16, 'AU', 'Australia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(17, 'AT', 'Austria', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(18, 'AZ', 'Azerbaiyán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(19, 'BS', 'Bahamas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(20, 'BH', 'Bahréin', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(21, 'BD', 'Bangladesh', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(22, 'BB', 'Barbados', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(23, 'BY', 'Bielorrusia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(24, 'BE', 'Bélgica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(25, 'BZ', 'Belice', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(26, 'BJ', 'Benin', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(27, 'BM', 'Bermudas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(28, 'BT', 'Bhután', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(29, 'BO', 'Bolivia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(30, 'BA', 'Bosnia y Herzegovina', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(31, 'BW', 'Botsuana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(32, 'BV', 'Isla Bouvet', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(33, 'BR', 'Brasil', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(34, 'BN', 'Brunéi', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(35, 'BG', 'Bulgaria', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(36, 'BF', 'Burkina Faso', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(37, 'BI', 'Burundi', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(38, 'CV', 'Cabo Verde', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(39, 'KY', 'Islas Caimán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(40, 'KH', 'Camboya', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(41, 'CM', 'Camerún', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(42, 'CA', 'Canadá', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(43, 'CF', 'República Centroafricana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(44, 'TD', 'Chad', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(45, 'CZ', 'República Checa', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(46, 'CL', 'Chile', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(47, 'CN', 'China', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(48, 'CY', 'Chipre', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(49, 'CX', 'Isla de Navidad', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(50, 'VA', 'Ciudad del Vaticano', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(51, 'CC', 'Islas Cocos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(52, 'CO', 'Colombia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(53, 'KM', 'Comoras', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(54, 'CD', 'República Democrática del Congo', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(55, 'CG', 'Congo', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(56, 'CK', 'Islas Cook', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(57, 'KP', 'Corea del Norte', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(58, 'KR', 'Corea del Sur', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(59, 'CI', 'Costa de Marfil', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(60, 'CR', 'Costa Rica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(61, 'HR', 'Croacia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(62, 'CU', 'Cuba', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(63, 'DK', 'Dinamarca', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(64, 'DM', 'Dominica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(65, 'DO', 'República Dominicana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(66, 'EC', 'Ecuador', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(67, 'EG', 'Egipto', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(68, 'SV', 'El Salvador', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(69, 'AE', 'Emiratos Árabes Unidos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(70, 'ER', 'Eritrea', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(71, 'SK', 'Eslovaquia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(72, 'SI', 'Eslovenia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(73, 'ES', 'España', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(74, 'UM', 'Islas ultramarinas de Estados Unidos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(75, 'US', 'Estados Unidos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(76, 'EE', 'Estonia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(77, 'ET', 'Etiopía', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(78, 'FO', 'Islas Feroe', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(79, 'PH', 'Filipinas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(80, 'FI', 'Finlandia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(81, 'FJ', 'Fiyi', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(82, 'FR', 'Francia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(83, 'GA', 'Gabón', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(84, 'GM', 'Gambia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(85, 'GE', 'Georgia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(86, 'GS', 'Islas Georgias del Sur y Sandwich del Sur', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(87, 'GH', 'Ghana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(88, 'GI', 'Gibraltar', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(89, 'GD', 'Granada', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(90, 'GR', 'Grecia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(91, 'GL', 'Groenlandia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(92, 'GP', 'Guadalupe', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(93, 'GU', 'Guam', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(94, 'GT', 'Guatemala', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(95, 'GF', 'Guayana Francesa', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(96, 'GN', 'Guinea', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(97, 'GQ', 'Guinea Ecuatorial', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(98, 'GW', 'Guinea-Bissau', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(99, 'GY', 'Guyana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(100, 'HT', 'Haití', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(101, 'HM', 'Islas Heard y McDonald', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(102, 'HN', 'Honduras', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(103, 'HK', 'Hong Kong', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(104, 'HU', 'Hungría', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(105, 'IN', 'India', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(106, 'ID', 'Indonesia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(107, 'IR', 'Irán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(108, 'IQ', 'Iraq', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(109, 'IE', 'Irlanda', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(110, 'IS', 'Islandia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(111, 'IL', 'Israel', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(112, 'IT', 'Italia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(113, 'JM', 'Jamaica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(114, 'JP', 'Japón', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(115, 'JO', 'Jordania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(116, 'KZ', 'Kazajstán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(117, 'KE', 'Kenia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(118, 'KG', 'Kirguistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(119, 'KI', 'Kiribati', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(120, 'KW', 'Kuwait', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(121, 'LA', 'Laos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(122, 'LS', 'Lesotho', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(123, 'LV', 'Letonia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(124, 'LB', 'Líbano', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(125, 'LR', 'Liberia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(126, 'LY', 'Libia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(127, 'LI', 'Liechtenstein', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(128, 'LT', 'Lituania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(129, 'LU', 'Luxemburgo', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(130, 'MO', 'Macao', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(131, 'MK', 'ARY Macedonia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(132, 'MG', 'Madagascar', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(133, 'MY', 'Malasia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(134, 'MW', 'Malawi', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(135, 'MV', 'Maldivas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(136, 'ML', 'Malí', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(137, 'MT', 'Malta', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(138, 'FK', 'Islas Malvinas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(139, 'MP', 'Islas Marianas del Norte', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(140, 'MA', 'Marruecos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(141, 'MH', 'Islas Marshall', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(142, 'MQ', 'Martinica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(143, 'MU', 'Mauricio', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(144, 'MR', 'Mauritania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(145, 'YT', 'Mayotte', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(146, 'MX', 'México', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(147, 'FM', 'Micronesia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(148, 'MD', 'Moldavia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(149, 'MC', 'Mónaco', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(150, 'MN', 'Mongolia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(151, 'MS', 'Montserrat', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(152, 'MZ', 'Mozambique', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(153, 'MM', 'Myanmar', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(154, 'NA', 'Namibia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(155, 'NR', 'Nauru', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(156, 'NP', 'Nepal', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(157, 'NI', 'Nicaragua', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(158, 'NE', 'Níger', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(159, 'NG', 'Nigeria', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(160, 'NU', 'Niue', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(161, 'NF', 'Isla Norfolk', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(162, 'NO', 'Noruega', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(163, 'NC', 'Nueva Caledonia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(164, 'NZ', 'Nueva Zelanda', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(165, 'OM', 'Omán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(166, 'NL', 'Países Bajos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(167, 'PK', 'Pakistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(168, 'PW', 'Palau', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(169, 'PS', 'Palestina', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(170, 'PA', 'Panamá', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(171, 'PG', 'Papúa Nueva Guinea', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(172, 'PY', 'Paraguay', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(173, 'PE', 'Perú', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(174, 'PN', 'Islas Pitcairn', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(175, 'PF', 'Polinesia Francesa', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(176, 'PL', 'Polonia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(177, 'PT', 'Portugal', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(178, 'PR', 'Puerto Rico', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(179, 'QA', 'Qatar', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(180, 'GB', 'Reino Unido', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(181, 'RE', 'Reunión', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(182, 'RW', 'Ruanda', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(183, 'RO', 'Rumania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(184, 'RU', 'Rusia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(185, 'EH', 'Sahara Occidental', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(186, 'SB', 'Islas Salomón', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(187, 'WS', 'Samoa', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(188, 'AS', 'Samoa Americana', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(189, 'KN', 'San Cristóbal y Nevis', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(190, 'SM', 'San Marino', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(191, 'PM', 'San Pedro y Miquelón', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(192, 'VC', 'San Vicente y las Granadinas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(193, 'SH', 'Santa Helena', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(194, 'LC', 'Santa Lucía', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(195, 'ST', 'Santo Tomé y Príncipe', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(196, 'SN', 'Senegal', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(197, 'CS', 'Serbia y Montenegro', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(198, 'SC', 'Seychelles', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(199, 'SL', 'Sierra Leona', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(200, 'SG', 'Singapur', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(201, 'SY', 'Siria', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(202, 'SO', 'Somalia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(203, 'LK', 'Sri Lanka', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(204, 'SZ', 'Suazilandia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(205, 'ZA', 'Sudáfrica', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(206, 'SD', 'Sudán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(207, 'SE', 'Suecia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(208, 'CH', 'Suiza', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(209, 'SR', 'Surinam', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(210, 'SJ', 'Svalbard y Jan Mayen', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(211, 'TH', 'Tailandia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(212, 'TW', 'Taiwán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(213, 'TZ', 'Tanzania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(214, 'TJ', 'Tayikistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(215, 'IO', 'Territorio Británico del Océano Índico', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(216, 'TF', 'Territorios Australes Franceses', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(217, 'TL', 'Timor Oriental', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(218, 'TG', 'Togo', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(219, 'TK', 'Tokelau', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(220, 'TO', 'Tonga', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(221, 'TT', 'Trinidad y Tobago', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(222, 'TN', 'Túnez', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(223, 'TC', 'Islas Turcas y Caicos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(224, 'TM', 'Turkmenistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(225, 'TR', 'Turquía', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(226, 'TV', 'Tuvalu', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(227, 'UA', 'Ucrania', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(228, 'UG', 'Uganda', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(229, 'UY', 'Uruguay', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(230, 'UZ', 'Uzbekistán', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(231, 'VU', 'Vanuatu', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(232, 'VE', 'Venezuela', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(233, 'VN', 'Vietnam', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(234, 'VG', 'Islas Vírgenes Británicas', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(235, 'VI', 'Islas Vírgenes de los Estados Unidos', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(236, 'WF', 'Wallis y Futuna', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(237, 'YE', 'Yemen', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(238, 'DJ', 'Yibuti', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(239, 'ZM', 'Zambia', '2021-03-09 18:13:39', '2021-03-09 18:14:38'),
(240, 'ZW', 'Zimbabue', '2021-03-09 18:13:39', '2021-03-09 18:14:38');

-- --------------------------------------------------------

--
-- Table structure for table `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(1, 'AZUAY'),
(2, 'BOLIVAR'),
(3, 'CAÑAR'),
(4, 'CARCHI'),
(5, 'COTOPAXI'),
(6, 'CHIMBORAZO'),
(7, 'EL ORO'),
(8, 'ESMERALDAS'),
(9, 'GUAYAS'),
(10, 'IMBABURA'),
(11, 'LOJA'),
(12, 'LOS RIOS'),
(13, 'MANABI'),
(14, 'MORONA SANTIAGO'),
(15, 'NAPO'),
(16, 'PASTAZA'),
(17, 'PICHINCHA'),
(18, 'TUNGURAHUA'),
(19, 'ZAMORA CHINCHIPE'),
(20, 'GALAPAGOS'),
(21, 'SUCUMBIOS'),
(22, 'ORELLANA'),
(23, 'SANTO DOMINGO DE LOS TSACHILAS'),
(24, 'SANTA ELENA');

-- --------------------------------------------------------

--
-- Table structure for table `requisitos`
--

CREATE TABLE `requisitos` (
  `id` int(11) NOT NULL,
  `fk_oferta` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_re` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `titulos_academicos`
--

CREATE TABLE `titulos_academicos` (
  `id` int(11) NOT NULL,
  `fk_estudiante` int(11) NOT NULL,
  `titulo_obtenido` varchar(100) NOT NULL,
  `numero_registro` varchar(50) NOT NULL,
  `tipo_titulo` int(11) NOT NULL,
  `nivel_instruccion` int(11) NOT NULL,
  `detalles_adiciones` varchar(200) NOT NULL,
  `evidencias_url` varchar(200) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_ti` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `titulos_academicos`
--

INSERT INTO `titulos_academicos` (`id`, `fk_estudiante`, `titulo_obtenido`, `numero_registro`, `tipo_titulo`, `nivel_instruccion`, `detalles_adiciones`, `evidencias_url`, `estado`, `external_ti`, `created_at`, `updated_at`) VALUES
(47, 14, 'MUSICP', '1fg-24b', 1, 1, '', '1615591975Tarea Compiladores - 02 de febrero del 2021.pdf', 0, 'Tia528f4bb-15f2-4499-af51-f9b38320ecde', '2021-03-12 18:32:55', '2021-03-12 18:33:04'),
(48, 14, 'EXPRESION', '1fg-24b', 2, 2, '', '1615592924Tarea 4 Expresiones Reguales.pdf', 1, 'Ti12642b23-1d42-4887-a239-853a7149c7fc', '2021-03-12 18:33:27', '2021-03-12 18:48:45'),
(49, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592010Tarea Compiladores - 02 de febrero del 2021.pdf', 1, 'Ti595840e0-390a-4585-85d3-0b53351f2678', '2021-03-12 18:33:30', '2021-03-12 18:33:30'),
(50, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592011Tarea Compiladores - 02 de febrero del 2021.pdf', 1, 'Ti64fb17ae-a068-4533-9e9b-4ca27d58092f', '2021-03-12 18:33:31', '2021-03-12 18:33:31'),
(51, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592013Tarea Compiladores - 02 de febrero del 2021.pdf', 1, 'Ti120b19b3-fbd6-4507-9a6c-f174524e6af2', '2021-03-12 18:33:33', '2021-03-12 18:33:33'),
(52, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592014Tarea Compiladores - 02 de febrero del 2021.pdf', 1, 'Ti7c30dea2-ad75-433b-b99b-a03f85e326e3', '2021-03-12 18:33:35', '2021-03-12 18:33:35'),
(53, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592016Tarea Compiladores - 02 de febrero del 2021.pdf', 0, 'Ti4f578fbe-13cf-4c74-9721-a1b5e0abaf86', '2021-03-12 18:33:36', '2021-03-12 18:50:17'),
(54, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592017Tarea Compiladores - 02 de febrero del 2021.pdf', 0, 'Ti5634a549-a393-4cf3-a3ac-c4ffae660571', '2021-03-12 18:33:37', '2021-03-12 18:49:02'),
(55, 14, 'MUSICP', '1fg-24b', 2, 2, '', '1615592019Tarea Compiladores - 02 de febrero del 2021.pdf', 0, 'Ti9f495455-6632-4aae-bf9e-7d89c9050e64', '2021-03-12 18:33:39', '2021-03-12 18:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `tipoUsuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `external_us` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `password`, `tipoUsuario`, `estado`, `external_us`, `created_at`, `updated_at`) VALUES
(28, 'encargado@hotmail.com', '$2y$12$SaaN3p.9HtnHTyaaEvqzvu0YAHa.Dm/tA1tVK/IHF8cc01akP7IwC', 5, 1, 'UuAc11dda98-c217-4963-b4e4-2cd8025464aa', '2021-03-07 18:08:27', '2021-03-07 18:08:27'),
(29, 'secretaria@hotmail.com', '$2y$12$SaaN3p.9HtnHTyaaEvqzvu0YAHa.Dm/tA1tVK/IHF8cc01akP7IwC', 3, 1, 'UuA69d59465-4e61-4355-b8d7-4e8016bac7ec', '2021-03-04 15:23:50', '2021-03-04 15:23:50'),
(30, 'postulante2@hotmail.com', '$2y$12$nn/1vT5SykssTsxQVyUvp.u7AOd2JMJc3eQmm6slt.mI2jYJbUWeS', 3, 1, 'UuAa1658d4d-43fb-47f9-9f91-fc50eb402654', '2021-03-02 13:13:11', '2021-03-02 13:13:11'),
(32, 'postulante3@hotmail.com', '$2y$12$xz6CMeXLJdhGOk2F7W0dNe76yGBYpVyGy0BLgjDCVi5LOmo9mzlSO', 2, 1, 'UuA0d7d971f-1487-4a6a-819d-810287fa2e19', '2021-03-02 16:26:46', '2021-03-02 16:26:46'),
(45, 'jhonny@hotmail.com', '$2y$12$UHGrUcr.PiGFRHgMfa2AJ.SzTf6Log9cUibLVH2Z49S31E316.KIi', 2, 1, 'UuAc8f00896-05ce-4ddf-920f-a0fe5ebaeba2', '2021-03-03 13:46:57', '2021-03-03 13:46:57'),
(47, 'postulante4@hotmail.com', '$2y$12$w.K99Uf7D5wrMNj4CZm/7O8Xq4py8Dxa4tqYswwT7iYJNuU4RV1sy', 2, 1, 'UuAbe3e6ba1-3b7b-43da-b082-f31c4a1dff63', '2021-03-03 13:47:59', '2021-03-03 13:47:59'),
(49, 'jhonny2@hotmail.com', '$2y$12$k1WagMR3YcZkYxlRkeSOIup30CehW/V8skPaXBhdeodO/0MnD8LxG', 2, 1, 'UuA9b1b0fbc-2d04-42f9-8aaa-693c65f22a7e', '2021-03-03 17:49:15', '2021-03-03 17:49:15'),
(50, 'jhonny5@hotmail.com', '$2y$12$GF6Zoa.5449mxeZUEuBpj.dG2T5TlP32i8yamQenDB03oNVrproza', 2, 1, 'UuAc0d3a400-3ecf-4276-acc9-40d97fe0d254', '2021-03-03 22:39:18', '2021-03-03 22:39:18'),
(51, 'jhonny6@hotmail.com', '$2y$12$TDP1BxowhUdV3d36Y3BZSucv0qq9Der08mBdmqa5tDiuk.iIYJVwq', 2, 1, 'UuA504c0eb0-3a0f-4b07-be63-3eecfaa4f2e5', '2021-03-03 23:40:26', '2021-03-03 23:40:26'),
(52, 'jhonny7@hotmail.com', '$2y$12$GuLsUSJtHDUrPHjb8w/l5OTC0m.yA1YQffbdQYbK.cQ5rQtf7flfe', 2, 1, 'UuAec216578-522d-4583-8dd2-ef8a9d320959', '2021-03-04 01:18:41', '2021-03-04 01:18:41'),
(55, 'jhonny8@hotmail.com', '$2y$12$ZD5zg1oFZgs7.MjAgNikbeRE5EPMoSpV/S9bNyoGvC34pMRJgWIza', 2, 1, 'UuA50555d4a-c2d6-4e11-ad1a-57c984319ba2', '2021-03-04 12:44:09', '2021-03-04 12:44:09'),
(56, 'jhonny9@hotmail.com', '$2y$12$UJ2wbsuzXmdcdyXmzS7AUeEoW.MKVkmGsrbyz9uvs8MKERJEI47.6', 2, 1, 'UuAd5c4b46d-3d91-4cf9-897c-65b2ce260d66', '2021-03-05 19:39:09', '2021-03-05 19:39:09'),
(57, 'jhonny10@hotmail.com', '$2y$12$p03gqCzcXsnkh6cvH6hVb.5JgH/kJv/TLqk5BBdahRTYSwcoDp8Xa', 2, 1, 'UuAdbe2b11b-ad96-4c22-aef9-185e941beb46', '2021-03-07 17:07:37', '2021-03-07 17:07:37'),
(58, 'eerssa@hotmail.com', '$2y$12$6vrGf7UdhyrBm7B4UoAd7evZRVWNngbFUO7IrJkZfswM82RiHTJMK', 6, 1, 'UuA75c72179-97ef-46ef-a203-767473336a3a', '2021-03-07 18:39:16', '2021-03-07 18:39:16'),
(59, 'jhonny12@hotmail.com', '$2y$12$321aRYRDejaSOk53v0lQP.ZNXqPbjG2nJyDwMum7TAUepKcaoeRwq', 2, 1, 'UuA56660329-e5ce-4a84-814f-3b5cb87f06b6', '2021-03-07 20:41:36', '2021-03-07 20:41:36'),
(61, 'eerssa1@hotmail.com', '$2y$12$M6zArkI/s6LOhklooBl0xu7llwlgxK//vdeD64hTYNWzep4tGIbcm', 6, 1, 'UuA9d6756af-8fc0-447a-adee-f907d3340a31', '2021-03-07 20:47:18', '2021-03-07 20:47:18'),
(62, 'rousse0075@hotmail.com', '$2y$12$kY8nzPqfryktyzHeV4xcfuoKTzp3TWHjBqMuCvAziPJ7Dgj1ArVyK', 2, 1, 'UuAba9a2302-7153-4314-83d8-7028469b18bf', '2021-03-09 00:14:20', '2021-03-09 00:14:20'),
(63, 'rousse00750@hotmail.com', '$2y$12$QVsrCvf8D7j70GEWbLJhm.aBTl/DwJhv5UEx8DytcvcC8If8dp1za', 2, 1, 'UuA4c951b99-f086-4ef1-8313-b0239cac6529', '2021-03-09 00:51:15', '2021-03-09 00:51:15'),
(64, 'maae@hotmail.com', '$2y$12$MsMp.9oDgUO5p8J65doNjuJPtlb5881I48YLLGyQBTJ0BG/vL.AFy', 6, 1, 'UuAd0d5bee0-9032-4d20-8003-c5915aea2dc1', '2021-03-09 00:53:31', '2021-03-09 00:53:31'),
(65, 'eerssa9@hotmail.com', '$2y$12$7qzj3YNguApGL/sgvLPlFOrW11L8auHjKhlnkkaYkJFyklToMB1eS', 6, 1, 'UuAbf0f9061-b2d3-4d2f-b696-7dadf33c5ed8', '2021-03-13 23:07:27', '2021-03-13 23:07:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_provincia` (`fk_provincia`);

--
-- Indexes for table `cursos_capacitaciones`
--
ALTER TABLE `cursos_capacitaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_cu` (`external_cu`),
  ADD KEY `fk_pais` (`fk_pais`),
  ADD KEY `fk_estudiante` (`fk_estudiante`);

--
-- Indexes for table `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indexes for table `empleador`
--
ALTER TABLE `empleador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_usuario_2` (`fk_usuario`),
  ADD UNIQUE KEY `external_em` (`external_em`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indexes for table `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_es` (`external_es`),
  ADD UNIQUE KEY `fk_usuario_2` (`fk_usuario`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indexes for table `oferta_laboral`
--
ALTER TABLE `oferta_laboral`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_of` (`external_of`),
  ADD KEY `fk_empleador` (`fk_empleador`),
  ADD KEY `fk_empleador_2` (`fk_empleador`),
  ADD KEY `fk_empleador_3` (`fk_empleador`);

--
-- Indexes for table `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requisitos`
--
ALTER TABLE `requisitos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_re` (`external_re`),
  ADD KEY `fk_oferta` (`fk_oferta`),
  ADD KEY `fk_oferta_2` (`fk_oferta`),
  ADD KEY `fk_oferta_3` (`fk_oferta`);

--
-- Indexes for table `titulos_academicos`
--
ALTER TABLE `titulos_academicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_ti` (`external_ti`),
  ADD KEY `fk_estudiante` (`fk_estudiante`),
  ADD KEY `fk_estudiante_2` (`fk_estudiante`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `external_us` (`external_us`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT for table `cursos_capacitaciones`
--
ALTER TABLE `cursos_capacitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `docente`
--
ALTER TABLE `docente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empleador`
--
ALTER TABLE `empleador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `oferta_laboral`
--
ALTER TABLE `oferta_laboral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `requisitos`
--
ALTER TABLE `requisitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `titulos_academicos`
--
ALTER TABLE `titulos_academicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `ciudad_ibfk_1` FOREIGN KEY (`fk_provincia`) REFERENCES `provincia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cursos_capacitaciones`
--
ALTER TABLE `cursos_capacitaciones`
  ADD CONSTRAINT `cursos_capacitaciones_ibfk_1` FOREIGN KEY (`fk_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cursos_capacitaciones_ibfk_2` FOREIGN KEY (`fk_pais`) REFERENCES `paises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `docente_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `empleador`
--
ALTER TABLE `empleador`
  ADD CONSTRAINT `empleador_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `oferta_laboral`
--
ALTER TABLE `oferta_laboral`
  ADD CONSTRAINT `oferta_laboral_ibfk_1` FOREIGN KEY (`fk_empleador`) REFERENCES `empleador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requisitos`
--
ALTER TABLE `requisitos`
  ADD CONSTRAINT `requisitos_ibfk_1` FOREIGN KEY (`fk_oferta`) REFERENCES `oferta_laboral` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `titulos_academicos`
--
ALTER TABLE `titulos_academicos`
  ADD CONSTRAINT `titulos_academicos_ibfk_1` FOREIGN KEY (`fk_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
