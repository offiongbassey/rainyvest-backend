-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2023 at 10:32 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rainyvest`
--

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(15) NOT NULL,
  `name` varchar(500) NOT NULL,
  `code` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL DEFAULT 'Active',
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `name`, `code`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Access Bank', '044', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(2, 'Access Bank (Diamond)', '063', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(3, 'Ecobank Nigeria', '050', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(4, 'Ekondo Microfinance Bank', '098', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(5, 'Fairmoney Microfinance Bank', '51318', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(6, 'Fidelity Bank', '070', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(7, 'First Bank of Nigeria', '011', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(8, 'First City Monument Bank', '214', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(9, 'Guaranty Trust Bank', '058', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(10, 'Heritage Bank', '030', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(11, 'Keystone Bank', '082', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(12, 'Kuda Bank', '50211', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(13, 'Moniepoint MFB', '50515', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(14, 'PalmPay', '999991', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(15, 'Parallex Bank', '104', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(16, 'Polaris Bank', '076', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(17, 'Providus Bank', '101', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(18, 'Stanbic IBTC Bank', '221', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(19, 'Standard Chartered Bank', '068', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(20, 'Sterling Bank', '232', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(21, 'Union Bank of Nigeria', '032', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(22, 'United Bank For Africa', '033', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(23, 'Unity Bank', '215', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(24, 'Wema Bank', '035', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264'),
(25, 'Zenith Bank', '057', 'Active', '2023-07-01 13:52:16.274264', '2023-07-01 13:52:16.274264');

-- --------------------------------------------------------

--
-- Table structure for table `dailyprices`
--

CREATE TABLE `dailyprices` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dailyprices`
--

INSERT INTO `dailyprices` (`id`, `price`, `createdAt`, `updatedAt`, `productId`, `userId`) VALUES
(1, 12000, '2023-06-27 09:20:05', '2023-06-27 09:20:05', 20, 18),
(2, 11000, '2023-06-27 09:28:18', '2023-06-27 09:28:18', 17, 18),
(3, 14000, '2023-06-27 10:10:21', '2023-06-27 10:10:21', 20, 18),
(4, 15500, '2023-06-27 10:10:32', '2023-06-27 10:10:32', 20, 18),
(5, 11000, '2023-06-27 13:39:00', '2023-06-27 13:39:00', 15, 18),
(6, 13000, '2023-06-27 13:39:15', '2023-06-27 13:39:15', 15, 18),
(7, 12500, '2023-06-27 13:39:29', '2023-06-27 13:39:29', 15, 18),
(8, 12300, '2023-06-27 13:39:44', '2023-06-27 13:39:44', 15, 18),
(9, 13600, '2023-06-27 23:41:24', '2023-06-27 23:41:24', 20, 18),
(10, 17000, '2023-06-27 23:54:23', '2023-06-27 23:54:23', 20, 18),
(11, 18900, '2023-06-28 00:04:46', '2023-06-28 00:04:46', 20, 18),
(12, 20500, '2023-06-28 10:29:25', '2023-06-28 10:29:25', 20, 18),
(13, 15000, '2023-06-28 11:22:55', '2023-06-28 11:22:55', 15, 18),
(14, 10000, '2023-06-28 11:55:03', '2023-06-28 11:55:03', 17, 18),
(15, 11500, '2023-06-28 12:00:20', '2023-06-28 12:00:20', 17, 18),
(16, 13000, '2023-06-28 12:01:28', '2023-06-28 12:01:28', 17, 18),
(17, 25000, '2023-06-28 12:44:16', '2023-06-28 12:44:16', 20, 18),
(18, 28000, '2023-06-28 12:55:24', '2023-06-28 12:55:24', 20, 18),
(19, 15200, '2023-06-28 12:55:36', '2023-06-28 12:55:36', 17, 18),
(20, 16000, '2023-06-28 12:55:46', '2023-06-28 12:55:46', 16, 18),
(21, 17300, '2023-06-28 12:56:01', '2023-06-28 12:56:01', 15, 18),
(22, 12000, '2023-06-28 12:56:21', '2023-06-28 12:56:21', 14, 18),
(23, 3000, '2023-06-29 10:17:08', '2023-06-29 10:17:08', 20, 18);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `productCode` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `dailypriceId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `quantity`, `description`, `status`, `url`, `productCode`, `createdAt`, `updatedAt`, `userId`, `dailypriceId`) VALUES
(14, 'Palm Oil Grade 1', 'https://res.cloudinary.com/dfhabqprq/image/upload/v1687787149/rainyvest/kdwkqj9jngftnvtu7yv8.jpg', 12000, 100, 'Palm Oil Grade 1 is an Agric Product with a huge profit margin.', 'Active', 'palm-oil-grade-1', '189762972897', '2023-06-26 13:45:49', '2023-06-28 12:56:21', 18, NULL),
(15, 'Palm Oil Grade 2', 'https://res.cloudinary.com/dfhabqprq/image/upload/v1687787251/rainyvest/odx4oevxa7qxb1px1qax.jpg', 17300, 200, 'Palm Oil Grade 2 is an Agric Product with a huge profit margin. Buy and and store.', 'Active', 'palm-oil-grade-2', '189762988965', '2023-06-26 13:47:32', '2023-06-28 12:56:00', 18, NULL),
(16, 'Palm Oil Grade 3', 'https://res.cloudinary.com/dfhabqprq/image/upload/v1687787291/rainyvest/zxhukvrrapnhhfk6dt1l.jpg', 16000, 200, 'Palm Oil Grade 3 is an Agric Product with a huge profit margin.', 'Inactive', 'palm-oil-grade-3', '189762970100', '2023-06-26 13:48:11', '2023-06-28 12:55:46', 18, NULL),
(17, 'Palm Oil Grade 4a', 'https://res.cloudinary.com/dfhabqprq/image/upload/v1687858107/rainyvest/ornmgoxop4ze3wtzshvd.jpg', 15200, 150, 'Palm Oil Grade 4 is an Agric Product with a huge profit margin.', 'Active', 'palm-oil-grade-4', '189763209511', '2023-06-26 13:48:48', '2023-06-28 12:55:35', 18, NULL),
(20, 'Palm Oil Grade 8', 'https://res.cloudinary.com/dfhabqprq/image/upload/v1687857605/rainyvest/f0kkm4pgtiuittdmv2sf.jpg', 3000, 200, 'This is a very good product', 'Active', 'palm-oil-grade-6', '189763395458', '2023-06-26 15:48:57', '2023-06-29 10:17:08', 18, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `currentMarketPrice` int(25) NOT NULL,
  `soldPrice` int(11) NOT NULL,
  `profit` int(11) NOT NULL,
  `charges` int(11) NOT NULL,
  `lastProfit` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `stockCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `price`, `quantity`, `total`, `currentMarketPrice`, `soldPrice`, `profit`, `charges`, `lastProfit`, `status`, `url`, `stockCode`, `createdAt`, `updatedAt`, `productId`, `userId`) VALUES
(3, 11000, 3, 33000, 0, 0, 0, 0, 0, 'Pending', NULL, '27282969838', '2023-06-28 00:17:35', '2023-06-28 00:17:35', 17, 31),
(4, 18900, 4, 75600, 0, 0, 0, 0, 0, 'Pending', NULL, '27283034061', '2023-06-28 00:33:34', '2023-06-28 00:33:34', 20, 31),
(5, 11000, 3, 33000, 0, 0, 0, 0, 0, 'Pending', NULL, '27283308685', '2023-06-28 00:34:48', '2023-06-28 00:34:48', 17, 31),
(6, 18900, 3, 56700, 0, 0, 0, 0, 0, 'Pending', NULL, '27283584394', '2023-06-28 00:35:51', '2023-06-28 00:35:51', 20, 31),
(7, 18900, 3, 56700, 0, 0, 0, 0, 0, 'Pending', NULL, '27283053570', '2023-06-28 00:36:26', '2023-06-28 00:36:26', 20, 31),
(8, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Pending', NULL, '27283204547', '2023-06-28 00:38:31', '2023-06-28 00:38:31', 20, 31),
(9, 11000, 2, 22000, 0, 0, 0, 0, 0, 'Pending', NULL, '27283038835', '2023-06-28 00:38:45', '2023-06-28 00:38:45', 17, 31),
(10, 12300, 2, 24600, 0, 0, 0, 0, 0, 'Pending', NULL, '27282973418', '2023-06-28 00:38:58', '2023-06-28 00:38:58', 15, 31),
(11, 12300, 2, 24600, 0, 0, 0, 0, 0, 'Pending', NULL, '27283362566', '2023-06-28 00:40:19', '2023-06-28 00:40:19', 15, 31),
(12, 12300, 3, 36900, 0, 0, 0, 0, 0, 'Pending', NULL, '27283342971', '2023-06-28 00:40:43', '2023-06-28 00:40:43', 15, 31),
(13, 18900, 9, 170100, 0, 0, 0, 0, 0, 'Pending', NULL, '27283709472', '2023-06-28 00:41:29', '2023-06-28 00:41:29', 20, 31),
(14, 11000, 2, 22000, 0, 0, 0, 0, 0, 'Pending', NULL, '27283724150', '2023-06-28 00:41:59', '2023-06-28 00:41:59', 17, 31),
(15, 12300, 2, 24600, 0, 0, 0, 0, 0, 'Pending', NULL, '10634701', '2023-06-28 00:43:52', '2023-06-28 00:43:52', 15, 31),
(16, 11000, 2, 22000, 0, 0, 0, 0, 0, 'Pending', NULL, '10342711', '2023-06-28 00:44:00', '2023-06-28 00:44:00', 17, 31),
(17, 9000, 6, 54000, 0, 0, 0, 0, 0, 'Pending', NULL, '10134386', '2023-06-28 00:44:22', '2023-06-28 00:44:22', 14, 31),
(18, 11000, 3, 33000, 0, 0, 0, 0, 0, 'Pending', NULL, '167542562628', '2023-06-28 00:45:31', '2023-06-28 00:45:31', 17, 31),
(19, 18900, 3, 56700, 0, 0, 0, 0, 0, 'Pending', NULL, '167543026160', '2023-06-28 00:45:39', '2023-06-28 00:45:39', 20, 31),
(20, 12300, 4, 49200, 0, 0, 0, 0, 0, 'Pending', NULL, '167542595556', '2023-06-28 00:45:51', '2023-06-28 00:45:51', 15, 31),
(21, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Pending', NULL, '1.90999096754241e18', '2023-06-28 00:46:38', '2023-06-28 00:46:38', 20, 31),
(22, 11000, 9, 99000, 0, 0, 0, 0, 0, 'Pending', NULL, '1967542568864', '2023-06-28 00:46:53', '2023-06-28 00:46:53', 17, 31),
(23, 18900, 4, 75600, 0, 0, 0, 0, 0, 'Pending', NULL, '1967542845034', '2023-06-28 00:57:11', '2023-06-28 00:57:11', 20, 31),
(24, 18900, 3, 56700, 0, 0, 0, 0, 0, 'Pending', NULL, '1967543054106', '2023-06-28 01:29:51', '2023-06-28 01:29:51', 20, 31),
(25, 12300, 3, 36900, 0, 0, 0, 0, 0, 'Active', NULL, '1967542281208', '2023-06-28 01:49:09', '2023-06-28 07:13:08', 15, 31),
(26, 18900, 3, 56700, 0, 0, 0, 0, 0, 'Active', NULL, '1967542787039', '2023-06-28 06:16:55', '2023-06-28 07:13:43', 20, 31),
(27, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Pending', NULL, '1967542769509', '2023-06-28 07:18:20', '2023-06-28 07:18:20', 20, 31),
(28, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Pending', NULL, '1967542290400', '2023-06-28 07:20:21', '2023-06-28 07:20:21', 20, 31),
(29, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Active', NULL, '1967542407308', '2023-06-28 07:23:07', '2023-06-28 10:08:16', 20, 31),
(30, 18900, 2, 37800, 0, 0, 0, 0, 0, 'Active', NULL, '1967542823250', '2023-06-28 08:40:14', '2023-06-28 08:40:32', 20, 31),
(31, 18900, 2, 37800, 20500, 41000, 3200, 0, 41000, 'Sold', NULL, '1967543056265', '2023-06-28 08:42:30', '2023-06-28 11:17:27', 20, 31),
(32, 12300, 2, 24600, 17300, 34600, 10000, 0, 34600, 'Sold', NULL, '1967542935997', '2023-06-28 09:21:03', '2023-06-28 12:58:02', 15, 31),
(33, 20500, 9, 184500, 20500, 184500, 0, 0, 184500, 'Sold', NULL, '1967542526722', '2023-06-28 10:43:21', '2023-06-28 11:08:56', 20, 31),
(34, 12300, 5, 61500, 15000, 75000, 13500, 0, 75000, 'Sold', NULL, '1967543010282', '2023-06-28 11:22:20', '2023-06-28 11:52:21', 15, 31),
(35, 11000, 2, 22000, 13000, 26000, 4000, 0, 26000, 'Sold', NULL, '1967542653244', '2023-06-28 11:54:02', '2023-06-28 12:02:10', 17, 31),
(36, 20500, 5, 102500, 25000, 125000, 22500, 0, 125000, 'Sold', NULL, '1967542240324', '2023-06-28 12:43:35', '2023-06-28 12:44:29', 20, 31),
(37, 13000, 5, 65000, 15200, 76000, 11000, 0, 76000, 'Sold', NULL, '1967542615143', '2023-06-28 12:53:48', '2023-06-28 12:57:27', 17, 31),
(38, 9000, 10, 90000, 12000, 120000, 30000, 0, 120000, 'Sold', NULL, '1967542397353', '2023-06-28 12:54:24', '2023-06-28 12:57:52', 14, 31),
(39, 25000, 20, 500000, 28000, 560000, 60000, 0, 560000, 'Sold', NULL, '1967542318489', '2023-06-28 12:54:52', '2023-06-28 12:56:35', 20, 31),
(40, 12000, 10, 120000, 0, 0, 0, 0, 0, 'Active', NULL, '1967542909162', '2023-06-29 10:06:50', '2023-06-29 10:07:07', 14, 31),
(41, 3000, 20, 60000, 0, 0, 0, 0, 0, 'Active', NULL, '1967542943405', '2023-06-29 10:17:34', '2023-06-29 10:17:49', 20, 31),
(42, 3000, 3, 9000, 0, 0, 0, 0, 0, 'Active', NULL, '1967542276466', '2023-06-30 18:28:49', '2023-06-30 18:29:21', 20, 31),
(43, 3000, 4, 12000, 0, 0, 0, 0, 0, 'Active', NULL, '1967542543097', '2023-07-01 07:04:44', '2023-07-01 07:05:07', 20, 31),
(44, 3000, 2, 6000, 3000, 6000, 0, 0, 6000, 'Sold', NULL, '1967542819782', '2023-07-01 18:45:19', '2023-07-01 18:46:58', 20, 37),
(45, 3000, 2, 6000, 3000, 6000, 0, 0, 6000, 'Sold', NULL, '1967542461465', '2023-07-01 18:46:04', '2023-07-01 19:02:03', 20, 37),
(46, 15200, 4, 60800, 15200, 60800, 0, 0, 60800, 'Sold', NULL, '1967542313933', '2023-07-01 18:58:35', '2023-07-01 19:02:00', 17, 37),
(47, 17300, 5, 86500, 0, 0, 0, 0, 0, 'Active', NULL, '1967542671093', '2023-07-01 19:02:58', '2023-07-01 19:03:07', 15, 31);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `transactionCode` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `transactionCode`, `amount`, `type`, `description`, `status`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '1967542240324', 102500, 'Debit', 'Purchase of Stock: 1967542240324', 'Successful', '2023-06-28 12:43:57', '2023-06-28 12:43:57', 31),
(2, '1967542615143', 65000, 'Debit', 'Purchase of Stock: 1967542615143', 'Successful', '2023-06-28 12:53:58', '2023-06-28 12:53:58', 31),
(3, '1967542318489', 500000, 'Debit', 'Purchase of Stock: 1967542318489', 'Successful', '2023-06-28 12:54:59', '2023-06-28 12:54:59', 31),
(4, '1967542397353', 90000, 'Debit', 'Purchase of Stock: 1967542397353', 'Successful', '2023-06-28 12:57:47', '2023-06-28 12:57:47', 31),
(5, '1967542909162', 120000, 'Debit', 'Purchase of Stock: 1967542909162', 'Successful', '2023-06-29 10:07:07', '2023-06-29 10:07:07', 31),
(6, '1967542943405', 60000, 'Debit', 'Purchase of Stock: 1967542943405', 'Successful', '2023-06-29 10:17:50', '2023-06-29 10:17:50', 31),
(7, '1967542276466', 9000, 'Debit', 'Purchase of Stock: 1967542276466', 'Successful', '2023-06-30 18:29:21', '2023-06-30 18:29:21', 31),
(8, '1967542543097', 12000, 'Debit', 'Purchase of Stock: 1967542543097', 'Successful', '2023-07-01 07:05:07', '2023-07-01 07:05:07', 31),
(9, '2705674690958', 1, 'Credit', 'Withdraw', 'Successful', '2023-07-01 16:50:30', '2023-07-01 16:50:30', 31),
(10, '8359950445199', 2, 'Credit', 'Withdraw', 'Successful', '2023-07-01 16:51:49', '2023-07-01 16:51:49', 31),
(11, '5001991412394', 1, 'Credit', 'Withdraw', 'Successful', '2023-07-01 16:52:12', '2023-07-01 16:52:12', 31),
(12, '1967542819782', 6000, 'Debit', 'Purchase of Stock: 1967542819782', 'Successful', '2023-07-01 18:45:40', '2023-07-01 18:45:40', 37),
(13, '6555914279015', 1, 'Credit', 'Withdraw', 'Successful', '2023-07-01 18:48:40', '2023-07-01 18:48:40', 37),
(14, '1967542313933', 60800, 'Debit', 'Purchase of Stock: 1967542313933', 'Successful', '2023-07-01 18:59:51', '2023-07-01 18:59:51', 37),
(15, '1967542461465', 6000, 'Debit', 'Purchase of Stock: 1967542461465', 'Successful', '2023-07-01 19:01:54', '2023-07-01 19:01:54', 37),
(16, '1967542671093', 86500, 'Debit', 'Purchase of Stock: 1967542671093', 'Successful', '2023-07-01 19:03:07', '2023-07-01 19:03:07', 31);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `tokenStatus` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `pinToken` varchar(255) DEFAULT NULL,
  `balance` int(11) DEFAULT 0,
  `pin` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(25) NOT NULL,
  `accountName` varchar(500) NOT NULL,
  `bank` varchar(500) NOT NULL,
  `bankId` int(25) NOT NULL,
  `bankStatus` varchar(500) NOT NULL,
  `bankRecipientCode` varchar(500) NOT NULL,
  `bankCode` varchar(500) NOT NULL,
  `googleId` varchar(500) NOT NULL,
  `accountType` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `photo`, `phone`, `status`, `role`, `token`, `tokenStatus`, `resetToken`, `pinToken`, `balance`, `pin`, `accountNumber`, `accountName`, `bank`, `bankId`, `bankStatus`, `bankRecipientCode`, `bankCode`, `googleId`, `accountType`, `createdAt`, `updatedAt`) VALUES
(17, 'Uwem', 'Effiom', 'daniel@gmail.comua', '$2b$10$f//mZL3rMMx.oIYAbKp1keg2/Rcylyn7hDf/bFnOgF57sqm9nFqSe', '', '08096097539', 'Inactive', 'User', 'b92da573f25ed41ab27bcd901f44f1d9f22af09ad0dad8f45dd92d5f0bab9edd', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 10:35:12', '2023-06-19 10:35:12'),
(18, 'John', 'Moses', 'john@gmail.com', '$2b$10$ux67B43FkDgrh/bzICJJnedSWkzQj9/W8FyE8OpszkUimvKW8xM/m', '', '080808080', 'Inactive', 'Admin', 'd3a42a878caa044075174e716aa8a99c16126acc20598b934a33da06b5e49470', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 11:07:04', '2023-06-19 11:07:04'),
(19, 'Jude', 'Moses', 'jude@gmail.com', '$2b$10$Pn8vn3upWFtx/MMvE8ta8ujXy2nx2SOUOHjBpLUtt9cBrPlY7U0uu', '', '080808080', 'Active', 'User', 'd729c099fd42691e11b4b322a7a4665b977da011eff2a820a41bde37dfbda307', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 11:57:34', '2023-06-19 12:03:17'),
(20, 'Jude', 'Moses', 'otu@gmail.com', '$2b$10$4VMmpcWpkyofNNK/skuCs.N1hzEnE0OdtURj/ZzlF5OVeQefTMw6W', '', '080808080', 'Active', 'User', 'ca8a2922168ec3a3180745d1fc659eb0c9639c44b1c5ab4a9d65207d62369bdd', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 12:06:21', '2023-06-19 12:07:06'),
(21, 'Offiong', 'Edet', 'offiong@gmail.com', '$2b$10$k3bE5i/C2ddjDtV84FtL1u40z6.UxKgy5q9G/eHO9pS5o2WhPmiEi', '', '12345', 'Inactive', 'User', '9ed41dd24792405493f33f017babf4e2f2dcf227b23d31de2a74c6b55af5f915', '', 'fdf0d80ca4c7ecd1308d259d3fbeb3837c9f24ba465c98d2359b86228803d166', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 12:12:30', '2023-06-19 14:57:15'),
(22, 'Offiong', 'Edet', 'donald@gmail.com', '$2b$10$PelRWf9SQR56Sd1s7fD3DO2ZUkfUgfjpLNHEPRlnyRmywmGL/94Ha', '', '08078786868', 'Active', 'User', '00cd0212b0d0ba7a03a215228a7e70f0f9fd9bdf5c94100f9dc7aa717a530b14', '', '', '', 30000, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 12:13:45', '2023-06-20 12:28:04'),
(23, 'Offiong', 'Edet', 'donald3@gmail.com', '$2b$10$JRlHFfFCSXp4ArspJia53.ChIRecQl88LwkeZK0op1T5G.ZY5L9iS', '', '12345', 'Inactive', 'User', '05a007c3c7dc7544208c080461a8b1b3ec38d0e8a1fd2f7be9a9b4bb4b7a3c0c', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 12:14:05', '2023-06-19 12:14:05'),
(24, 'Offiong', 'Edet', 'donald5@gmail.com', '$2b$10$HtcnkY0aU/JTxdq8x37nMOVQZHyb1bxvHOVur6nT1aOv7MplhtUZa', '', '12345', 'Inactive', 'User', '260a49b1eacee37a275dd6b04f667b09af009b36b5c80f7e3c2e66efb056fb0a', '', '', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 12:14:16', '2023-06-19 12:14:16'),
(29, 'Naija', 'Speed', 'naijaspeed1@gmail.com', '$2b$10$gHNGpac2nAnnKJGQbpyM5epwIoxAhzqiCa.9fvX9YGdZWk7iyyowK', '', '08096097536', 'Active', 'Admin', 'bdc961a2911a6a52f30a6f217acbaef5753fff932cf20cc2e542e35026518c7c', '', '7eeb20a0e61e1743700516de36bb7749c4d9a9f7c49e6c91f746bbbba547f1db', '', 0, '', '0', '', '', 0, '', '', '', '', '', '2023-06-19 16:49:37', '2023-06-28 16:19:02'),
(31, 'Edet', 'Offiong', 'edetoffiong50@gmail.com', '$2b$10$rxHc6vrBNT9.MlMEQytGJeM5nE0RddRAmVKnSvNPoX.tU8mQQwKEm', '', '0808989898', 'Active', 'User', 'de2c2979679a714a2382ac352272b6b537bf3a2dd5ab7bffe8dd34fb98529e09', '', '', '92c959e6fd8fe28fff31cbd6109cf3e7d4ee747867534e11c71a5bacefd3204d', 1057596, '$2b$10$prov/MmrXrNtYGZy6pcO4.KiDEjLzLVDBzA0FDQEKHrKuFUtiDM16', '2119160714', 'OFFIONG BASSEY EDET', 'Zenith Bank', 25, 'Active', 'RCP_66dgaxwukyi6mrl', '057', '108016324747961534412', 'Google', '2023-06-24 18:59:38', '2023-07-01 16:52:12'),
(35, 'Godwin', 'Inyang', 'godwinhanson222@gmail.com', '$2b$10$WMmRLbeHiQlHnwdO7ZOnA.Pr4kX2m1Zl5qPBq8NglRvbGqJq6pbZW', '', '', 'Active', 'User', '73279dfc2a6b9fbb0a9b538e0ad2a14593d1d353df62ef78d4910cc500bd6cb3', '', '', '', NULL, NULL, '0', '', '', 0, '', '', '', '109835386994691689850', 'Google', '2023-06-30 16:09:58', '2023-06-30 16:09:58'),
(37, 'Prince ', 'Offiong', 'offiongbassey99@gmail.com', '$2b$10$P5JAQ0Lu5LtNrNTVejQXEu7YUb367nJemmbKV8b0GVe6kIKIf4/7G', '', '08096097539', 'Inactive', 'User', '6ced622251e3e8e70dd5eeb045861e119eb91513a4545647132b06a4e050d969', '', '', 'fe642a4dcabb11f52fd909cd1ee9bed622e46ef5b7ee85bdb96aa9e714acd8cc', 72799, '$2b$10$R69DRVXHT.MTxQ0ts6sUnehRvxNeqfdM7p6WFc0BxeBNWGpQqo35e', '1545085109', 'DAVID OLUCHI UGWU', 'Access Bank', 1, 'Active', 'RCP_ljoy5q1i42lru80', '044', '', '', '2023-07-01 18:26:14', '2023-07-01 19:02:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dailyprices`
--
ALTER TABLE `dailyprices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `dailypriceId` (`dailypriceId`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `dailyprices`
--
ALTER TABLE `dailyprices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dailyprices`
--
ALTER TABLE `dailyprices`
  ADD CONSTRAINT `dailyprices_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dailyprices_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`dailypriceId`) REFERENCES `dailyprices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stocks_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
