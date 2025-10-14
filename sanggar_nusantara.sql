-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 8.0.30 - MySQL Community Server - GPL
-- OS Server:                    Win64
-- HeidiSQL Versi:               12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Membuang struktur basisdata untuk sanggar_nusantara
CREATE DATABASE IF NOT EXISTS `sanggar_nusantara` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sanggar_nusantara`;

-- membuang struktur untuk table sanggar_nusantara.alamats
CREATE TABLE IF NOT EXISTS `alamats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `provinsi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kabupaten` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kecamatan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode_pos` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alamats_user_id_foreign` (`user_id`),
  CONSTRAINT `alamats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.alamats: ~1 rows (lebih kurang)
DELETE FROM `alamats`;
INSERT INTO `alamats` (`id`, `user_id`, `alamat`, `provinsi`, `kabupaten`, `kecamatan`, `desa`, `kode_pos`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'anskjdd', 'JAWA TENGAH', 'KABUPATEN BANYUMAS', 'SOMAGEDE', 'SOKAWERA', '1112', '2025-05-13 10:42:25', '2025-05-30 18:54:10', NULL),
	(2, 2, 'aslkasdlkd', 'SUMATERA BARAT', 'KABUPATEN SOLOK', 'LEMBAH GUMANTI', 'SUNGAI NANAM', '12987', '2025-06-01 04:02:24', '2025-06-01 04:04:46', NULL);

-- membuang struktur untuk table sanggar_nusantara.alat_musiks
CREATE TABLE IF NOT EXISTS `alat_musiks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cara_main` enum('dipetik','ditiup','dipukul','digesek') COLLATE utf8mb4_unicode_ci NOT NULL,
  `audio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.alat_musiks: ~10 rows (lebih kurang)
DELETE FROM `alat_musiks`;
INSERT INTO `alat_musiks` (`id`, `nama`, `asal`, `image`, `cara_main`, `audio`, `video`, `excerpt`, `deskripsi`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(11, 'Angklung', 'Jawa Barat', 'Ragam Indonesia/Alat Musik/01JP9SM6M0EVPMM8GD85WJZYW9.jpg', 'dipukul', 'Ragam Indonesia/Alat Musik/01JP9SM6MEWTZ90P24R8NG71TP.mp3', 'https://www.youtube.com/watch?v=0IS6Pc2dPTs&pp=ygUIYWJna2x1bmc%3D', 'Alat musik bambu khas Sunda', 'Angklung adalah alat musik multitonal yang dimainkan dengan cara digoyang.', '-6.518227207235594', '106.83856248510351', NULL, '2025-05-30 19:45:05', NULL),
	(12, 'Suling', 'Jawa Barat', '', 'ditiup', '', NULL, 'Seruling bambu khas Nusantara', 'Suling adalah alat musik tiup dari bambu yang sering digunakan dalam musik tradisional.', '-6.2088', '106.8456', NULL, NULL, NULL),
	(13, 'Gamelan', 'Jawa & Bali', '', 'dipukul', '', NULL, 'Ansambel musik tradisional Jawa dan Bali', 'Gamelan terdiri dari berbagai instrumen seperti gong, kendang, dan saron.', '-7.7956', '110.3695', NULL, NULL, NULL),
	(14, 'Sasando', 'Nusa Tenggara Timur', '', 'dipetik', '', NULL, 'Alat musik petik dari NTT', 'Sasando adalah alat musik khas Rote yang dimainkan dengan cara dipetik.', '-10.1726', '123.6070', NULL, NULL, NULL),
	(15, 'Kolintang', 'Sulawesi Utara', '', 'dipukul', '', NULL, 'Alat musik perkusi khas Minahasa', 'Kolintang adalah alat musik dari kayu yang dimainkan dengan cara dipukul.', '1.4549', '124.8413', NULL, NULL, NULL),
	(16, 'Tifa', 'Papua & Maluku', '', 'dipukul', 'tifa.mp3', NULL, 'Alat musik khas Papua dan Maluku', 'Tifa adalah alat musik tabuh berbentuk tabung yang digunakan dalam berbagai upacara.', '-2.5333', '140.7000', NULL, NULL, NULL),
	(17, 'Kecapi', 'Jawa Barat', '', 'dipetik', 'kecapi.mp3', NULL, 'Alat musik petik khas Sunda', 'Kecapi digunakan dalam musik tradisional Sunda untuk mengiringi tembang.', '-6.9175', '107.6191', NULL, NULL, NULL),
	(18, 'Serunai', 'Sumatera Barat', '', 'ditiup', 'serunai.mp3', NULL, 'Alat musik tiup khas Minangkabau', 'Serunai adalah alat musik tradisional Minangkabau yang dimainkan dengan cara ditiup.', '-0.3059', '100.3692', NULL, NULL, NULL),
	(19, 'Kendang', 'Jawa', '', 'dipukul', 'kendang.mp3', NULL, 'Alat musik perkusi khas Jawa', 'Kendang adalah alat musik pukul yang digunakan dalam gamelan.', '-7.7956', '110.3695', NULL, NULL, NULL),
	(20, 'Bonang', 'Jawa', '', 'dipukul', 'bonang.mp3', NULL, 'Alat musik gamelan khas Jawa', 'Bonang adalah alat musik gamelan berbentuk gong kecil yang disusun secara horizontal.', '-7.7956', '110.3695', NULL, NULL, NULL);

-- membuang struktur untuk table sanggar_nusantara.artikels
CREATE TABLE IF NOT EXISTS `artikels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `user_id` bigint unsigned NOT NULL,
  `kategori_id` bigint unsigned NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `keyword` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_artikel` enum('draft','publish','premium') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `artikels_slug_unique` (`slug`),
  UNIQUE KEY `title` (`title`),
  KEY `artikels_user_id_foreign` (`user_id`),
  KEY `artikels_kategori_id_foreign` (`kategori_id`),
  CONSTRAINT `artikels_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_artikels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `artikels_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.artikels: ~8 rows (lebih kurang)
DELETE FROM `artikels`;
INSERT INTO `artikels` (`id`, `title`, `slug`, `views`, `user_id`, `kategori_id`, `image`, `excerpt`, `keyword`, `content`, `status_artikel`, `published_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Menyelami Makna Filosofis dalam Seni Wayang Kulit Jawa', 'menyelami-makna-filosofis-dalam-seni-wayang-kulit-jawa', 1, 1, 1, 'artikel/01JP9N6KE8Q9RHBF5X17MT98ZM.jpg', 'Wayang kulit Jawa adalah salah satu bentuk seni tradisional yang memiliki nilai budaya dan filosofi yang mendalam. Lebih dari sekadar hiburan, wayang kulit merupakan representasi kehidupan, kebijaksanaan, serta ajaran moral yang diwariskan dari generasi ke generasi. Dalam setiap pertunjukannya, wayang kulit tidak hanya menyajikan kisah epik tetapi juga menyiratkan nilai-nilai filosofis yang berakar pada ajaran Hindu, Buddha, dan kearifan lokal Jawa.', 'Wayang Kulit Jawa, seni tradisional, nilai budaya, filosofi kehidupan, simbolisme wayang, gunungan, tokoh wayang, kelir, cempala, kepyak, tatah, sungging, keseimbangan hidup, Sangkan Paraning Dumadi, Tri Hita Karana, peran dalang, filsafat wayang, kritik sosial, refleksi kehidupan, era modern, digitalisasi wayang, pelestarian budaya.', '<p>Wayang kulit Jawa adalah salah satu bentuk seni tradisional yang memiliki nilai budaya dan filosofi yang mendalam. Lebih dari sekadar hiburan, wayang kulit merupakan representasi kehidupan, kebijaksanaan, serta ajaran moral yang diwariskan dari generasi ke generasi. Dalam setiap pertunjukannya, wayang kulit tidak hanya menyajikan kisah epik tetapi juga menyiratkan nilai-nilai filosofis yang berakar pada ajaran Hindu, Buddha, dan kearifan lokal Jawa.</p>\n<h3>Simbolisme dalam Wayang Kulit</h3>\n<p>Setiap unsur dalam wayang kulit memiliki makna simbolis ayang mencerminkan aspek kehidupan manusia. Misalnya:</p>\n<ul data-spread="false">\n<li>\n<p>Gunungan: Lambang alam semesta, menggambarkan awal dan akhir kehidupan serta dinamika dunia.</p>\n</li>\n<li>\n<p>Tokoh Wayang: Masing-masing karakter mewakili sifat manusia, seperti kebaikan, kejahatan, kebijaksanaan, dan keserakahan.</p>\n</li>\n<li>\n<p>Kelir atau Layar: Melambangkan dunia yang kita lihat, di mana segala kejadian adalah bayangan dari realitas sejati.</p>\n</li>\n<li>\n<p>Cempala dan Kepyak: Alat yang digunakan dalang untuk mengiringi pertunjukan, melambangkan kekuatan suara dan keputusan dalam kehidupan manusia.</p>\n</li>\n<li>\n<p>Tatah dan Sungging: Teknik pembuatan wayang kulit yang menunjukkan keterampilan tinggi, melambangkan perjalanan manusia dalam mencapai kesempurnaan.</p>\n</li>\n</ul>\n<h3>Filosofi Kehidupan dalam Pertunjukan Wayang</h3>\n<p>Dalam wayang kulit, pertarungan antara tokoh baik dan jahat mencerminkan dualitas kehidupan. Namun, ajaran utama yang disampaikan adalah keseimbangan (harmony). Tidak ada tokoh yang benar-benar baik atau jahat; setiap karakter mengalami perjalanan spiritual untuk mencapai kesempurnaan.</p>\n<p>Salah satu contoh filsafat dalam wayang kulit adalah konsep "Sangkan Paraning Dumadi", yang berarti memahami asal-usul kehidupan dan tujuan akhir manusia. Konsep ini mengajarkan bahwa manusia harus mengenali jati dirinya, menjalani hidup dengan bijaksana, serta mencapai kesadaran spiritual yang lebih tinggi. Selain itu, terdapat juga filosofi "Tri Hita Karana" yang mengajarkan tentang keseimbangan hubungan antara manusia dengan Tuhan, manusia dengan sesama, serta manusia dengan alam.</p>\n<h3>Peran Dalang sebagai Filsuf</h3>\n<p>Dalang dalam wayang kulit bukan sekadar pencerita, tetapi juga seorang filsuf yang menyampaikan nilai-nilai kehidupan kepada penonton. Melalui kelihaiannya dalam menghidupkan karakter, dalang menggambarkan bagaimana manusia harus menghadapi tantangan hidup dengan kebijaksanaan dan kesabaran.</p>\n<p>Dalang juga bertindak sebagai pemimpin spiritual dalam pertunjukan, menyisipkan petuah, humor, dan kritik sosial yang relevan dengan keadaan masyarakat. Dengan demikian, wayang kulit tidak hanya berfungsi sebagai hiburan, tetapi juga sebagai sarana pendidikan dan refleksi sosial.</p>\n<h3>Relevansi Wayang Kulit di Era Modern</h3>\n<p>Di tengah perkembangan zaman, wayang kulit masih relevan sebagai media pembelajaran dan refleksi kehidupan. Banyak nilai yang terkandung dalam wayang kulit dapat diterapkan dalam kehidupan modern, seperti pentingnya introspeksi diri, menjaga keseimbangan, dan menghormati kebijaksanaan leluhur.</p>\n<p>Selain itu, wayang kulit juga beradaptasi dengan perkembangan teknologi. Banyak pertunjukan yang kini disiarkan secara digital atau dikombinasikan dengan multimedia untuk menarik minat generasi muda. Beberapa dalang bahkan mulai mengangkat isu-isu kontemporer dalam lakonnya, menjadikan wayang kulit tetap relevan dalam menyampaikan pesan moral dan sosial.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Wayang kulit Jawa bukan hanya sekadar seni pertunjukan, melainkan juga warisan budaya yang sarat dengan nilai-nilai filosofis dan kebijaksanaan hidup. Dengan menyelami makna filosofis dalam seni wayang kulit, kita dapat belajar memahami kehidupan dengan lebih mendalam dan menemukan arah dalam perjalanan spiritual kita. Seni ini bukan hanya warisan budaya, tetapi juga cerminan kebijaksanaan yang tak lekang oleh waktu. Oleh karena itu, menjaga dan melestarikan wayang kulit merupakan tanggung jawab bersama agar generasi mendatang tetap dapat menikmati dan memahami keindahan serta kebijaksanaan yang terkandung di dalamnya.</p>', 'publish', '2025-03-14 06:16:25', '2025-03-14 06:24:25', '2025-03-14 06:24:25', NULL),
	(2, 'Angklung, Seni Musik Tradisional Indonesia yang Mendunia', 'angklung-seni-musik-tradisional-indonesia-yang-mendunia', 3, 1, 2, 'artikel/01JP9NDP90MDC8J7YCFA52HC73.jpg', 'Angklung adalah alat musik tradisional khas Indonesia yang berasal dari Jawa Barat. Terbuat dari bambu dan dimainkan dengan cara digetarkan atau digoyangkan, angklung menghasilkan bunyi khas yang harmonis. Sebagai bagian dari warisan budaya Nusantara, angklung tidak hanya memiliki nilai seni yang tinggi, tetapi juga makna filosofis yang mendalam. Keunikan dan daya tariknya membuat angklung diakui sebagai Warisan Budaya Takbenda oleh UNESCO pada tahun 2010, menjadikannya salah satu simbol budaya Indonesia di kancah dunia.', 'Angklung, alat musik tradisional, Jawa Barat, bambu, Warisan Budaya Takbenda, UNESCO, sejarah angklung, kerajaan Sunda, Daeng Soetigna, angklung diatonis, filosofi angklung, gotong royong, harmoni, kebersamaan, musik dunia, pengakuan internasional, rekor dunia, pelestarian budaya, generasi muda, digitalisasi angklung.', '<p>Angklung adalah alat musik tradisional khas Indonesia yang berasal dari Jawa Barat. Terbuat dari bambu dan dimainkan dengan cara digetarkan atau digoyangkan, angklung menghasilkan bunyi khas yang harmonis. Sebagai bagian dari warisan budaya Nusantara, angklung tidak hanya memiliki nilai seni yang tinggi, tetapi juga makna filosofis yang mendalam. Keunikan dan daya tariknya membuat angklung diakui sebagai Warisan Budaya Takbenda oleh UNESCO pada tahun 2010, menjadikannya salah satu simbol budaya Indonesia di kancah dunia.</p>\n<h3>Sejarah dan Asal Usul Angklung</h3>\n<p>Angklung telah dikenal sejak zaman kerajaan Sunda, digunakan dalam berbagai ritual adat dan kegiatan sosial masyarakat. Awalnya, angklung dimainkan sebagai alat pemanggil roh dalam upacara pertanian untuk memohon kesuburan tanah. Seiring perkembangan zaman, angklung mulai dimainkan dalam berbagai acara hiburan dan pendidikan, menjadikannya bagian dari kehidupan sehari-hari masyarakat.</p>\n<p>Pada abad ke-20, angklung mengalami inovasi berkat Daeng Soetigna, seorang maestro musik dari Jawa Barat. Ia mengembangkan angklung diatonis yang memungkinkan alat musik ini dimainkan bersama dengan alat musik lain, termasuk instrumen Barat. Inovasi ini memperluas penggunaan angklung dalam berbagai jenis musik dan semakin memperkenalkannya ke dunia internasional.</p>\n<h3>Filosofi dalam Seni Angklung</h3>\n<p>Angklung bukan hanya sekadar alat musik, tetapi juga memiliki nilai filosofis yang mencerminkan harmoni dan kebersamaan. Dalam permainannya, angklung dimainkan secara berkelompok, di mana setiap pemain hanya bertanggung jawab atas satu atau beberapa nada tertentu. Hal ini mengajarkan nilai gotong royong, kerja sama, dan kesatuan dalam keberagaman.</p>\n<p>Filosofi angklung sejalan dengan konsep masyarakat Indonesia yang menjunjung tinggi kebersamaan dan keseimbangan. Setiap individu memiliki peran dan kontribusi yang unik, namun harus bekerja sama untuk menciptakan harmoni dalam kehidupan sosial.</p>\n<h3>Angklung di Kancah Internasional</h3>\n<p>Pengakuan angklung sebagai Warisan Budaya Takbenda oleh UNESCO menjadi tonggak penting dalam pelestarian alat musik ini. Sejak itu, angklung semakin dikenal di berbagai negara. Banyak komunitas internasional yang tertarik untuk mempelajari dan memainkan angklung sebagai bagian dari apresiasi terhadap budaya Indonesia.</p>\n<p>Beberapa momen penting dalam popularitas angklung di dunia antara lain:</p>\n<ul data-spread="false">\n<li>\n<p>Pagelaran di UNESCO, Paris (2010): Sebagai bentuk perayaan pengakuan UNESCO, pertunjukan angklung di Paris menarik perhatian dunia.</p>\n</li>\n<li>\n<p>Rekor Dunia di Washington DC (2011): Sebanyak 5.000 orang memainkan angklung bersama dalam sebuah pertunjukan massal, mencetak rekor dunia.</p>\n</li>\n<li>\n<p>Pengenalan di Sekolah Internasional: Banyak sekolah di luar negeri yang memasukkan angklung dalam kurikulum seni dan budaya mereka.</p>\n</li>\n</ul>\n<h3>Pelestarian dan Peran Generasi Muda</h3>\n<p>Sebagai warisan budaya, pelestarian angklung menjadi tanggung jawab bersama. Berbagai inisiatif telah dilakukan untuk memperkenalkan angklung kepada generasi muda, baik melalui pendidikan formal maupun komunitas seni. Workshop, festival, dan pertunjukan rutin terus digelar untuk menjaga eksistensi angklung di tengah era modern.</p>\n<p>Dengan kemajuan teknologi, angklung kini juga semakin mudah diakses secara digital. Banyak platform online yang menyediakan tutorial belajar angklung, sehingga siapa pun dapat mempelajarinya dengan mudah, di mana saja dan kapan saja.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Angklung bukan sekadar alat musik tradisional, tetapi juga simbol harmoni, kebersamaan, dan kekayaan budaya Indonesia. Keunikan dan daya tariknya telah membawa angklung ke panggung dunia, menjadi salah satu duta seni yang memperkenalkan Indonesia ke berbagai belahan dunia. Dengan upaya pelestarian yang terus dilakukan, diharapkan angklung tetap hidup dan terus menginspirasi generasi mendatang.</p>', 'publish', '2025-03-14 06:24:38', '2025-03-14 06:28:17', '2025-04-20 08:00:16', NULL),
	(3, 'Peran Indonesia dalam G20: Pemimpin Ekonomi di Asia Tenggara', 'peran-indonesia-dalam-g20-pemimpin-ekonomi-di-asia-tenggara', 34, 1, 2, 'artikel/01JP9NJPV9NS16QAP753N18B2X.jpeg', 'Kelompok dua puluh (Group of Twenty atau G20) merupakan forum strategis utama dunia untuk kerja sama ekonomi internasional yang terdiri dari 19 negara dengan perekonomian terbesar di dunia serta Uni Eropa. Indonesia, sebagai satu-satunya wakil dari Asia Tenggara dalam G20, memegang peran penting dalam menjembatani kepentingan negara-negara berkembang dan maju. Sejak bergabung, Indonesia telah memanfaatkan keanggotaannya untuk mendorong agenda pembangunan inklusif dan berkelanjutan, serta memperkuat posisinya sebagai kekuatan ekonomi utama di kawasan Asia Tenggara.', 'Indonesia, ekonomi terbesar Asia Tenggara, G20, Group of Twenty, keanggotaan Indonesia, ekonomi global, negara maju dan berkembang, stabilitas ekonomi, perdagangan internasional, pembangunan berkelanjutan, peran strategis, investasi hijau, inklusivitas ekonomi, transformasi digital, presidensi G20 2022, Recover Together Recover Stronger, pemulihan ekonomi, transisi energi, daya tarik investasi, kerja sama internasional, reformasi ekonomi.', '<p class="" data-start="112" data-end="684">Kelompok dua puluh (<em data-start="132" data-end="149">Group of Twenty</em> atau G20) merupakan forum strategis utama dunia untuk kerja sama ekonomi internasional yang terdiri dari 19 negara dengan perekonomian terbesar di dunia serta Uni Eropa. Indonesia, sebagai satu-satunya wakil dari Asia Tenggara dalam G20, memegang peran penting dalam menjembatani kepentingan negara-negara berkembang dan maju. Sejak bergabung, Indonesia telah memanfaatkan keanggotaannya untuk mendorong agenda pembangunan inklusif dan berkelanjutan, serta memperkuat posisinya sebagai kekuatan ekonomi utama di kawasan Asia Tenggara.</p>\n<p class="" data-start="686" data-end="1178">Salah satu kontribusi utama Indonesia dalam G20 adalah sebagai jembatan yang menghubungkan kepentingan negara-negara maju dan berkembang. Dengan latar belakang sebagai negara berkembang yang memiliki perekonomian yang cukup besar dan stabil, Indonesia dapat merepresentasikan suara Global South dalam forum global ini. Posisi ini memberdayakan Indonesia untuk memperjuangkan isu-isu seperti akses vaksin yang merata, pendanaan iklim, ketahanan pangan, dan pembangunan infrastruktur yang adil.</p>\n<p class="" data-start="1180" data-end="1838">Pada tahun 2022, Indonesia mendapat kehormatan menjadi Presidensi G20 dengan mengangkat tema &ldquo;Recover Together, Recover Stronger.&rdquo; Dalam peran ini, Indonesia menunjukkan kepemimpinan global dalam merespons tantangan ekonomi pasca-pandemi COVID-19. Fokus utama yang diangkat mencakup penguatan arsitektur kesehatan global, transformasi digital, dan transisi energi berkelanjutan. Dalam berbagai pertemuan tingkat menteri dan kepala negara, Indonesia mendorong kolaborasi internasional dalam membangun sistem kesehatan global yang tangguh, mempercepat pemulihan ekonomi, dan meningkatkan inklusivitas ekonomi digital, khususnya bagi UMKM dan negara berkembang.</p>\n<p class="" data-start="1840" data-end="2439">Sebagai negara yang kaya sumber daya alam namun juga rentan terhadap dampak perubahan iklim, Indonesia mendorong komitmen transisi energi dalam forum G20. Melalui platform Just Energy Transition Partnership (JETP) yang diluncurkan saat KTT G20 di Bali, Indonesia berhasil mengamankan komitmen pendanaan miliaran dolar dari mitra internasional untuk mendukung pengurangan emisi karbon dan pembangunan energi terbarukan. Langkah ini menandai posisi strategis Indonesia dalam memperjuangkan ekonomi hijau dan pembangunan berkelanjutan yang tetap mempertimbangkan keadilan sosial bagi negara berkembang.</p>\n<p class="" data-start="2441" data-end="2904">Dengan PDB terbesar di kawasan Asia Tenggara dan populasi lebih dari 270 juta jiwa, Indonesia secara alami menjadi pemimpin regional. Keanggotaan Indonesia dalam G20 memberikan keuntungan strategis tidak hanya bagi Indonesia sendiri, tetapi juga bagi negara-negara tetangga. Dalam forum G20, Indonesia sering mengangkat isu-isu regional, memperkuat kerja sama ekonomi ASEAN, dan mengupayakan stabilitas perdagangan global yang kondusif bagi kawasan Asia Tenggara.</p>\n<p class="" data-start="2906" data-end="3483">Keberadaan Indonesia dalam G20 menegaskan statusnya sebagai kekuatan ekonomi yang semakin diperhitungkan di panggung dunia. Peran aktif Indonesia dalam mempromosikan kerja sama global, mendorong pembangunan inklusif, serta mengadvokasi isu-isu kritis seperti perubahan iklim dan ketahanan pangan membuktikan kapasitas Indonesia sebagai pemimpin ekonomi Asia Tenggara. Ke depan, tantangan global mungkin akan terus berkembang, namun dengan visi kepemimpinan yang kuat, Indonesia siap memainkan peran strategis dalam menciptakan dunia yang lebih adil, tangguh, dan berkelanjutan.</p>', 'publish', '2025-03-14 06:29:25', '2025-03-14 06:31:01', '2025-05-13 08:43:32', NULL),
	(4, 'Makna Simbolis di Balik Tenun Ikat Sumba: Warisan Leluhur yang Mendunia', 'makna-simbolis-di-balik-tenun-ikat-sumba-warisan-leluhur-yang-mendunia', 1, 1, 1, 'artikel/01JP9NQJQH8AB5XFMKE7TPW4ZD.jpg', 'Tenun ikat Sumba adalah salah satu warisan budaya Indonesia yang memiliki nilai seni tinggi dan makna simbolis yang mendalam. Ditenun dengan teknik tradisional yang diwariskan secara turun-temurun, kain tenun ikat Sumba bukan hanya sekadar kain, tetapi juga merupakan representasi dari identitas, status sosial, dan spiritualitas masyarakat Sumba. Keindahan serta kompleksitas motifnya telah menjadikan tenun ini sebagai salah satu warisan budaya yang dikenal hingga ke mancanegara.', 'Tenun ikat Sumba, warisan budaya, seni tradisional, motif simbolis, status sosial, spiritualitas, motif kuda, motif buaya, motif burung, motif tengkorak, motif pohon hayat, pewarna alami, pakaian adat, mahar pernikahan, fashion internasional, pelestarian budaya, pendidikan menenun, pengrajin lokal, inovasi desain, promosi global.', '<p>Tenun ikat Sumba adalah salah satu warisan budaya Indonesia yang memiliki nilai seni tinggi dan makna simbolis yang mendalam. Ditenun dengan teknik tradisional yang diwariskan secara turun-temurun, kain tenun ikat Sumba bukan hanya sekadar kain, tetapi juga merupakan representasi dari identitas, status sosial, dan spiritualitas masyarakat Sumba. Keindahan serta kompleksitas motifnya telah menjadikan tenun ini sebagai salah satu warisan budaya yang dikenal hingga ke mancanegara.</p>\n<h3>Simbolisme dalam Motif Tenun Ikat Sumba</h3>\n<p>Motif-motif dalam tenun ikat Sumba memiliki makna simbolis yang erat kaitannya dengan kepercayaan dan filosofi hidup masyarakat setempat. Beberapa motif yang umum ditemukan antara lain:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Motif Kuda: Melambangkan kekuatan, keberanian, dan status sosial. Dalam budaya Sumba, kuda merupakan simbol kekayaan dan kehormatan.</p>\n</li>\n<li>\n<p>Motif Buaya: Menggambarkan hubungan antara manusia dan leluhur, serta perlindungan dari roh jahat.</p>\n</li>\n<li>\n<p>Motif Burung: Menyimbolkan kebebasan, spiritualitas, dan hubungan dengan dunia roh.</p>\n</li>\n<li>\n<p>Motif Tengkorak: Mencerminkan tradisi perang suku dan penghormatan kepada pahlawan yang telah gugur.</p>\n</li>\n<li>\n<p>Motif Pohon Hayat: Melambangkan kehidupan, kesuburan, dan keseimbangan antara dunia manusia dan alam semesta.</p>\n</li>\n</ol>\n<h3>Proses Pembuatan yang Penuh Makna</h3>\n<p>Pembuatan tenun ikat Sumba bukan sekadar proses teknis, tetapi juga ritual yang sarat akan nilai spiritual. Proses pewarnaan menggunakan bahan alami seperti akar mengkudu, daun nila, dan lumpur, yang masing-masing memiliki simbolisme tersendiri. Selain itu, proses menenun dilakukan dengan penuh ketelitian dan kesabaran, mencerminkan keselarasan antara manusia dan alam.</p>\n<h3>Peran Tenun Ikat dalam Kehidupan Sosial dan Adat</h3>\n<p>Tenun ikat Sumba memiliki peran penting dalam berbagai aspek kehidupan masyarakat, antara lain:</p>\n<ul data-spread="false">\n<li>\n<p>Sebagai Pakaian Adat: Digunakan dalam upacara adat, pernikahan, dan acara sakral lainnya.</p>\n</li>\n<li>\n<p>Sebagai Simbol Status Sosial: Semakin rumit motif dan warna kain, semakin tinggi status sosial pemakainya.</p>\n</li>\n<li>\n<p>Sebagai Warisan dan Mahar: Kain tenun sering dijadikan mahar dalam pernikahan dan diwariskan dari generasi ke generasi.</p>\n</li>\n</ul>\n<h3>Tenun Ikat Sumba di Kancah Internasional</h3>\n<p>Keindahan dan keunikan tenun ikat Sumba telah menarik perhatian dunia. Banyak perancang busana ternama yang mengadaptasi motif-motif Sumba ke dalam koleksi mereka. Selain itu, berbagai pameran budaya dan fashion show internasional telah memperkenalkan tenun ini sebagai bagian dari warisan dunia yang patut dilestarikan.</p>\n<h3>Upaya Pelestarian</h3>\n<p>Di tengah arus modernisasi, pelestarian tenun ikat Sumba menjadi tantangan tersendiri. Beberapa langkah yang dilakukan untuk menjaga kelestariannya antara lain:</p>\n<ul data-spread="false">\n<li>\n<p>Pendidikan dan Pelatihan: Mengajarkan generasi muda teknik menenun agar tradisi ini tetap hidup.</p>\n</li>\n<li>\n<p>Dukungan Pemerintah dan LSM: Memberikan bantuan dan promosi kepada pengrajin lokal.</p>\n</li>\n<li>\n<p>Inovasi dalam Desain dan Produk: Mengadaptasi motif tenun ke dalam produk fashion modern untuk menarik minat pasar global.</p>\n</li>\n</ul>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>Tenun ikat Sumba bukan hanya sekadar kain, melainkan warisan leluhur yang kaya akan makna simbolis dan nilai budaya. Keindahannya yang mendunia menjadikannya sebagai salah satu ikon budaya Indonesia yang harus terus dilestarikan. Dengan menjaga dan mengembangkan tenun ikat Sumba, kita tidak hanya mempertahankan tradisi, tetapi juga memperkenalkan kearifan lokal Indonesia ke kancah internasional.</p>', 'publish', '2025-03-14 06:32:07', '2025-03-14 06:33:41', '2025-03-14 06:33:41', NULL),
	(5, 'Tradisi Tabuik di Pariaman: Mengenang Peristiwa Karbala dalam Budaya Minang', 'tradisi-tabuik-di-pariaman-mengenang-peristiwa-karbala-dalam-budaya-minang', 100, 1, 1, 'artikel/01JP9P0Q82WXFZDPJJFG7SDBTC.jpg', 'Tradisi Tabuik adalah salah satu perayaan budaya yang unik di Kota Pariaman, Sumatra Barat. Tradisi ini merupakan bentuk peringatan terhadap peristiwa Karbala yang terjadi pada 10 Muharram dalam kalender Islam, di mana cucu Nabi Muhammad, Imam Husain, gugur dalam pertempuran melawan pasukan Yazid. Meskipun berakar dari sejarah Islam, khususnya dalam tradisi Syiah, Tabuik telah menjadi bagian dari budaya Minangkabau yang bersifat inklusif dan diwariskan secara turun-temurun.', 'Tradisi Tabuik, Pariaman, Sumatra Barat, peringatan Karbala, Imam Husain, budaya Minangkabau, festival budaya, warisan leluhur, sejarah Islam, tradisi Syiah, pengaruh Tamil, replika Tabuik, pembuangan Tabuik ke laut, musik dikir, musik tasa, prosesi Tabuik, maarak jari-jari, maarak saroban, Tabuik naik pangkek, atraksi wisata, toleransi budaya, pariwisata Pariaman, promosi budaya, festival tahunan.', '<p>Tradisi Tabuik adalah salah satu perayaan budaya yang unik di Kota Pariaman, Sumatra Barat. Tradisi ini merupakan bentuk peringatan terhadap peristiwa Karbala yang terjadi pada 10 Muharram dalam kalender Islam, di mana cucu Nabi Muhammad, Imam Husain, gugur dalam pertempuran melawan pasukan Yazid. Meskipun berakar dari sejarah Islam, khususnya dalam tradisi Syiah, Tabuik telah menjadi bagian dari budaya Minangkabau yang bersifat inklusif dan diwariskan secara turun-temurun.</p>\n<h3>Sejarah dan Asal-usul Tabuik</h3>\n<p>Tradisi Tabuik diyakini diperkenalkan oleh orang-orang keturunan India Muslim (Tamil) yang datang ke Pariaman pada abad ke-19. Mereka membawa tradisi Muharram yang kemudian diadaptasi oleh masyarakat setempat dengan berbagai unsur budaya Minang. Seiring waktu, perayaan ini berkembang menjadi sebuah festival yang menarik perhatian banyak wisatawan.</p>\n<h3>Makna dan Simbolisme dalam Tradisi Tabuik</h3>\n<p>Tabuik sendiri berasal dari kata Arab &ldquo;tabut&rdquo;, yang berarti peti atau keranda. Dalam perayaan ini, Tabuik adalah sebuah replika besar berbentuk menara yang dihiasi ornamen-ornamen khas. Beberapa makna simbolis dalam perayaan Tabuik antara lain:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Replika Tabuik &ndash; Melambangkan keranda yang membawa jenazah Imam Husain setelah peristiwa Karbala.</p>\n</li>\n<li>\n<p>Pembuangan Tabuik ke Laut &ndash; Melambangkan pelepasan duka dan harapan akan kehidupan yang lebih baik.</p>\n</li>\n<li>\n<p>Musik Dikir dan Tasa &ndash; Iringan musik tradisional yang dimainkan sepanjang prosesi mencerminkan ekspresi kesedihan dan penghormatan.</p>\n</li>\n<li>\n<p>Pertarungan Dua Tabuik &ndash; Menggambarkan persatuan setelah perbedaan dalam proses pembuangan Tabuik ke laut.</p>\n</li>\n</ol>\n<h3>Prosesi Tradisi Tabuik</h3>\n<p>Perayaan Tabuik berlangsung selama beberapa hari dengan serangkaian prosesi yang melibatkan masyarakat secara luas. Beberapa tahap penting dalam perayaan ini adalah:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Mengambil Tanah &ndash; Dilakukan pada awal Muharram sebagai simbol persiapan dan penyucian diri.</p>\n</li>\n<li>\n<p>Ma&rsquo;ambiak Batang Pisang &ndash; Batang pisang diambil sebagai simbol tubuh Imam Husain.</p>\n</li>\n<li>\n<p>Maarak Jari-jari &ndash; Arakan kecil yang membawa miniatur Tabuik.</p>\n</li>\n<li>\n<p>Maarak Saroban &ndash; Replika sorban Imam Husain diarak sebagai simbol perjuangannya.</p>\n</li>\n<li>\n<p>Tabuik Naik Pangkek &ndash; Perakitan replika Tabuik menjadi struktur besar dan megah.</p>\n</li>\n<li>\n<p>Maarak Tabuik &ndash; Puncak perayaan di mana Tabuik diarak ke seluruh kota sebelum akhirnya dibuang ke laut.</p>\n</li>\n</ol>\n<h3>Peran Tradisi Tabuik dalam Budaya dan Pariwisata</h3>\n<p>Meskipun memiliki latar belakang religius, perayaan Tabuik telah berkembang menjadi atraksi budaya dan pariwisata yang menarik wisatawan lokal maupun mancanegara. Festival ini menjadi simbol toleransi dan keberagaman dalam masyarakat Minangkabau. Pemerintah setempat juga terus mengembangkan festival ini sebagai salah satu agenda tahunan untuk mempromosikan budaya Pariaman ke dunia internasional.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Tradisi Tabuik di Pariaman adalah bentuk perpaduan antara sejarah, budaya, dan kearifan lokal yang diwariskan dari generasi ke generasi. Lebih dari sekadar perayaan keagamaan, Tabuik mencerminkan semangat kebersamaan, penghormatan terhadap sejarah, serta daya tarik budaya yang unik. Dengan terus melestarikan dan mempromosikan tradisi ini, masyarakat Pariaman tidak hanya menjaga warisan leluhur, tetapi juga memperkenalkan kekayaan budaya Indonesia ke dunia.</p>', 'premium', '2025-03-14 06:36:40', '2025-03-14 06:38:40', '2025-03-14 06:38:40', NULL),
	(6, 'Sasando: Alunan Indah Alat Musik Tradisional dari Nusa Tenggara Timur', 'sasando-alunan-indah-alat-musik-tradisional-dari-nusa-tenggara-timur', 401, 1, 6, 'artikel/01JP9P7E6ZWSKABMM45QFW155A.jpg', 'Sasando adalah alat musik tradisional khas dari Pulau Rote, Nusa Tenggara Timur (NTT), yang memiliki suara khas dan merdu. Instrumen ini telah menjadi bagian penting dalam budaya masyarakat Rote dan kini semakin dikenal di kancah nasional maupun internasional. Dengan bentuk unik dan teknik permainan yang khas, Sasando tidak hanya menjadi warisan budaya, tetapi juga simbol identitas masyarakat NTT.', 'Sasando, alat musik tradisional, Pulau Rote, Nusa Tenggara Timur, NTT, warisan budaya, identitas masyarakat, sejarah Sasando, Sasando gong, Sasando biola, Sasando elektrik, tabung resonansi, daun lontar, senar Sasando, alat musik petik, upacara adat, simbol budaya, pariwisata NTT, festival seni, inovasi Sasando, pelestarian budaya, pendidikan musik, regenerasi pemain, pertunjukan budaya, alat musik khas Indonesia.', '<p>Sasando adalah alat musik tradisional khas dari Pulau Rote, Nusa Tenggara Timur (NTT), yang memiliki suara khas dan merdu. Instrumen ini telah menjadi bagian penting dalam budaya masyarakat Rote dan kini semakin dikenal di kancah nasional maupun internasional. Dengan bentuk unik dan teknik permainan yang khas, Sasando tidak hanya menjadi warisan budaya, tetapi juga simbol identitas masyarakat NTT.</p>\n<h3>Sejarah dan Asal-usul Sasando</h3>\n<p>Sasando dipercaya telah ada sejak abad ke-7 dan digunakan sebagai alat musik pengiring dalam berbagai upacara adat dan hiburan masyarakat. Nama "Sasando" berasal dari kata dalam bahasa Rote, "sasandu," yang berarti "bergetar" atau "beresonansi."</p>\n<p>Menurut legenda setempat, alat musik ini ditemukan oleh seorang pemuda bernama Sangguana yang terinspirasi oleh suara angin yang berhembus di sela-sela dedaunan dan ranting pohon lontar. Ia kemudian menciptakan sebuah alat musik yang dapat menghasilkan nada-nada harmonis layaknya suara alam.</p>\n<h3>Struktur dan Cara Memainkan Sasando</h3>\n<p>Sasando memiliki struktur yang unik dibandingkan alat musik petik lainnya. Komponen utamanya terdiri dari:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Tabung Resonansi &ndash; Terbuat dari bambu, yang berfungsi sebagai tempat senar dan penghasil suara.</p>\n</li>\n<li>\n<p>Daun Lontar &ndash; Digunakan sebagai resonator yang memperkuat dan memperindah suara yang dihasilkan.</p>\n</li>\n<li>\n<p>Senar &ndash; Berjumlah 28 hingga 56 buah, yang dipetik untuk menghasilkan nada yang harmonis.</p>\n</li>\n</ol>\n<p>Untuk memainkannya, seorang pemain Sasando menggunakan kedua tangan untuk memetik senar secara bersamaan, menciptakan harmoni yang khas dan menenangkan.</p>\n<h3>Jenis-Jenis Sasando</h3>\n<p>Terdapat beberapa jenis Sasando yang dikenal di masyarakat, antara lain:</p>\n<ul data-spread="false">\n<li>\n<p>Sasando Gong: Memiliki nada yang lebih besar dan digunakan dalam acara-acara adat.</p>\n</li>\n<li>\n<p>Sasando Biola: Memiliki lebih banyak senar dan menghasilkan nada yang lebih kompleks.</p>\n</li>\n<li>\n<p>Sasando Elektrik: Inovasi modern yang memungkinkan Sasando dimainkan dengan sistem pengeras suara untuk pertunjukan besar.</p>\n</li>\n</ul>\n<h3>Peran Sasando dalam Budaya dan Pariwisata</h3>\n<p>Sasando memiliki peran penting dalam berbagai aspek budaya masyarakat NTT, termasuk:</p>\n<ul data-spread="false">\n<li>\n<p>Pengiring Upacara Adat: Digunakan dalam pernikahan, upacara penyambutan tamu, dan ritual keagamaan.</p>\n</li>\n<li>\n<p>Simbol Identitas Budaya: Mewakili keunikan budaya Rote dan NTT secara keseluruhan.</p>\n</li>\n<li>\n<p>Daya Tarik Pariwisata: Sasando sering ditampilkan dalam pertunjukan budaya dan festival seni, menarik perhatian wisatawan domestik maupun mancanegara.</p>\n</li>\n</ul>\n<h3>Upaya Pelestarian Sasando</h3>\n<p>Di era modern, pelestarian Sasando menghadapi berbagai tantangan, seperti minimnya regenerasi pemain dan pengaruh budaya asing. Untuk menjaga keberlangsungannya, beberapa upaya yang dilakukan adalah:</p>\n<ul data-spread="false">\n<li>\n<p>Pendidikan dan Pelatihan: Mengajarkan generasi muda cara memainkan Sasando melalui sekolah dan sanggar seni.</p>\n</li>\n<li>\n<p>Festival dan Pertunjukan: Menyelenggarakan pertunjukan seni untuk meningkatkan apresiasi masyarakat terhadap Sasando.</p>\n</li>\n<li>\n<p>Inovasi dalam Pembuatan Sasando: Mengembangkan Sasando elektrik untuk menarik minat musisi modern.</p>\n</li>\n</ul>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Sasando adalah alat musik tradisional yang mencerminkan kekayaan budaya Nusa Tenggara Timur. Dengan suara khasnya yang merdu, Sasando telah menjadi bagian penting dalam budaya masyarakat Rote serta terus beradaptasi dengan perkembangan zaman. Upaya pelestarian dan inovasi terus dilakukan agar Sasando tetap lestari dan semakin dikenal di tingkat nasional maupun internasional.</p>', 'publish', '2025-03-14 06:38:51', '2025-03-14 06:42:21', '2025-04-20 07:04:12', NULL),
	(7, 'Filosofi Hidup dalam Kearifan Lokal Suku Baduy', 'filosofi-hidup-dalam-kearifan-lokal-suku-baduy', 47, 1, 1, 'artikel/01JP9PC0MBGPDYXJDWCZ57HJXN.jpeg', 'Suku Baduy merupakan salah satu kelompok masyarakat adat yang tinggal di pedalaman Kabupaten Lebak, Banten. Mereka dikenal karena kehidupan yang sederhana, menyatu dengan alam, dan teguh dalam mempertahankan tradisi leluhur. Filosofi hidup mereka yang berlandaskan kearifan lokal menjadi sumber inspirasi bagi banyak orang dalam menghadapi tantangan kehidupan modern.', 'Suku Baduy, masyarakat adat, Kabupaten Lebak, Banten, filosofi hidup, kearifan lokal, kehidupan sederhana, menjaga alam, tradisi leluhur, Baduy Dalam, Baduy Luar, larangan adat, gotong royong, musyawarah mufakat, sistem kepemimpinan, Pu’un, harmoni dengan alam, pertanian tradisional, pelestarian lingkungan, kehidupan tanpa teknologi, identitas budaya, warisan budaya, inspirasi hidup, keseimbangan ekosistem, kehidupan sosial.', '<p>Suku Baduy merupakan salah satu kelompok masyarakat adat yang tinggal di pedalaman Kabupaten Lebak, Banten. Mereka dikenal karena kehidupan yang sederhana, menyatu dengan alam, dan teguh dalam mempertahankan tradisi leluhur. Filosofi hidup mereka yang berlandaskan kearifan lokal menjadi sumber inspirasi bagi banyak orang dalam menghadapi tantangan kehidupan modern.</p>\n<h3>Prinsip Hidup Suku Baduy</h3>\n<p>Kehidupan Suku Baduy berpegang pada beberapa prinsip utama yang menjadi pedoman dalam keseharian mereka, yaitu:</p>\n<ol start="1" data-spread="true">\n<li>\n<p>&ldquo;Lojor heunteu beunang dipotong, pondok heunteu beunang disambung&rdquo; Prinsip ini bermakna bahwa segala sesuatu harus diterima sebagaimana adanya, tanpa mengubah apa yang telah ditetapkan oleh alam dan leluhur.</p>\n</li>\n<li>\n<p>Menjaga Keselarasan dengan Alam Suku Baduy percaya bahwa manusia adalah bagian dari alam, sehingga mereka sangat menjaga keseimbangan ekosistem. Mereka tidak menggunakan teknologi modern dan menerapkan sistem pertanian yang tidak merusak lingkungan.</p>\n</li>\n<li>\n<p>Kesederhanaan dan Keteguhan pada Tradisi Mereka menolak kemewahan dan modernisasi, meyakini bahwa kehidupan yang sederhana lebih menenangkan dan selaras dengan nilai-nilai leluhur.</p>\n</li>\n</ol>\n<h3>Larangan dan Aturan Adat</h3>\n<p>Suku Baduy memiliki aturan adat yang ketat, terutama bagi kelompok Baduy Dalam. Beberapa larangan utama mereka antara lain:</p>\n<ul data-spread="false">\n<li>\n<p>Tidak boleh menggunakan kendaraan bermotor.</p>\n</li>\n<li>\n<p>Tidak diperkenankan menggunakan alat elektronik.</p>\n</li>\n<li>\n<p>Tidak boleh mengubah struktur rumah tradisional.</p>\n</li>\n<li>\n<p>Tidak diperkenankan memakai sabun atau deterjen yang dapat mencemari sungai.</p>\n</li>\n</ul>\n<p>Aturan-aturan ini bertujuan untuk menjaga harmoni dengan alam dan mempertahankan kemurnian budaya mereka.</p>\n<h3>Kearifan Lokal dalam Kehidupan Sosial</h3>\n<p>Selain filosofi hidup yang kuat, Suku Baduy juga memiliki sistem sosial yang unik:</p>\n<ul data-spread="false">\n<li>\n<p>Gotong Royong: Masyarakat selalu membantu satu sama lain dalam berbagai kegiatan, seperti bercocok tanam dan membangun rumah.</p>\n</li>\n<li>\n<p>Musyawarah untuk Mufakat: Keputusan penting selalu diambil melalui musyawarah, dengan pemimpin adat sebagai penengah.</p>\n</li>\n<li>\n<p>Sistem Kepemimpinan: Suku Baduy dipimpin oleh Pu&rsquo;un, yang berperan sebagai penjaga adat dan penengah dalam kehidupan sosial.</p>\n</li>\n</ul>\n<h3>Relevansi Kearifan Lokal Suku Baduy di Era Modern</h3>\n<p>Dalam dunia yang semakin modern dan kompleks, nilai-nilai kehidupan Suku Baduy dapat menjadi inspirasi dalam:</p>\n<ul data-spread="false">\n<li>\n<p>Menjaga Lingkungan: Prinsip hidup harmonis dengan alam dapat diterapkan dalam upaya pelestarian lingkungan.</p>\n</li>\n<li>\n<p>Hidup Sederhana dan Bahagia: Mengurangi ketergantungan pada teknologi dapat membantu mengurangi stres dan meningkatkan kebahagiaan.</p>\n</li>\n<li>\n<p>Memegang Teguh Nilai-Nilai Tradisi: Dalam era globalisasi, penting untuk tetap menjaga identitas budaya dan kearifan lokal.</p>\n</li>\n</ul>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Filosofi hidup Suku Baduy merupakan warisan kearifan lokal yang berharga dan relevan hingga saat ini. Nilai-nilai kesederhanaan, keseimbangan dengan alam, dan kebersamaan dalam kehidupan sosial menjadi pelajaran penting bagi masyarakat modern. Dengan memahami dan mengapresiasi cara hidup mereka, kita dapat menemukan inspirasi untuk menjalani kehidupan yang lebih harmonis dan bermakna.</p>', 'publish', '2025-03-14 06:42:33', '2025-03-14 06:44:50', '2025-03-14 12:34:32', NULL),
	(8, 'Upacara Adat Seren Taun: Rasa Syukur Masyarakat Sunda kepada Alam', 'upacara-adat-seren-taun-rasa-syukur-masyarakat-sunda-kepada-alam', 103, 1, 4, 'artikel/01JP9PG4CSFJ5WV1HB3DDV7XF9.jpg', 'Seren Taun adalah upacara adat masyarakat Sunda yang dilaksanakan sebagai ungkapan rasa syukur kepada Tuhan Yang Maha Esa atas hasil panen yang melimpah. Tradisi ini diwariskan turun-temurun oleh masyarakat agraris di berbagai daerah di Jawa Barat, seperti di Kasepuhan Ciptagelar, Kanekes, dan Kampung Naga. Lebih dari sekadar perayaan panen, Seren Taun juga mencerminkan filosofi keseimbangan manusia dengan alam.', 'Seren Taun, upacara adat, masyarakat Sunda, rasa syukur, hasil panen, tradisi agraris, Jawa Barat, Kasepuhan Ciptagelar, Kanekes, Kampung Naga, filosofi keseimbangan, harmoni dengan alam, gotong royong, ngaruwat bumi, kirab budaya, leuit, lumbung padi, ritual adat, seni tradisional, gamelan Sunda, angklung, doa adat, pelestarian budaya, pariwisata budaya, kearifan lokal, pendidikan budaya, modernisasi, dokumentasi budaya.', '<p>Seren Taun adalah upacara adat masyarakat Sunda yang dilaksanakan sebagai ungkapan rasa syukur kepada Tuhan Yang Maha Esa atas hasil panen yang melimpah. Tradisi ini diwariskan turun-temurun oleh masyarakat agraris di berbagai daerah di Jawa Barat, seperti di Kasepuhan Ciptagelar, Kanekes, dan Kampung Naga. Lebih dari sekadar perayaan panen, Seren Taun juga mencerminkan filosofi keseimbangan manusia dengan alam.</p>\n<h3>Makna dan Filosofi Seren Taun</h3>\n<p>Seren Taun berasal dari kata &ldquo;seren&rdquo; yang berarti menyerahkan dan &ldquo;taun&rdquo; yang berarti tahun. Secara harfiah, Seren Taun bermakna menyerahkan hasil panen tahun ini dan memohon keberkahan untuk tahun berikutnya. Upacara ini mencerminkan beberapa nilai penting dalam kehidupan masyarakat Sunda, antara lain:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Rasa Syukur &ndash; Menunjukkan penghormatan terhadap anugerah alam dan berkah dari Tuhan.</p>\n</li>\n<li>\n<p>Keselarasan dengan Alam &ndash; Mengajarkan pentingnya menjaga keseimbangan ekosistem agar hasil panen tetap lestari.</p>\n</li>\n<li>\n<p>Kebersamaan dan Gotong Royong &ndash; Melibatkan seluruh masyarakat dalam proses perayaan, memperkuat ikatan sosial.</p>\n</li>\n</ol>\n<h3>Rangkaian Prosesi Upacara Seren Taun</h3>\n<p>Upacara Seren Taun biasanya berlangsung selama beberapa hari dengan serangkaian prosesi adat yang sakral dan penuh simbolisme. Berikut adalah tahapan utama dalam upacara tersebut:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Ngakol &ndash; Proses awal panen padi yang akan disimpan di lumbung sebagai simbol ketahanan pangan.</p>\n</li>\n<li>\n<p>Penyimpanan Pare (Padi) ke Leuit &ndash; Leuit atau lumbung padi menjadi simbol kesejahteraan dan keberlanjutan hidup masyarakat.</p>\n</li>\n<li>\n<p>Ritual Ngaruwat Bumi &ndash; Prosesi pembersihan dan penyucian lingkungan sebagai bentuk penghormatan kepada alam.</p>\n</li>\n<li>\n<p>Kirab Budaya &ndash; Arak-arakan hasil panen yang diiringi kesenian tradisional, seperti angklung, tarian, dan gamelan Sunda.</p>\n</li>\n<li>\n<p>Doa dan Persembahan &ndash; Dipimpin oleh tetua adat, dilakukan sebagai wujud permohonan berkah untuk masa depan.</p>\n</li>\n</ol>\n<h3>Peran Seren Taun dalam Kehidupan Sosial dan Budaya</h3>\n<p>Selain memiliki makna spiritual dan ekologis, Seren Taun juga menjadi ajang pelestarian budaya Sunda. Acara ini tidak hanya dihadiri oleh masyarakat lokal, tetapi juga menarik wisatawan dan peneliti budaya dari berbagai daerah. Beberapa aspek sosial dan budaya yang terkait dengan Seren Taun adalah:</p>\n<ul data-spread="false">\n<li>\n<p>Pelestarian Tradisi &ndash; Seren Taun menjaga eksistensi budaya Sunda di tengah modernisasi.</p>\n</li>\n<li>\n<p>Pariwisata Budaya &ndash; Upacara ini menjadi daya tarik wisata yang mengenalkan kearifan lokal kepada dunia luar.</p>\n</li>\n<li>\n<p>Pendidikan Nilai Kearifan Lokal &ndash; Mengajarkan generasi muda tentang pentingnya adat istiadat dan penghormatan terhadap alam.</p>\n</li>\n</ul>\n<h3>Seren Taun di Era Modern</h3>\n<p>Meskipun zaman terus berkembang, Seren Taun tetap dipertahankan dengan beberapa adaptasi. Digitalisasi dan dokumentasi budaya membantu memperkenalkan upacara ini ke khalayak yang lebih luas. Pemerintah daerah dan komunitas budaya juga turut berperan dalam melestarikan tradisi ini dengan mendukung penyelenggaraan acara secara berkelanjutan.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>Seren Taun adalah lebih dari sekadar upacara panen; ini adalah simbol harmonisasi antara manusia, alam, dan Sang Pencipta. Melalui tradisi ini, masyarakat Sunda mengajarkan nilai-nilai luhur yang relevan bagi kehidupan modern, seperti rasa syukur, kebersamaan, dan pelestarian lingkungan. Dengan menjaga dan mempromosikan Seren Taun, kita tidak hanya melestarikan budaya, tetapi juga memperkuat identitas bangsa.</p>', 'publish', '2025-03-14 06:45:06', '2025-03-14 06:47:05', '2025-04-20 10:56:53', NULL),
	(9, 'Ritual Rambu Solo: Prosesi Pemakaman Suku Toraja yang Megah', 'ritual-rambu-solo-prosesi-pemakaman-suku-toraja-yang-megah', 1090, 1, 4, 'artikel/01JP9PMJ9VPKTSHR0HAFSEY0XS.jpg', 'Suku Toraja di Sulawesi Selatan memiliki tradisi pemakaman yang unik dan megah yang dikenal sebagai Rambu Solo. Ritual ini bukan sekadar prosesi pemakaman, tetapi juga menjadi bentuk penghormatan terakhir kepada leluhur serta simbol status sosial keluarga yang ditinggalkan. Dengan persiapan yang panjang dan melibatkan banyak orang, Rambu Solo menjadi salah satu warisan budaya Indonesia yang terkenal hingga mancanegara.', 'Rambu Solo, pemakaman Suku Toraja, Sulawesi Selatan, ritual kematian, penghormatan leluhur, Puya, alam roh, stratifikasi sosial, penyimpanan jenazah, rante, tempat upacara, penyembelihan kerbau, Ma\'tinggoro Tedong, Tedong Bonga, tari adat Toraja, nyanyian adat, pemakaman tebing, kuburan batu, Lakkian, rumah pemakaman, warisan budaya, pelestarian budaya, kearifan lokal, modernisasi ritual, tradisi Nusantara.', '<p>Suku Toraja di Sulawesi Selatan memiliki tradisi pemakaman yang unik dan megah yang dikenal sebagai Rambu Solo. Ritual ini bukan sekadar prosesi pemakaman, tetapi juga menjadi bentuk penghormatan terakhir kepada leluhur serta simbol status sosial keluarga yang ditinggalkan. Dengan persiapan yang panjang dan melibatkan banyak orang, Rambu Solo menjadi salah satu warisan budaya Indonesia yang terkenal hingga mancanegara.</p>\n<h3>Makna dan Filosofi Rambu Solo</h3>\n<p>Dalam kepercayaan masyarakat Toraja, kematian bukanlah akhir dari kehidupan, melainkan perjalanan menuju alam roh. Rambu Solo dianggap sebagai syarat utama agar arwah orang yang meninggal dapat mencapai Puya (alam akhirat) dengan tenang. Tanpa ritual ini, roh orang yang meninggal diyakini masih berada di dunia dan belum bisa beristirahat dengan damai.</p>\n<h3>Tahapan Prosesi Rambu Solo</h3>\n<p>Ritual Rambu Solo terdiri dari beberapa tahapan yang dilakukan secara berurutan, tergantung pada status sosial almarhum dan keluarganya. Beberapa tahap penting dalam upacara ini antara lain:</p>\n<ol start="1" data-spread="true">\n<li>\n<p>Penyimpanan Jenazah</p>\n<ul data-spread="false">\n<li>\n<p>Sebelum upacara dilaksanakan, jenazah yang meninggal disimpan dalam rumah keluarga selama berbulan-bulan atau bahkan bertahun-tahun.</p>\n</li>\n<li>\n<p>Jenazah dianggap sebagai "orang sakit" yang masih hidup sampai seluruh prosesi pemakaman selesai.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Pembangunan Rante (Tempat Upacara)</p>\n<ul data-spread="false">\n<li>\n<p>Rante adalah area khusus yang digunakan untuk pelaksanaan upacara.</p>\n</li>\n<li>\n<p>Di tempat ini, keluarga besar dan tamu berkumpul untuk mengikuti seluruh rangkaian acara.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Penyembelihan Kerbau dan Babi</p>\n<ul data-spread="false">\n<li>\n<p>Salah satu bagian utama dalam Rambu Solo adalah penyembelihan kerbau yang disebut Ma\'tinggoro Tedong.</p>\n</li>\n<li>\n<p>Semakin banyak jumlah kerbau yang disembelih, semakin tinggi status sosial keluarga yang mengadakan upacara.</p>\n</li>\n<li>\n<p>Kerbau belang atau Tedong Bonga memiliki nilai tinggi dan sering dijadikan simbol kemewahan.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Tari-Tarian dan Nyanyian Adat</p>\n<ul data-spread="false">\n<li>\n<p>Prosesi diiringi dengan tarian dan nyanyian khas Toraja sebagai bentuk penghormatan kepada almarhum.</p>\n</li>\n<li>\n<p>Tarian ini juga mencerminkan kesedihan dan penghormatan terhadap roh yang meninggal.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Pemakaman di Tebing atau Kuburan Batu</p>\n<ul data-spread="false">\n<li>\n<p>Jenazah dimakamkan di tebing batu atau gua, sesuai dengan adat setempat.</p>\n</li>\n<li>\n<p>Beberapa keluarga bangsawan memiliki makam khusus yang disebut Lakkian, yaitu rumah pemakaman yang dihiasi ukiran khas Toraja.</p>\n</li>\n</ul>\n</li>\n</ol>\n<h3>Simbol Status Sosial dan Budaya</h3>\n<p>Rambu Solo bukan hanya ritual keagamaan, tetapi juga menunjukkan stratifikasi sosial di masyarakat Toraja. Keluarga yang mampu menyelenggarakan upacara besar dianggap memiliki kedudukan tinggi dalam masyarakat. Oleh karena itu, banyak keluarga yang menabung bertahun-tahun agar dapat melaksanakan upacara dengan layak.</p>\n<h3>Rambu Solo di Era Modern</h3>\n<p>Meskipun zaman terus berubah, Rambu Solo tetap dijaga sebagai warisan budaya yang penting. Pemerintah daerah dan komunitas budaya berusaha untuk mempertahankan ritual ini agar tetap lestari, meskipun ada adaptasi dalam beberapa aspek agar lebih sesuai dengan kondisi ekonomi dan sosial masyarakat saat ini.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Rambu Solo adalah bukti nyata kekayaan budaya Indonesia yang penuh dengan nilai spiritual, sosial, dan estetika. Ritual ini bukan hanya tentang kematian, tetapi juga mengenai kehidupan, kebersamaan, dan penghormatan terhadap leluhur. Dengan menjaga dan menghargai Rambu Solo, kita ikut serta dalam pelestarian budaya Nusantara yang kaya dan beragam.</p>', 'publish', '2025-03-14 06:47:24', '2025-03-14 06:49:31', '2025-06-07 08:38:59', NULL),
	(10, 'Bakar Batu: Tradisi Memasak Bersama dalam Budaya Papua', 'bakar-batu-tradisi-memasak-bersama-dalam-budaya-papua', 791, 1, 4, 'artikel/01JP9PR749GMAZ1Z9B2JTHEF8G.jpg', 'Papua memiliki berbagai tradisi yang mencerminkan kearifan lokal dan kebersamaan dalam masyarakatnya. Salah satu tradisi yang paling terkenal adalah Bakar Batu, yaitu ritual memasak bersama yang dilakukan oleh berbagai suku di Papua, seperti Dani, Lani, dan Yali. Lebih dari sekadar cara memasak, Bakar Batu merupakan simbol persatuan, gotong royong, dan penghormatan terhadap leluhur.', 'Bakar Batu, tradisi Papua, suku Dani, suku Lani, suku Yali, gotong royong, kebersamaan, rekonsiliasi, ritual adat, penghormatan leluhur, batu panas, kayu bakar, penyembelihan hewan, umbi-umbian, lubang tanah, daun pisang, proses memasak, makan bersama, kesetaraan sosial, budaya Papua, wisata budaya, pelestarian tradisi, warisan leluhur, kearifan lokal.', '<p>Papua memiliki berbagai tradisi yang mencerminkan kearifan lokal dan kebersamaan dalam masyarakatnya. Salah satu tradisi yang paling terkenal adalah Bakar Batu, yaitu ritual memasak bersama yang dilakukan oleh berbagai suku di Papua, seperti Dani, Lani, dan Yali. Lebih dari sekadar cara memasak, Bakar Batu merupakan simbol persatuan, gotong royong, dan penghormatan terhadap leluhur.</p>\n<h3>Makna dan Filosofi Bakar Batu</h3>\n<p>Bakar Batu bukan hanya sekadar tradisi kuliner, tetapi juga memiliki makna mendalam dalam kehidupan masyarakat Papua. Beberapa filosofi yang terkandung dalam tradisi ini antara lain:</p>\n<ol start="1" data-spread="false">\n<li>\n<p>Kebersamaan dan Gotong Royong &ndash; Semua anggota suku berpartisipasi dalam proses persiapan dan memasak.</p>\n</li>\n<li>\n<p>Ungkapan Rasa Syukur &ndash; Biasanya dilakukan dalam perayaan penting, seperti panen, pernikahan, atau penyambutan tamu.</p>\n</li>\n<li>\n<p>Perdamaian &ndash; Sering kali digunakan sebagai sarana rekonsiliasi antar kelompok yang bertikai.</p>\n</li>\n</ol>\n<h3>Proses Pelaksanaan Bakar Batu</h3>\n<p>Ritual Bakar Batu dilakukan secara bertahap dengan persiapan yang matang. Berikut adalah langkah-langkah dalam prosesnya:</p>\n<ol start="1" data-spread="true">\n<li>\n<p>Pengumpulan Batuan dan Kayu Bakar</p>\n<ul data-spread="false">\n<li>\n<p>Batu-batu besar dikumpulkan untuk dipanaskan di atas tumpukan kayu yang dibakar hingga membara.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Penyembelihan Hewan</p>\n<ul data-spread="false">\n<li>\n<p>Hewan seperti babi, ayam, atau kelinci disiapkan untuk dimasak bersama sayur dan umbi-umbian.</p>\n</li>\n<li>\n<p>Proses ini sering kali diawali dengan doa atau ritual adat.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Pembuatan Lubang dan Penyusunan Makanan</p>\n<ul data-spread="false">\n<li>\n<p>Sebuah lubang besar digali dan dialasi dengan dedaunan.</p>\n</li>\n<li>\n<p>Batu panas dimasukkan ke dalam lubang, lalu makanan disusun berlapis-lapis bersama daun pisang agar matang secara merata.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Proses Memasak</p>\n<ul data-spread="false">\n<li>\n<p>Setelah makanan tertata, batu panas tambahan ditaruh di atasnya, kemudian ditutup dengan dedaunan dan tanah untuk menjaga panas.</p>\n</li>\n<li>\n<p>Proses memasak berlangsung selama beberapa jam hingga makanan siap dikonsumsi.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Makan Bersama</p>\n<ul data-spread="false">\n<li>\n<p>Setelah matang, makanan dibuka dan dibagikan kepada seluruh peserta.</p>\n</li>\n<li>\n<p>Tidak ada perbedaan kasta atau status sosial dalam pembagian makanan, mencerminkan nilai kesetaraan dalam budaya Papua.</p>\n</li>\n</ul>\n</li>\n</ol>\n<h3>Bakar Batu di Era Modern</h3>\n<p>Meskipun zaman semakin modern, tradisi Bakar Batu tetap dilestarikan dan bahkan dijadikan daya tarik wisata budaya di Papua. Banyak acara pemerintah dan komunitas yang mengadakan ritual ini untuk memperkenalkan budaya Papua kepada masyarakat luas. Selain itu, adaptasi juga dilakukan dengan menggunakan bahan makanan yang lebih variatif.</p>\n<h3>Kesimpulan</h3>\n<p>&nbsp;</p>\n<p>Bakar Batu adalah lebih dari sekadar cara memasak; ini adalah warisan budaya yang mencerminkan kebersamaan, gotong royong, dan penghormatan terhadap tradisi leluhur. Dengan menjaga dan melestarikan tradisi ini, masyarakat Papua tidak hanya mempertahankan identitas budayanya tetapi juga menunjukkan nilai-nilai luhur yang dapat menjadi inspirasi bagi generasi masa kini dan mendatang.</p>', 'premium', '2025-03-14 06:49:45', '2025-03-14 06:51:30', '2025-05-30 19:40:11', NULL),
	(11, 'asdjkasnd asjdkad ajskdn', 'asdjkasnd-asjdkad-ajskdn', 35, 1, 3, NULL, 'Litora fermentum neque hendrerit letius nunc. Taciti tempor justo dictumst per duis ultricies lacinia class magnis dis. Sem ultricies finibus vitae congue erat laoreet augue blandit nascetur dictum.', 'asdasd,asdad,asdasd,asdasd,asdsda,asdasd,asdasda', '<p>Dictumst augue donec nisl egestas rhoncus quisque ut per tristique. Massa cubilia ad nisl luctus enim gravida dignissim diam. In vulputate quam penatibus lacus orci suscipit. Parturient pharetra netus semper letius platea congue amet vulputate risus. Fermentum gravida ac pulvinar facilisis pellentesque dapibus tortor maximus tellus lacus nibh.</p>\n<p>&nbsp;</p>\n<p>Integer primis enim accumsan venenatis fusce ipsum fringilla elit quam si aptent. Primis erat ultrices cubilia magnis iaculis consectetur efficitur. Laoreet habitant enim nulla vel nec pellentesque. Fames ligula finibus velit sit maximus accumsan arcu suscipit. Parturient dapibus ante quam sed laoreet pede nibh condimentum lectus. Luctus scelerisque si sociosqu duis letius senectus at eu sem. Platea si mus ad tellus neque quis gravida inceptos. Curabitur ridiculus suscipit netus nunc semper aenean.</p>\n<p>&nbsp;</p>\n<p>Felis consequat elementum natoque tellus inceptos rutrum blandit leo quis pharetra. Mauris purus sed torquent diam bibendum imperdiet senectus mus ultrices pede sodales. Sit lorem iaculis purus tristique nullam placerat vestibulum odio cras. Nascetur nec imperdiet cras suspendisse porttitor eu amet aenean. Neque maecenas justo sociosqu suspendisse parturient pretium dui semper felis metus. Quam scelerisque nostra porta nec vestibulum si finibus at. Suspendisse magna nibh amet cras habitasse.</p>', 'premium', '2025-04-15 15:16:57', '2025-04-15 15:17:46', '2025-06-07 08:41:09', NULL);

-- membuang struktur untuk table sanggar_nusantara.bahasa_daerah
CREATE TABLE IF NOT EXISTS `bahasa_daerah` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah_penutur` int NOT NULL,
  `kategori` enum('tradisional','modern') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.bahasa_daerah: ~6 rows (lebih kurang)
DELETE FROM `bahasa_daerah`;
INSERT INTO `bahasa_daerah` (`id`, `nama`, `asal`, `jumlah_penutur`, `kategori`, `deskripsi`, `image`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Jawa', 'Jawa Tengah, Jawa Timur, DI Yogyakarta', 82500000, 'tradisional', 'Bahasa Jawa adalah salah satu bahasa daerah dengan jumlah penutur terbanyak di Indonesia.', 'Ragam Indonesia/Bahasa Daerah/01JP9T0XP419RT775AQDEVG0H4.png', '-7.7956', '110.3695', NULL, '2025-03-14 07:48:41', NULL),
	(2, 'Sunda', 'Jawa Barat, Banten', 42000000, 'tradisional', 'Bahasa Sunda digunakan oleh masyarakat di wilayah Jawa Barat dan Banten.', NULL, '-6.9147', '107.6098', NULL, NULL, NULL),
	(3, 'Batak', 'Sumatera Utara', 8000000, 'tradisional', 'Bahasa Batak terdiri dari beberapa dialek seperti Batak Toba, Batak Karo, dan lainnya.', NULL, '2.1153', '98.9999', NULL, NULL, NULL),
	(4, 'Minangkabau', 'Sumatera Barat', 6500000, 'tradisional', 'Bahasa Minangkabau digunakan oleh masyarakat Sumatera Barat dan perantauan Minang.', NULL, '-0.9492', '100.3543', NULL, NULL, NULL),
	(5, 'Bugis', 'Sulawesi Selatan', 5000000, 'tradisional', 'Bahasa Bugis digunakan oleh masyarakat di Sulawesi Selatan dan sekitarnya.', NULL, '-5.1477', '119.4327', NULL, NULL, NULL),
	(6, 'Betawi', 'DKI Jakarta', 5000000, 'modern', 'Bahasa Betawi merupakan bahasa kreol yang berkembang di DKI Jakarta.', NULL, '-6.2088', '106.8456', NULL, NULL, NULL);

-- membuang struktur untuk table sanggar_nusantara.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.cache: ~12 rows (lebih kurang)
DELETE FROM `cache`;
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('sanggar_nusantara_cache_356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1760350728),
	('sanggar_nusantara_cache_356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1760350728;', 1760350728),
	('sanggar_nusantara_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3', 'i:1;', 1759869941),
	('sanggar_nusantara_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3:timer', 'i:1759869941;', 1759869941),
	('sanggar_nusantara_cache_livewire-rate-limiter:c249f2149727eeb79f1792b01e586e68c4ec6608', 'i:2;', 1748751201),
	('sanggar_nusantara_cache_livewire-rate-limiter:c249f2149727eeb79f1792b01e586e68c4ec6608:timer', 'i:1748751201;', 1748751201),
	('sanggar_nusantara_cache_snap_token_2698da06-4a60-479b-8110-f9b2943ac4f1', 's:36:"0e47d098-4b1e-4108-a372-f7d785410c07";', 1759418115),
	('sanggar_nusantara_cache_snap_token_2e1460b6-a235-4949-b0f1-b34bf7a08ee2', 's:36:"705fab8f-1924-4dc2-a0a1-9587023789c4";', 1748628999),
	('sanggar_nusantara_cache_snap_token_302aa520-88ad-4bab-b9aa-e3fe29caa61d', 's:36:"68e5e9c3-7720-4d18-90dc-b78861e2e788";', 1759418121),
	('sanggar_nusantara_cache_snap_token_9f7ade8d-d8ad-4c0f-bb9c-00e431ad8cf1', 's:36:"c9d09d23-0f48-4338-a06d-6018cc92bae5";', 1748629183),
	('sanggar_nusantara_cache_snap_token_e5de87d6-a20f-4384-9480-74dce152de39-1748751351', 's:36:"0d3f7dfb-f0de-45e8-8e7d-bda299364797";', 1748751652),
	('sanggar_nusantara_cache_spatie.permission.cache', 'a:3:{s:5:"alias";a:4:{s:1:"a";s:2:"id";s:1:"b";s:4:"name";s:1:"c";s:10:"guard_name";s:1:"r";s:5:"roles";}s:11:"permissions";a:246:{i:0;a:4:{s:1:"a";i:1;s:1:"b";s:9:"view_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:1;a:4:{s:1:"a";i:2;s:1:"b";s:13:"view_any_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:2;a:4:{s:1:"a";i:3;s:1:"b";s:11:"create_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:3;a:4:{s:1:"a";i:4;s:1:"b";s:11:"update_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:4;a:4:{s:1:"a";i:5;s:1:"b";s:11:"delete_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:5;a:4:{s:1:"a";i:6;s:1:"b";s:15:"delete_any_role";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:6;a:4:{s:1:"a";i:7;s:1:"b";s:16:"view_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:7;a:4:{s:1:"a";i:8;s:1:"b";s:20:"view_any_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:8;a:4:{s:1:"a";i:9;s:1:"b";s:18:"create_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:9;a:4:{s:1:"a";i:10;s:1:"b";s:18:"update_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:10;a:4:{s:1:"a";i:11;s:1:"b";s:19:"restore_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:11;a:4:{s:1:"a";i:12;s:1:"b";s:23:"restore_any_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:12;a:4:{s:1:"a";i:13;s:1:"b";s:21:"replicate_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:13;a:4:{s:1:"a";i:14;s:1:"b";s:19:"reorder_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:14;a:4:{s:1:"a";i:15;s:1:"b";s:18:"delete_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:15;a:4:{s:1:"a";i:16;s:1:"b";s:22:"delete_any_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:16;a:4:{s:1:"a";i:17;s:1:"b";s:24:"force_delete_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:17;a:4:{s:1:"a";i:18;s:1:"b";s:28:"force_delete_any_alat::musik";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:18;a:4:{s:1:"a";i:19;s:1:"b";s:12:"view_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:19;a:4:{s:1:"a";i:20;s:1:"b";s:16:"view_any_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:20;a:4:{s:1:"a";i:21;s:1:"b";s:14:"create_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:21;a:4:{s:1:"a";i:22;s:1:"b";s:14:"update_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:22;a:4:{s:1:"a";i:23;s:1:"b";s:15:"restore_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:23;a:4:{s:1:"a";i:24;s:1:"b";s:19:"restore_any_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:24;a:4:{s:1:"a";i:25;s:1:"b";s:17:"replicate_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:25;a:4:{s:1:"a";i:26;s:1:"b";s:15:"reorder_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:26;a:4:{s:1:"a";i:27;s:1:"b";s:14:"delete_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:27;a:4:{s:1:"a";i:28;s:1:"b";s:18:"delete_any_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:28;a:4:{s:1:"a";i:29;s:1:"b";s:20:"force_delete_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:29;a:4:{s:1:"a";i:30;s:1:"b";s:24:"force_delete_any_artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:30;a:4:{s:1:"a";i:31;s:1:"b";s:19:"view_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:31;a:4:{s:1:"a";i:32;s:1:"b";s:23:"view_any_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:32;a:4:{s:1:"a";i:33;s:1:"b";s:21:"create_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:33;a:4:{s:1:"a";i:34;s:1:"b";s:21:"update_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:34;a:4:{s:1:"a";i:35;s:1:"b";s:22:"restore_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:35;a:4:{s:1:"a";i:36;s:1:"b";s:26:"restore_any_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:36;a:4:{s:1:"a";i:37;s:1:"b";s:24:"replicate_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:37;a:4:{s:1:"a";i:38;s:1:"b";s:22:"reorder_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:38;a:4:{s:1:"a";i:39;s:1:"b";s:21:"delete_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:39;a:4:{s:1:"a";i:40;s:1:"b";s:25:"delete_any_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:40;a:4:{s:1:"a";i:41;s:1:"b";s:27:"force_delete_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:41;a:4:{s:1:"a";i:42;s:1:"b";s:31:"force_delete_any_bahasa::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:42;a:4:{s:1:"a";i:43;s:1:"b";s:13:"view_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:43;a:4:{s:1:"a";i:44;s:1:"b";s:17:"view_any_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:44;a:4:{s:1:"a";i:45;s:1:"b";s:15:"create_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:45;a:4:{s:1:"a";i:46;s:1:"b";s:15:"update_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:46;a:4:{s:1:"a";i:47;s:1:"b";s:16:"restore_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:47;a:4:{s:1:"a";i:48;s:1:"b";s:20:"restore_any_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:48;a:4:{s:1:"a";i:49;s:1:"b";s:18:"replicate_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:49;a:4:{s:1:"a";i:50;s:1:"b";s:16:"reorder_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:50;a:4:{s:1:"a";i:51;s:1:"b";s:15:"delete_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:51;a:4:{s:1:"a";i:52;s:1:"b";s:19:"delete_any_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:52;a:4:{s:1:"a";i:53;s:1:"b";s:21:"force_delete_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:53;a:4:{s:1:"a";i:54;s:1:"b";s:25:"force_delete_any_discount";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:54;a:4:{s:1:"a";i:55;s:1:"b";s:20:"view_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:55;a:4:{s:1:"a";i:56;s:1:"b";s:24:"view_any_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:56;a:4:{s:1:"a";i:57;s:1:"b";s:22:"create_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:57;a:4:{s:1:"a";i:58;s:1:"b";s:22:"update_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:58;a:4:{s:1:"a";i:59;s:1:"b";s:23:"restore_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:59;a:4:{s:1:"a";i:60;s:1:"b";s:27:"restore_any_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:60;a:4:{s:1:"a";i:61;s:1:"b";s:25:"replicate_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:61;a:4:{s:1:"a";i:62;s:1:"b";s:23:"reorder_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:62;a:4:{s:1:"a";i:63;s:1:"b";s:22:"delete_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:63;a:4:{s:1:"a";i:64;s:1:"b";s:26:"delete_any_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:64;a:4:{s:1:"a";i:65;s:1:"b";s:28:"force_delete_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:65;a:4:{s:1:"a";i:66;s:1:"b";s:32:"force_delete_any_discount::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:66;a:4:{s:1:"a";i:67;s:1:"b";s:19:"view_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:67;a:4:{s:1:"a";i:68;s:1:"b";s:23:"view_any_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:68;a:4:{s:1:"a";i:69;s:1:"b";s:21:"create_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:69;a:4:{s:1:"a";i:70;s:1:"b";s:21:"update_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:70;a:4:{s:1:"a";i:71;s:1:"b";s:22:"restore_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:71;a:4:{s:1:"a";i:72;s:1:"b";s:26:"restore_any_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:72;a:4:{s:1:"a";i:73;s:1:"b";s:24:"replicate_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:73;a:4:{s:1:"a";i:74;s:1:"b";s:22:"reorder_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:74;a:4:{s:1:"a";i:75;s:1:"b";s:21:"delete_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:75;a:4:{s:1:"a";i:76;s:1:"b";s:25:"delete_any_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:76;a:4:{s:1:"a";i:77;s:1:"b";s:27:"force_delete_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:77;a:4:{s:1:"a";i:78;s:1:"b";s:31:"force_delete_any_discount::user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:78;a:4:{s:1:"a";i:79;s:1:"b";s:10:"view_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:79;a:4:{s:1:"a";i:80;s:1:"b";s:14:"view_any_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:80;a:4:{s:1:"a";i:81;s:1:"b";s:12:"create_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:81;a:4:{s:1:"a";i:82;s:1:"b";s:12:"update_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:82;a:4:{s:1:"a";i:83;s:1:"b";s:13:"restore_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:83;a:4:{s:1:"a";i:84;s:1:"b";s:17:"restore_any_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:84;a:4:{s:1:"a";i:85;s:1:"b";s:15:"replicate_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:85;a:4:{s:1:"a";i:86;s:1:"b";s:13:"reorder_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:86;a:4:{s:1:"a";i:87;s:1:"b";s:12:"delete_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:87;a:4:{s:1:"a";i:88;s:1:"b";s:16:"delete_any_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:88;a:4:{s:1:"a";i:89;s:1:"b";s:18:"force_delete_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:89;a:4:{s:1:"a";i:90;s:1:"b";s:22:"force_delete_any_event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:90;a:4:{s:1:"a";i:91;s:1:"b";s:22:"view_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:91;a:4:{s:1:"a";i:92;s:1:"b";s:26:"view_any_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:92;a:4:{s:1:"a";i:93;s:1:"b";s:24:"create_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:93;a:4:{s:1:"a";i:94;s:1:"b";s:24:"update_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:94;a:4:{s:1:"a";i:95;s:1:"b";s:25:"restore_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:95;a:4:{s:1:"a";i:96;s:1:"b";s:29:"restore_any_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:96;a:4:{s:1:"a";i:97;s:1:"b";s:27:"replicate_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:97;a:4:{s:1:"a";i:98;s:1:"b";s:25:"reorder_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:98;a:4:{s:1:"a";i:99;s:1:"b";s:24:"delete_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:99;a:4:{s:1:"a";i:100;s:1:"b";s:28:"delete_any_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:100;a:4:{s:1:"a";i:101;s:1:"b";s:30:"force_delete_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:101;a:4:{s:1:"a";i:102;s:1:"b";s:34:"force_delete_any_kategori::artikel";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:102;a:4:{s:1:"a";i:103;s:1:"b";s:20:"view_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:103;a:4:{s:1:"a";i:104;s:1:"b";s:24:"view_any_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:104;a:4:{s:1:"a";i:105;s:1:"b";s:22:"create_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:105;a:4:{s:1:"a";i:106;s:1:"b";s:22:"update_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:106;a:4:{s:1:"a";i:107;s:1:"b";s:23:"restore_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:107;a:4:{s:1:"a";i:108;s:1:"b";s:27:"restore_any_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:108;a:4:{s:1:"a";i:109;s:1:"b";s:25:"replicate_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:109;a:4:{s:1:"a";i:110;s:1:"b";s:23:"reorder_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:110;a:4:{s:1:"a";i:111;s:1:"b";s:22:"delete_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:111;a:4:{s:1:"a";i:112;s:1:"b";s:26:"delete_any_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:112;a:4:{s:1:"a";i:113;s:1:"b";s:28:"force_delete_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:113;a:4:{s:1:"a";i:114;s:1:"b";s:32:"force_delete_any_kategori::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:114;a:4:{s:1:"a";i:115;s:1:"b";s:13:"view_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:115;a:4:{s:1:"a";i:116;s:1:"b";s:17:"view_any_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:116;a:4:{s:1:"a";i:117;s:1:"b";s:15:"create_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:117;a:4:{s:1:"a";i:118;s:1:"b";s:15:"update_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:118;a:4:{s:1:"a";i:119;s:1:"b";s:16:"restore_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:119;a:4:{s:1:"a";i:120;s:1:"b";s:20:"restore_any_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:120;a:4:{s:1:"a";i:121;s:1:"b";s:18:"replicate_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:121;a:4:{s:1:"a";i:122;s:1:"b";s:16:"reorder_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:122;a:4:{s:1:"a";i:123;s:1:"b";s:15:"delete_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:123;a:4:{s:1:"a";i:124;s:1:"b";s:19:"delete_any_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:124;a:4:{s:1:"a";i:125;s:1:"b";s:21:"force_delete_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:125;a:4:{s:1:"a";i:126;s:1:"b";s:25:"force_delete_any_komentar";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:126;a:4:{s:1:"a";i:127;s:1:"b";s:11:"view_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:127;a:4:{s:1:"a";i:128;s:1:"b";s:15:"view_any_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:128;a:4:{s:1:"a";i:129;s:1:"b";s:13:"create_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:129;a:4:{s:1:"a";i:130;s:1:"b";s:13:"update_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:130;a:4:{s:1:"a";i:131;s:1:"b";s:14:"restore_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:131;a:4:{s:1:"a";i:132;s:1:"b";s:18:"restore_any_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:132;a:4:{s:1:"a";i:133;s:1:"b";s:16:"replicate_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:133;a:4:{s:1:"a";i:134;s:1:"b";s:14:"reorder_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:134;a:4:{s:1:"a";i:135;s:1:"b";s:13:"delete_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:135;a:4:{s:1:"a";i:136;s:1:"b";s:17:"delete_any_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:136;a:4:{s:1:"a";i:137;s:1:"b";s:19:"force_delete_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:137;a:4:{s:1:"a";i:138;s:1:"b";s:23:"force_delete_any_kontak";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:138;a:4:{s:1:"a";i:139;s:1:"b";s:17:"view_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:139;a:4:{s:1:"a";i:140;s:1:"b";s:21:"view_any_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:140;a:4:{s:1:"a";i:141;s:1:"b";s:19:"create_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:141;a:4:{s:1:"a";i:142;s:1:"b";s:19:"update_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:142;a:4:{s:1:"a";i:143;s:1:"b";s:20:"restore_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:143;a:4:{s:1:"a";i:144;s:1:"b";s:24:"restore_any_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:144;a:4:{s:1:"a";i:145;s:1:"b";s:22:"replicate_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:145;a:4:{s:1:"a";i:146;s:1:"b";s:20:"reorder_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:146;a:4:{s:1:"a";i:147;s:1:"b";s:19:"delete_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:147;a:4:{s:1:"a";i:148;s:1:"b";s:23:"delete_any_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:148;a:4:{s:1:"a";i:149;s:1:"b";s:25:"force_delete_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:149;a:4:{s:1:"a";i:150;s:1:"b";s:29:"force_delete_any_lagu::daerah";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:150;a:4:{s:1:"a";i:151;s:1:"b";s:18:"view_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:151;a:4:{s:1:"a";i:152;s:1:"b";s:22:"view_any_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:152;a:4:{s:1:"a";i:153;s:1:"b";s:20:"create_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:153;a:4:{s:1:"a";i:154;s:1:"b";s:20:"update_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:154;a:4:{s:1:"a";i:155;s:1:"b";s:21:"restore_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:155;a:4:{s:1:"a";i:156;s:1:"b";s:25:"restore_any_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:156;a:4:{s:1:"a";i:157;s:1:"b";s:23:"replicate_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:157;a:4:{s:1:"a";i:158;s:1:"b";s:21:"reorder_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:158;a:4:{s:1:"a";i:159;s:1:"b";s:20:"delete_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:159;a:4:{s:1:"a";i:160;s:1:"b";s:24:"delete_any_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:160;a:4:{s:1:"a";i:161;s:1:"b";s:26:"force_delete_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:161;a:4:{s:1:"a";i:162;s:1:"b";s:30:"force_delete_any_makanan::khas";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:162;a:4:{s:1:"a";i:163;s:1:"b";s:10:"view_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:163;a:4:{s:1:"a";i:164;s:1:"b";s:14:"view_any_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:164;a:4:{s:1:"a";i:165;s:1:"b";s:12:"create_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:165;a:4:{s:1:"a";i:166;s:1:"b";s:12:"update_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:166;a:4:{s:1:"a";i:167;s:1:"b";s:13:"restore_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:167;a:4:{s:1:"a";i:168;s:1:"b";s:17:"restore_any_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:168;a:4:{s:1:"a";i:169;s:1:"b";s:15:"replicate_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:169;a:4:{s:1:"a";i:170;s:1:"b";s:13:"reorder_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:170;a:4:{s:1:"a";i:171;s:1:"b";s:12:"delete_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:171;a:4:{s:1:"a";i:172;s:1:"b";s:16:"delete_any_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:172;a:4:{s:1:"a";i:173;s:1:"b";s:18:"force_delete_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:173;a:4:{s:1:"a";i:174;s:1:"b";s:22:"force_delete_any_order";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:174;a:4:{s:1:"a";i:175;s:1:"b";s:21:"view_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:175;a:4:{s:1:"a";i:176;s:1:"b";s:25:"view_any_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:176;a:4:{s:1:"a";i:177;s:1:"b";s:23:"create_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:177;a:4:{s:1:"a";i:178;s:1:"b";s:23:"update_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:178;a:4:{s:1:"a";i:179;s:1:"b";s:24:"restore_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:179;a:4:{s:1:"a";i:180;s:1:"b";s:28:"restore_any_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:180;a:4:{s:1:"a";i:181;s:1:"b";s:26:"replicate_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:181;a:4:{s:1:"a";i:182;s:1:"b";s:24:"reorder_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:182;a:4:{s:1:"a";i:183;s:1:"b";s:23:"delete_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:183;a:4:{s:1:"a";i:184;s:1:"b";s:27:"delete_any_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:184;a:4:{s:1:"a";i:185;s:1:"b";s:29:"force_delete_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:185;a:4:{s:1:"a";i:186;s:1:"b";s:33:"force_delete_any_pembelian::event";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:186;a:4:{s:1:"a";i:187;s:1:"b";s:9:"view_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:187;a:4:{s:1:"a";i:188;s:1:"b";s:13:"view_any_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:188;a:4:{s:1:"a";i:189;s:1:"b";s:11:"create_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:189;a:4:{s:1:"a";i:190;s:1:"b";s:11:"update_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:190;a:4:{s:1:"a";i:191;s:1:"b";s:12:"restore_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:191;a:4:{s:1:"a";i:192;s:1:"b";s:16:"restore_any_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:192;a:4:{s:1:"a";i:193;s:1:"b";s:14:"replicate_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:193;a:4:{s:1:"a";i:194;s:1:"b";s:12:"reorder_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:194;a:4:{s:1:"a";i:195;s:1:"b";s:11:"delete_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:195;a:4:{s:1:"a";i:196;s:1:"b";s:15:"delete_any_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:196;a:4:{s:1:"a";i:197;s:1:"b";s:17:"force_delete_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:197;a:4:{s:1:"a";i:198;s:1:"b";s:21:"force_delete_any_plan";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:198;a:4:{s:1:"a";i:199;s:1:"b";s:16:"view_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:199;a:4:{s:1:"a";i:200;s:1:"b";s:20:"view_any_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:200;a:4:{s:1:"a";i:201;s:1:"b";s:18:"create_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:201;a:4:{s:1:"a";i:202;s:1:"b";s:18:"update_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:202;a:4:{s:1:"a";i:203;s:1:"b";s:19:"restore_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:203;a:4:{s:1:"a";i:204;s:1:"b";s:23:"restore_any_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:204;a:4:{s:1:"a";i:205;s:1:"b";s:21:"replicate_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:205;a:4:{s:1:"a";i:206;s:1:"b";s:19:"reorder_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:206;a:4:{s:1:"a";i:207;s:1:"b";s:18:"delete_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:207;a:4:{s:1:"a";i:208;s:1:"b";s:22:"delete_any_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:208;a:4:{s:1:"a";i:209;s:1:"b";s:24:"force_delete_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:209;a:4:{s:1:"a";i:210;s:1:"b";s:28:"force_delete_any_rumah::adat";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:210;a:4:{s:1:"a";i:211;s:1:"b";s:15:"view_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:211;a:4:{s:1:"a";i:212;s:1:"b";s:19:"view_any_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:212;a:4:{s:1:"a";i:213;s:1:"b";s:17:"create_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:213;a:4:{s:1:"a";i:214;s:1:"b";s:17:"update_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:214;a:4:{s:1:"a";i:215;s:1:"b";s:18:"restore_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:215;a:4:{s:1:"a";i:216;s:1:"b";s:22:"restore_any_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:216;a:4:{s:1:"a";i:217;s:1:"b";s:20:"replicate_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:217;a:4:{s:1:"a";i:218;s:1:"b";s:18:"reorder_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:218;a:4:{s:1:"a";i:219;s:1:"b";s:17:"delete_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:219;a:4:{s:1:"a";i:220;s:1:"b";s:21:"delete_any_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:220;a:4:{s:1:"a";i:221;s:1:"b";s:23:"force_delete_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:221;a:4:{s:1:"a";i:222;s:1:"b";s:27:"force_delete_any_seni::tari";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:222;a:4:{s:1:"a";i:223;s:1:"b";s:17:"view_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:223;a:4:{s:1:"a";i:224;s:1:"b";s:21:"view_any_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:224;a:4:{s:1:"a";i:225;s:1:"b";s:19:"create_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:225;a:4:{s:1:"a";i:226;s:1:"b";s:19:"update_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:226;a:4:{s:1:"a";i:227;s:1:"b";s:20:"restore_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:227;a:4:{s:1:"a";i:228;s:1:"b";s:24:"restore_any_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:228;a:4:{s:1:"a";i:229;s:1:"b";s:22:"replicate_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:229;a:4:{s:1:"a";i:230;s:1:"b";s:20:"reorder_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:230;a:4:{s:1:"a";i:231;s:1:"b";s:19:"delete_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:231;a:4:{s:1:"a";i:232;s:1:"b";s:23:"delete_any_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:232;a:4:{s:1:"a";i:233;s:1:"b";s:25:"force_delete_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:233;a:4:{s:1:"a";i:234;s:1:"b";s:29:"force_delete_any_subscription";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:234;a:4:{s:1:"a";i:235;s:1:"b";s:9:"view_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:235;a:4:{s:1:"a";i:236;s:1:"b";s:13:"view_any_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:236;a:4:{s:1:"a";i:237;s:1:"b";s:11:"create_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:237;a:4:{s:1:"a";i:238;s:1:"b";s:11:"update_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:238;a:4:{s:1:"a";i:239;s:1:"b";s:12:"restore_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:239;a:4:{s:1:"a";i:240;s:1:"b";s:16:"restore_any_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:240;a:4:{s:1:"a";i:241;s:1:"b";s:14:"replicate_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:241;a:4:{s:1:"a";i:242;s:1:"b";s:12:"reorder_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:242;a:4:{s:1:"a";i:243;s:1:"b";s:11:"delete_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:243;a:4:{s:1:"a";i:244;s:1:"b";s:15:"delete_any_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:244;a:4:{s:1:"a";i:245;s:1:"b";s:17:"force_delete_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:245;a:4:{s:1:"a";i:246;s:1:"b";s:21:"force_delete_any_user";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}}s:5:"roles";a:1:{i:0;a:3:{s:1:"a";i:1;s:1:"b";s:11:"super_admin";s:1:"c";s:3:"web";}}}', 1760464096);

-- membuang struktur untuk table sanggar_nusantara.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.cache_locks: ~0 rows (lebih kurang)
DELETE FROM `cache_locks`;

-- membuang struktur untuk table sanggar_nusantara.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `item_id` int NOT NULL,
  `item_type` enum('subscription','product','event','course') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int NOT NULL DEFAULT '1',
  `variasi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga` int NOT NULL,
  `subtotal` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.carts: ~0 rows (lebih kurang)
DELETE FROM `carts`;
INSERT INTO `carts` (`id`, `user_id`, `item_id`, `item_type`, `jumlah`, `variasi`, `harga`, `subtotal`, `created_at`, `updated_at`) VALUES
	(58, 1, 1, 'event', 2, 'VIP', 10000, 20000, '2025-10-14 11:25:28', '2025-10-14 11:25:28');

-- membuang struktur untuk table sanggar_nusantara.challenges
CREATE TABLE IF NOT EXISTS `challenges` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Tidak Ada Slug',
  `status` enum('premium','gratis') DEFAULT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `duration_days` int DEFAULT '0',
  `nusantara_points` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.challenges: ~5 rows (lebih kurang)
DELETE FROM `challenges`;
INSERT INTO `challenges` (`id`, `title`, `slug`, `status`, `description`, `image`, `duration_days`, `nusantara_points`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Eksplorasi Bahasa Daerah', 'eksplorasi-bahasa-daerah', 'gratis', 'Tantangan untuk mempelajari dan memperkenalkan minimal 3 kosa kata dari bahasa daerah pilihanmu. Unggah video singkat memperkenalkan arti dan penggunaannya!', 'challenges/01K708RJ59MTF5HT3K0H93NCV4.jpg', 4, 60, '2025-10-07 20:47:37', '2025-10-14 07:27:07', NULL),
	(2, 'Kenali Rumah Adat Nusantara', 'kenali-rumah-adat-nusantara', 'premium', 'Ajak teman-temanmu mengenal rumah adat dari provinsimu! Unggah foto rumah adat beserta penjelasan singkat tentang filosofi dan sejarahnya.', '', 10, 75, '2025-10-07 20:47:37', '2025-10-13 09:31:00', NULL),
	(3, 'Gerak Tari Tradisional', 'gerak-tari-tradisional', 'gratis', 'Pelajari salah satu tarian tradisional dari daerah lain dan unggah video 30 detik saat kamu mempraktikkannya. Tunjukkan semangat pelestarian budaya!', '', 14, 100, '2025-10-07 20:47:37', '2025-10-13 09:30:59', NULL),
	(4, 'Cita Rasa Nusantara', 'cita-rasa-nusantara', 'gratis', 'Buat ulang makanan khas daerahmu di rumah dan ceritakan makna budaya di balik hidangan tersebut.', '', 10, 80, '2025-10-07 20:47:37', '2025-10-13 09:30:57', NULL),
	(5, 'Nada dari Timur', 'nada-dari-timur', 'premium', 'Pelajari alat musik tradisional dari wilayah Indonesia Timur dan mainkan satu lagu daerah menggunakan alat tersebut.', '', 12, 120, '2025-10-07 20:47:37', '2025-10-13 09:30:56', NULL);

-- membuang struktur untuk table sanggar_nusantara.challenge_participants
CREATE TABLE IF NOT EXISTS `challenge_participants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `challenge_id` bigint unsigned NOT NULL,
  `status` enum('in_progres','completed','failed','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'in_progres',
  `started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `fk_participant_user` (`user_id`),
  KEY `fk_participant_challenge` (`challenge_id`),
  CONSTRAINT `fk_participant_challenge` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_participant_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.challenge_participants: ~6 rows (lebih kurang)
DELETE FROM `challenge_participants`;
INSERT INTO `challenge_participants` (`id`, `uuid`, `user_id`, `challenge_id`, `status`, `started_at`, `completed_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, '09e272e7-a8d3-11f0-a419-005056c00001', 1, 1, 'completed', '2025-10-10 23:37:39', '2025-10-13 14:25:49', '2025-10-07 22:37:21', '2025-10-14 08:23:45', NULL),
	(2, '09e279f9-a8d3-11f0-a419-005056c00001', 2, 2, 'completed', '2025-10-07 23:38:02', '2024-12-27 23:38:03', '2025-10-07 22:37:21', '2025-10-14 07:54:40', NULL),
	(3, '09e27c10-a8d3-11f0-a419-005056c00001', 1, 3, 'failed', '2025-10-07 23:46:46', NULL, '2025-10-07 22:37:21', '2025-10-14 09:25:50', NULL),
	(4, '09e27dba-a8d3-11f0-a419-005056c00001', 3, 4, 'completed', '2025-10-07 23:46:46', NULL, '2025-10-07 22:37:21', '2025-10-14 09:22:06', NULL),
	(5, '09e27f46-a8d3-11f0-a419-005056c00001', 2, 5, 'in_progres', '2025-10-07 23:46:46', NULL, '2025-10-07 22:37:21', '2025-10-14 09:22:03', NULL),
	(6, '09e280c7-a8d3-11f0-a419-005056c00001', 1, 4, 'failed', '2025-10-07 23:46:46', '2025-10-07 23:49:24', '2025-10-07 23:48:16', '2025-10-14 09:31:19', NULL);

-- membuang struktur untuk table sanggar_nusantara.challenge_progres
CREATE TABLE IF NOT EXISTS `challenge_progres` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `challenge_participant_id` bigint unsigned NOT NULL,
  `day_number` int NOT NULL,
  `image_bukti` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `admin_note` varchar(255) DEFAULT NULL,
  `verified_by` bigint unsigned DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_progres_participant` (`challenge_participant_id`),
  KEY `fk_progres_verifier` (`verified_by`),
  CONSTRAINT `fk_progres_participant` FOREIGN KEY (`challenge_participant_id`) REFERENCES `challenge_participants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progres_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.challenge_progres: ~9 rows (lebih kurang)
DELETE FROM `challenge_progres`;
INSERT INTO `challenge_progres` (`id`, `challenge_participant_id`, `day_number`, `image_bukti`, `status`, `admin_note`, `verified_by`, `verified_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 1, '01K7EH53CYXJAQXKY3WCC7QSJT.jpg', 'approved', 'Bagus, lanjutkan', 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:16:44', NULL),
	(2, 1, 2, '01K7EH7SBEJ09DKJYPNBF3M95J.jpg', 'approved', 'Tarik Terus Slurrr, Jangan Mundur', NULL, NULL, '2025-10-07 22:50:40', '2025-10-13 10:18:30', NULL),
	(3, 2, 1, '', 'approved', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:18:59', NULL),
	(4, 2, 2, '', 'approved', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:19:00', NULL),
	(5, 2, 3, '', 'approved', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:19:00', NULL),
	(6, 3, 1, '', 'pending', NULL, NULL, NULL, '2025-10-07 22:50:40', '2025-10-13 10:19:02', NULL),
	(7, 4, 1, '', 'approved', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:19:01', NULL),
	(8, 4, 2, '', 'rejected', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:19:02', NULL),
	(9, 5, 1, '', 'approved', NULL, 4, '2025-10-07 22:50:40', '2025-10-07 22:50:40', '2025-10-13 10:19:03', NULL),
	(11, 1, 3, 'challenge_progres/scrMWUb2l4Su6lY3DrfljxcyDmNKaJB5et67zpu6.jpg', 'approved', NULL, NULL, NULL, '2025-10-13 14:24:26', '2025-10-14 07:37:26', NULL),
	(12, 1, 4, 'challenge_progres/YAEg3lbU2lGnNDJlEwko8SvRLdEkix9TQYTFyNvY.png', 'approved', NULL, NULL, NULL, '2025-10-14 07:35:06', '2025-10-14 07:37:46', NULL);

-- membuang struktur untuk table sanggar_nusantara.discounts
CREATE TABLE IF NOT EXISTS `discounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('percentage','fixed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `min_purchase` int DEFAULT NULL,
  `max_discount` int DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `usage_limit` int DEFAULT NULL,
  `usage_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discounts_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.discounts: ~3 rows (lebih kurang)
DELETE FROM `discounts`;
INSERT INTO `discounts` (`id`, `name`, `type`, `amount`, `code`, `min_purchase`, `max_discount`, `start_date`, `end_date`, `usage_limit`, `usage_count`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Diskon Pertama', 'fixed', 10000, 'DIS-001-OKWJ', 700000, NULL, '2025-04-10 13:53:12', '2029-08-14 13:53:14', 100, 1, '2025-03-14 06:53:23', '2025-10-02 15:06:34', NULL),
	(2, 'Diskon Coba 2', 'percentage', 10, 'DIS-002-AJKSL', 10000, NULL, '2025-03-14 13:54:00', '2029-11-14 13:54:03', 999, 6, '2025-03-14 06:54:11', '2025-10-02 15:12:34', NULL),
	(3, 'Diskon Tahun 2025', 'fixed', 30000, 'DIS-003-KLNASD', 3000, NULL, '2025-03-14 13:55:06', '2025-04-19 13:55:08', 999, 0, '2025-03-14 06:55:15', '2025-03-14 06:55:15', NULL);

-- membuang struktur untuk table sanggar_nusantara.discount_events
CREATE TABLE IF NOT EXISTS `discount_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `discount_id` bigint unsigned NOT NULL,
  `event_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discount_events_discount_id_foreign` (`discount_id`),
  KEY `discount_events_event_id_foreign` (`event_id`),
  CONSTRAINT `discount_events_discount_id_foreign` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discount_events_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.discount_events: ~0 rows (lebih kurang)
DELETE FROM `discount_events`;

-- membuang struktur untuk table sanggar_nusantara.discount_users
CREATE TABLE IF NOT EXISTS `discount_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `discount_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `used_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discount_users_discount_id_foreign` (`discount_id`),
  KEY `discount_users_user_id_foreign` (`user_id`),
  CONSTRAINT `discount_users_discount_id_foreign` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discount_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.discount_users: ~4 rows (lebih kurang)
DELETE FROM `discount_users`;
INSERT INTO `discount_users` (`id`, `discount_id`, `user_id`, `used_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(2, 2, 1, '2025-05-30 17:26:38', '2025-05-30 17:26:38', '2025-10-02 15:07:39', '2025-10-02 15:07:39'),
	(4, 2, 2, '2025-06-07 08:40:26', '2025-06-07 08:40:26', '2025-06-07 08:40:26', NULL),
	(5, 2, 1, '2025-10-02 15:09:42', '2025-10-02 15:09:42', '2025-10-02 15:12:02', '2025-10-02 15:12:02'),
	(6, 2, 1, '2025-10-02 15:09:48', '2025-10-02 15:09:48', '2025-10-02 15:12:02', '2025-10-02 15:12:02'),
	(7, 2, 1, '2025-10-02 15:12:34', '2025-10-02 15:12:34', '2025-10-02 15:12:34', NULL);

-- membuang struktur untuk table sanggar_nusantara.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kategori_event_id` bigint unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_event` enum('draft','publish','premium') COLLATE utf8mb4_unicode_ci NOT NULL,
  `keyword` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` timestamp NOT NULL,
  `link_gmap` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `events_slug_unique` (`slug`),
  KEY `events_kategori_event_id_foreign` (`kategori_event_id`),
  CONSTRAINT `events_kategori_event_id_foreign` FOREIGN KEY (`kategori_event_id`) REFERENCES `kategori_events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.events: ~5 rows (lebih kurang)
DELETE FROM `events`;
INSERT INTO `events` (`id`, `kategori_event_id`, `nama`, `slug`, `image`, `status_event`, `keyword`, `excerpt`, `deskripsi`, `tempat`, `tanggal`, `link_gmap`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'Festival Gunung Slamet 2025', 'festival-gunung-slamet-2025', 'Event/01JP9QRK4YXB6HECXKMWJZMPYQ.jpeg', 'publish', 'Festival Gunung Slamet 2025, Kirab Budaya, Ritual Sesaji Slamet, pertunjukan seni, musik etnik, konser musik, mendaki Gunung Slamet, ekowisata, camping ground, susur sungai, festival kuliner, sate buntel, nasi liwet, lomba fotografi, lomba videografi, pameran budaya, D\'Las Lembah Asri, Purbalingga, wisata alam, pelestarian lingkungan, petualangan, harmoni alam dan budaya.', 'Festival Gunung Slamet 2025 kembali hadir sebagai perayaan megah yang menggabungkan keindahan alam dengan kekayaan budaya lokal. Acara tahunan ini menjadi momen yang ditunggu-tunggu oleh para pecinta seni, budaya, dan petualangan. Dengan latar belakang megah Gunung Slamet, festival ini akan menjadi panggung bagi berbagai ekspresi budaya, pertunjukan seni, dan aktivitas luar ruangan yang menggugah jiwa.', '<h2>FESTIVAL GUNUNG SLAMET 2025: Merayakan Harmoni Alam dan Budaya</h2>\n<p>Festival Gunung Slamet 2025 kembali hadir sebagai perayaan megah yang menggabungkan keindahan alam dengan kekayaan budaya lokal. Acara tahunan ini menjadi momen yang ditunggu-tunggu oleh para pecinta seni, budaya, dan petualangan. Dengan latar belakang megah Gunung Slamet, festival ini akan menjadi panggung bagi berbagai ekspresi budaya, pertunjukan seni, dan aktivitas luar ruangan yang menggugah jiwa.</p>\n<h3>Keistimewaan Festival Gunung Slamet 2025</h3>\n<p>🌿 Kirab Budaya &amp; Ritual Adat<br />Festival ini akan dibuka dengan Kirab Budaya, arak-arakan meriah yang menampilkan berbagai kesenian tradisional, pakaian adat, dan simbol budaya daerah sekitar Gunung Slamet. Salah satu momen sakral yang paling dinanti adalah Ritual Sesaji Slamet, sebuah upacara adat untuk menghormati alam dan memohon keselamatan bagi masyarakat. Prosesi ini menjadi daya tarik tersendiri bagi wisatawan yang ingin menyaksikan tradisi luhur yang masih terjaga hingga kini.</p>\n<p>🎭 Pentas Seni &amp; Musik<br />Festival Gunung Slamet juga menjadi ajang bagi para seniman lokal dan nasional untuk unjuk kebolehan. Dari pertunjukan tari tradisional yang memukau hingga musik etnik yang syahdu, semua akan membawa penonton dalam perjalanan budaya yang kaya. Tak hanya itu, festival ini juga menghadirkan konser musik dengan artis ternama yang siap menghidupkan suasana dengan penampilan spektakuler di bawah langit pegunungan yang indah.</p>\n<p>⛰️ Jelajah Alam &amp; Petualangan<br />Bagi para pencinta alam, festival ini adalah surga tersendiri. Nikmati pengalaman mendaki Gunung Slamet dengan jalur khusus yang dirancang untuk peserta festival, menyusuri keindahan hutan dan sungai yang masih alami. Selain itu, tersedia kegiatan camping ground, susur sungai, dan aktivitas ekowisata lainnya yang akan mempererat hubungan manusia dengan alam.</p>\n<p>🍽️ Festival Kuliner Khas Daerah<br />Tak lengkap rasanya jika berkunjung tanpa mencicipi kekayaan kuliner khas daerah. Di Festival Gunung Slamet, pengunjung dapat menikmati berbagai sajian tradisional yang menggugah selera, mulai dari sate buntel, nasi liwet khas pegunungan, hingga minuman tradisional yang menyehatkan.</p>\n<p>📷 Lomba Fotografi &amp; Videografi<br />Bagi para pecinta fotografi dan videografi, festival ini juga mengadakan kompetisi untuk mengabadikan keindahan Gunung Slamet dan kegiatan festival. Pemenang akan mendapatkan hadiah menarik serta kesempatan untuk menampilkan karyanya di pameran khusus.</p>\n<h3>Jadilah Bagian dari Perayaan Alam dan Budaya!</h3>\n<p>Festival Gunung Slamet 2025 bukan sekadar acara hiburan, tetapi juga sebuah perwujudan cinta terhadap budaya dan kelestarian lingkungan. Jangan lewatkan kesempatan untuk menjadi bagian dari perayaan yang penuh makna ini.</p>\n<p>📍 Lokasi: D\'Las Lembah Asri Serang Purbalingga<br />📆 Tanggal: 18 Juli 2025<br />📞 Informasi &amp; Pendaftaran: @gunungslametfestival (Instagram)</p>\n<p>Siapkan diri untuk merasakan pesona Gunung Slamet dalam festival yang penuh warna dan keajaiban! 🌋✨</p>', 'D\'Las Lembah Asri Serang Purbalingga', '2027-01-05 01:00:00', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4256.896823942311!2d109.28861627532025!3d-7.242386592764001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff3d3ffffffff%3A0x83d8dc79ac5a6a66!2sD&#39;Las%20Lembah%20Asri%20Serang%20Purbalingga!5e1!3m2!1sen!2sid!4v1741935865928!5m2!1sen!2sid', '2025-03-14 07:09:11', '2025-10-02 15:05:09', NULL),
	(2, 3, 'Karya Kreative Serayu', 'karya-kreative-serayu', 'Event/01JP9QZQQ7FGHYFYFVC9Z9411K.jpg', 'premium', 'Karya Kreative Serayu 2025, Bank Indonesia, ekonomi kreatif, UMKM, pameran produk kreatif, talkshow bisnis, workshop inovasi, pemasaran digital, business matching, networking, pentas seni, musik tradisional, kompetisi desain, pitching bisnis, fotografi, ekonomi berkelanjutan, produk eco-friendly, Sungai Serayu, Purwokerto, Menara Teratai, inspirasi, inovasi, kolaborasi bisnis.', 'Karya Kreative Serayu adalah ajang inspiratif yang diselenggarakan oleh Bank Indonesia untuk mendorong pertumbuhan ekonomi kreatif di wilayah sekitar Sungai Serayu. Acara ini menghadirkan berbagai kegiatan menarik yang bertujuan untuk memperkuat daya saing UMKM, memperluas jaringan bisnis, serta mengembangkan potensi ekonomi berbasis budaya dan inovasi digital.', '<p>Karya Kreative Serayu adalah ajang inspiratif yang diselenggarakan oleh Bank Indonesia untuk mendorong pertumbuhan ekonomi kreatif di wilayah sekitar Sungai Serayu. Acara ini menghadirkan berbagai kegiatan menarik yang bertujuan untuk memperkuat daya saing UMKM, memperluas jaringan bisnis, serta mengembangkan potensi ekonomi berbasis budaya dan inovasi digital.</p>\n<h3>Apa yang Menarik di Karya Kreative Serayu 2025?</h3>\n<p>🎨 Pameran UMKM dan Produk Kreatif<br />Jelajahi beragam produk unggulan dari UMKM lokal yang telah dikurasi secara khusus, mulai dari kerajinan tangan, fashion, kuliner khas, hingga produk berbasis teknologi digital. Acara ini menjadi platform bagi pelaku usaha untuk memamerkan dan memasarkan produknya kepada pasar yang lebih luas.</p>\n<p>📢 Talkshow &amp; Workshop Bisnis Kreatif<br />Belajar langsung dari para pakar industri kreatif dan pelaku bisnis sukses dalam berbagai sesi diskusi dan workshop interaktif. Mulai dari strategi pemasaran digital, pengelolaan keuangan, hingga inovasi produk yang bisa meningkatkan daya saing di era global.</p>\n<p>💡 Business Matching &amp; Networking Session<br />Koneksi adalah kunci kesuksesan! Karya Kreative Serayu menghadirkan sesi khusus untuk mempertemukan para pelaku UMKM dengan investor, pelaku industri, dan stakeholder terkait. Ini adalah kesempatan emas untuk memperluas jejaring bisnis dan membuka peluang kerja sama strategis.</p>\n<p>🎭 Pentas Seni dan Hiburan<br />Nikmati berbagai pertunjukan seni yang memukau, mulai dari tarian tradisional hingga musik kontemporer yang membangkitkan semangat kreativitas. Panggung utama akan diisi oleh musisi ternama serta seniman lokal yang membawa nuansa khas budaya Serayu.</p>\n<p>🏆 Kompetisi Inovasi &amp; Kreativitas<br />Tunjukkan bakat dan kreativitasmu dalam berbagai kompetisi seru! Dari lomba desain produk, fotografi, hingga pitching bisnis kreatif, semua peserta akan memiliki kesempatan untuk memenangkan hadiah menarik serta mendapatkan bimbingan dari para mentor profesional.</p>\n<p>🌱 Gerakan Ekonomi Berkelanjutan<br />Sebagai bagian dari komitmen Bank Indonesia dalam mendukung pertumbuhan ekonomi yang berkelanjutan, Karya Kreative Serayu juga menghadirkan berbagai inisiatif ramah lingkungan. Mulai dari penggunaan produk berbasis eco-friendly hingga kampanye peduli lingkungan di sepanjang Sungai Serayu.</p>\n<h3>Jadilah Bagian dari Perubahan!</h3>\n<p>Karya Kreative Serayu Bank Indonesia 2025 bukan sekadar festival ekonomi kreatif, tetapi juga gerakan untuk memberdayakan UMKM dan menciptakan ekosistem bisnis yang lebih inklusif. Jangan lewatkan kesempatan untuk menjadi bagian dari acara inspiratif ini!</p>\n<p>📍 Lokasi: Menara Teratai, Purwokerto<br />📆 Tanggal: 24 Agustus 2025<br />📞 Informasi &amp; Pendaftaran: @bank_indonesia_purwokerto (Instagram)</p>\n<p>&nbsp;</p>\n<p>Bersiaplah untuk merasakan energi kreatif yang mengalir bersama arus Sungai Serayu! 🚀✨</p>', 'Menara Teratai', '2025-08-23 17:00:00', NULL, '2025-03-14 07:13:05', '2025-03-14 07:13:05', NULL),
	(3, 3, 'Festival Budaya Nusantara 2025 ', 'festival-budaya-nusantara-2025', 'Event/01JP9R8TV8XFW220D9511A1B2F.jpeg', 'publish', 'Festival Budaya Nusantara 2025, keberagaman budaya, pentas seni, tari tradisional, musik etnik, pameran busana adat, fashion show Nusantara, kuliner khas daerah, rendang, gudeg, papeda, sate lilit, workshop budaya, membatik, ukir topeng, wayang, sejarah Nusantara, artefak, manuskrip kuno, lomba seni, parade budaya, tradisi Indonesia, kearifan lokal, warisan budaya, generasi muda, pelestarian budaya.', 'Festival Budaya Nusantara 2025 adalah perayaan megah yang menghadirkan keberagaman budaya dari seluruh penjuru Indonesia dalam satu panggung yang spektakuler. Acara ini menjadi wadah bagi seni, tradisi, dan kearifan lokal untuk bersinar, menghubungkan generasi muda dengan warisan budaya bangsa yang kaya.', '<p>"Merajut Keberagaman, Memperkuat Persatuan"</p>\n<p>Festival Budaya Nusantara 2025 adalah perayaan megah yang menghadirkan keberagaman budaya dari seluruh penjuru Indonesia dalam satu panggung yang spektakuler. Acara ini menjadi wadah bagi seni, tradisi, dan kearifan lokal untuk bersinar, menghubungkan generasi muda dengan warisan budaya bangsa yang kaya.</p>\n<p>Sebagai festival budaya terbesar, acara ini akan menampilkan berbagai pertunjukan seni, pameran, serta interaksi langsung dengan kebudayaan dari berbagai suku dan daerah di Indonesia. Dengan konsep yang interaktif dan edukatif, festival ini bertujuan untuk melestarikan, memperkenalkan, serta menginspirasi kecintaan terhadap budaya Nusantara.</p>\n<h3>Atraksi Utama Festival Budaya Nusantara 2025</h3>\n<p>🎭 Pentas Seni &amp; Musik Tradisional<br />Saksikan beragam pertunjukan seni khas daerah, mulai dari tari tradisional seperti Tari Saman dari Aceh, Kecak dari Bali, hingga Reog Ponorogo dari Jawa Timur. Tak hanya itu, festival ini juga menghadirkan pagelaran musik etnik dari berbagai alat musik tradisional seperti angklung, gamelan, sasando, dan tifa.</p>\n<p>👘 Pameran Busana Adat &amp; Fashion Show Nusantara<br />Festival ini menjadi ajang eksplorasi keindahan wastra Nusantara, dari batik, tenun ikat, songket, hingga ulos. Saksikan parade busana adat serta fashion show yang memadukan warisan tradisional dengan sentuhan modern.</p>\n<p>🍲 Festival Kuliner Khas Nusantara<br />Nikmati cita rasa autentik dari berbagai masakan khas daerah, mulai dari rendang Padang, gudeg Yogyakarta, papeda Papua, hingga sate lilit Bali. Beragam stan makanan akan menyajikan kuliner legendaris yang siap memanjakan lidah para pengunjung.</p>\n<p>🎨 Workshop &amp; Demonstrasi Budaya<br />Belajar langsung dari para maestro seni dan budaya! Ikuti berbagai workshop menarik seperti membatik, mengukir topeng, membuat wayang, hingga belajar tarian tradisional. Tak hanya itu, pengunjung juga bisa menyaksikan langsung proses pembuatan kerajinan khas dari berbagai daerah.</p>\n<p>📖 Pameran Sejarah &amp; Kearifan Lokal<br />Kenali lebih dalam sejarah dan filosofi budaya Nusantara melalui pameran interaktif yang menampilkan artefak, manuskrip kuno, serta kisah perjalanan budaya dari Sabang sampai Merauke.</p>\n<p>🏆 Lomba Seni &amp; Budaya<br />Tunjukkan bakat dan kreativitas dalam berbagai kompetisi menarik, seperti lomba tari tradisional, lomba musik etnik, hingga kompetisi cerita rakyat yang akan memperkuat apresiasi terhadap budaya Indonesia.</p>\n<p>🎊 Parade Budaya Nusantara<br />Jangan lewatkan puncak acara: Parade Budaya Nusantara! Sebuah arak-arakan meriah yang menampilkan berbagai kesenian daerah, kostum adat, serta simbol-simbol budaya yang menjadi kebanggaan bangsa.</p>\n<h3>Mari Bersama Merayakan Keberagaman!</h3>\n<p>Festival Budaya Nusantara 2025 bukan hanya sekadar hiburan, tetapi juga perwujudan cinta terhadap warisan budaya bangsa. Acara ini mengajak seluruh masyarakat untuk merayakan, menjaga, dan menghidupkan kembali kebudayaan Nusantara dalam kehidupan modern.</p>\n<p>📍 Lokasi: [Tempat acara]<br />📆 Tanggal: [Tanggal event]<br />📞 Informasi &amp; Pendaftaran: [Kontak/website]</p>\n<p>&nbsp;</p>\n<p>Ayo, jadilah bagian dari perjalanan budaya yang luar biasa ini! 🌏✨</p>', 'ISBI Bandung', '2024-09-22 17:00:00', NULL, '2025-03-14 07:18:03', '2025-03-14 07:18:03', NULL),
	(4, 2, 'Festival Budaya Nusantara', 'festival-budaya-nusantara', 'Event/01JP9RGFAA260YXCM2HBDCWMKH.jpg', 'publish', 'Festival Budaya Nusantara, Seni Tradisional, Musik Etnik, Tari Daerah, Pameran Wastra, Busana Adat, Kuliner Nusantara, Workshop Budaya, Demonstrasi Kesenian, Sejarah Nusantara, Kearifan Lokal, Lomba Seni Budaya, Parade Budaya, Warisan Budaya, Tradisi Indonesia, Kerajinan Tangan, Wayang, Gamelan, Angklung, Tenun Ikat, Batik, Songket, Ulos, Reog Ponorogo, Tari Saman, Kecak Bali, Papeda Papua, Rendang Padang, Gudeg Yogyakarta, Sate Lilit, Cerita Rakyat, Event Budaya, Pameran Sejarah', 'Festival Budaya Nusantara 2025 adalah perayaan akbar yang menghadirkan keindahan dan kekayaan budaya dari seluruh penjuru Indonesia. Acara ini menjadi ajang untuk mengenal, merasakan, dan merayakan tradisi serta kearifan lokal dari Sabang hingga Merauke dalam satu panggung yang penuh warna. Dengan semangat persatuan dalam keberagaman, festival ini mengajak masyarakat untuk lebih mencintai dan melestarikan warisan budaya bangsa.', '<p>"Merayakan Keberagaman, Mengukuhkan Persatuan"</p>\n<p>Festival Budaya Nusantara 2025 adalah perayaan akbar yang menghadirkan keindahan dan kekayaan budaya dari seluruh penjuru Indonesia. Acara ini menjadi ajang untuk mengenal, merasakan, dan merayakan tradisi serta kearifan lokal dari Sabang hingga Merauke dalam satu panggung yang penuh warna. Dengan semangat persatuan dalam keberagaman, festival ini mengajak masyarakat untuk lebih mencintai dan melestarikan warisan budaya bangsa.</p>\n<h3>Pesona Festival Budaya Nusantara 2025</h3>\n<p>🎭 Pentas Seni &amp; Musik Tradisional<br />Rasakan magisnya seni pertunjukan khas Nusantara, dari Tari Saman yang energik, Kecak Bali yang magis, hingga Reog Ponorogo yang megah. Nikmati juga alunan musik tradisional seperti gamelan, angklung, kolintang, dan sasando yang membawa nuansa khas daerah masing-masing.</p>\n<p>👘 Pameran Wastra &amp; Busana Adat<br />Festival ini menampilkan keindahan kain tradisional seperti batik, tenun ikat, songket, hingga ulos dalam pameran spesial. Saksikan pula parade busana adat serta fashion show yang memadukan sentuhan tradisional dengan desain modern.</p>\n<p>🍲 Festival Kuliner Nusantara<br />Jelajahi aneka cita rasa khas Indonesia! Dari rendang Padang, gudeg Yogyakarta, papeda Papua, hingga sate lilit Bali, festival ini menghadirkan berbagai hidangan autentik yang menggugah selera.</p>\n<p>🎨 Workshop Budaya &amp; Demonstrasi Kesenian<br />Belajar langsung dari para maestro seni dan budaya dalam berbagai workshop, seperti membatik, mengukir, membuat wayang, hingga belajar tarian daerah. Saksikan pula demonstrasi pembuatan kerajinan khas dari berbagai daerah.</p>\n<p>📖 Pameran Sejarah &amp; Kearifan Lokal<br />Kenali lebih dalam sejarah dan nilai-nilai budaya Indonesia melalui pameran interaktif yang menampilkan artefak kuno, manuskrip sejarah, serta dokumentasi perjalanan budaya Nusantara dari masa ke masa.</p>\n<p>🏆 Lomba &amp; Kompetisi Seni Budaya<br />Ikuti berbagai kompetisi menarik, seperti lomba tari tradisional, lomba musik etnik, hingga storytelling cerita rakyat. Para pemenang akan mendapatkan penghargaan serta kesempatan untuk tampil di panggung utama festival.</p>\n<p>🎊 Parade Budaya Nusantara<br />Sebagai puncak acara, Parade Budaya Nusantara akan menyuguhkan arak-arakan megah dengan berbagai atraksi seni dan budaya dari berbagai daerah, mencerminkan keberagaman dan keindahan Indonesia.</p>\n<h3>Mari Bersama Lestarikan Budaya Bangsa!</h3>\n<p>Festival Budaya Nusantara 2025 bukan hanya sebuah perayaan, tetapi juga gerakan untuk menjaga, menghidupkan, dan mewariskan budaya kepada generasi mendatang. Bergabunglah dalam festival ini dan rasakan pengalaman budaya yang tak terlupakan!</p>\n<p>📍 Lokasi: [Tempat acara]<br />📆 Tanggal: [Tanggal event]<br />📞 Informasi &amp; Pendaftaran: [Kontak/website]</p>\n<p>&nbsp;</p>\n<p>Jadilah bagian dari perjalanan budaya Nusantara yang luar biasa! 🇮🇩✨</p>', 'Gesibu Blambangan', '2025-04-07 17:00:00', NULL, '2025-03-14 07:22:14', '2025-03-14 07:22:14', NULL),
	(5, 1, 'Dieng Culture Festival (DCF) 2025', 'dieng-culture-festival-dcf-2025', 'Event/01JP9RKRVF8STZSK349ZMHRW2P.jpg', 'publish', 'Dieng Culture Festival, Ruwatan Rambut Gimbal, Seni Budaya Dieng, Tari Lengger, Wayang Kulit, Festival Lampion, Kembang Api, Jelajah Alam Dieng, Sunrise Sikunir, Telaga Warna, Kawah Dieng, Festival Kuliner Dieng, Mie Ongklok, Tempe Kemul, Carica, Purwaceng, Lomba Fotografi, Lomba Videografi, Wisata Dieng, Tradisi Dieng, Ritual Adat, Musik Etnik, Budaya Jawa, Pegunungan Dieng, Event Budaya, Pariwisata Jawa Tengah, Spiritualitas Dieng, Keindahan Alam, Kearifan Lokal, Festival Indonesia', 'Dieng Culture Festival (DCF) 2025 kembali hadir sebagai perayaan budaya yang memukau, menggabungkan keindahan alam Dieng dengan kearifan tradisi lokal. Festival tahunan ini menjadi ajang bagi wisatawan untuk menyaksikan keunikan budaya Dieng, menikmati pesona alam yang magis, dan merasakan atmosfer yang penuh makna.', '<p>DIENG CULTURE FESTIVAL 2025<br />"Merayakan Budaya, Menyatu dengan Alam"</p>\n<p>Dieng Culture Festival (DCF) 2025 kembali hadir sebagai perayaan budaya yang memukau, menggabungkan keindahan alam Dieng dengan kearifan tradisi lokal. Festival tahunan ini menjadi ajang bagi wisatawan untuk menyaksikan keunikan budaya Dieng, menikmati pesona alam yang magis, dan merasakan atmosfer yang penuh makna.</p>\n<p>Dengan suasana pegunungan yang sejuk serta panorama alam yang menakjubkan, Dieng Culture Festival menghadirkan serangkaian acara yang memadukan seni, budaya, serta spiritualitas masyarakat Dieng yang khas.</p>\n<h3>Pesona Dieng Culture Festival 2025</h3>\n<p>🔥 Ritual Puncak: Ruwatan Rambut Gimbal<br />Salah satu acara utama dalam festival ini adalah Ruwatan Rambut Gimbal, sebuah prosesi sakral pemotongan rambut anak-anak berambut gimbal di Dieng. Ritual ini dipercaya sebagai bentuk penyucian dan pemenuhan harapan yang telah mereka ajukan sebelumnya. Suasana sakral, doa-doa, serta iringan musik tradisional membuat momen ini semakin khidmat dan mengesankan.</p>\n<p>🎭 Pentas Seni &amp; Budaya Dieng<br />DCF 2025 juga menampilkan pertunjukan seni khas Dieng, seperti Tari Lengger, Wayang Kulit, serta berbagai kesenian musik etnik yang membawa pengunjung lebih dekat dengan budaya lokal.</p>\n<p>🎆 Festival Lampion &amp; Kembang Api<br />Nikmati pengalaman tak terlupakan dengan melepas ribuan lampion ke langit malam Dieng, menciptakan pemandangan spektakuler yang melambangkan harapan dan doa. Acara ini semakin meriah dengan pertunjukan kembang api yang menerangi langit pegunungan.</p>\n<p>⛰️ Jelajah Alam &amp; Eksplorasi Wisata<br />Selain acara budaya, festival ini juga menjadi kesempatan untuk mengeksplorasi keindahan alam Dieng. Dari menikmati sunrise di Bukit Sikunir, mengunjungi Telaga Warna yang mistis, hingga menjelajahi kawah-kawah aktif yang eksotis.</p>\n<p>🍲 Festival Kuliner Khas Dieng<br />Rasakan kelezatan kuliner khas Dieng, seperti Mie Ongklok, Tempe Kemul, Carica, dan Purwaceng yang dikenal sebagai minuman penghangat khas pegunungan.</p>\n<p>📸 Lomba Fotografi &amp; Videografi<br />DCF 2025 juga mengadakan kompetisi bagi para fotografer dan videografer untuk mengabadikan momen magis selama festival berlangsung.</p>\n<h3>Jadilah Bagian dari Keajaiban Dieng!</h3>\n<p>Dieng Culture Festival 2025 adalah lebih dari sekadar festival, ini adalah perjalanan budaya, spiritual, dan alam yang akan memberikan pengalaman berkesan seumur hidup. Jangan lewatkan kesempatan untuk menjadi bagian dari perayaan unik ini!</p>\n<p>📍 Lokasi: Dieng, Wonosobo, Jawa Tengah<br />📆 Tanggal: [Tanggal event]<br />📞 Informasi &amp; Pendaftaran: [Kontak/website]</p>\n<p>&nbsp;</p>\n<p>Mari menyatu dengan budaya dan keindahan Dieng! 🌄✨</p>', 'Dieng', '2025-08-10 17:00:00', NULL, '2025-03-14 07:24:02', '2025-03-14 07:24:02', NULL);

-- membuang struktur untuk table sanggar_nusantara.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.failed_jobs: ~0 rows (lebih kurang)
DELETE FROM `failed_jobs`;

-- membuang struktur untuk table sanggar_nusantara.harga_events
CREATE TABLE IF NOT EXISTS `harga_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` int NOT NULL,
  `kuota` int NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `tanggal_mulai` timestamp NOT NULL,
  `tanggal_selesai` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `harga_events_event_id_foreign` (`event_id`),
  CONSTRAINT `harga_events_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.harga_events: ~3 rows (lebih kurang)
DELETE FROM `harga_events`;
INSERT INTO `harga_events` (`id`, `event_id`, `nama`, `harga`, `kuota`, `deskripsi`, `tanggal_mulai`, `tanggal_selesai`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'Umum', 1000, 72, 'Tiket untuk semua kalangan yang ingin menikmati acara kebudayaan secara umum.\n\nYang Anda Dapatkan:\n\n- Akses area utama acara\n- Menyaksikan pertunjukan budaya\n- Free photobooth\n- Souvenir digital', '2025-03-14 08:07:20', '2025-06-26 08:07:25', '2025-03-14 08:08:18', '2025-05-28 15:48:19', NULL),
	(2, 1, 'VIP', 10000, 971, 'Nikmati acara dengan kenyamanan lebih dan fasilitas eksklusif bagi tamu istimewa.\n\nYang Anda Dapatkan:\n\n- Semua fasilitas Tiket Umum\n- Tempat duduk khusus di depan panggung\n- Souvenir fisik edisi VIP\n- Snack box tradisional\n- Jalur antrean khusus', '2025-04-13 12:18:25', '2026-09-25 12:18:29', '2025-03-14 12:18:35', '2025-10-02 14:59:32', NULL),
	(3, 1, 'VVIP', 100000, 0, 'Pengalaman budaya yang lebih mendalam dengan akses terbatas dan layanan premium.\n\nYang Anda Dapatkan:\n\n- Semua fasilitas VIP\n- Meet & greet dengan penampil\n- Paket makanan tradisional lengkap\n- Eksklusif tote bag VVIP\n- Free akses workshop budaya', '2025-04-15 12:21:29', '2025-07-30 12:21:32', '2025-03-14 12:21:37', '2025-05-13 07:51:10', NULL);

-- membuang struktur untuk table sanggar_nusantara.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.jobs: ~0 rows (lebih kurang)
DELETE FROM `jobs`;

-- membuang struktur untuk table sanggar_nusantara.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.job_batches: ~0 rows (lebih kurang)
DELETE FROM `job_batches`;

-- membuang struktur untuk table sanggar_nusantara.kategori_artikels
CREATE TABLE IF NOT EXISTS `kategori_artikels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategori_artikels_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.kategori_artikels: ~6 rows (lebih kurang)
DELETE FROM `kategori_artikels`;
INSERT INTO `kategori_artikels` (`id`, `slug`, `image`, `nama`, `deskripsi`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'kebudayaan', NULL, 'Kebudayaan', NULL, '2025-03-14 06:17:05', '2025-03-14 06:17:05', NULL),
	(2, 'indonesia-di-mata-dunia', NULL, 'Indonesia Di Mata Dunia', NULL, '2025-03-14 06:24:58', '2025-03-14 06:34:26', NULL),
	(3, 'fun-event', NULL, 'Fun Event', NULL, '2025-03-14 06:35:17', '2025-03-14 06:35:17', NULL),
	(4, 'upacara', NULL, 'Upacara', NULL, '2025-03-14 06:35:29', '2025-03-14 06:35:29', NULL),
	(5, 'pakaian', NULL, 'Pakaian', NULL, '2025-03-14 06:36:09', '2025-03-14 06:36:09', NULL),
	(6, 'musik-dan-lagu', NULL, 'Musik dan Lagu', NULL, '2025-03-14 06:36:30', '2025-03-14 06:36:30', NULL);

-- membuang struktur untuk table sanggar_nusantara.kategori_events
CREATE TABLE IF NOT EXISTS `kategori_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategori_events_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.kategori_events: ~2 rows (lebih kurang)
DELETE FROM `kategori_events`;
INSERT INTO `kategori_events` (`id`, `nama`, `slug`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Kebudayaan', 'kebudayaan', '2025-03-14 06:56:14', '2025-03-14 06:56:14', NULL),
	(2, 'Indonesia Di Mata Dunia', 'indonesia-di-mata-dunia', '2025-03-14 06:56:26', '2025-03-14 06:56:26', NULL),
	(3, 'Fun Event', 'fun-event', '2025-03-14 06:56:42', '2025-03-14 06:56:42', NULL);

-- membuang struktur untuk table sanggar_nusantara.komentars
CREATE TABLE IF NOT EXISTS `komentars` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `artikel_id` bigint unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `komentar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `komentars_artikel_id_foreign` (`artikel_id`),
  CONSTRAINT `komentars_artikel_id_foreign` FOREIGN KEY (`artikel_id`) REFERENCES `artikels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.komentars: ~5 rows (lebih kurang)
DELETE FROM `komentars`;
INSERT INTO `komentars` (`id`, `artikel_id`, `nama`, `email`, `komentar`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 10, 'cek', 'aaa@gmail.com', 'amsmasdk', '2025-03-14 08:22:00', '2025-03-14 08:22:00', NULL),
	(2, 7, 'bjbasdjkabsdksd', 'nsajkdnasdna@gmail.com', 'ijasdoiajsda', '2025-03-14 12:34:30', '2025-03-14 12:34:30', NULL),
	(3, 8, 'aKDN', 'NSANS@gmail.com', 'naslnasd', '2025-04-20 05:26:21', '2025-04-20 05:26:21', NULL),
	(4, 3, 'asndaksd', 'naksjdnasd@gmail.com', 'naslkdnaskdnasdk', '2025-05-13 08:33:17', '2025-05-13 08:33:17', NULL),
	(5, 3, 'ndnsdf', 'asjkdnsd@gmail.com', 'naslkndssand', '2025-05-13 08:42:10', '2025-05-13 08:42:10', NULL),
	(6, 3, 'adansdlkasdn', 'asnldknasldknasdlk@gmail.com', 'lskdnalkdnasdlknadlk', '2025-05-13 08:43:31', '2025-05-13 08:43:31', NULL),
	(7, 9, 'adsasd', 'asndj@gmil.com', 'nskald', '2025-06-07 04:13:15', '2025-06-07 04:13:15', NULL);

-- membuang struktur untuk table sanggar_nusantara.kontaks
CREATE TABLE IF NOT EXISTS `kontaks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.kontaks: ~0 rows (lebih kurang)
DELETE FROM `kontaks`;
INSERT INTO `kontaks` (`id`, `nama`, `email`, `pesan`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'asdads', 'nakjsda@gmail.com', 'asndd asndkad', '2025-04-20 11:57:15', '2025-04-20 11:57:15', NULL),
	(2, 'bkasd', 'jaskdasd@gmail.com', 'nskaldnasd asnld ad al ad', '2025-05-25 13:26:33', '2025-05-25 13:26:33', NULL),
	(3, 'aaj', 'asnkand@gmail.com', 'naskjdad', '2025-06-07 04:01:58', '2025-06-07 04:01:58', NULL);

-- membuang struktur untuk table sanggar_nusantara.lagu_daerahs
CREATE TABLE IF NOT EXISTS `lagu_daerahs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pencipta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun_diciptakan` int DEFAULT NULL,
  `asal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori` enum('tradisional','modern') COLLATE utf8mb4_unicode_ci NOT NULL,
  `lirik` text COLLATE utf8mb4_unicode_ci,
  `sejarah` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.lagu_daerahs: ~10 rows (lebih kurang)
DELETE FROM `lagu_daerahs`;
INSERT INTO `lagu_daerahs` (`id`, `nama`, `pencipta`, `tahun_diciptakan`, `asal`, `image`, `audio`, `video`, `kategori`, `lirik`, `sejarah`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Ampar-Ampar Pisang', NULL, 1800, 'Kalimantan Selatan', 'Ragam Indonesia/Lagu Daerah/01JP9SSV4BDXH8DBMN4QJFAT7J.jpeg', 'Ragam Indonesia/Lagu Daerah/01JP9SSV4YP61C0S0CWDZDMBCY.mp3', 'https://www.youtube.com/watch?v=gtCS-eJF3kM', 'tradisional', 'Lirik lagu Ampar-Ampar Pisang...', 'Lagu ini berasal dari Kalimantan Selatan dan sering dinyanyikan oleh masyarakat Banjar.', '-3.3194', '114.5908', NULL, '2025-03-14 07:44:49', NULL),
	(2, 'Bubuy Bulan', 'Benny Corda', 1940, 'Jawa Barat', NULL, 'bubuy_bulan.mp3', NULL, 'tradisional', 'Lirik lagu Bubuy Bulan...', 'Lagu daerah Sunda yang menggambarkan keindahan alam dan perasaan rindu.', '-6.9175', '107.6191', NULL, NULL, NULL),
	(3, 'Apuse', NULL, NULL, 'Papua', NULL, 'apuse.mp3', NULL, 'tradisional', 'Lirik lagu Apuse...', 'Lagu ini menggambarkan perpisahan seorang cucu dengan kakek-neneknya saat pergi merantau.', '-4.2699', '138.0802', NULL, NULL, NULL),
	(4, 'Tokecang', NULL, NULL, 'Jawa Barat', NULL, 'tokecang.mp3', NULL, 'tradisional', 'Lirik lagu Tokecang...', 'Lagu ini merupakan lagu daerah Sunda yang bernuansa ceria.', '-6.9175', '107.6191', NULL, NULL, NULL),
	(5, 'Gundul-Gundul Pacul', NULL, NULL, 'Jawa Tengah', NULL, 'gundul_pacul.mp3', NULL, 'tradisional', 'Lirik lagu Gundul-Gundul Pacul...', 'Lagu ini mengandung makna filosofi tentang kepemimpinan dan tanggung jawab.', '-7.7956', '110.3695', NULL, NULL, NULL),
	(6, 'Suwe Ora Jamu', NULL, NULL, 'Jawa Tengah', NULL, 'suwe_ora_jamu.mp3', NULL, 'tradisional', 'Lirik lagu Suwe Ora Jamu...', 'Lagu ini sering dinyanyikan sebagai ungkapan kerinduan.', '-7.7956', '110.3695', NULL, NULL, NULL),
	(7, 'Cublak-Cublak Suweng', NULL, NULL, 'Jawa Timur', NULL, 'cublak_cublak_suweng.mp3', NULL, 'tradisional', 'Lirik lagu Cublak-Cublak Suweng...', 'Lagu ini sering dimainkan dalam permainan anak-anak.', '-7.2504', '112.7688', NULL, NULL, NULL),
	(8, 'Jali-Jali', NULL, NULL, 'DKI Jakarta', NULL, 'jali_jali.mp3', NULL, 'tradisional', 'Lirik lagu Jali-Jali...', 'Lagu ini merupakan lagu Betawi yang sering dinyanyikan dalam berbagai acara.', '-6.2088', '106.8456', NULL, NULL, NULL),
	(9, 'Rasa Sayange', NULL, NULL, 'Maluku', NULL, 'rasa_sayange.mp3', NULL, 'tradisional', 'Lirik lagu Rasa Sayange...', 'Lagu ini terkenal sebagai lagu daerah Maluku yang penuh makna persahabatan.', '-3.6542', '128.1909', NULL, NULL, NULL),
	(10, 'O Ina Ni Keke', NULL, NULL, 'Sulawesi Utara', NULL, 'o_ina_ni_keke.mp3', NULL, 'tradisional', 'Lirik lagu O Ina Ni Keke...', 'Lagu ini menceritakan kasih sayang seorang ibu kepada anaknya.', '1.4549', '124.8413', NULL, NULL, NULL);

-- membuang struktur untuk table sanggar_nusantara.makanan_khas
CREATE TABLE IF NOT EXISTS `makanan_khas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bahan_utama` text COLLATE utf8mb4_unicode_ci,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `makanan_khas_slug_unique` (`slug`),
  KEY `makanan_khas_user_id_foreign` (`user_id`),
  CONSTRAINT `makanan_khas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.makanan_khas: ~10 rows (lebih kurang)
DELETE FROM `makanan_khas`;
INSERT INTO `makanan_khas` (`id`, `user_id`, `nama`, `slug`, `asal`, `image`, `bahan_utama`, `deskripsi`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(11, 1, 'Rendang', 'rendang', 'Sumatera Barat', '', 'Daging sapi, santan, rempah-rempah', 'Rendang adalah masakan khas Minangkabau yang dimasak dalam waktu lama dengan santan dan rempah-rempah.', '-0.3059', '100.3692', NULL, NULL, NULL),
	(12, 1, 'Pempek', 'pempek', 'Sumatera Selatan', '', 'Ikan tenggiri, tepung sagu', 'Pempek adalah makanan khas Palembang yang terbuat dari ikan dan disajikan dengan kuah cuko.', '-2.9761', '104.7754', NULL, NULL, NULL),
	(13, 1, 'Gudeg', 'gudeg', 'Yogyakarta', 'Ragam Indonesia/Makanan Khas/01JP9SVCCGWCN8X3FE6BN4W5GR.jpeg', 'Nangka muda, santan, gula merah', 'Gudeg adalah makanan khas Yogyakarta yang memiliki cita rasa manis dan disajikan dengan ayam serta telur.', '-7.7956', '110.3695', NULL, '2025-03-14 07:45:40', NULL),
	(14, 1, 'Sate Lilit', 'sate-lilit', 'Bali', '', 'Daging ikan, kelapa parut, rempah-rempah', 'Sate Lilit adalah sate khas Bali yang dibuat dari daging ikan cincang yang dibumbui dan dililitkan pada batang serai.', '-8.4095', '115.1889', NULL, NULL, NULL),
	(15, 1, 'Papeda', 'papeda', 'Papua', '', 'Sagu', 'Papeda adalah makanan khas Papua yang terbuat dari sagu dan biasanya disantap dengan ikan kuah kuning.', '-4.2699', '138.0802', NULL, NULL, NULL),
	(16, 1, 'Rawon', 'rawon', 'Jawa Timur', '', 'Daging sapi, kluwek', 'Rawon adalah sup daging khas Jawa Timur yang memiliki kuah hitam dari kluwek.', '-7.2504', '112.7688', NULL, NULL, NULL),
	(17, 1, 'Tinutuan', 'tinutuan', 'Sulawesi Utara', '', 'Beras, sayur-sayuran', 'Tinutuan atau bubur Manado adalah makanan khas Sulawesi Utara yang kaya akan sayuran.', '1.4549', '124.8413', NULL, NULL, NULL),
	(18, 1, 'Nasi Liwet', 'nasi-liwet', 'Jawa Tengah', '', 'Beras, santan, daun salam', 'Nasi Liwet adalah nasi khas Solo yang dimasak dengan santan dan disajikan dengan lauk pauk.', '-7.5755', '110.8243', NULL, NULL, NULL),
	(19, 1, 'Ayam Betutu', 'ayam-betutu', 'Bali', '', 'Ayam, bumbu rempah-rempah', 'Ayam Betutu adalah makanan khas Bali yang dimasak dengan bumbu khas dan dibungkus daun pisang sebelum dipanggang.', '-8.4095', '115.1889', NULL, NULL, NULL),
	(20, 1, 'Bika Ambon', 'bika-ambon', 'Sumatera Utara', '', 'Tepung tapioka, santan, telur', 'Bika Ambon adalah kue khas Medan yang memiliki tekstur berongga dan rasa legit.', '3.5970', '98.6785', NULL, NULL, NULL);

-- membuang struktur untuk table sanggar_nusantara.midtrans_logs
CREATE TABLE IF NOT EXISTS `midtrans_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gross_amount` int NOT NULL,
  `payment_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_status` enum('pending','settlement','deny','expire','cancel','refund','partial_refund','chargeback') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fraud_status` enum('accept','deny','challenge') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'accept',
  `midtrans_response` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.midtrans_logs: ~0 rows (lebih kurang)
DELETE FROM `midtrans_logs`;

-- membuang struktur untuk table sanggar_nusantara.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.migrations: ~0 rows (lebih kurang)
DELETE FROM `migrations`;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_02_28_150658_create_alamats_table', 1),
	(5, '2025_02_28_151810_create_discounts_table', 1),
	(6, '2025_02_28_151903_create_carts_table', 1),
	(7, '2025_02_28_151910_create_orders_table', 1),
	(8, '2025_02_28_151915_create_midtrans_logs_table', 1),
	(9, '2025_02_28_152548_create_personal_access_tokens_table', 1),
	(10, '2025_02_28_154628_create_kategori_artikels_table', 1),
	(11, '2025_02_28_154636_create_artikels_table', 1),
	(12, '2025_02_28_155743_create_kategori_events_table', 1),
	(13, '2025_02_28_155751_create_events_table', 1),
	(14, '2025_02_28_155756_create_harga_events_table', 1),
	(15, '2025_02_28_155800_create_pembelian_events_table', 1),
	(16, '2025_02_28_161003_create_plans_table', 1),
	(17, '2025_02_28_161057_create_subscriptions_table', 1),
	(18, '2025_02_28_161855_create_kontaks_table', 1),
	(19, '2025_02_28_161909_create_lagu_daerahs_table', 1),
	(20, '2025_02_28_161915_create_alat_musiks_table', 1),
	(21, '2025_02_28_161920_create_rumah_adats_table', 1),
	(22, '2025_02_28_161926_create_makanan_khas_table', 1),
	(23, '2025_03_01_012225_create_permission_tables', 1),
	(24, '2025_03_01_144452_create_discount_users_table', 1),
	(25, '2025_03_01_145313_create_discount_events_table', 1),
	(26, '2025_03_01_165149_create_komentars_table', 1),
	(27, '2025_03_14_103558_create_bahasa_daerah_table', 1),
	(28, '2025_03_14_130609_create_seni_tari_table', 1);

-- membuang struktur untuk table sanggar_nusantara.model_has_permissions
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.model_has_permissions: ~0 rows (lebih kurang)
DELETE FROM `model_has_permissions`;

-- membuang struktur untuk table sanggar_nusantara.model_has_roles
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.model_has_roles: ~3 rows (lebih kurang)
DELETE FROM `model_has_roles`;
INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
	(1, 'App\\Models\\User', 1),
	(2, 'App\\Models\\User', 2),
	(3, 'App\\Models\\User', 3);

-- membuang struktur untuk table sanggar_nusantara.nusantara_points
CREATE TABLE IF NOT EXISTS `nusantara_points` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `user_id` bigint unsigned NOT NULL,
  `amount` int DEFAULT '0',
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nusantara_points_user` (`user_id`),
  CONSTRAINT `fk_nusantara_points_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.nusantara_points: ~6 rows (lebih kurang)
DELETE FROM `nusantara_points`;
INSERT INTO `nusantara_points` (`id`, `uuid`, `user_id`, `amount`, `source`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'ae104d20-a8d2-11f0-a419-005056c00001', 1, 50, 'Challenge: Eksplorasi Bahasa Daerah', '2025-10-09 20:14:54', '2025-10-14 07:52:06', NULL),
	(2, 'ae1054a5-a8d2-11f0-a419-005056c00001', 2, 75, 'Challenge: Kenali Rumah Adat Nusantara', '2025-10-09 20:14:54', '2025-10-14 07:52:06', NULL),
	(3, 'ae10564f-a8d2-11f0-a419-005056c00001', 3, 80, 'Challenge: Cita Rasa Nusantara', '2025-10-09 20:14:54', '2025-10-14 07:52:06', NULL),
	(4, 'ae105786-a8d2-11f0-a419-005056c00001', 1, 30, 'Donasi: Festival Budaya Banyumas', '2025-10-09 20:14:54', '2025-10-14 07:52:06', NULL),
	(5, 'ae1058ba-a8d2-11f0-a419-005056c00001', 2, 120, 'Challenge: Nada dari Timur', '2025-10-09 20:14:54', '2025-10-14 07:52:06', NULL),
	(10, '09e272e7-a8d3-11f0-a419-005056c00001', 1, 60, 'Challenge: Eksplorasi Bahasa Daerah', '2025-10-14 08:31:14', '2025-10-14 08:31:14', NULL);

-- membuang struktur untuk table sanggar_nusantara.nusantara_point_usages
CREATE TABLE IF NOT EXISTS `nusantara_point_usages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `points_used` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pointusages_user` (`user_id`),
  KEY `fk_pointusages_order` (`order_id`),
  CONSTRAINT `fk_pointusages_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pointusages_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.nusantara_point_usages: ~3 rows (lebih kurang)
DELETE FROM `nusantara_point_usages`;
INSERT INTO `nusantara_point_usages` (`id`, `user_id`, `order_id`, `points_used`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 1, 30, '2025-10-09 20:23:35', '2025-10-09 20:23:35', NULL),
	(2, 2, 2, 50, '2025-10-09 20:23:35', '2025-10-09 20:23:35', NULL),
	(3, 3, 3, 40, '2025-10-09 20:23:35', '2025-10-09 20:23:35', NULL),
	(4, 1, 1, 100, '2025-10-09 20:34:12', '2025-10-09 20:34:12', NULL);

-- membuang struktur untuk table sanggar_nusantara.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `discount_id` bigint unsigned DEFAULT NULL,
  `total_pembelian` int NOT NULL,
  `discount_amount` int NOT NULL DEFAULT '0',
  `total_akhir` int NOT NULL,
  `status_pembelian` enum('pending','sudah dibayar','kadaluarsa','gagal','dibatalkan','dikembalikan') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metode_pembayaran` enum('midtrans','qris','ewallet','manual_transfer') COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_url` text COLLATE utf8mb4_unicode_ci,
  `midtrans_response` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_id_unique` (`order_id`),
  UNIQUE KEY `orders_transaction_id_unique` (`transaction_id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_discount_id_foreign` (`discount_id`),
  CONSTRAINT `orders_discount_id_foreign` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.orders: ~33 rows (lebih kurang)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `user_id`, `discount_id`, `total_pembelian`, `discount_amount`, `total_akhir`, `status_pembelian`, `order_id`, `metode_pembayaran`, `transaction_id`, `payment_url`, `midtrans_response`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, NULL, 0, 0, 15000, 'sudah dibayar', 'b75b55f4-7406-43eb-920b-3c61828762e8', 'midtrans', 'e4a0d3e7-c3f5-48b6-9d5c-70b41330ba97', NULL, NULL, '2025-03-14 08:13:38', '2025-03-14 08:14:08', NULL),
	(2, 1, NULL, 0, 0, 15000, 'kadaluarsa', 'acd6fdc8-474b-4d02-b7d4-f9bf349a3ba3', 'midtrans', NULL, NULL, NULL, '2025-03-14 09:05:39', '2025-04-20 05:21:59', NULL),
	(3, 1, NULL, 0, 0, 15000, 'sudah dibayar', '67af2f09-1895-4e3c-a1f2-6720c847d57c', 'midtrans', 'ec32a0db-872e-45c1-ac4d-8080152af6b8', NULL, NULL, '2025-03-14 10:23:56', '2025-03-14 12:31:44', NULL),
	(4, 1, 1, 40000, 10000, 49400, 'sudah dibayar', 'c488d2ac-1895-41c7-9cda-f0c20a985acc', 'midtrans', '300a6a7d-087a-40d5-9fd2-a52314527ac6', NULL, NULL, '2025-03-14 12:29:55', '2025-03-14 12:30:18', NULL),
	(8, 1, NULL, 200000, 0, 237000, 'sudah dibayar', 'ebb31c54-6241-4f6d-8db1-c532152b0bee', 'midtrans', 'b42638aa-9597-46b3-a9ed-19d7ee87460b', NULL, NULL, '2025-04-16 04:36:34', '2025-04-16 04:37:38', NULL),
	(9, 1, NULL, 300000, 0, 348000, 'sudah dibayar', '89cac8b4-f294-462c-9787-44b0a7f2fc08', 'midtrans', '4e61d66e-f6b0-4874-a8b6-fb8e82d4b6c2', NULL, NULL, '2025-04-16 04:58:22', '2025-04-16 04:58:58', NULL),
	(10, 1, NULL, 300000, 0, 348000, 'kadaluarsa', '63825c1a-10da-4446-ba4f-26d047546caa', 'midtrans', NULL, NULL, NULL, '2025-04-16 05:06:34', '2025-04-20 05:21:59', NULL),
	(11, 1, NULL, 200000, 0, 237000, 'kadaluarsa', 'ac816574-250b-4e41-b164-533c5578ff9c', 'midtrans', NULL, NULL, NULL, '2025-04-17 18:34:45', '2025-04-20 05:24:31', NULL),
	(15, 1, NULL, 200000, 0, 237000, 'dibatalkan', '2742e2f5-66ea-46be-9dd8-27793ef401d4', 'midtrans', NULL, NULL, NULL, '2025-04-19 18:46:46', '2025-04-20 10:59:41', NULL),
	(18, 1, NULL, 300000, 0, 348000, 'sudah dibayar', '971d9b30-8a6b-482b-ab6a-a8deedc764d7', 'midtrans', '5bcebc50-f7d6-45a1-9516-b68f9d8c20df', NULL, NULL, '2025-04-19 19:16:36', '2025-04-19 19:17:21', NULL),
	(19, 1, NULL, 100000, 0, 126000, 'sudah dibayar', '15ae39b6-d5b7-4732-b0ef-f07d912320d0', 'midtrans', 'd614b4e4-8e79-47dd-984b-8d5aa83b8a16', NULL, NULL, '2025-04-19 19:18:18', '2025-04-19 19:18:44', NULL),
	(20, 1, NULL, 400000, 0, 459000, 'dibatalkan', '18320484-f436-4474-b31e-ad11623c9b65', 'midtrans', NULL, NULL, NULL, '2025-04-19 21:07:00', '2025-04-20 05:24:49', NULL),
	(21, 1, NULL, 100000, 0, 126000, 'sudah dibayar', 'd03f951c-3340-45d2-bb3b-17c431cb83e9', 'midtrans', '12d17d92-4f5b-47d3-b064-549734ae3f47', NULL, NULL, '2025-04-20 04:45:38', '2025-04-20 04:45:56', NULL),
	(22, 1, NULL, 100000, 0, 126000, 'dibatalkan', '7bd23c92-f615-4dd7-b2e8-b4efb8aeeecb', 'midtrans', NULL, NULL, NULL, '2025-04-20 04:55:08', '2025-04-20 05:13:10', NULL),
	(23, 1, NULL, 200000, 0, 237000, 'sudah dibayar', 'ab45d096-e463-489e-b6b7-5927e2ab55b6', 'midtrans', '8704a578-9cde-4ad2-9295-ae4ad317b5a8', NULL, NULL, '2025-04-20 07:35:45', '2025-04-20 07:36:31', NULL),
	(24, 2, NULL, 200000, 0, 237000, 'sudah dibayar', '6f41087b-8310-4eb5-98bc-7092d796b9dc', 'midtrans', '461b35a2-fa0f-40b6-8228-5cf5af39349a', NULL, NULL, '2025-04-20 12:23:07', '2025-04-20 12:24:36', NULL),
	(25, 2, NULL, 200000, 0, 237000, 'dibatalkan', '3ad406f1-71db-4b33-b060-e96129dd7543', 'midtrans', NULL, NULL, NULL, '2025-04-20 12:25:21', '2025-04-20 12:25:52', NULL),
	(26, 2, NULL, 200000, 0, 237000, 'kadaluarsa', '6d7e0f9b-5560-4124-9616-7fb1d97cb50a', 'midtrans', NULL, NULL, NULL, '2025-04-19 12:26:45', '2025-04-20 12:26:45', NULL),
	(27, 1, NULL, 30000, 0, 48300, 'sudah dibayar', 'f00b4c90-ca16-4bf3-b2e7-cbbd0849c45b', 'midtrans', 'c164c5bd-8b11-472c-acd7-3b4bfab047b0', NULL, NULL, '2025-05-25 13:28:42', '2025-05-25 13:29:35', NULL),
	(28, 1, NULL, 20000, 0, 37200, 'sudah dibayar', '9f7ade8d-d8ad-4c0f-bb9c-00e431ad8cf1', 'midtrans', 'f46dac2a-a870-48f3-b6b4-9377abdc682a', NULL, NULL, '2025-05-30 08:56:57', '2025-05-30 18:15:02', NULL),
	(29, 1, NULL, 20000, 0, 37200, 'kadaluarsa', '2ea552fb-abf0-4f51-99d1-b35adee5e466', 'midtrans', NULL, NULL, NULL, '2025-05-30 09:00:41', '2025-05-30 09:00:41', NULL),
	(30, 1, NULL, 20000, 0, 37200, 'kadaluarsa', '6d7b787e-2416-4d87-8998-4c052ab5fed0', 'midtrans', NULL, NULL, NULL, '2025-05-30 09:06:53', '2025-05-30 09:06:53', NULL),
	(31, 1, NULL, 20000, 0, 37200, 'kadaluarsa', 'd22c91c7-2c18-40bf-95de-ab4102df7730', 'midtrans', NULL, NULL, NULL, '2025-05-30 09:07:08', '2025-05-30 09:07:08', NULL),
	(32, 1, NULL, 20000, 0, 37200, 'kadaluarsa', 'c90f19e6-4bbf-4899-9661-7bf758b8ee79', 'midtrans', NULL, NULL, NULL, '2025-05-30 09:08:02', '2025-05-30 09:08:02', NULL),
	(33, 1, NULL, 20000, 0, 37200, 'kadaluarsa', 'cfc9c825-3d7b-4161-a605-c7694fdd07b0', 'midtrans', NULL, NULL, NULL, '2025-05-30 09:09:28', '2025-05-30 09:09:28', NULL),
	(34, 1, NULL, 20000, 0, 37200, 'sudah dibayar', '2e1460b6-a235-4949-b0f1-b34bf7a08ee2', 'midtrans', '4a571246-a666-4209-a260-778f9890b924', NULL, NULL, '2025-05-30 09:11:08', '2025-05-30 18:12:01', NULL),
	(35, 1, NULL, 20000, 0, 37200, 'sudah dibayar', '9ab62b23-febb-4f33-9f8c-0453a3fc91cc', 'midtrans', 'dbff0dc6-1300-4ceb-8778-47275f5a1c58', NULL, NULL, '2025-05-30 09:13:14', '2025-05-30 09:14:01', NULL),
	(41, 1, NULL, 95000, 0, 120450, 'sudah dibayar', '1d8fe652-105f-432e-a268-18eb8d46535c', 'midtrans', 'b4e71e39-63b2-48bc-83ec-d85440b849be', NULL, NULL, '2025-05-30 09:46:01', '2025-05-30 09:46:28', NULL),
	(42, 1, 2, 199000, 19900, 215990, 'sudah dibayar', '284f9a8e-53cb-4621-9b54-1e50336e8333', 'midtrans', 'bddb1773-5137-4fa5-b877-5e4488fad2a3', NULL, NULL, '2025-05-30 17:26:38', '2025-05-30 17:27:12', NULL),
	(43, 1, NULL, 199000, 0, 235890, 'sudah dibayar', '2ed9b35d-9994-4ecf-811d-339f305475d5', 'midtrans', 'e421c53f-009a-4b2b-95da-15807e29b839', NULL, NULL, '2025-05-30 17:33:42', '2025-05-30 17:34:01', NULL),
	(46, 3, NULL, 2000, 0, 17220, 'sudah dibayar', 'c0c63167-f208-4b8b-8612-029275634239', 'midtrans', '762c3d7e-7051-4448-b4f3-e438e67ef0dd', NULL, NULL, '2025-06-01 04:18:56', '2025-06-01 04:23:25', NULL),
	(47, 1, NULL, 21000, 0, 38310, 'sudah dibayar', '34119e93-daf8-4144-b33b-248304497383', 'midtrans', '0c81150d-bb87-419f-b049-92e65f21f3db', NULL, NULL, '2025-06-01 04:22:11', '2025-06-01 04:22:59', NULL),
	(48, 3, NULL, 32000, 0, 50520, 'sudah dibayar', 'c009dd01-c469-4a85-a543-fd3cf6bea4f9', 'midtrans', 'befcbbe1-55ce-4613-9611-6ddebd5cacc5', NULL, NULL, '2025-06-01 04:24:50', '2025-06-01 04:25:22', NULL),
	(49, 3, NULL, 75000, 0, 98250, 'sudah dibayar', '292da23f-49f8-4155-8a49-55d06e4bf1d0', 'midtrans', 'be3efbfa-1a40-49f9-9dbb-82ab5b35e9eb', NULL, NULL, '2025-06-01 04:26:23', '2025-06-01 04:26:55', NULL),
	(50, 1, NULL, 722000, 0, 816420, 'kadaluarsa', '64590834-b802-428e-a0a0-436406224c8e', 'midtrans', NULL, NULL, NULL, '2025-06-03 22:55:03', '2025-06-03 22:55:03', NULL),
	(51, 2, 2, 96000, 9600, 111960, 'sudah dibayar', 'c8503682-a54c-491a-823c-becafe0c7d70', 'midtrans', 'b7f0674c-a69b-4100-a8a6-df803baf5547', NULL, NULL, '2025-06-07 08:40:26', '2025-06-07 08:40:47', NULL),
	(52, 1, 2, 50000, 5000, 65500, 'kadaluarsa', '2698da06-4a60-479b-8110-f9b2943ac4f1', 'midtrans', NULL, NULL, NULL, '2025-10-02 15:09:42', '2025-10-02 15:11:39', '2025-10-02 15:11:39'),
	(53, 1, 2, 50000, 5000, 65500, 'kadaluarsa', '302aa520-88ad-4bab-b9aa-e3fe29caa61d', 'midtrans', NULL, NULL, NULL, '2025-10-02 15:09:48', '2025-10-02 15:11:39', '2025-10-02 15:11:39'),
	(54, 1, 2, 20000, 2000, 35200, 'sudah dibayar', 'b04c34e0-ab5c-4767-8558-8d33e8ea01da', 'midtrans', '97b13488-0366-442d-80a4-d5f12bc68e39', NULL, NULL, '2025-10-02 15:12:34', '2025-10-02 15:13:00', NULL),
	(55, 1, NULL, 20000, 0, 37200, 'pending', 'b8528b48-535a-4350-9810-25cd3e58c8e2', 'midtrans', NULL, NULL, NULL, '2025-10-14 11:25:33', '2025-10-14 11:25:33', NULL),
	(56, 1, NULL, 20000, 0, 37200, 'pending', '05c6bdbd-b5d6-4971-8acf-26bf3a84a2f2', 'midtrans', NULL, NULL, NULL, '2025-10-14 11:25:55', '2025-10-14 11:25:55', NULL);

-- membuang struktur untuk table sanggar_nusantara.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.password_reset_tokens: ~0 rows (lebih kurang)
DELETE FROM `password_reset_tokens`;

-- membuang struktur untuk table sanggar_nusantara.pembelian_events
CREATE TABLE IF NOT EXISTS `pembelian_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `jumlah_tiket` int NOT NULL,
  `jenis_tiket` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` int NOT NULL,
  `total_harga` int NOT NULL,
  `tanggal` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pembelian_events_event_id_foreign` (`event_id`),
  KEY `pembelian_events_order_id_foreign` (`order_id`),
  CONSTRAINT `pembelian_events_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pembelian_events_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.pembelian_events: ~32 rows (lebih kurang)
DELETE FROM `pembelian_events`;
INSERT INTO `pembelian_events` (`id`, `event_id`, `order_id`, `jumlah_tiket`, `jenis_tiket`, `nama`, `harga`, `total_harga`, `tanggal`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 1, 4, 'Umum', 'Festival Gunung Slamet 2025', 0, 0, '2025-03-14', '2025-03-14 08:13:38', '2025-03-14 08:13:38', NULL),
	(2, 1, 2, 3, 'Umum', 'Festival Gunung Slamet 2025', 0, 0, '2025-03-14', '2025-03-14 09:05:39', '2025-03-14 09:05:39', NULL),
	(3, 1, 3, 1, 'Umum', 'Festival Gunung Slamet 2025', 0, 0, '2025-03-14', '2025-03-14 10:23:56', '2025-03-14 10:23:56', NULL),
	(4, 1, 4, 1, 'Umum', 'Festival Gunung Slamet 2025', 0, 0, '2025-03-14', '2025-03-14 12:29:55', '2025-03-14 12:29:55', NULL),
	(5, 1, 4, 4, 'VIP', 'Festival Gunung Slamet 2025', 10000, 40000, '2025-03-14', '2025-03-14 12:29:55', '2025-03-14 12:29:55', NULL),
	(9, 1, 8, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-16', '2025-04-16 04:36:34', '2025-04-16 04:36:34', NULL),
	(10, 1, 9, 3, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 300000, '2025-04-16', '2025-04-16 04:58:22', '2025-04-16 04:58:22', NULL),
	(11, 1, 15, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-20', '2025-04-19 18:46:46', '2025-04-19 18:46:46', NULL),
	(13, 1, 18, 3, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 300000, '2025-04-20', '2025-04-19 19:16:36', '2025-04-19 19:16:36', NULL),
	(14, 1, 19, 1, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 100000, '2025-04-20', '2025-04-19 19:18:18', '2025-04-19 19:18:18', NULL),
	(15, 1, 20, 4, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 400000, '2025-04-20', '2025-04-19 21:07:00', '2025-04-19 21:07:00', NULL),
	(16, 1, 21, 1, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 100000, '2025-04-20', '2025-04-20 04:45:38', '2025-04-20 04:45:38', NULL),
	(17, 1, 22, 1, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 100000, '2025-04-20', '2025-04-20 04:55:08', '2025-04-20 04:55:08', NULL),
	(18, 1, 23, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-20', '2025-04-20 07:35:45', '2025-04-20 07:35:45', NULL),
	(19, 1, 24, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-20', '2025-04-20 12:23:07', '2025-04-20 12:23:07', NULL),
	(20, 1, 25, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-20', '2025-04-20 12:25:21', '2025-04-20 12:25:21', NULL),
	(21, 1, 26, 2, 'VVIP', 'Festival Gunung Slamet 2025', 100000, 200000, '2025-04-20', '2025-04-20 12:26:45', '2025-04-20 12:26:45', NULL),
	(22, 1, 27, 3, 'VIP', 'Festival Gunung Slamet 2025', 10000, 30000, '2025-05-25', '2025-05-25 13:28:42', '2025-05-25 13:28:42', NULL),
	(23, 1, 28, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 08:56:57', '2025-05-30 08:56:57', NULL),
	(24, 1, 29, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:00:41', '2025-05-30 09:00:41', NULL),
	(25, 1, 30, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:06:53', '2025-05-30 09:06:53', NULL),
	(26, 1, 31, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:07:08', '2025-05-30 09:07:08', NULL),
	(27, 1, 32, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:08:02', '2025-05-30 09:08:02', NULL),
	(28, 1, 33, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:09:28', '2025-05-30 09:09:28', NULL),
	(29, 1, 34, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:11:08', '2025-05-30 09:11:08', NULL),
	(30, 1, 35, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:13:14', '2025-05-30 09:13:14', NULL),
	(36, 1, 41, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-05-30', '2025-05-30 09:46:02', '2025-05-30 09:46:02', NULL),
	(39, 1, 46, 2, 'Umum', 'Festival Gunung Slamet 2025', 1000, 2000, '2025-06-01', '2025-06-01 04:18:56', '2025-06-01 04:18:56', NULL),
	(40, 1, 47, 1, 'Umum', 'Festival Gunung Slamet 2025', 1000, 1000, '2025-06-01', '2025-06-01 04:22:11', '2025-06-01 04:22:11', NULL),
	(41, 1, 47, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-06-01', '2025-06-01 04:22:11', '2025-06-01 04:22:11', NULL),
	(42, 1, 48, 3, 'VIP', 'Festival Gunung Slamet 2025', 10000, 30000, '2025-06-01', '2025-06-01 04:24:50', '2025-06-01 04:24:50', NULL),
	(43, 1, 48, 2, 'Umum', 'Festival Gunung Slamet 2025', 1000, 2000, '2025-06-01', '2025-06-01 04:24:50', '2025-06-01 04:24:50', NULL),
	(44, 1, 50, 2, 'Umum', 'Festival Gunung Slamet 2025', 1000, 2000, '2025-06-04', '2025-06-03 22:55:03', '2025-06-03 22:55:03', NULL),
	(45, 1, 50, 3, 'VIP', 'Festival Gunung Slamet 2025', 10000, 30000, '2025-06-04', '2025-06-03 22:55:03', '2025-06-03 22:55:03', NULL),
	(46, 1, 51, 1, 'Umum', 'Festival Gunung Slamet 2025', 1000, 1000, '2025-06-07', '2025-06-07 08:40:26', '2025-06-07 08:40:26', NULL),
	(47, 1, 51, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-06-07', '2025-06-07 08:40:26', '2025-06-07 08:40:26', NULL),
	(48, 1, 52, 5, 'VIP', 'Festival Gunung Slamet 2025', 10000, 50000, '2025-10-02', '2025-10-02 15:09:42', '2025-10-02 15:09:42', NULL),
	(49, 1, 53, 5, 'VIP', 'Festival Gunung Slamet 2025', 10000, 50000, '2025-10-02', '2025-10-02 15:09:48', '2025-10-02 15:09:48', NULL),
	(50, 1, 54, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-10-02', '2025-10-02 15:12:34', '2025-10-02 15:12:34', NULL),
	(51, 1, 55, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-10-14', '2025-10-14 11:25:33', '2025-10-14 11:25:33', NULL),
	(52, 1, 56, 2, 'VIP', 'Festival Gunung Slamet 2025', 10000, 20000, '2025-10-14', '2025-10-14 11:25:55', '2025-10-14 11:25:55', NULL);

-- membuang struktur untuk table sanggar_nusantara.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.permissions: ~246 rows (lebih kurang)
DELETE FROM `permissions`;
INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'view_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(2, 'view_any_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(3, 'create_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(4, 'update_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(5, 'delete_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(6, 'delete_any_role', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(7, 'view_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(8, 'view_any_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(9, 'create_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(10, 'update_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(11, 'restore_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(12, 'restore_any_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(13, 'replicate_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(14, 'reorder_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(15, 'delete_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(16, 'delete_any_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(17, 'force_delete_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(18, 'force_delete_any_alat::musik', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(19, 'view_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(20, 'view_any_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(21, 'create_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(22, 'update_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(23, 'restore_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(24, 'restore_any_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(25, 'replicate_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(26, 'reorder_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(27, 'delete_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(28, 'delete_any_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(29, 'force_delete_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(30, 'force_delete_any_artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(31, 'view_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(32, 'view_any_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(33, 'create_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(34, 'update_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(35, 'restore_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(36, 'restore_any_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(37, 'replicate_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(38, 'reorder_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(39, 'delete_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(40, 'delete_any_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(41, 'force_delete_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(42, 'force_delete_any_bahasa::daerah', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(43, 'view_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(44, 'view_any_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(45, 'create_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(46, 'update_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(47, 'restore_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(48, 'restore_any_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(49, 'replicate_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(50, 'reorder_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(51, 'delete_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(52, 'delete_any_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(53, 'force_delete_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(54, 'force_delete_any_discount', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(55, 'view_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(56, 'view_any_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(57, 'create_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(58, 'update_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(59, 'restore_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(60, 'restore_any_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(61, 'replicate_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(62, 'reorder_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(63, 'delete_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(64, 'delete_any_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(65, 'force_delete_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(66, 'force_delete_any_discount::event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(67, 'view_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(68, 'view_any_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(69, 'create_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(70, 'update_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(71, 'restore_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(72, 'restore_any_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(73, 'replicate_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(74, 'reorder_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(75, 'delete_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(76, 'delete_any_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(77, 'force_delete_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(78, 'force_delete_any_discount::user', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(79, 'view_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(80, 'view_any_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(81, 'create_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(82, 'update_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(83, 'restore_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(84, 'restore_any_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(85, 'replicate_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(86, 'reorder_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(87, 'delete_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(88, 'delete_any_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(89, 'force_delete_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(90, 'force_delete_any_event', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(91, 'view_kategori::artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(92, 'view_any_kategori::artikel', 'web', '2025-03-14 06:08:55', '2025-03-14 06:08:55'),
	(93, 'create_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(94, 'update_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(95, 'restore_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(96, 'restore_any_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(97, 'replicate_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(98, 'reorder_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(99, 'delete_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(100, 'delete_any_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(101, 'force_delete_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(102, 'force_delete_any_kategori::artikel', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(103, 'view_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(104, 'view_any_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(105, 'create_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(106, 'update_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(107, 'restore_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(108, 'restore_any_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(109, 'replicate_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(110, 'reorder_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(111, 'delete_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(112, 'delete_any_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(113, 'force_delete_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(114, 'force_delete_any_kategori::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(115, 'view_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(116, 'view_any_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(117, 'create_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(118, 'update_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(119, 'restore_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(120, 'restore_any_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(121, 'replicate_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(122, 'reorder_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(123, 'delete_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(124, 'delete_any_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(125, 'force_delete_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(126, 'force_delete_any_komentar', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(127, 'view_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(128, 'view_any_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(129, 'create_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(130, 'update_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(131, 'restore_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(132, 'restore_any_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(133, 'replicate_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(134, 'reorder_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(135, 'delete_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(136, 'delete_any_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(137, 'force_delete_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(138, 'force_delete_any_kontak', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(139, 'view_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(140, 'view_any_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(141, 'create_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(142, 'update_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(143, 'restore_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(144, 'restore_any_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(145, 'replicate_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(146, 'reorder_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(147, 'delete_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(148, 'delete_any_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(149, 'force_delete_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(150, 'force_delete_any_lagu::daerah', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(151, 'view_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(152, 'view_any_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(153, 'create_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(154, 'update_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(155, 'restore_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(156, 'restore_any_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(157, 'replicate_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(158, 'reorder_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(159, 'delete_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(160, 'delete_any_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(161, 'force_delete_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(162, 'force_delete_any_makanan::khas', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(163, 'view_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(164, 'view_any_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(165, 'create_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(166, 'update_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(167, 'restore_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(168, 'restore_any_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(169, 'replicate_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(170, 'reorder_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(171, 'delete_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(172, 'delete_any_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(173, 'force_delete_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(174, 'force_delete_any_order', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(175, 'view_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(176, 'view_any_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(177, 'create_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(178, 'update_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(179, 'restore_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(180, 'restore_any_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(181, 'replicate_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(182, 'reorder_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(183, 'delete_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(184, 'delete_any_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(185, 'force_delete_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(186, 'force_delete_any_pembelian::event', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(187, 'view_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(188, 'view_any_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(189, 'create_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(190, 'update_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(191, 'restore_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(192, 'restore_any_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(193, 'replicate_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(194, 'reorder_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(195, 'delete_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(196, 'delete_any_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(197, 'force_delete_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(198, 'force_delete_any_plan', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(199, 'view_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(200, 'view_any_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(201, 'create_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(202, 'update_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(203, 'restore_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(204, 'restore_any_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(205, 'replicate_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(206, 'reorder_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(207, 'delete_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(208, 'delete_any_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(209, 'force_delete_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(210, 'force_delete_any_rumah::adat', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(211, 'view_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(212, 'view_any_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(213, 'create_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(214, 'update_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(215, 'restore_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(216, 'restore_any_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(217, 'replicate_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(218, 'reorder_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(219, 'delete_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(220, 'delete_any_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(221, 'force_delete_seni::tari', 'web', '2025-03-14 06:08:56', '2025-03-14 06:08:56'),
	(222, 'force_delete_any_seni::tari', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(223, 'view_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(224, 'view_any_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(225, 'create_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(226, 'update_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(227, 'restore_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(228, 'restore_any_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(229, 'replicate_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(230, 'reorder_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(231, 'delete_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(232, 'delete_any_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(233, 'force_delete_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(234, 'force_delete_any_subscription', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(235, 'view_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(236, 'view_any_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(237, 'create_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(238, 'update_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(239, 'restore_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(240, 'restore_any_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(241, 'replicate_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(242, 'reorder_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(243, 'delete_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(244, 'delete_any_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(245, 'force_delete_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57'),
	(246, 'force_delete_any_user', 'web', '2025-03-14 06:08:57', '2025-03-14 06:08:57');

-- membuang struktur untuk table sanggar_nusantara.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.personal_access_tokens: ~21 rows (lebih kurang)
DELETE FROM `personal_access_tokens`;
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
	(1, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'bd0137dff354af9c90d06f4c05416b9d8d7798e6776f596673ef0dc3c908f682', '["*"]', NULL, NULL, '2025-05-02 09:27:31', '2025-05-02 09:27:31'),
	(2, 'App\\Models\\User', 1, 'Sanggar Nusantara', '9f628775204449ebabc76db1be901aeb815d23e3e1d72110ea09b246e51b80be', '["*"]', '2025-05-03 02:30:54', NULL, '2025-05-02 09:39:01', '2025-05-03 02:30:54'),
	(3, 'App\\Models\\User', 1, 'Sanggar Nusantara', '620eabea0723d7a65d29b9d64698698b2d092818b759ac1be86948b185f444cd', '["*"]', '2025-05-03 02:39:49', NULL, '2025-05-03 02:30:58', '2025-05-03 02:39:49'),
	(4, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'e053f3aef795b8042c14bcbc62e24ddf91c63b0da0e7654e6ca89aa4897f64f5', '["*"]', '2025-05-03 02:44:58', NULL, '2025-05-03 02:39:54', '2025-05-03 02:44:58'),
	(5, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'db0a47903a089e30ad408b23e9a2dc8d30da6633867b2a79a8d492a291efe333', '["*"]', '2025-05-03 02:49:08', NULL, '2025-05-03 02:45:01', '2025-05-03 02:49:08'),
	(6, 'App\\Models\\User', 1, 'Sanggar Nusantara', '21a51c9e466936e360f71f99faf83b130cc6af302430142d9dc62856b11e7fe2', '["*"]', '2025-05-03 02:52:59', NULL, '2025-05-03 02:49:12', '2025-05-03 02:52:59'),
	(7, 'App\\Models\\User', 1, 'Sanggar Nusantara', '552d3e3cd6cbae349fa4daf6510f1d6ab0f796bacde8ff430d025507d7473a27', '["*"]', '2025-05-03 02:56:04', NULL, '2025-05-03 02:53:02', '2025-05-03 02:56:04'),
	(8, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'ede60720ad5fd7b5314d8a0fc8d773866289ea96e34c3bdbd3718ae35fe28e40', '["*"]', '2025-05-03 02:59:46', NULL, '2025-05-03 02:56:10', '2025-05-03 02:59:46'),
	(9, 'App\\Models\\User', 1, 'Sanggar Nusantara', '7fcd3cfb432a815bf2ff517afe49f5301bc2201d1affa01c9eed269cd66ddf46', '["*"]', '2025-05-03 03:03:31', NULL, '2025-05-03 02:59:49', '2025-05-03 03:03:31'),
	(10, 'App\\Models\\User', 1, 'Sanggar Nusantara', '6cc7a52b7134e18a6e702a1708ab6bc4ddd8b4fa0f178bf0223227095f7b7600', '["*"]', '2025-05-03 03:06:26', NULL, '2025-05-03 03:03:39', '2025-05-03 03:06:26'),
	(11, 'App\\Models\\User', 1, 'Sanggar Nusantara', '5882388d6b2e3fa16bf1f11f364e8fc017f38a321e673dea6d3c51e2a1d55db7', '["*"]', '2025-05-03 03:27:15', NULL, '2025-05-03 03:07:10', '2025-05-03 03:27:15'),
	(12, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'b9d874807b3bb9f94a0e2fab0fc078f5d5fb8c091fdaa6ae8b502218379118f7', '["*"]', NULL, NULL, '2025-05-03 03:16:48', '2025-05-03 03:16:48'),
	(13, 'App\\Models\\User', 1, 'Sanggar Nusantara', '2bf25aef63ff44dbf75a322ec05a706e2f398e3ca4aa8ccb83b135b03cbc6f66', '["*"]', NULL, NULL, '2025-05-03 03:17:09', '2025-05-03 03:17:09'),
	(14, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'bf9715194b0f2369ba7088ca39a54c179f5435225f42ab84542d0eb75040f90b', '["*"]', NULL, NULL, '2025-05-03 03:18:40', '2025-05-03 03:18:40'),
	(15, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'bf923391e6dbcfad976eee154b9a86d0b1678954682881ab71f4813b5ec486c1', '["*"]', NULL, NULL, '2025-05-03 03:29:07', '2025-05-03 03:29:07'),
	(16, 'App\\Models\\User', 1, 'Sanggar Nusantara', '56afed174566698da98b5a461f2e84929e167bfe33a00d9d537f027756e9f058', '["*"]', NULL, NULL, '2025-05-03 03:33:45', '2025-05-03 03:33:45'),
	(17, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'e2486a445113a8b992a4938778ecf32d61430d8b4fa0253b4e050fe1696931bd', '["*"]', NULL, NULL, '2025-05-03 03:34:04', '2025-05-03 03:34:04'),
	(18, 'App\\Models\\User', 1, 'Sanggar Nusantara', '068fec106aafdacfe45037e0143ed202a483734366b4201aa7ac257b7c77f9b6', '["*"]', NULL, NULL, '2025-05-03 03:35:39', '2025-05-03 03:35:39'),
	(19, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'c5853c2a9a048902b180373dc599795eec25e1d24ff504604046b4e7b0833eb5', '["*"]', NULL, NULL, '2025-05-03 03:36:04', '2025-05-03 03:36:04'),
	(20, 'App\\Models\\User', 1, 'Sanggar Nusantara', 'b268eb98b88afecade5290eab67baf3052d63a287a3e1cdccf462d510ec0ab68', '["*"]', '2025-05-03 03:41:36', NULL, '2025-05-03 03:38:14', '2025-05-03 03:41:36'),
	(21, 'App\\Models\\User', 1, 'Sanggar Nusantara', '40e97b2ac6345d9e3210e8886735c81f0f8c51aa77dbf55039fab2fbfdc8871e', '["*"]', '2025-05-03 03:54:52', NULL, '2025-05-03 03:47:54', '2025-05-03 03:54:52'),
	(22, 'App\\Models\\User', 1, 'Sanggar Nusantara', '616480f784fbdcf76c792f5401e8d800b9abef1fb43502c0df1efc6506e53c6e', '["*"]', '2025-05-03 04:05:09', NULL, '2025-05-03 03:55:00', '2025-05-03 04:05:09');

-- membuang struktur untuk table sanggar_nusantara.plans
CREATE TABLE IF NOT EXISTS `plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` int NOT NULL,
  `harga_diskon` int NOT NULL,
  `durasi` enum('30','90','365') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fitur` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.plans: ~9 rows (lebih kurang)
DELETE FROM `plans`;
INSERT INTO `plans` (`id`, `nama`, `harga`, `harga_diskon`, `durasi`, `deskripsi`, `fitur`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(7, 'Gratis', 0, 0, '30', 'Cocok untuk pemula yang ingin mengenal budaya Indonesia.\nTanpa komitmen dan tanpa biaya.', '- Akses terbatas ke artikel budaya\n- Berlangganan newsletter bulanan\n- Profil anggota komunitas', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(8, 'Gratis', 0, 0, '90', 'Cocok untuk pemula yang ingin mengenal budaya Indonesia.\nTanpa komitmen dan tanpa biaya.', '- Akses terbatas ke artikel budaya\n- Berlangganan newsletter bulanan\n- Profil anggota komunitas', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(9, 'Gratis', 0, 0, '365', 'Cocok untuk pemula yang ingin mengenal budaya Indonesia.\nTanpa komitmen dan tanpa biaya.', '- Akses terbatas ke artikel budaya\n- Berlangganan newsletter bulanan\n- Profil anggota komunitas', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(10, 'Pelajar', 35000, 25000, '30', 'Untuk pelajar yang ingin memperdalam wawasan budaya.\nPaket paling banyak dipilih oleh pelajar!', '- Akses penuh ke semua artikel premium\n- Akses eksklusif ke video dokumenter\n- E-sertifikat pelatihan budaya\n- Forum diskusi komunitas\n- Akses kuis dan modul pembelajaran budaya interaktif\n- Undangan webinar eksklusif bersama budayawan muda\n- Akses galeri karya budaya digital dari sesama pelajar', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(11, 'Pelajar', 75000, 65000, '90', 'Untuk pelajar yang ingin memperdalam wawasan budaya.\nPaket paling banyak dipilih oleh pelajar!', '- Akses penuh ke semua artikel premium\n- Akses eksklusif ke video dokumenter\n- E-sertifikat pelatihan budaya\n- Forum diskusi komunitas\n- Akses kuis dan modul pembelajaran budaya interaktif\n- Undangan webinar eksklusif bersama budayawan muda\n- Akses galeri karya budaya digital dari sesama pelajar', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(12, 'Pelajar', 350000, 199000, '365', 'Untuk pelajar yang ingin memperdalam wawasan budaya.\nPaket paling banyak dipilih oleh pelajar!', '- Akses penuh ke semua artikel premium\n- Akses eksklusif ke video dokumenter\n- E-sertifikat pelatihan budaya\n- Forum diskusi komunitas\n- Akses kuis dan modul pembelajaran budaya interaktif\n- Undangan webinar eksklusif bersama budayawan muda\n- Akses galeri karya budaya digital dari sesama pelajar', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(13, 'Profesional', 99000, 75000, '30', 'Didesain untuk praktisi dan pelaku budaya aktif.\nFitur lengkap untuk ekspansi karya budaya.', '- Semua fitur paket Pelajar\n- Akses data riset budaya\n- Akses penuh ke semua event premium\n- Konsultasi virtual dengan budayawan\n- Promosi karya budaya di website & media sosial\n- Publikasi artikel di laman Sanggar Nusantara\n- Kesempatan jadi narasumber event budaya nasional\n- Laporan insight & tren budaya nasional bulanan\n- Akses ke komunitas profesional dan jejaring budaya', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(14, 'Profesional', 255000, 199000, '90', 'Didesain untuk praktisi dan pelaku budaya aktif.\nFitur lengkap untuk ekspansi karya budaya.', '- Semua fitur paket Pelajar\n- Akses data riset budaya\n- Akses penuh ke semua event premium\n- Konsultasi virtual dengan budayawan\n- Promosi karya budaya di website & media sosial\n- Publikasi artikel di laman Sanggar Nusantara\n- Kesempatan jadi narasumber event budaya nasional\n- Laporan insight & tren budaya nasional bulanan\n- Akses ke komunitas profesional dan jejaring budaya', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL),
	(15, 'Profesional', 990000, 690000, '365', 'Didesain untuk praktisi dan pelaku budaya aktif.\nFitur lengkap untuk ekspansi karya budaya.', '- Semua fitur paket Pelajar\n- Akses data riset budaya\n- Akses penuh ke semua event premium\n- Konsultasi virtual dengan budayawan\n- Promosi karya budaya di website & media sosial\n- Publikasi artikel di laman Sanggar Nusantara\n- Kesempatan jadi narasumber event budaya nasional\n- Laporan insight & tren budaya nasional bulanan\n- Akses ke komunitas profesional dan jejaring budaya', '2025-05-01 23:57:58', '2025-05-01 23:57:58', NULL);

-- membuang struktur untuk table sanggar_nusantara.quizzes
CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `is_premium` tinyint(1) DEFAULT '0',
  `start_at` timestamp NULL DEFAULT NULL,
  `end_at` timestamp NULL DEFAULT NULL,
  `duration_minutes` int DEFAULT '10',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quizzes: ~7 rows (lebih kurang)
DELETE FROM `quizzes`;
INSERT INTO `quizzes` (`id`, `uuid`, `title`, `description`, `is_premium`, `start_at`, `end_at`, `duration_minutes`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, '9d8ee225-a854-11f0-ad8b-005056c00001', 'Kuis Bahasa Daerah Nusantara', 'Uji kemampuanmu dalam mengenali dan memahami kosa kata dari berbagai bahasa daerah di Indonesia!', 0, '2025-10-10 01:00:00', '2025-10-20 16:59:00', 10, '2025-10-10 00:13:17', '2025-10-13 16:49:42', NULL),
	(2, '9d8f0dfe-a854-11f0-ad8b-005056c00001', 'Kenali Rumah Adat Indonesia', 'Seberapa paham kamu dengan bentuk, asal, dan filosofi rumah adat di Nusantara? Yuk, buktikan!', 0, '2025-10-12 01:00:00', '2025-10-25 16:59:00', 12, '2025-10-10 00:13:17', '2025-10-13 16:49:42', NULL),
	(3, '9d8f1116-a854-11f0-ad8b-005056c00001', 'Tebak Alat Musik Tradisional', 'Dengarkan atau lihat potongan gambar alat musik khas daerah dan tebak asalnya!', 1, '2025-10-15 02:00:00', '2025-10-30 16:59:00', 15, '2025-10-10 00:13:17', '2025-10-13 16:49:42', NULL),
	(4, '9d8f1327-a854-11f0-ad8b-005056c00001', 'Kuliner Nusantara', 'Kuis interaktif tentang makanan khas dari Sabang sampai Merauke. Dijamin bikin lapar!', 0, '2025-10-10 01:00:00', '2025-10-31 16:59:00', 10, '2025-10-10 00:13:17', '2025-10-13 16:49:42', NULL),
	(5, '9d8f1540-a854-11f0-ad8b-005056c00001', 'Tarian Tradisional & Maknanya', 'Cari tahu makna dan asal dari berbagai tarian tradisional di Indonesia. Kuis premium untuk pecinta seni!', 1, '2025-10-20 01:00:00', '2025-11-05 16:59:00', 20, '2025-10-10 00:13:17', '2025-10-13 16:49:42', NULL),
	(10, '9d8f16f5-a854-11f0-ad8b-005056c00001', 'coba kuis', 'Aenean tortor hendrerit efficitur nascetur gravida tristique ad risus porttitor suspendisse natoque vestibulum feugiat velit faucibus fringilla consequat parturient class elementum condimentum mus est tempus adipiscing semper a ullamcorper quam habitant scelerisque id neque magnis orci letius venenatis hac amet litora aliquam platea iaculis nam vivamus morbi justo phasellus netus ante tellus eu purus consectetur congue nullam pretium', 1, '2025-10-10 03:04:00', '2025-11-07 03:04:00', 10, '2025-10-10 03:05:21', '2025-10-13 16:49:42', NULL),
	(11, '31383362-af2d-40f1-a1a2-bdb61c1e360b', 'Kuis Coba 2', 'Quam libero fermentum elit letius morbi mauris volutpat tortor cursus si vestibulum ac blandit convallis non fusce imperdiet habitasse penatibus urna feugiat maximus hendrerit adipiscing quisque efficitur phasellus suspendisse laoreet cubilia pede mattis montes nascetur tincidunt enim ullamcorper dictumst ex ipsum fringilla elementum nisl risus scelerisque erat eros netus mus lobortis molestie odio torquent eu consectetur porttitor felis curabitur proin augue rhoncus mi nec ultricies consectetuer a velit conubia neque magnis auctor magna lacus accumsan sed bibendum taciti consequat ornare amet commodo per congue massa curae mollis vivamus lorem malesuada maecenas lacinia cras facilisi vel lectus etiam tellus nibh', 0, '2025-10-13 16:57:00', '2025-11-05 16:57:00', 10, '2025-10-13 17:02:17', '2025-10-13 17:02:17', NULL);

-- membuang struktur untuk table sanggar_nusantara.quiz_answers
CREATE TABLE IF NOT EXISTS `quiz_answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quiz_question_id` bigint unsigned NOT NULL,
  `answer_text` text NOT NULL,
  `answer_explanation` text NOT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_quiz_answers_question` (`quiz_question_id`),
  CONSTRAINT `fk_quiz_answers_question` FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quiz_answers: ~80 rows (lebih kurang)
DELETE FROM `quiz_answers`;
INSERT INTO `quiz_answers` (`id`, `quiz_question_id`, `answer_text`, `answer_explanation`, `is_correct`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'Bahasa Minangkabau', 'Benar, Bahasa Minangkabau digunakan oleh masyarakat Sumatera Barat.', 1, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(2, 1, 'Bahasa Batak', 'Bahasa Batak digunakan di Sumatera Utara, bukan Sumatera Barat.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(3, 1, 'Bahasa Melayu', 'Bahasa Melayu digunakan di Riau dan Kepulauan Riau.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(4, 1, 'Bahasa Aceh', 'Bahasa Aceh digunakan di Provinsi Aceh.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(5, 2, 'Minangkabau, Sumatera Barat', 'Tepat! Rumah Gadang berasal dari Minangkabau, Sumatera Barat.', 1, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(6, 2, 'Sulawesi Selatan', 'Rumah adat dari Sulawesi Selatan adalah Tongkonan.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(7, 2, 'Kalimantan Timur', 'Rumah adat dari Kalimantan Timur adalah Lamin.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(8, 2, 'Bali', 'Rumah adat di Bali disebut Bale atau Rumah Bali.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(9, 3, 'Ditiup', 'Angklung tidak dimainkan dengan cara ditiup, tetapi digoyangkan.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(10, 3, 'Ditekan', 'Angklung bukan alat musik keyboard yang ditekan.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(11, 3, 'Dipetik', 'Angklung tidak dipetik seperti gitar.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(12, 3, 'Digoyangkan', 'Benar! Angklung dimainkan dengan cara digoyangkan.', 1, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(13, 4, 'Aceh', 'Benar! Tari Saman berasal dari Aceh.', 1, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(14, 4, 'Bali', 'Tari Bali dikenal dengan tarian Legong dan Kecak, bukan Saman.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(15, 4, 'Jawa Tengah', 'Tari Saman bukan berasal dari Jawa Tengah.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(16, 4, 'Papua', 'Tari Papua memiliki gaya khas sendiri, bukan Tari Saman.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(17, 5, 'Yogyakarta', 'Benar! Gudeg adalah makanan khas dari Yogyakarta.', 1, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(18, 5, 'Bandung', 'Bandung punya makanan khas seperti Batagor dan Seblak, bukan Gudeg.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(19, 5, 'Medan', 'Makanan khas Medan antara lain Bika Ambon dan Soto Medan.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(20, 5, 'Padang', 'Padang dikenal dengan rendang, bukan gudeg.', 0, '2025-10-10 00:15:07', '2025-10-10 00:15:07', NULL),
	(21, 6, 'Bahasa Minangkabau', 'Benar, Bahasa Minangkabau digunakan di Sumatera Barat.', 1, '2025-10-10 11:59:39', '2025-10-10 11:59:39', NULL),
	(22, 6, 'Bahasa Batak', 'Salah, Bahasa Batak digunakan di Sumatera Utara.', 0, '2025-10-10 11:59:39', '2025-10-10 11:59:39', NULL),
	(23, 6, 'Bahasa Aceh', 'Salah, Bahasa Aceh digunakan di Aceh.', 0, '2025-10-10 11:59:39', '2025-10-10 11:59:39', NULL),
	(24, 6, 'Bahasa Melayu', 'Salah, Bahasa Melayu digunakan di Riau.', 0, '2025-10-10 11:59:39', '2025-10-10 11:59:39', NULL),
	(25, 7, 'Menjual produk budaya untuk keuntungan pribadi.', 'Tujuan utamanya bukan mencari keuntungan, melainkan pelestarian budaya.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(26, 7, 'Menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia.', 'Benar! Ini adalah misi utama Sanggar Nusantara.', 1, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(27, 7, 'Mempopulerkan budaya asing di Indonesia.', 'Salah, fokus platform ini adalah pada budaya lokal Indonesia.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(28, 7, 'Menghapus budaya yang dianggap kuno.', 'Salah, Sanggar Nusantara justru berupaya menjaga budaya tradisional agar tetap hidup.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(29, 8, 'Dengan mengarsipkan budaya tanpa publikasi.', 'Kurang tepat, karena pelestarian juga memerlukan promosi dan edukasi.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(30, 8, 'Dengan menyediakan informasi budaya dan fitur interaktif secara digital.', 'Benar! Ini merupakan cara utama platform berkontribusi.', 1, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(31, 8, 'Dengan membatasi akses informasi budaya.', 'Salah, justru akses informasi harus diperluas agar budaya dikenal luas.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(32, 8, 'Dengan menghapus budaya yang tidak populer.', 'Salah besar, setiap budaya memiliki nilai penting untuk dilestarikan.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(33, 9, 'Hanya berupa artikel teks tanpa interaksi.', 'Kurang tepat, karena fitur interaktif adalah elemen utama.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(34, 9, 'Kuis budaya, video edukatif, dan eksplorasi interaktif.', 'Benar! Fitur-fitur ini membuat pembelajaran budaya jadi menyenangkan.', 1, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(35, 9, 'Konten gosip artis daerah.', 'Salah, konten yang disediakan bersifat edukatif dan informatif.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(36, 9, 'Permainan online tanpa unsur budaya.', 'Kurang tepat, fitur tetap berfokus pada nilai dan pengetahuan budaya.', 0, '2025-10-14 10:12:45', '2025-10-14 10:12:45', NULL),
	(37, 10, 'Sebagai sarana untuk berjualan di pasar tradisional.', 'Kurang tepat, fungsi utamanya bukan ekonomi langsung.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(38, 10, 'Sebagai ekspresi budaya, ritual, dan hiburan.', 'Benar! Tarian tradisional merupakan ekspresi budaya masyarakat.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(39, 10, 'Sebagai kegiatan olahraga rutin.', 'Salah, walau melibatkan gerakan fisik, tujuannya bukan olahraga.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(40, 10, 'Sebagai latihan bela diri.', 'Tidak tepat, meski beberapa gerakan mungkin terinspirasi dari bela diri.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(41, 11, 'Sumatera Barat.', 'Salah, itu asal dari Tari Piring.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(42, 11, 'Aceh.', 'Benar! Tari Saman berasal dari Aceh.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(43, 11, 'Kalimantan Selatan.', 'Salah, bukan dari Kalimantan.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(44, 11, 'Sulawesi Utara.', 'Salah, bukan wilayah asal Tari Saman.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(45, 12, 'Angklung.', 'Salah, Angklung dimainkan dengan digoyangkan.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(46, 12, 'Kecapi.', 'Salah, kecapi dipetik, bukan digesek.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(47, 12, 'Rebab.', 'Benar! Rebab dimainkan dengan cara digesek.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(48, 12, 'Gambang.', 'Salah, Gambang dimainkan dengan cara dipukul.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(49, 13, 'Sebagai simbol status sosial semata.', 'Kurang tepat, pakaian adat Bali memiliki makna spiritual.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(50, 13, 'Untuk menunjukkan mode terkini.', 'Salah, tujuannya bukan untuk tren mode.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(51, 13, 'Untuk menghormati dewa dan menjaga kesucian upacara.', 'Benar! Pakaian adat Bali sarat makna spiritual.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(52, 13, 'Sebagai pakaian sehari-hari masyarakat.', 'Tidak tepat, hanya digunakan untuk upacara atau acara khusus.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(53, 14, 'Agar bisa meniru budaya asing.', 'Salah, justru agar mencintai budaya sendiri.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(54, 14, 'Agar memiliki identitas dan menghargai keberagaman.', 'Benar! Inilah tujuan utama mengenal budaya daerah.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(55, 14, 'Agar bisa bersaing di bidang ekonomi global.', 'Tidak sepenuhnya benar, meski bisa berdampak tidak langsung.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(56, 14, 'Agar lebih mudah melakukan perjalanan wisata.', 'Kurang tepat, bukan itu tujuan utamanya.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(57, 15, 'Membatasi akses budaya agar tetap eksklusif.', 'Salah, digitalisasi justru memperluas akses budaya.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(58, 15, 'Membantu melestarikan dan memperkenalkan budaya secara luas.', 'Benar! Inilah manfaat utama digitalisasi budaya.', 1, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(59, 15, 'Menghapus budaya tradisional yang dianggap kuno.', 'Salah, digitalisasi bertujuan melestarikan, bukan menghapus.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(60, 15, 'Mengubah budaya menjadi hiburan tanpa makna.', 'Tidak tepat, karena tujuannya tetap edukatif.', 0, '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(61, 16, 'Digitalisasi selalu menjaga keaslian budaya tanpa risiko apa pun.', 'Salah, digitalisasi berpotensi mendistorsikan makna budaya jika tidak hati-hati.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(62, 16, 'Digitalisasi dapat melestarikan budaya namun juga berisiko mengubah maknanya.', 'Benar! Ada peluang dan risiko yang harus dikelola dengan bijak.', 1, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(63, 16, 'Digitalisasi membuat budaya menjadi tidak relevan dengan masa kini.', 'Salah, justru membuat budaya lebih mudah diakses.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(64, 16, 'Digitalisasi tidak berpengaruh terhadap budaya lokal.', 'Tidak tepat, karena dampaknya bisa besar terhadap representasi budaya.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(65, 17, 'Meningkatkan koneksi internet di daerah terpencil.', 'Bukan inti tantangannya, ini lebih ke infrastruktur.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(66, 17, 'Menjaga nilai tradisional tetap relevan di era modern tanpa kehilangan maknanya.', 'Benar! Ini tantangan utama dalam inovasi budaya.', 1, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(67, 17, 'Menghapus nilai lama untuk digantikan dengan budaya digital baru.', 'Salah, ini justru ancaman terhadap pelestarian budaya.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(68, 17, 'Menentukan platform media sosial yang paling populer.', 'Kurang tepat, ini soal teknis bukan nilai budaya.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(69, 18, 'Karena masyarakat perlu diajak agar tidak merasa dilibatkan.', 'Salah, partisipasi justru inti pelestarian.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(70, 18, 'Agar proses digitalisasi tidak hanya dari atas ke bawah, tapi juga mencerminkan suara lokal.', 'Benar! Partisipasi menjaga keaslian dan representasi budaya.', 1, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(71, 18, 'Supaya proyek digitalisasi lebih cepat selesai.', 'Tidak tepat, kecepatan bukan tujuan utama.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(72, 18, 'Karena masyarakat tidak memiliki peran penting dalam kebudayaan.', 'Salah besar, masyarakat adalah pelaku utama budaya.', 0, '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(73, 19, 'Budaya akan berkembang pesat tanpa perlu generasi penerus.', 'Salah, budaya hidup melalui pewarisan antargenerasi.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(74, 19, 'Budaya bisa terdigitalisasi sepenuhnya tanpa interaksi manusia.', 'Salah, budaya bukan sekadar data digital.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(75, 19, 'Budaya akan kehilangan penerusnya dan hanya menjadi arsip mati.', 'Benar! Regenerasi pelaku budaya sangat penting.', 1, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(76, 19, 'Tidak ada dampak apa pun, karena digitalisasi sudah cukup.', 'Salah total, digitalisasi tidak bisa menggantikan pewarisan nilai.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(77, 20, 'Dengan menyebarluaskan semua konten budaya tanpa izin agar bisa viral.', 'Salah, itu melanggar etika dan hak cipta.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(78, 20, 'Dengan menghormati hak cipta, konteks budaya, dan sensitivitas lokal.', 'Benar! Ini prinsip utama etika digital dalam pelestarian budaya.', 1, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(79, 20, 'Dengan memodifikasi konten budaya agar lebih menarik tanpa mempertimbangkan makna.', 'Salah, bisa menyebabkan distorsi budaya.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(80, 20, 'Dengan menjual konten budaya ke luar negeri tanpa melibatkan komunitas asal.', 'Salah, itu bentuk eksploitasi budaya.', 0, '2025-10-14 10:15:47', '2025-10-14 10:15:47', NULL),
	(81, 21, 'Karena dokumentasi digital sudah cukup untuk menggantikan praktik budaya.', 'Salah, budaya tidak bisa hidup tanpa pelaku dan konteks sosial.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(82, 21, 'Karena budaya memerlukan interaksi sosial dan pewarisan nilai, bukan sekadar arsip.', 'Benar! Dokumentasi hanyalah salah satu aspek pelestarian.', 1, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(83, 21, 'Karena media digital tidak bisa menyimpan data budaya dengan baik.', 'Kurang tepat, media digital justru bisa menyimpan, tapi tidak menggantikan praktik.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(84, 21, 'Karena digitalisasi menghilangkan nilai ekonomi budaya.', 'Salah, ini bukan soal ekonomi semata.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(85, 22, 'Globalisasi digital selalu memperkuat budaya lokal tanpa risiko apa pun.', 'Salah, bisa memperkuat atau justru melemahkan identitas.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(86, 22, 'Globalisasi digital dapat memperluas jangkauan budaya, tapi juga berisiko melemahkan keaslian.', 'Benar! Ini paradoks utama budaya di era global.', 1, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(87, 22, 'Globalisasi digital hanya berdampak pada ekonomi, bukan budaya.', 'Tidak tepat, dampaknya sangat besar terhadap budaya.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(88, 22, 'Globalisasi digital tidak berpengaruh terhadap identitas nasional.', 'Salah besar, justru sangat memengaruhi.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(89, 23, 'Untuk memastikan konten budaya dibuat oleh influencer terkenal.', 'Salah, kurasi berfokus pada nilai dan keaslian, bukan popularitas.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(90, 23, 'Untuk menjaga akurasi dan konteks budaya agar tidak disalahartikan.', 'Benar! Kurasi adalah pengendali kualitas konten budaya digital.', 1, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(91, 23, 'Untuk membatasi akses publik terhadap budaya.', 'Salah, kurasi bukan pembatasan, melainkan pengendalian kualitas.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(92, 23, 'Untuk mengganti tradisi lama dengan interpretasi baru.', 'Kurang tepat, kurasi menjaga kontinuitas, bukan mengganti makna.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(93, 24, 'Literasi digital tidak berhubungan dengan kesadaran budaya.', 'Salah, keduanya saling berkaitan erat.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(94, 24, 'Literasi digital membantu masyarakat memahami dan menyebarkan budaya secara kritis.', 'Benar! Literasi digital meningkatkan kesadaran budaya.', 1, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(95, 24, 'Literasi digital hanya berfokus pada kemampuan teknologi.', 'Salah, ada dimensi etika dan budaya juga.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(96, 24, 'Kesadaran budaya justru berkurang dengan literasi digital.', 'Tidak tepat, jika digunakan benar, literasi digital justru memperkuat kesadaran.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(97, 25, 'Menghapus budaya lama dan menggantinya dengan budaya modern.', 'Salah, revitalisasi bukan penggantian budaya.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(98, 25, 'Menghidupkan kembali budaya tradisional dengan adaptasi teknologi tanpa kehilangan makna.', 'Benar! Ini inti dari revitalisasi budaya modern.', 1, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(99, 25, 'Menciptakan budaya baru yang sepenuhnya digital.', 'Salah, revitalisasi tetap berakar pada budaya lama.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(100, 25, 'Menyimpan budaya lama tanpa upaya pengembangan.', 'Kurang tepat, revitalisasi berarti menghidupkan kembali, bukan sekadar menyimpan.', 0, '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(101, 26, 'Kurangnya inovasi dalam memodernisasi budaya.', 'Masalah ini lebih ke arah kreativitas, bukan dilema etika utama.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(102, 26, 'Ketidakseimbangan antara nilai ekonomi dan nilai budaya.', 'Benar. Komersialisasi bisa membuat nilai budaya tergeser oleh orientasi keuntungan.', 1, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(103, 26, 'Minimnya dukungan dari pemerintah.', 'Faktor ini penting, tapi bukan inti dilema etika.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(104, 26, 'Tidak adanya minat generasi muda.', 'Masalah ini bersifat sosial, bukan etika dalam komersialisasi.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(105, 27, 'Karena kearifan lokal mudah disesuaikan dengan pasar global.', 'Sebaliknya, kearifan lokal sering sulit disesuaikan tanpa kehilangan makna.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(106, 27, 'Karena kearifan lokal memberikan nilai orisinalitas yang unik.', 'Benar. Orisinalitas adalah kunci daya saing ekonomi kreatif berbasis budaya.', 1, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(107, 27, 'Karena kearifan lokal meniru budaya asing dengan baik.', 'Salah, justru kearifan lokal menolak peniruan budaya asing.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(108, 27, 'Karena kearifan lokal lebih mengutamakan efisiensi produksi.', 'Faktor efisiensi tidak menjadi inti kearifan lokal.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(109, 28, 'Globalisasi selalu memperkuat budaya lokal melalui pertukaran ide.', 'Tidak selalu, karena globalisasi juga dapat mendominasi budaya lokal.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(110, 28, 'Globalisasi dapat memperkaya sekaligus melemahkan budaya lokal.', 'Benar. Dampaknya bersifat ambivalen tergantung respons masyarakat.', 1, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(111, 28, 'Globalisasi membuat semua budaya menjadi identik.', 'Ini berlebihan, walaupun homogenisasi bisa terjadi.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(112, 28, 'Globalisasi tidak berpengaruh terhadap budaya lokal.', 'Salah. Pengaruhnya justru besar terhadap ekspresi dan nilai budaya.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(113, 29, 'Ketersediaan dana untuk promosi budaya.', 'Faktor teknis, bukan tantangan etis utama.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(114, 29, 'Perlindungan hak cipta dan representasi autentik.', 'Benar. Kedua aspek ini menjadi isu etika utama dalam digitalisasi budaya.', 1, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(115, 29, 'Kurangnya minat pengguna terhadap budaya lokal.', 'Itu lebih ke tantangan sosial, bukan etika.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(116, 29, 'Persaingan dengan platform luar negeri.', 'Masalah kompetitif, bukan etis.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(117, 30, 'Menghindari seluruh pengaruh budaya luar.', 'Pendekatan ini tidak realistis dan justru mengisolasi budaya lokal.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(118, 30, 'Meniru budaya global secara total.', 'Salah, karena menghapus identitas lokal.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(119, 30, 'Menerapkan strategi glokalisasi.', 'Benar. Glokalisasi menjaga keseimbangan antara adaptasi dan keaslian.', 1, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(120, 30, 'Menjadikan budaya lokal sebagai subkultur global.', 'Kurang tepat karena berisiko kehilangan otonomi budaya.', 0, '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(121, 31, 'Meningkatnya minat masyarakat terhadap budaya lokal.', 'Ini merupakan dampak positif, bukan risiko.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(122, 31, 'Distorsi makna dan penyebaran informasi yang salah.', 'Benar. Ketidakakuratan dapat mengubah pemahaman budaya secara keliru.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(123, 31, 'Penurunan biaya pelestarian budaya.', 'Bukan risiko, malah bisa menjadi keuntungan.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(124, 31, 'Menurunnya partisipasi generasi muda.', 'Bisa terjadi, tapi bukan risiko utama digitalisasi tanpa kurasi.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(125, 32, 'Agar seni tidak lagi memerlukan dukungan finansial.', 'Justru dukungan finansial tetap diperlukan.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(126, 32, 'Untuk menciptakan sinergi kebijakan, kreativitas, dan ekonomi.', 'Benar. Sinergi ini memperkuat ekosistem budaya.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(127, 32, 'Supaya pemerintah dapat mengontrol proses kreatif.', 'Salah, kolaborasi bukan untuk kontrol.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(128, 32, 'Agar pelaku bisnis menguasai pasar budaya.', 'Ini justru bisa merusak prinsip pelestarian budaya.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(129, 33, 'Agar karya budaya bebas digunakan siapa saja.', 'Salah, itu justru melanggar hak pencipta.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(130, 33, 'Untuk melindungi pencipta dan mencegah plagiarisme.', 'Benar. HAKI menjamin keadilan dan nilai ekonomi bagi pencipta.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(131, 33, 'Supaya karya budaya lebih cepat viral.', 'Itu efek promosi, bukan fungsi HAKI.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(132, 33, 'Untuk menghapus pembatasan budaya lokal.', 'Tidak relevan dengan fungsi HAKI.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(133, 34, 'Menolak semua bentuk modernisasi.', 'Pendekatan ini justru membuat budaya stagnan.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(134, 34, 'Menjaga nilai dan makna tradisi dalam adaptasi modern.', 'Benar. Keseimbangan makna adalah inti pelestarian.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(135, 34, 'Mengganti tradisi dengan inovasi baru.', 'Ini berarti kehilangan warisan budaya.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(136, 34, 'Menyeragamkan tradisi dari seluruh daerah.', 'Tidak realistis dan bertentangan dengan keragaman budaya.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(137, 35, 'Hanya menjadi alat promosi budaya lokal.', 'Itu hanya sebagian fungsi media sosial.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(138, 35, 'Dapat melestarikan sekaligus menyepelekan budaya lokal.', 'Benar. Dampak media sosial bersifat ganda tergantung pemanfaatannya.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(139, 35, 'Selalu merusak nilai-nilai budaya.', 'Terlalu ekstrem dan tidak akurat.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(140, 35, 'Tidak memiliki pengaruh signifikan terhadap budaya.', 'Salah besar, pengaruhnya justru besar.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(141, 36, 'Menarik investor asing secara masif.', 'Itu lebih pada skala industri besar, bukan komunitas.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(142, 36, 'Menjamin distribusi manfaat ekonomi ke masyarakat lokal.', 'Benar. Tujuan utamanya adalah kesejahteraan komunitas.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(143, 36, 'Menghapus peran pemerintah daerah.', 'Tidak, pemerintah tetap berperan dalam fasilitasi.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(144, 36, 'Meningkatkan ketergantungan terhadap pasar global.', 'Sebaliknya, justru menguatkan kemandirian lokal.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(145, 37, 'Sebagai hiburan semata.', 'Fungsi hiburan ada, tapi bukan yang utama dalam pembentukan identitas.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(146, 37, 'Sebagai representasi nilai dan simbol bangsa.', 'Benar. Seni tradisional menanamkan identitas nasional.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(147, 37, 'Sebagai bentuk protes terhadap budaya asing.', 'Tidak sepenuhnya benar, karena seni tradisional lebih reflektif.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(148, 37, 'Sebagai alat ekonomi global.', 'Fungsi ekonominya bisa ada, tapi bukan peran utama.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(149, 38, 'Agar siswa mudah meniru budaya asing.', 'Salah, tujuan utamanya adalah memperkuat jati diri.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(150, 38, 'Untuk menanamkan nilai moral dan kebanggaan budaya.', 'Benar. Ini inti dari pendidikan berbasis budaya.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(151, 38, 'Supaya sekolah dapat menghasilkan seniman profesional.', 'Itu efek lanjutan, bukan tujuan utama.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(152, 38, 'Agar budaya lokal menjadi bahan ujian nasional.', 'Bukan alasan filosofis utama.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(153, 39, 'Memperkuat rasa nasionalisme.', 'Justru bisa melemahkan rasa kebersamaan antar daerah.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(154, 39, 'Menimbulkan marginalisasi budaya lain.', 'Benar. Dominasi budaya bisa mengikis keberagaman.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(155, 39, 'Meningkatkan efisiensi promosi budaya.', 'Tidak relevan dengan isu representasi.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(156, 39, 'Menumbuhkan budaya baru yang seragam.', 'Justru berpotensi menghapus keunikan budaya lokal.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(157, 40, 'Mengandalkan peraturan pemerintah saja.', 'Tidak cukup, perlu partisipasi aktif masyarakat.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(158, 40, 'Kolaborasi lintas generasi dan inovasi berbasis lokal.', 'Benar. Kombinasi ini menjaga relevansi dan keaslian budaya.', 1, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(159, 40, 'Menutup diri dari pengaruh global.', 'Salah, karena adaptasi justru diperlukan.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(160, 40, 'Menjadikan budaya sebagai komoditas ekspor utama.', 'Tidak salah sepenuhnya, tapi bukan inti pelestarian.', 0, '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL);

-- membuang struktur untuk table sanggar_nusantara.quiz_attempts
CREATE TABLE IF NOT EXISTS `quiz_attempts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `quiz_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `score` int DEFAULT '0',
  `recomendation` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `started_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `fk_quiz_attempts_quiz` (`quiz_id`),
  KEY `fk_quiz_attempts_user` (`user_id`),
  CONSTRAINT `fk_quiz_attempts_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quiz_attempts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quiz_attempts: ~2 rows (lebih kurang)
DELETE FROM `quiz_attempts`;
INSERT INTO `quiz_attempts` (`id`, `uuid`, `quiz_id`, `user_id`, `score`, `recomendation`, `started_at`, `finished_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(11, '29285704-a868-11f0-ad8b-005056c00001', 11, 1, 30, 'Nec fusce pharetra ad elit venenatis arcu habitasse sociosqu cursus hendrerit dis maecenas non id consequat augue metus dui enim maximus class sagittis molestie ultricies nisi vulputate feugiat sit nullam donec senectus at tellus turpis hac lorem inceptos aptent vehicula egestas facilisi dictumst cras sem magnis posuere sodales adipiscing orci libero accumsan himenaeos imperdiet phasellus quisque scelerisque natoque', '2025-10-13 19:00:31', '2025-10-13 19:00:46', '2025-10-13 19:00:31', '2025-10-13 19:36:48', NULL),
	(12, '897d9d60-5144-4e7d-9b65-1ef37deeeaad', 11, 1, 0, 'Terjadi kesalahan saat membuat rekomendasi.', '2025-10-14 07:23:23', '2025-10-14 07:23:41', '2025-10-14 07:23:24', '2025-10-14 07:23:41', NULL),
	(13, 'f13f5d40-b74f-411c-abd5-159890957774', 10, 1, 67, 'Terjadi kesalahan saat membuat rekomendasi.', '2025-10-14 11:19:54', '2025-10-14 11:20:15', '2025-10-14 11:19:54', '2025-10-14 11:20:15', NULL),
	(14, 'bab0437f-e350-496e-ade4-ef1b63488542', 1, 1, 80, 'Terjadi kesalahan saat membuat rekomendasi.', '2025-10-14 11:20:56', '2025-10-14 11:21:22', '2025-10-14 11:20:57', '2025-10-14 11:21:22', NULL),
	(15, '0219b975-108e-4b27-8282-09e115283f9f', 2, 1, 40, 'Terjadi kesalahan saat membuat rekomendasi.', '2025-10-14 11:23:58', '2025-10-14 11:24:25', '2025-10-14 11:23:58', '2025-10-14 11:24:25', NULL);

-- membuang struktur untuk table sanggar_nusantara.quiz_attempt_answers
CREATE TABLE IF NOT EXISTS `quiz_attempt_answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quiz_attempt_id` bigint unsigned NOT NULL,
  `quiz_question_id` bigint unsigned NOT NULL,
  `quiz_answer_id` bigint unsigned NOT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_attempt_answers_attempt` (`quiz_attempt_id`),
  KEY `fk_attempt_answers_question` (`quiz_question_id`),
  KEY `fk_attempt_answers_answer` (`quiz_answer_id`),
  CONSTRAINT `fk_attempt_answers_answer` FOREIGN KEY (`quiz_answer_id`) REFERENCES `quiz_answers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_attempt_answers_attempt` FOREIGN KEY (`quiz_attempt_id`) REFERENCES `quiz_attempts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_attempt_answers_question` FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quiz_attempt_answers: ~6 rows (lebih kurang)
DELETE FROM `quiz_attempt_answers`;
INSERT INTO `quiz_attempt_answers` (`id`, `quiz_attempt_id`, `quiz_question_id`, `quiz_answer_id`, `is_correct`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(28, 11, 1, 1, 1, '2025-10-13 19:00:46', '2025-10-13 19:00:46', NULL),
	(29, 11, 4, 15, 0, '2025-10-13 19:00:46', '2025-10-13 19:00:46', NULL),
	(30, 11, 5, 18, 0, '2025-10-13 19:00:46', '2025-10-13 19:00:46', NULL),
	(31, 12, 1, 3, 0, '2025-10-14 07:23:39', '2025-10-14 07:23:39', NULL),
	(32, 12, 4, 16, 0, '2025-10-14 07:23:39', '2025-10-14 07:23:39', NULL),
	(33, 12, 5, 19, 0, '2025-10-14 07:23:39', '2025-10-14 07:23:39', NULL),
	(34, 13, 1, 2, 0, '2025-10-14 11:20:14', '2025-10-14 11:20:14', NULL),
	(35, 13, 2, 5, 1, '2025-10-14 11:20:14', '2025-10-14 11:20:14', NULL),
	(36, 13, 4, 13, 1, '2025-10-14 11:20:14', '2025-10-14 11:20:14', NULL),
	(37, 14, 1, 3, 0, '2025-10-14 11:21:21', '2025-10-14 11:21:21', NULL),
	(38, 14, 2, 5, 1, '2025-10-14 11:21:21', '2025-10-14 11:21:21', NULL),
	(39, 14, 3, 12, 1, '2025-10-14 11:21:21', '2025-10-14 11:21:21', NULL),
	(40, 14, 4, 13, 1, '2025-10-14 11:21:21', '2025-10-14 11:21:21', NULL),
	(41, 14, 5, 17, 1, '2025-10-14 11:21:21', '2025-10-14 11:21:21', NULL),
	(42, 15, 2, 5, 1, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(43, 15, 3, 12, 1, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(44, 15, 17, 68, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(45, 15, 19, 76, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(46, 15, 22, 86, 1, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(47, 15, 24, 94, 1, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(48, 15, 26, 104, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(49, 15, 28, 111, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(50, 15, 29, 115, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL),
	(51, 15, 30, 117, 0, '2025-10-14 11:24:24', '2025-10-14 11:24:24', NULL);

-- membuang struktur untuk table sanggar_nusantara.quiz_questions
CREATE TABLE IF NOT EXISTS `quiz_questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_text` text NOT NULL,
  `explanation_correct` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quiz_questions: ~40 rows (lebih kurang)
DELETE FROM `quiz_questions`;
INSERT INTO `quiz_questions` (`id`, `question_text`, `explanation_correct`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Bahasa daerah apa yang digunakan di Provinsi Sumatera Barat?', 'Benar! Bahasa Minangkabau digunakan oleh masyarakat di Provinsi Sumatera Barat.', '2025-10-10 00:13:42', '2025-10-10 00:13:42', NULL),
	(2, 'Rumah Gadang berasal dari daerah mana?', 'Tepat sekali! Rumah Gadang berasal dari Minangkabau, Sumatera Barat.', '2025-10-10 00:13:42', '2025-10-10 00:13:42', NULL),
	(3, 'Alat musik Angklung dimainkan dengan cara apa?', 'Benar! Angklung dimainkan dengan cara digoyangkan sehingga menghasilkan bunyi dari resonansi bambu.', '2025-10-10 00:13:42', '2025-10-10 00:13:42', NULL),
	(4, 'Tari Saman berasal dari daerah mana?', 'Ya! Tari Saman berasal dari Aceh dan dikenal dengan gerakan serempak yang dinamis.', '2025-10-10 00:13:42', '2025-10-10 00:13:42', NULL),
	(5, 'Makanan khas Gudeg berasal dari kota mana?', 'Benar! Gudeg merupakan makanan khas dari Yogyakarta yang terbuat dari nangka muda.', '2025-10-10 00:13:42', '2025-10-10 00:13:42', NULL),
	(6, 'Bahasa daerah apa yang digunakan di Provinsi Sumatera Barat?', 'Benar! Bahasa Minangkabau digunakan di Provinsi Sumatera Barat.', '2025-10-10 11:59:39', '2025-10-10 11:59:39', NULL),
	(7, 'Apa tujuan utama dari platform Sanggar Nusantara?', 'Tujuan utama Sanggar Nusantara adalah menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia melalui media digital.', '2025-10-14 10:09:51', '2025-10-14 10:09:51', NULL),
	(8, 'Bagaimana cara Sanggar Nusantara membantu melestarikan budaya daerah?', 'Sanggar Nusantara menyediakan informasi kebudayaan, fitur interaktif, dan edukasi digital agar budaya daerah tetap dikenal dan dilestarikan.', '2025-10-14 10:09:51', '2025-10-14 10:09:51', NULL),
	(9, 'Apa jenis fitur interaktif yang dapat meningkatkan pemahaman masyarakat tentang budaya di Sanggar Nusantara?', 'Fitur seperti kuis budaya, video edukatif, dan eksplorasi interaktif membantu masyarakat memahami budaya dengan cara yang menarik.', '2025-10-14 10:09:51', '2025-10-14 10:09:51', NULL),
	(10, 'Apa fungsi utama tarian tradisional dalam kebudayaan Indonesia?', 'Tarian tradisional berfungsi sebagai sarana ekspresi budaya, ritual keagamaan, serta media hiburan dan pelestarian nilai-nilai lokal.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(11, 'Dari daerah manakah Tari Saman berasal?', 'Tari Saman berasal dari Aceh dan dikenal dengan gerakan cepat dan kompak yang mencerminkan kebersamaan.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(12, 'Apa nama alat musik tradisional khas Jawa Barat yang dimainkan dengan cara digesek?', 'Alat musik tersebut adalah Rebab, alat musik berdawai yang sering digunakan dalam gamelan Sunda.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(13, 'Apa makna filosofis di balik pakaian adat Bali yang digunakan saat upacara keagamaan?', 'Pakaian adat Bali mencerminkan kesucian, kehormatan, dan keseimbangan antara dunia spiritual dan dunia nyata.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(14, 'Mengapa penting bagi generasi muda untuk mengenal budaya daerahnya?', 'Agar mereka memiliki identitas nasional yang kuat, menghargai keberagaman, dan mampu melestarikan warisan budaya bangsa.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(15, 'Apa manfaat digitalisasi budaya melalui platform seperti Sanggar Nusantara?', 'Digitalisasi budaya membantu melestarikan, memperluas akses, dan memperkenalkan kebudayaan kepada generasi muda serta dunia internasional.', '2025-10-14 10:14:22', '2025-10-14 10:14:22', NULL),
	(16, 'Bagaimana digitalisasi budaya melalui platform seperti Sanggar Nusantara dapat berdampak terhadap keaslian budaya lokal?', 'Digitalisasi budaya membawa peluang pelestarian jangka panjang, namun juga menuntut kehati-hatian agar tidak terjadi komersialisasi berlebihan atau distorsi makna budaya.', '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(17, 'Dalam konteks kebudayaan Indonesia, apa tantangan terbesar dalam menggabungkan nilai tradisional dengan inovasi digital?', 'Tantangan terbesarnya adalah menjaga esensi nilai budaya agar tidak tergerus oleh modernisasi, sekaligus menjadikan teknologi sebagai sarana, bukan pengganti budaya itu sendiri.', '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(18, 'Mengapa pendekatan partisipatif masyarakat penting dalam pelestarian budaya melalui media digital?', 'Pelibatan masyarakat memastikan bahwa proses digitalisasi tetap autentik, representatif, dan sesuai dengan nilai-nilai lokal.', '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(19, 'Apa risiko utama jika kebudayaan hanya didigitalisasi tanpa ada upaya regenerasi pelaku budaya?', 'Digitalisasi tanpa regenerasi akan membuat budaya kehilangan penerusnya, sehingga hanya menjadi arsip tanpa kehidupan sosial nyata.', '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(20, 'Bagaimana prinsip etika digital perlu diterapkan dalam upaya pelestarian budaya melalui internet?', 'Etika digital diperlukan untuk menghormati hak cipta, konteks budaya, dan sensitivitas lokal agar tidak terjadi penyalahgunaan atau komodifikasi budaya.', '2025-10-14 10:15:46', '2025-10-14 10:15:46', NULL),
	(21, 'Mengapa pelestarian budaya tidak cukup hanya dilakukan melalui dokumentasi digital?', 'Karena budaya adalah praktik hidup yang membutuhkan partisipasi, interaksi sosial, dan pewarisan nilai, bukan hanya penyimpanan data digital.', '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(22, 'Bagaimana pengaruh globalisasi digital terhadap identitas budaya Indonesia?', 'Globalisasi digital membawa peluang untuk memperkenalkan budaya ke dunia, namun juga menimbulkan tantangan dalam menjaga keaslian dan kemandirian identitas budaya Indonesia.', '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(23, 'Dalam konteks pelestarian budaya digital, apa peran penting kurasi konten?', 'Kurasi konten memastikan bahwa informasi budaya yang disebarkan tetap akurat, kontekstual, dan menghormati nilai-nilai aslinya.', '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(24, 'Bagaimana hubungan antara literasi digital dan kesadaran budaya masyarakat?', 'Literasi digital yang baik memungkinkan masyarakat memahami, menyeleksi, dan memproduksi konten budaya secara kritis tanpa kehilangan esensi nilai tradisional.', '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(25, 'Apa yang dimaksud dengan “revitalisasi budaya” dalam konteks teknologi modern?', 'Revitalisasi budaya adalah upaya menghidupkan kembali praktik budaya tradisional dengan adaptasi ke media atau teknologi modern tanpa menghilangkan maknanya.', '2025-10-14 10:16:54', '2025-10-14 10:16:54', NULL),
	(26, 'Dalam konteks pelestarian budaya, apa tantangan etis utama yang sering muncul ketika budaya lokal dikomersialisasikan?', 'Komersialisasi budaya sering kali mengaburkan makna asli dan nilai-nilai spiritual yang terkandung di dalamnya, sehingga pelestarian harus mempertimbangkan aspek etika agar tidak hanya menjadikan budaya sebagai komoditas ekonomi.', '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(27, 'Mengapa kearifan lokal dianggap sebagai fondasi penting dalam pengembangan ekonomi kreatif berbasis budaya?', 'Kearifan lokal memberikan identitas, keaslian, dan nilai tambah yang membedakan produk budaya dari arus globalisasi yang seragam.', '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(28, 'Bagaimana globalisasi budaya dapat mempengaruhi identitas budaya lokal suatu masyarakat?', 'Globalisasi dapat memperkaya sekaligus mengikis identitas budaya lokal, tergantung bagaimana masyarakat menyaring dan mengadaptasi pengaruh luar tanpa kehilangan jati diri.', '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(29, 'Dalam konteks digitalisasi budaya, apa tantangan etis yang harus diperhatikan oleh pengembang platform budaya?', 'Isu utama adalah perlindungan hak cipta dan representasi yang autentik agar budaya tidak disalahgunakan atau direduksi menjadi sekadar konten hiburan.', '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(30, 'Strategi apa yang paling efektif agar budaya lokal dapat bertahan dan bersaing di era globalisasi tanpa kehilangan keaslian?', 'Strategi glokalisasi—mengadaptasi unsur global dengan tetap mempertahankan nilai-nilai lokal—dianggap sebagai pendekatan paling efektif dalam menjaga keseimbangan identitas budaya.', '2025-10-14 10:18:32', '2025-10-14 10:18:32', NULL),
	(31, 'Apa risiko utama dari digitalisasi budaya tanpa adanya kurasi atau pengawasan yang ketat?', 'Tanpa kurasi, digitalisasi bisa menyebabkan distorsi makna dan penyebaran informasi budaya yang tidak akurat.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(32, 'Mengapa kolaborasi antara pemerintah, seniman, dan pelaku bisnis menjadi penting dalam pengembangan ekonomi kreatif berbasis budaya?', 'Kolaborasi menciptakan sinergi antara kebijakan, kreativitas, dan sumber daya ekonomi untuk memperkuat ekosistem budaya yang berkelanjutan.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(33, 'Mengapa perlindungan HAKI sangat penting dalam industri budaya dan kreatif?', 'HAKI melindungi pencipta dari plagiarisme dan memastikan manfaat ekonomi kembali kepada pemilik karya.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(34, 'Apa tantangan terbesar dalam menyeimbangkan modernisasi dengan pelestarian tradisi lokal?', 'Tantangannya adalah menjaga nilai dan makna tradisi agar tidak hilang saat diadaptasi dalam konteks modern.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(35, 'Bagaimana media sosial dapat menjadi alat pelestarian sekaligus ancaman bagi budaya lokal?', 'Media sosial mempermudah penyebaran budaya, tetapi juga rentan menyebabkan penyederhanaan dan komodifikasi yang dangkal.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(36, 'Apa keuntungan utama mengembangkan ekonomi kreatif berbasis komunitas budaya lokal?', 'Ekonomi berbasis komunitas memperkuat solidaritas sosial dan memastikan keuntungan ekonomi kembali kepada masyarakat lokal.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(37, 'Bagaimana peran seni tradisional dalam membentuk identitas nasional Indonesia?', 'Seni tradisional merepresentasikan nilai, sejarah, dan simbol yang menjadi bagian dari konstruksi identitas bangsa.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(38, 'Mengapa pendidikan berbasis budaya penting untuk generasi muda?', 'Pendidikan berbasis budaya menanamkan nilai-nilai moral, identitas, dan kebanggaan nasional sejak dini.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(39, 'Apa dampak utama dari dominasi budaya tertentu dalam media nasional terhadap keberagaman budaya Indonesia?', 'Dominasi satu budaya dapat menimbulkan marginalisasi budaya lain dan melemahkan semangat kebhinekaan.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL),
	(40, 'Apa kunci keberhasilan Indonesia dalam menjaga kelestarian budaya di masa depan?', 'Kolaborasi lintas generasi, inovasi teknologi, dan penghargaan terhadap kearifan lokal merupakan fondasi utama dalam menjaga keberlanjutan budaya.', '2025-10-14 10:23:57', '2025-10-14 10:23:57', NULL);

-- membuang struktur untuk table sanggar_nusantara.quiz_quiz_questions
CREATE TABLE IF NOT EXISTS `quiz_quiz_questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quiz_id` bigint unsigned NOT NULL,
  `quiz_question_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_quiz_quiz_questions_quiz` (`quiz_id`),
  KEY `fk_quiz_quiz_questions_question` (`quiz_question_id`),
  CONSTRAINT `fk_quiz_quiz_questions_question` FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quiz_quiz_questions_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel sanggar_nusantara.quiz_quiz_questions: ~11 rows (lebih kurang)
DELETE FROM `quiz_quiz_questions`;
INSERT INTO `quiz_quiz_questions` (`id`, `quiz_id`, `quiz_question_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 1, '2025-10-10 00:16:17', '2025-10-10 00:16:17', NULL),
	(2, 1, 2, '2025-10-10 00:16:17', '2025-10-10 00:16:17', NULL),
	(3, 1, 3, '2025-10-10 00:16:17', '2025-10-10 00:16:17', NULL),
	(4, 1, 4, '2025-10-10 00:16:17', '2025-10-10 00:16:17', NULL),
	(5, 1, 5, '2025-10-10 00:16:17', '2025-10-10 00:16:17', NULL),
	(6, 10, 1, '2025-10-10 03:44:36', '2025-10-10 03:44:36', NULL),
	(7, 10, 2, '2025-10-10 03:44:36', '2025-10-10 03:44:36', NULL),
	(8, 10, 4, '2025-10-10 03:47:09', '2025-10-10 03:47:09', NULL),
	(9, 11, 1, '2025-10-13 17:02:17', '2025-10-13 17:02:17', NULL),
	(10, 11, 5, '2025-10-13 17:02:17', '2025-10-13 17:02:17', NULL),
	(11, 11, 4, '2025-10-13 17:02:17', '2025-10-13 17:02:17', NULL),
	(12, 2, 3, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(13, 2, 2, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(14, 2, 22, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(15, 2, 26, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(16, 2, 28, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(17, 2, 24, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(18, 2, 30, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(19, 2, 19, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(20, 2, 17, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(21, 2, 29, '2025-10-14 10:21:37', '2025-10-14 10:21:37', NULL),
	(22, 3, 22, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(23, 3, 2, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(24, 3, 26, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(25, 3, 35, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(26, 3, 32, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(27, 3, 37, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(28, 3, 31, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(29, 3, 38, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(30, 3, 39, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(31, 3, 18, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(32, 3, 4, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(33, 3, 12, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(34, 3, 19, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(35, 3, 40, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(36, 3, 17, '2025-10-14 10:31:24', '2025-10-14 10:31:24', NULL),
	(37, 4, 15, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(38, 4, 14, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(39, 4, 22, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(40, 4, 3, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(41, 4, 16, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(42, 4, 11, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(43, 4, 4, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(44, 4, 23, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(45, 4, 12, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(46, 4, 30, '2025-10-14 10:35:08', '2025-10-14 10:35:08', NULL),
	(47, 5, 22, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(48, 5, 12, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(49, 5, 6, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(50, 5, 20, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(51, 5, 4, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(52, 5, 14, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(53, 5, 18, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL),
	(54, 5, 16, '2025-10-14 10:39:19', '2025-10-14 10:39:19', NULL);

-- membuang struktur untuk table sanggar_nusantara.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.roles: ~4 rows (lebih kurang)
DELETE FROM `roles`;
INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'super_admin', 'web', '2025-03-14 06:08:38', '2025-03-14 06:08:38'),
	(2, 'user', 'web', '2025-03-14 06:12:46', '2025-03-14 06:12:46'),
	(3, 'pelajar', 'web', '2025-05-30 08:30:39', '2025-10-09 22:05:01'),
	(4, 'profesional', 'web', '2025-10-09 22:05:37', '2025-10-09 22:05:37'),
	(5, 'premium', 'web', '2025-10-13 17:48:16', '2025-10-13 17:48:16');

-- membuang struktur untuk table sanggar_nusantara.role_has_permissions
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.role_has_permissions: ~246 rows (lebih kurang)
DELETE FROM `role_has_permissions`;
INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(7, 1),
	(8, 1),
	(9, 1),
	(10, 1),
	(11, 1),
	(12, 1),
	(13, 1),
	(14, 1),
	(15, 1),
	(16, 1),
	(17, 1),
	(18, 1),
	(19, 1),
	(20, 1),
	(21, 1),
	(22, 1),
	(23, 1),
	(24, 1),
	(25, 1),
	(26, 1),
	(27, 1),
	(28, 1),
	(29, 1),
	(30, 1),
	(31, 1),
	(32, 1),
	(33, 1),
	(34, 1),
	(35, 1),
	(36, 1),
	(37, 1),
	(38, 1),
	(39, 1),
	(40, 1),
	(41, 1),
	(42, 1),
	(43, 1),
	(44, 1),
	(45, 1),
	(46, 1),
	(47, 1),
	(48, 1),
	(49, 1),
	(50, 1),
	(51, 1),
	(52, 1),
	(53, 1),
	(54, 1),
	(55, 1),
	(56, 1),
	(57, 1),
	(58, 1),
	(59, 1),
	(60, 1),
	(61, 1),
	(62, 1),
	(63, 1),
	(64, 1),
	(65, 1),
	(66, 1),
	(67, 1),
	(68, 1),
	(69, 1),
	(70, 1),
	(71, 1),
	(72, 1),
	(73, 1),
	(74, 1),
	(75, 1),
	(76, 1),
	(77, 1),
	(78, 1),
	(79, 1),
	(80, 1),
	(81, 1),
	(82, 1),
	(83, 1),
	(84, 1),
	(85, 1),
	(86, 1),
	(87, 1),
	(88, 1),
	(89, 1),
	(90, 1),
	(91, 1),
	(92, 1),
	(93, 1),
	(94, 1),
	(95, 1),
	(96, 1),
	(97, 1),
	(98, 1),
	(99, 1),
	(100, 1),
	(101, 1),
	(102, 1),
	(103, 1),
	(104, 1),
	(105, 1),
	(106, 1),
	(107, 1),
	(108, 1),
	(109, 1),
	(110, 1),
	(111, 1),
	(112, 1),
	(113, 1),
	(114, 1),
	(115, 1),
	(116, 1),
	(117, 1),
	(118, 1),
	(119, 1),
	(120, 1),
	(121, 1),
	(122, 1),
	(123, 1),
	(124, 1),
	(125, 1),
	(126, 1),
	(127, 1),
	(128, 1),
	(129, 1),
	(130, 1),
	(131, 1),
	(132, 1),
	(133, 1),
	(134, 1),
	(135, 1),
	(136, 1),
	(137, 1),
	(138, 1),
	(139, 1),
	(140, 1),
	(141, 1),
	(142, 1),
	(143, 1),
	(144, 1),
	(145, 1),
	(146, 1),
	(147, 1),
	(148, 1),
	(149, 1),
	(150, 1),
	(151, 1),
	(152, 1),
	(153, 1),
	(154, 1),
	(155, 1),
	(156, 1),
	(157, 1),
	(158, 1),
	(159, 1),
	(160, 1),
	(161, 1),
	(162, 1),
	(163, 1),
	(164, 1),
	(165, 1),
	(166, 1),
	(167, 1),
	(168, 1),
	(169, 1),
	(170, 1),
	(171, 1),
	(172, 1),
	(173, 1),
	(174, 1),
	(175, 1),
	(176, 1),
	(177, 1),
	(178, 1),
	(179, 1),
	(180, 1),
	(181, 1),
	(182, 1),
	(183, 1),
	(184, 1),
	(185, 1),
	(186, 1),
	(187, 1),
	(188, 1),
	(189, 1),
	(190, 1),
	(191, 1),
	(192, 1),
	(193, 1),
	(194, 1),
	(195, 1),
	(196, 1),
	(197, 1),
	(198, 1),
	(199, 1),
	(200, 1),
	(201, 1),
	(202, 1),
	(203, 1),
	(204, 1),
	(205, 1),
	(206, 1),
	(207, 1),
	(208, 1),
	(209, 1),
	(210, 1),
	(211, 1),
	(212, 1),
	(213, 1),
	(214, 1),
	(215, 1),
	(216, 1),
	(217, 1),
	(218, 1),
	(219, 1),
	(220, 1),
	(221, 1),
	(222, 1),
	(223, 1),
	(224, 1),
	(225, 1),
	(226, 1),
	(227, 1),
	(228, 1),
	(229, 1),
	(230, 1),
	(231, 1),
	(232, 1),
	(233, 1),
	(234, 1),
	(235, 1),
	(236, 1),
	(237, 1),
	(238, 1),
	(239, 1),
	(240, 1),
	(241, 1),
	(242, 1),
	(243, 1),
	(244, 1),
	(245, 1),
	(246, 1);

-- membuang struktur untuk table sanggar_nusantara.rumah_adats
CREATE TABLE IF NOT EXISTS `rumah_adats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rumah_adats_slug_unique` (`slug`),
  KEY `rumah_adats_user_id_foreign` (`user_id`),
  CONSTRAINT `rumah_adats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.rumah_adats: ~10 rows (lebih kurang)
DELETE FROM `rumah_adats`;
INSERT INTO `rumah_adats` (`id`, `user_id`, `nama`, `slug`, `asal`, `image`, `excerpt`, `deskripsi`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'Rumah Gadang', 'rumah-gadang', 'Sumatera Barat', '', 'Rumah adat khas Minangkabau', 'Rumah Gadang adalah rumah adat suku Minangkabau yang memiliki atap berbentuk gonjong.', '-0.3059', '100.3692', NULL, NULL, NULL),
	(2, 1, 'Rumah Bolon', 'rumah-bolon', 'Sumatera Utara', '', 'Rumah adat suku Batak', 'Rumah Bolon adalah rumah adat suku Batak yang berbentuk panggung dan dihiasi ukiran khas.', '2.1154', '99.5451', NULL, NULL, NULL),
	(3, 1, 'Rumah Joglo', 'rumah-joglo', 'Jawa Tengah', 'Ragam Indonesia/Rumah Adat/01JP9SWQ04Y0XZ9SH1P0MHSSX0.jpg', 'Rumah adat khas Jawa', 'Rumah Joglo adalah rumah adat masyarakat Jawa dengan struktur atap yang khas.', '-7.7956', '110.3695', NULL, '2025-03-14 07:46:23', NULL),
	(4, 1, 'Rumah Kebaya', 'rumah-kebaya', 'DKI Jakarta', '', 'Rumah adat Betawi', 'Rumah Kebaya adalah rumah adat suku Betawi dengan bentuk atap yang menyerupai lipatan kebaya.', '-6.2088', '106.8456', NULL, NULL, NULL),
	(5, 1, 'Rumah Limas', 'rumah-limas', 'Sumatera Selatan', '', 'Rumah adat suku Palembang', 'Rumah Limas adalah rumah adat Palembang yang memiliki bentuk limas dan digunakan untuk acara adat.', '-2.9761', '104.7754', NULL, NULL, NULL),
	(6, 1, 'Rumah Panggung', 'rumah-panggung', 'Kalimantan Selatan', '', 'Rumah adat suku Banjar', 'Rumah Panggung Banjar adalah rumah adat khas Kalimantan Selatan yang dibangun di atas tiang.', '-3.3194', '114.5908', NULL, NULL, NULL),
	(7, 1, 'Rumah Tongkonan', 'rumah-tongkonan', 'Sulawesi Selatan', '', 'Rumah adat suku Toraja', 'Rumah Tongkonan adalah rumah adat Toraja dengan bentuk atap melengkung menyerupai perahu.', '-3.0417', '119.8303', NULL, NULL, NULL),
	(8, 1, 'Rumah Honai', 'rumah-honai', 'Papua', '', 'Rumah adat suku Dani', 'Rumah Honai adalah rumah adat Papua yang berbentuk bulat dengan atap jerami.', '-4.2699', '138.0802', NULL, NULL, NULL),
	(9, 1, 'Rumah Sasak', 'rumah-sasak', 'Nusa Tenggara Barat', '', 'Rumah adat suku Sasak', 'Rumah Sasak adalah rumah adat Lombok yang dibuat dari anyaman bambu dan atap alang-alang.', '-8.6500', '116.3249', NULL, NULL, NULL),
	(10, 1, 'Rumah Baileo', 'rumah-baileo', 'Maluku', '', 'Rumah adat Maluku', 'Rumah Baileo adalah rumah adat Maluku yang digunakan sebagai tempat musyawarah adat.', '-3.6542', '128.1909', NULL, NULL, NULL);

-- membuang struktur untuk table sanggar_nusantara.seni_tari
CREATE TABLE IF NOT EXISTS `seni_tari` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pencipta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun_diciptakan` int DEFAULT NULL,
  `asal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori` enum('tradisional','modern') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tradisional',
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `sejarah` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.seni_tari: ~5 rows (lebih kurang)
DELETE FROM `seni_tari`;
INSERT INTO `seni_tari` (`id`, `nama`, `pencipta`, `tahun_diciptakan`, `asal`, `image`, `video`, `kategori`, `deskripsi`, `sejarah`, `lat`, `lng`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Tari Saman', 'Tidak diketahui', 1800, 'Aceh', 'Ragam Indonesia/Seni Tari/01JP9SYNKSSHNN2S8KV1FH8MK9.jpg', 'https://www.youtube.com/watch?v=B_AXmqqPER0&pp=ygUKVGFyaSBTYW1hbg%3D%3D', 'tradisional', 'Tari yang berasal dari suku Gayo di Aceh yang terkenal dengan gerakan serempak.', 'Tari Saman berkembang dari tradisi budaya masyarakat Gayo dan sering digunakan untuk perayaan adat.', '4.695135', '96.749399', '2025-03-14 07:33:27', '2025-05-31 07:23:31', NULL),
	(2, 'Tari Kecak', 'Wayan Limbak', 1930, 'Bali', '', 'kecak.mp4', 'tradisional', 'Tari yang menggambarkan kisah Ramayana dengan paduan suara khas "cak cak cak".', 'Dikembangkan oleh Wayan Limbak bersama pelukis Jerman Walter Spies.', '-8.409518', '115.188919', '2025-03-14 07:33:27', '2025-03-14 07:33:27', NULL),
	(3, 'Tari Piring', 'Tidak diketahui', 1800, 'Sumatera Barat', '', 'piring.mp4', 'tradisional', 'Tari khas Minangkabau yang menggunakan piring sebagai properti utama.', 'Dulunya digunakan sebagai bagian dari ritual syukur masyarakat Minangkabau.', '-0.305289', '100.369972', '2025-03-14 07:33:27', '2025-03-14 07:33:27', NULL),
	(4, 'Tari Jaipong', 'Gugum Gumbira', 1970, 'Jawa Barat', '', 'jaipong.mp4', 'modern', 'Tari yang dikembangkan dari seni tradisional ketuk tilu dengan gerakan energik.', 'Gugum Gumbira menciptakan tari ini untuk melestarikan budaya Sunda dalam seni tari.', '-6.914864', '107.608238', '2025-03-14 07:33:27', '2025-03-14 07:33:27', NULL),
	(5, 'Tari Serimpi', 'Tidak diketahui', 1700, 'Yogyakarta', '', 'serimpi.mp4', 'tradisional', 'Tari klasik dari Keraton Yogyakarta yang lembut dan penuh makna filosofi.', 'Dulu hanya ditampilkan di lingkungan keraton sebagai tarian sakral.', '-7.795580', '110.369492', '2025-03-14 07:33:27', '2025-03-14 07:33:27', NULL);

-- membuang struktur untuk table sanggar_nusantara.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.sessions: ~2 rows (lebih kurang)
DELETE FROM `sessions`;
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('2S0g6c6ykhbjsIsYIhxqPpwMZkh5dDNK6Yjx4JwG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoienFnbHRZdXVCSnY4WDNNUW5aUDhXNzZzM25PamhLanVJb3JEeVVHUiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2tlcmFuamFuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760441202),
	('b0ChtwHsxxmLHTqTSiDURNWjNktHaZi6hZDOYNTY', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiZmZVeGRtZFZmNHR3dm1yY0FDSWhXQlVtTlVPQmVJSGFZVFc4RmRZMSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3Byb2ZpbGUva3Vpcy1udXNhbnRhcmEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjE3OiJwYXNzd29yZF9oYXNoX3dlYiI7czo2MDoiJDJ5JDEyJDh1LmpSWi4xTEU0ckYyQlVpTDB2Yy5DN2FNakx4elJNLjVLYU4yMWVBYmVlRUViMFZqd2hhIjtzOjg6ImZpbGFtZW50IjthOjA6e319', 1760441129),
	('BpySYid86R0RyXvPxt5uqO1Oc9KoAJRN80paJb8b', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibDU4anR4eUVDbTZ2NmZGMWZ0Y1ZGQnZsc0pRSXp4djZyQXA1UFYybSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2tlcmFuamFuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760441149);

-- membuang struktur untuk table sanggar_nusantara.subscriptions
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `plan_id` bigint unsigned NOT NULL,
  `status` enum('aktif','expired','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'aktif',
  `tanggal_mulai` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_berakhir` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_user_id_foreign` (`user_id`),
  KEY `subscriptions_plan_id_foreign` (`plan_id`),
  CONSTRAINT `subscriptions_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.subscriptions: ~4 rows (lebih kurang)
DELETE FROM `subscriptions`;
INSERT INTO `subscriptions` (`id`, `user_id`, `plan_id`, `status`, `tanggal_mulai`, `tanggal_berakhir`, `transaction_id`, `payment_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(2, 1, 12, 'cancelled', '2025-05-30 17:26:38', NULL, '284f9a8e-53cb-4621-9b54-1e50336e8333', 'pending', '2025-05-30 17:26:38', '2025-05-30 17:26:38', NULL),
	(3, 1, 12, 'aktif', '2026-05-30 17:34:01', '2027-05-30 17:34:01', '2ed9b35d-9994-4ecf-811d-339f305475d5', 'paid', '2025-05-30 17:33:42', '2025-05-30 17:34:01', NULL),
	(4, 2, 14, 'cancelled', '2025-06-01 04:07:14', NULL, 'b63a6a0f-da50-470c-b094-c28b92afa548', 'pending', '2025-06-01 04:07:14', '2025-06-01 04:07:14', NULL),
	(5, 2, 13, 'cancelled', '2025-06-01 04:10:30', NULL, 'e5de87d6-a20f-4384-9480-74dce152de39', 'pending', '2025-06-01 04:10:30', '2025-06-01 04:10:30', NULL),
	(6, 3, 13, 'aktif', '2025-06-01 04:26:55', '2025-07-01 04:26:55', '292da23f-49f8-4155-8a49-55d06e4bf1d0', 'paid', '2025-06-01 04:26:23', '2025-06-01 04:26:55', NULL),
	(7, 1, 15, 'cancelled', '2025-06-03 22:55:03', NULL, '64590834-b802-428e-a0a0-436406224c8e', 'pending', '2025-06-03 22:55:03', '2025-06-03 22:55:03', NULL),
	(8, 2, 13, 'expired', '2025-07-07 08:40:47', '2025-08-06 08:40:47', 'c8503682-a54c-491a-823c-becafe0c7d70', 'paid', '2025-06-07 08:40:26', '2025-10-02 10:04:51', NULL);

-- membuang struktur untuk table sanggar_nusantara.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membuang data untuk tabel sanggar_nusantara.users: ~5 rows (lebih kurang)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`, `email_verified_at`, `deskripsi`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Rifki Romadhan', 'official@ikki.com', '$2y$12$8u.jRZ.1LE4rF2BUiL0vc.C7aMjLxzRM.5KaN21eAbeeEEb0Vjwha', 'user/xy46R0C9eoS1gNKJ7gnLPZCDU2OXZOrHtgz3st9s-ebfe58e0-4074-4ff2-9e73-9a58257eabdf.jpg', NULL, 'Rifki Romadhan adalah web developer, peneliti, dan penulis aktif di bidang teknologi, ekonomi kreatif, dan kebudayaan. Ia telah meraih berbagai prestasi dalam pengembangan web dan desain, serta berkontribusi pada GenBI Purwokerto sebagai editor dan pengembang website yang inklusif.', 'IKtjsGFO4yJ9EaylPgAz8zV1cbZ7AqmYra4YtP1lKnnSJoO1D41G94dVJCwl', '2025-03-14 06:09:25', '2025-05-30 18:57:59', NULL),
	(2, 'Rifki Romaaaaaa', 'ikki@gmail.com', '$2y$12$jrlWi/WSrnPXsK7U/W7t6uNWOUxD86CrbVWHaGNNEVFVM2JC6o0Qa', 'user/7L9ELnZYS3x2aytIgEDJoBIzeMDOrJALWEgFurmg-1033df4e-7409-420e-8a25-f4d0ae7c5a4a.jpg', NULL, 'Ut proin venenatis a curabitur habitant tristique aliquet porta. Primis donec libero eleifend vestibulum tortor lorem sociosqu ultricies ornare habitant. Condimentum parturient adipiscing dictum nibh sodales libero sed curabitur fusce nisi rutrum. Ornare duis sit justo elementum fames volutpat ipsum augue hendrerit. Ac porttitor lobortis arcu ligula sagittis mollis. Porta taciti faucibus mi tempor luctus duis phasellus quisque nisl.\r\n\r\nNec montes cras viverra dolor ultrices adipiscing. Fames si efficitur habitasse conubia vehicula dapibus. Torquent arcu convallis suspendisse sem sagittis elementum. Viverra ex sapien mattis netus pulvinar hendrerit accumsan senectus erat. Aliquet dis sem eget sollicitudin viverra.\r\n\r\nLacinia faucibus lacus molestie quam venenatis ad. Maximus fusce blandit aenean finibus ligula tincidunt sagittis. Arcu dictum porttitor inceptos tellus sit habitant. Lorem primis curabitur himenaeos facilisi curae sapien molestie habitant vel a. Elit eleifend class hac pretium natoque nam. Consectetuer interdum lectus senectus consequat morbi ante ornare sit penatibus mi.', 'ytxl9Y4hJe5tIXDh6Hw8xvVW8MGYk5QNjt9fCKLajMx47GmUdTMPvSDFIlSt', '2025-03-14 09:54:27', '2025-06-01 04:05:02', NULL),
	(3, 'coba', 'coba@gmail.com', '$2y$12$iA7UOqzGBaTiAbB9OE2vLOlrrv1nKKV9/aJrvJkpR7PtxaaXBla0S', NULL, NULL, NULL, 'NpJGUbTEOLcyozCtBZH4YRRZIKdRfdw3cTVjXaqqRZ09890ei7yYyV1EdkNd', '2025-06-01 04:12:35', '2025-06-01 04:12:35', NULL),
	(4, 'Ikki Rama', 'officialikkirama@gmail.com', NULL, '', '2025-10-03 19:41:38', NULL, NULL, '2025-10-03 19:41:38', '2025-10-03 19:41:38', NULL),
	(5, 'Rifki Romadhan', 'georgeikkirama@gmail.com', NULL, '', '2025-10-13 17:09:44', NULL, NULL, '2025-10-03 19:55:02', '2025-10-13 17:09:44', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
