-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 26, 2025 at 09:58 AM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `lotteries`
--

CREATE TABLE `lotteries` (
  `id` int NOT NULL,
  `lottery_number` int NOT NULL,
  `reward_number` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lotteries`
--

INSERT INTO `lotteries` (`id`, `lottery_number`, `reward_number`, `createdAt`, `updatedAt`) VALUES
(220, 865535, 2, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(221, 905625, 3, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(222, 931519, 4, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(223, 940721, 5, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(224, 909047, 6, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(225, 723074, 7, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(226, 788230, 8, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(227, 771928, 9, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(228, 494952, 10, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(229, 958977, 11, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(230, 510027, 12, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(231, 473206, 13, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(232, 735950, 14, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(233, 360134, 15, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(234, 392819, 16, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(235, 783692, 17, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(236, 840006, 18, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(237, 848955, 19, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(238, 724756, 20, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(239, 976918, 21, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(240, 810321, 22, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(241, 120852, 23, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(242, 773298, 24, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(243, 703934, 25, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(244, 199775, 26, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(245, 587075, 27, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(246, 436052, 28, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(247, 319033, 29, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(248, 187010, 30, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(249, 777950, 31, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(250, 528722, 32, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(251, 209760, 33, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(252, 262635, 34, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(253, 583895, 35, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(254, 231569, 36, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(255, 206161, 37, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(256, 236099, 38, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(257, 462014, 39, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(258, 601774, 40, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(259, 622827, 41, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(260, 308813, 42, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(261, 475587, 43, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(262, 451493, 44, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(263, 730707, 45, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(264, 399054, 46, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(265, 603151, 47, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(266, 818595, 48, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(267, 383523, 49, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(268, 261831, 50, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(269, 958585, 51, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(270, 307432, 52, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(271, 361406, 53, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(272, 784735, 54, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(273, 939458, 55, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(274, 443087, 56, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(275, 197058, 57, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(276, 456033, 58, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(277, 688991, 59, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(278, 176854, 60, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(279, 517300, 61, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(280, 155937, 62, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(281, 927786, 63, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(282, 471119, 64, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(283, 372237, 65, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(284, 347830, 66, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(285, 522441, 67, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(286, 568714, 68, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(287, 276248, 69, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(288, 475096, 70, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(289, 546740, 71, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(290, 308412, 72, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(291, 701838, 73, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(292, 683956, 74, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(293, 314265, 75, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(294, 319457, 76, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(295, 554491, 77, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(296, 814083, 78, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(297, 506945, 79, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(298, 892475, 80, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(299, 141539, 81, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(300, 630272, 82, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(301, 826745, 83, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(302, 342909, 84, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(303, 934310, 85, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(304, 842824, 86, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(305, 411192, 87, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(306, 327486, 88, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(307, 303856, 89, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(308, 436821, 90, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(309, 272539, 91, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(310, 852232, 92, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(311, 643544, 93, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(312, 561026, 94, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(313, 774496, 95, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(314, 289403, 96, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(315, 823529, 97, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(316, 449437, 98, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(317, 576597, 99, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(318, 534673, 100, '2025-01-26 04:33:35', '2025-01-26 04:33:35'),
(323, 199725, 1, '2025-01-26 06:35:15', '2025-01-26 06:35:15');

-- --------------------------------------------------------

--
-- Table structure for table `lottery`
--

CREATE TABLE `lottery` (
  `id` int NOT NULL,
  `lottery_number` varchar(20) NOT NULL,
  `reward_number` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lotteries`
--
ALTER TABLE `lotteries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lottery`
--
ALTER TABLE `lottery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lotteries`
--
ALTER TABLE `lotteries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- AUTO_INCREMENT for table `lottery`
--
ALTER TABLE `lottery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
