-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mer 27 Septembre 2017 à 14:08
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hotel`
--

-- --------------------------------------------------------

--
-- Suppression des tables
--

DROP TABLE IF EXISTS picture_galery;

DROP TABLE IF EXISTS festive_room_booking_services;
DROP TABLE IF EXISTS festive_room_booking;

DROP TABLE IF EXISTS room_booking_services;
DROP TABLE IF EXISTS room_booking;

DROP TABLE IF EXISTS restaurant_table_booking;
DROP TABLE IF EXISTS restaurant_table;

DROP TABLE IF EXISTS invalid_booking_date_festive_room;
DROP TABLE IF EXISTS invalid_booking_date_room;

DROP TABLE IF EXISTS news_letter;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS picture_room_category;
DROP TABLE IF EXISTS room_category;

DROP TABLE IF EXISTS festive_room_service;
DROP TABLE IF EXISTS room_service;

DROP TABLE IF EXISTS festive_room;
DROP TABLE IF EXISTS building;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS client;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id_article` int(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `date` datetime NOT NULL,
  `picture_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `article`
--

INSERT INTO `article` (`id_article`, `title`, `content`, `date`, `picture_path`) VALUES
(1, 'La langue Latine', 'Orientis vero limes in longum protentus et rectum ab Euphratis fluminis ripis ad usque supercilia porrigitur Nili, laeva Saracenis conterminans gentibus, dextra pelagi fragoribus patens, quam plagam Nicator Seleucus occupatam auxit magnum in modum, cum post Alexandri Macedonis obitum successorio iure teneret regna Persidis, efficaciae inpetrabilis rex, ut indicat cognomentum.Soleo saepe ante oculos ponere, idque libenter crebris usurpare sermonibus, omnis nostrorum imperatorum, omnis exterarum gentium potentissimorumque populorum, omnis clarissimorum regum res gestas, cum tuis nec contentionum magnitudine nec numero proeliorum nec varietate regionum nec celeritate conficiendi nec dissimilitudine bellorum posse conferri; nec vero disiunctissimas terras citius passibus cuiusquam potuisse peragrari, quam tuis non dicam cursibus, sed victoriis lustratae sunt.Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missus a socero per militares numeros immodice scrutabatur, an quaedam altiora meditantis iam Galli secreta susceperint scripta, qui conpertis Antiochiae gestis per minorem Armeniam lapsus Constantinopolim petit exindeque per protectores retractus artissime tenebatur.', '2017-09-30 00:00:00', 'img/Article/article_1.jpg'),
(2, 'La langue Latine', 'Orientis vero limes in longum protentus et rectum ab Euphratis fluminis ripis ad usque supercilia porrigitur Nili, laeva Saracenis conterminans gentibus, dextra pelagi fragoribus patens, quam plagam Nicator Seleucus occupatam auxit magnum in modum, cum post Alexandri Macedonis obitum successorio iure teneret regna Persidis, efficaciae inpetrabilis rex, ut indicat cognomentum.Soleo saepe ante oculos ponere, idque libenter crebris usurpare sermonibus, omnis nostrorum imperatorum, omnis exterarum gentium potentissimorumque populorum, omnis clarissimorum regum res gestas, cum tuis nec contentionum magnitudine nec numero proeliorum nec varietate regionum nec celeritate conficiendi nec dissimilitudine bellorum posse conferri; nec vero disiunctissimas terras citius passibus cuiusquam potuisse peragrari, quam tuis non dicam cursibus, sed victoriis lustratae sunt.Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missus a socero per militares numeros immodice scrutabatur, an quaedam altiora meditantis iam Galli secreta susceperint scripta, qui conpertis Antiochiae gestis per minorem Armeniam lapsus Constantinopolim petit exindeque per protectores retractus artissime tenebatur.', '2017-09-30 00:00:00', 'img/Article/article_1.jpg'),
(3, 'La langue Latine', 'Orientis vero limes in longum protentus et rectum ab Euphratis fluminis ripis ad usque supercilia porrigitur Nili, laeva Saracenis conterminans gentibus, dextra pelagi fragoribus patens, quam plagam Nicator Seleucus occupatam auxit magnum in modum, cum post Alexandri Macedonis obitum successorio iure teneret regna Persidis, efficaciae inpetrabilis rex, ut indicat cognomentum.Soleo saepe ante oculos ponere, idque libenter crebris usurpare sermonibus, omnis nostrorum imperatorum, omnis exterarum gentium potentissimorumque populorum, omnis clarissimorum regum res gestas, cum tuis nec contentionum magnitudine nec numero proeliorum nec varietate regionum nec celeritate conficiendi nec dissimilitudine bellorum posse conferri; nec vero disiunctissimas terras citius passibus cuiusquam potuisse peragrari, quam tuis non dicam cursibus, sed victoriis lustratae sunt.Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missus a socero per militares numeros immodice scrutabatur, an quaedam altiora meditantis iam Galli secreta susceperint scripta, qui conpertis Antiochiae gestis per minorem Armeniam lapsus Constantinopolim petit exindeque per protectores retractus artissime tenebatur.', '2017-09-30 00:00:00', 'img/Article/article_1.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `building`
--

CREATE TABLE `building` (
  `id_building` int(100) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `building`
--

INSERT INTO `building` (`id_building`, `name`) VALUES
(1, 'Batiment A'),
(2, 'Batiment B'),
(3, 'Batiment C');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int(100) NOT NULL,
  `accreditation` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `status_actif` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`id_client`, `accreditation`, `address`, `birthday`, `city`, `code`, `country`, `email`, `firstname`, `lastname`, `password`, `phone`, `postal_code`, `sexe`, `status_actif`, `token`, `token_date`) VALUES
(11, 'user', 'test', '2017-07-04 02:00:00', 'paris', 'OK', 'france', 'mollard.maxime75@gmail.com', 'max', 'mollard', 'b011e4a9f423034832a7431e7afcdc57f294feaf01273f4cdd547d1e6c06b827', 'test', '75015', 'test', 'active', 'c4be2e05-762d-495c-9894-4c0c4248a367', '2017-09-26 18:21:02'),
(12, 'user', '70 rue cambronne', '2017-01-01 01:00:00', 'paris', 'OK', 'France', 'mollard.maxime@hotmail.fr', 'mollard', 'maxime', 'b011e4a9f423034832a7431e7afcdc57f294feaf01273f4cdd547d1e6c06b827', '644280794', '75015', '0', 'active', NULL, NULL),
(13, 'user', '70 rue cambronne', '2017-01-01 01:00:00', 'Paris', 'OK', 'Gabon', 'mollard.maxime75@hotmail.fr', 'mollard', 'maxime', 'b011e4a9f423034832a7431e7afcdc57f294feaf01273f4cdd547d1e6c06b827', '0644280794', '75015', '0', 'active', '571fba39-e936-4fda-ae9b-cdf59639376c', '2017-09-27 15:33:10');

-- --------------------------------------------------------

--
-- Structure de la table `festive_room`
--

CREATE TABLE `festive_room` (
  `id_festive_room` int(100) NOT NULL,
  `price` float(100,4) NOT NULL,
  `picture_path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `festive_room`
--

INSERT INTO `festive_room` (`id_festive_room`, `price`, `picture_path`) VALUES
(1, 1000000.0000, 'test'),
(2, 1000000.0000, 'test'),
(3, 1000000.0000, 'test'),
(4, 1000000.0000, '');

-- --------------------------------------------------------

--
-- Structure de la table `festive_room_booking`
--

CREATE TABLE `festive_room_booking` (
  `id_festive_room_booking` int(100) NOT NULL,
  `date_book` datetime NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `id_festive_room` int(100) NOT NULL,
  `id_client` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `festive_room_booking_services`
--

CREATE TABLE `festive_room_booking_services` (
  `id_festive_room_booking_services` int(100) NOT NULL,
  `id_festive_room_booking` int(100) NOT NULL,
  `id_festive_room_service` int(100) NOT NULL,
  `quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `festive_room_service`
--

CREATE TABLE `festive_room_service` (
  `id_festive_room_service` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(100,4) NOT NULL,
  `quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `festive_room_service`
--

INSERT INTO `festive_room_service` (`id_festive_room_service`, `name`, `price`, `quantity`) VALUES
(1, 'Table', 20000.0000, 10),
(2, 'Table', 20000.0000, 10),
(3, 'chaise', 20000.0000, 300);

-- --------------------------------------------------------

--
-- Structure de la table `invalid_booking_date_festive_room`
--

CREATE TABLE `invalid_booking_date_festive_room` (
  `id_invalid_booking_date_festive_room` int(100) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `id_festive_room` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `invalid_booking_date_room`
--

CREATE TABLE `invalid_booking_date_room` (
  `id_invalid_booking_date_room` int(100) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `id_room` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `news_letter`
--

CREATE TABLE `news_letter` (
  `id_news_letter` int(100) NOT NULL,
  `content` longtext NOT NULL,
  `reason` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `picture_galery`
--

CREATE TABLE `picture_galery` (
  `id_picture_galery` int(100) NOT NULL,
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `picture_galery`
--

INSERT INTO `picture_galery` (`id_picture_galery`, `path`) VALUES
(35, 'img/Galery/galery_1.png'),
(36, 'img/Galery/galery_2.png'),
(37, 'img/Galery/galery_3.png'),
(38, 'img/Galery/galery_4.png'),
(39, 'img/Galery/galery_5.png'),
(40, 'img/Galery/galery_6.png'),
(41, 'img/Galery/galery_7.png'),
(42, 'img/Galery/galery_8.png'),
(43, 'img/Galery/galery_9.png'),
(44, 'img/Galery/galery_10.png'),
(45, 'img/Galery/galery_11.png'),
(46, 'img/Galery/galery_12.png'),
(47, 'img/Galery/galery_13.png'),
(48, 'img/Galery/galery_14.png'),
(49, 'img/Galery/galery_15.png'),
(50, 'img/Galery/galery_16.png'),
(51, 'img/Galery/galery_17.png'),
(52, 'img/Galery/galery_18.png'),
(53, 'img/Galery/galery_19.png'),
(54, 'img/Galery/galery_20.png'),
(55, 'img/Galery/galery_1.png'),
(56, 'img/Galery/galery_2.png'),
(57, 'img/Galery/galery_3.png'),
(58, 'img/Galery/galery_4.png'),
(59, 'img/Galery/galery_5.png'),
(60, 'img/Galery/galery_6.png'),
(61, 'img/Galery/galery_7.png'),
(62, 'img/Galery/galery_8.png'),
(63, 'img/Galery/galery_9.png'),
(64, 'img/Galery/galery_10.png'),
(65, 'img/Galery/galery_11.png'),
(66, 'img/Galery/galery_12.png'),
(67, 'img/Galery/galery_13.png'),
(68, 'img/Galery/galery_14.png'),
(69, 'img/Galery/galery_15.png'),
(70, 'img/Galery/galery_16.png'),
(71, 'img/Galery/galery_17.png'),
(72, 'img/Galery/galery_18.png'),
(73, 'img/Galery/galery_19.png');

-- --------------------------------------------------------

--
-- Structure de la table `picture_room_category`
--

CREATE TABLE `picture_room_category` (
  `id_picture_room_category` int(100) NOT NULL,
  `id_room_category` int(100) NOT NULL,
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `picture_room_category`
--

INSERT INTO `picture_room_category` (`id_picture_room_category`, `id_room_category`, `path`) VALUES
(4, 1, 'img/PictureRoomCategory/1/room.png'),
(6, 2, 'img/PictureRoomCategory/2/room.png'),
(9, 3, 'img/PictureRoomCategory/3/room.png'),
(10, 4, 'img/PictureRoomCategory/4/room.png');

-- --------------------------------------------------------

--
-- Structure de la table `restaurant_table`
--

CREATE TABLE `restaurant_table` (
  `id_restaurant_table` int(100) NOT NULL,
  `number` varchar(255) NOT NULL,
  `number_chairs` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `restaurant_table`
--

INSERT INTO `restaurant_table` (`id_restaurant_table`, `number`, `number_chairs`) VALUES
(1, '1', 4),
(2, '2', 4),
(3, '10', 4),
(5, '11', 4),
(6, '9', 3);

-- --------------------------------------------------------

--
-- Structure de la table `restaurant_table_booking`
--

CREATE TABLE `restaurant_table_booking` (
  `id_restaurant_table_booking` int(100) NOT NULL,
  `booking_date` datetime NOT NULL,
  `date` datetime NOT NULL,
  `number` int(10) NOT NULL,
  `id_client` int(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

CREATE TABLE `room` (
  `id_room` int(100) NOT NULL,
  `number` varchar(25) NOT NULL,
  `id_room_category` int(100) NOT NULL,
  `id_building` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `room`
--

INSERT INTO `room` (`id_room`, `number`, `id_room_category`, `id_building`) VALUES
(144, '1', 1, 1),
(145, '2', 1, 1),
(146, '3', 1, 1),
(147, '4', 1, 1),
(148, '5', 1, 1),
(149, '6', 1, 1),
(150, '7', 1, 1),
(151, '8', 1, 1),
(153, '1', 1, 2),
(154, '2', 1, 2),
(155, '3', 1, 2),
(156, '4', 1, 2),
(157, '5', 1, 2),
(158, '6', 1, 2),
(159, '7', 1, 2),
(160, '8', 1, 2),
(161, '9', 2, 1),
(162, '10', 2, 1),
(163, '11', 2, 1),
(164, '12', 2, 1),
(165, '9', 2, 2),
(166, '10', 2, 2),
(167, '11', 2, 2),
(168, '12', 2, 2),
(169, '13', 3, 1),
(170, '14', 3, 1),
(171, '13', 3, 2),
(172, '14', 3, 2),
(173, '1', 4, 3),
(174, '2', 4, 3),
(175, '3', 4, 3),
(176, '4', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `room_booking`
--

CREATE TABLE `room_booking` (
  `id_room_booking` int(100) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `date_book` datetime NOT NULL,
  `id_client` int(100) NOT NULL,
  `id_room` int(100) NOT NULL,
  `id_room_category` int(100) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `ref_room_book` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `room_booking`
--

INSERT INTO `room_booking` (`id_room_booking`, `date_start`, `date_end`, `date_book`, `id_client`, `id_room`, `id_room_category`, `reason`, `status`, `ref_room_book`) VALUES
(1013, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:18:12', 13, 144, 1, '0', 'inactive', 'room_booking_13_0'),
(1014, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:18:12', 13, 173, 4, '0', 'inactive', 'room_booking_13_0'),
(1015, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:18:52', 13, 145, 1, '0', 'inactive', 'room_booking_13_1'),
(1016, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:18:52', 13, 174, 4, '0', 'inactive', 'room_booking_13_1'),
(1017, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:19:43', 13, 146, 1, '0', 'inactive', 'room_booking_13_2'),
(1018, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:19:43', 13, 161, 2, '0', 'inactive', 'room_booking_13_2'),
(1019, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:20:53', 13, 147, 1, '0', 'inactive', 'room_booking_13_3'),
(1020, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:20:53', 13, 175, 4, '0', 'inactive', 'room_booking_13_3'),
(1021, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:22:22', 13, 148, 1, '0', 'inactive', 'room_booking_13_4'),
(1022, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:22:22', 13, 176, 4, '0', 'inactive', 'room_booking_13_4'),
(1023, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:24:04', 13, 149, 1, '0', 'inactive', 'room_booking_13_5'),
(1024, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:24:04', 13, 169, 3, '0', 'inactive', 'room_booking_13_5'),
(1025, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:26:20', 13, 150, 1, '0', 'inactive', 'room_booking_13_6'),
(1026, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:26:20', 13, 151, 1, '0', 'inactive', 'room_booking_13_6'),
(1027, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:26:20', 13, 170, 3, '0', 'inactive', 'room_booking_13_6'),
(1028, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:31:02', 13, 153, 1, '0', 'inactive', 'room_booking_13_7'),
(1029, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:31:24', 13, 154, 1, '0', 'inactive', 'room_booking_13_8'),
(1030, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:32:27', 13, 155, 1, '0', 'inactive', 'room_booking_13_9'),
(1031, '2017-09-29 02:00:00', '2017-09-30 02:00:00', '2017-09-27 15:33:10', 13, 156, 1, '0', 'inactive', 'room_booking_13_10');

-- --------------------------------------------------------

--
-- Structure de la table `room_booking_services`
--

CREATE TABLE `room_booking_services` (
  `id_room_booking_services` int(100) NOT NULL,
  `id_room_booking` int(100) NOT NULL,
  `id_room_service` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `room_category`
--

CREATE TABLE `room_category` (
  `id_room_category` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(100,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `room_category`
--

INSERT INTO `room_category` (`id_room_category`, `name`, `price`) VALUES
(1, 'Chambre Simple', 60000.0000),
(2, 'Chambre Double', 120000.0000),
(3, 'Suite Junior', 150000.0000),
(4, 'Suite executive', 200000.0000);

-- --------------------------------------------------------

--
-- Structure de la table `room_service`
--

CREATE TABLE `room_service` (
  `id_room_service` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(100,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `room_service`
--

INSERT INTO `room_service` (`id_room_service`, `name`, `price`) VALUES
(1, 'Petit déjeuné', 5000.0000),
(2, 'Petit déjeuné', 5000.0000),
(3, 'Petit déjeuné', 5000.0000);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id_article`);

--
-- Index pour la table `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`id_building`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD UNIQUE KEY `UK_bfgjs3fem0hmjhvih80158x29` (`email`);

--
-- Index pour la table `festive_room`
--
ALTER TABLE `festive_room`
  ADD PRIMARY KEY (`id_festive_room`);

--
-- Index pour la table `festive_room_booking`
--
ALTER TABLE `festive_room_booking`
  ADD PRIMARY KEY (`id_festive_room_booking`),
  ADD KEY `FK_FestiveRoomBookingIdFestiveRoom` (`id_festive_room`),
  ADD KEY `FK_FestiveRoomBookingIdClient` (`id_client`);

--
-- Index pour la table `festive_room_booking_services`
--
ALTER TABLE `festive_room_booking_services`
  ADD PRIMARY KEY (`id_festive_room_booking_services`),
  ADD KEY `FK_FrbsFestiveRoomBooking` (`id_festive_room_booking`),
  ADD KEY `FK_FrbsService` (`id_festive_room_service`);

--
-- Index pour la table `festive_room_service`
--
ALTER TABLE `festive_room_service`
  ADD PRIMARY KEY (`id_festive_room_service`);

--
-- Index pour la table `invalid_booking_date_festive_room`
--
ALTER TABLE `invalid_booking_date_festive_room`
  ADD PRIMARY KEY (`id_invalid_booking_date_festive_room`),
  ADD KEY `FK_InvalidBookingDateFestiveRoomFestiveRoom` (`id_festive_room`);

--
-- Index pour la table `invalid_booking_date_room`
--
ALTER TABLE `invalid_booking_date_room`
  ADD PRIMARY KEY (`id_invalid_booking_date_room`),
  ADD KEY `FK_InvalidBookingDateRoomRoom` (`id_room`);

--
-- Index pour la table `news_letter`
--
ALTER TABLE `news_letter`
  ADD PRIMARY KEY (`id_news_letter`);

--
-- Index pour la table `picture_galery`
--
ALTER TABLE `picture_galery`
  ADD PRIMARY KEY (`id_picture_galery`);

--
-- Index pour la table `picture_room_category`
--
ALTER TABLE `picture_room_category`
  ADD PRIMARY KEY (`id_picture_room_category`),
  ADD KEY `FK_PRCidRoomCategory` (`id_room_category`);

--
-- Index pour la table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  ADD PRIMARY KEY (`id_restaurant_table`);

--
-- Index pour la table `restaurant_table_booking`
--
ALTER TABLE `restaurant_table_booking`
  ADD PRIMARY KEY (`id_restaurant_table_booking`),
  ADD KEY `FK_RestaurantTableBookingClient` (`id_client`);

--
-- Index pour la table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id_room`),
  ADD KEY `FK_RoomBuilding` (`id_building`),
  ADD KEY `FK_RoomCategory` (`id_room_category`);

--
-- Index pour la table `room_booking`
--
ALTER TABLE `room_booking`
  ADD PRIMARY KEY (`id_room_booking`);

--
-- Index pour la table `room_booking_services`
--
ALTER TABLE `room_booking_services`
  ADD PRIMARY KEY (`id_room_booking_services`),
  ADD KEY `FK_RoomBookingServicesRoomBooking` (`id_room_booking`),
  ADD KEY `FK_RoomBookingServicesService` (`id_room_service`);

--
-- Index pour la table `room_category`
--
ALTER TABLE `room_category`
  ADD PRIMARY KEY (`id_room_category`);

--
-- Index pour la table `room_service`
--
ALTER TABLE `room_service`
  ADD PRIMARY KEY (`id_room_service`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id_article` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `building`
--
ALTER TABLE `building`
  MODIFY `id_building` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `festive_room`
--
ALTER TABLE `festive_room`
  MODIFY `id_festive_room` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `festive_room_booking`
--
ALTER TABLE `festive_room_booking`
  MODIFY `id_festive_room_booking` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `festive_room_booking_services`
--
ALTER TABLE `festive_room_booking_services`
  MODIFY `id_festive_room_booking_services` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `festive_room_service`
--
ALTER TABLE `festive_room_service`
  MODIFY `id_festive_room_service` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `invalid_booking_date_festive_room`
--
ALTER TABLE `invalid_booking_date_festive_room`
  MODIFY `id_invalid_booking_date_festive_room` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `invalid_booking_date_room`
--
ALTER TABLE `invalid_booking_date_room`
  MODIFY `id_invalid_booking_date_room` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `news_letter`
--
ALTER TABLE `news_letter`
  MODIFY `id_news_letter` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `picture_galery`
--
ALTER TABLE `picture_galery`
  MODIFY `id_picture_galery` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT pour la table `picture_room_category`
--
ALTER TABLE `picture_room_category`
  MODIFY `id_picture_room_category` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  MODIFY `id_restaurant_table` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `restaurant_table_booking`
--
ALTER TABLE `restaurant_table_booking`
  MODIFY `id_restaurant_table_booking` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `room`
--
ALTER TABLE `room`
  MODIFY `id_room` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;
--
-- AUTO_INCREMENT pour la table `room_booking`
--
ALTER TABLE `room_booking`
  MODIFY `id_room_booking` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1032;
--
-- AUTO_INCREMENT pour la table `room_booking_services`
--
ALTER TABLE `room_booking_services`
  MODIFY `id_room_booking_services` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `room_category`
--
ALTER TABLE `room_category`
  MODIFY `id_room_category` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `room_service`
--
ALTER TABLE `room_service`
  MODIFY `id_room_service` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `festive_room_booking`
--
ALTER TABLE `festive_room_booking`
  ADD CONSTRAINT `FK_FestiveRoomBookingIdClient` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_FestiveRoomBookingIdFestiveRoom` FOREIGN KEY (`id_festive_room`) REFERENCES `festive_room` (`id_festive_room`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `festive_room_booking_services`
--
ALTER TABLE `festive_room_booking_services`
  ADD CONSTRAINT `FK_FrbsFestiveRoomBooking` FOREIGN KEY (`id_festive_room_booking`) REFERENCES `festive_room_booking` (`id_festive_room_booking`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_FrbsService` FOREIGN KEY (`id_festive_room_service`) REFERENCES `festive_room_service` (`id_festive_room_service`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `invalid_booking_date_festive_room`
--
ALTER TABLE `invalid_booking_date_festive_room`
  ADD CONSTRAINT `FK_InvalidBookingDateFestiveRoomFestiveRoom` FOREIGN KEY (`id_festive_room`) REFERENCES `festive_room` (`id_festive_room`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `invalid_booking_date_room`
--
ALTER TABLE `invalid_booking_date_room`
  ADD CONSTRAINT `FK_InvalidBookingDateRoomRoom` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `picture_room_category`
--
ALTER TABLE `picture_room_category`
  ADD CONSTRAINT `FK_PRCidRoomCategory` FOREIGN KEY (`id_room_category`) REFERENCES `room_category` (`id_room_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `restaurant_table_booking`
--
ALTER TABLE `restaurant_table_booking`
  ADD CONSTRAINT `FK_RestaurantTableBookingClient` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FK_RoomBuilding` FOREIGN KEY (`id_building`) REFERENCES `building` (`id_building`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RoomCategory` FOREIGN KEY (`id_room_category`) REFERENCES `room_category` (`id_room_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `room_booking_services`
--
ALTER TABLE `room_booking_services`
  ADD CONSTRAINT `FK_RoomBookingServicesRoomBooking` FOREIGN KEY (`id_room_booking`) REFERENCES `room_booking` (`id_room_booking`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RoomBookingServicesService` FOREIGN KEY (`id_room_service`) REFERENCES `room_service` (`id_room_service`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
