# Sanggar Nusantara

**Sanggar Nusantara** adalah platform digital yang bertujuan untuk menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia. Website ini menghadirkan berbagai informasi kebudayaan dari seluruh nusantara serta fitur interaktif untuk meningkatkan pemahaman masyarakat terhadap warisan budaya bangsa.

---

## ✨ Fitur Utama

- **Artikel**: Informasi dan tulisan menarik seputar budaya Indonesia.
- **Event**: Info acara dan kegiatan budaya dari berbagai daerah.
- **Transaksi**: Sistem pembayaran menggunakan Midtrans untuk donasi, produk budaya, dan langganan.
- **Profil**: Pengelolaan akun pengguna.
- **Langganan**: Akses konten budaya eksklusif untuk pelanggan.
- **Peta Interaktif**: Eksplorasi budaya melalui peta Indonesia interaktif (mirip Ragam Indonesia, tapi langsung klik lokasi di peta).
- **Ragam Indonesia**: Fitur edukatif untuk belajar budaya daerah seperti:
  - Bahasa Daerah  
  - Alat Musik Tradisional  
  - Rumah Adat  
  - Seni Tari  
  - Lagu Daerah  
  - Makanan Khas

---

## 🛠 Teknologi yang Digunakan

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Laravel, Livewire, Filament
- **Payment Gateway**: Midtrans (QRIS Sandbox)

---

## 🚀 Cara Instalasi dan Menjalankan Secara Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/IkkiRama/sanggar-nusantara.git
```

```bash
cd sanggar-nusantara
```

### 2. Install Dependensi Backend (Laravel) menggunakan Composer
```bash
composer install
```

### 3. Install Dependensi Frontend (React) menggunakan npm
```bash
npm install
```

### 4. Copy File Environment dan Generate App Key
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Import Database atau Jalankan Migrasi dan Seeder
```bash
php artisan migrate --seed
```

### 6. Jalankan Server Development untuk Frontend
```bash
npm run dev
```

### 7. Jalankan Server Laravel
- Kalau anda bukan pakai laragon, harap jalankan script ini. Jika anda pakai laragon, anda bisa skip script ini

```bash
php artisan serve
```

### 8. Kunjungi Website

- Jika menggunakan **Laragon**, akses website di:
```bash
http://sanggar-nusantara.test/
```

- Jika **tidak menggunakan Laragon**, akses via:
```bash
http://127.0.0.1:8000/
```

- Lalu ubah base URL di file `.env` agar sesuai:

```env
APP_URL=http://127.0.0.1:8000
```

## 💳 Uji Fitur Transaksi (Midtrans QRIS)

Apabila ingin menguji fitur transaksinya, kunjungi:

👉 https://simulator.sandbox.midtrans.com/v2/qris/index

Langkah-langkah simulasi transaksi:

1. Jalankan transaksi dari website seperti biasa.
2. Saat muncul QR code pembayaran dari Midtrans, buka link simulator di atas.
3. Pilih "Scan QR Code" di simulator dan upload gambar QR tersebut.
4. Simulator akan memproses transaksi sebagai berhasil.

## ✅ Selesai
Website Sanggar Nusantara kini siap dijalankan di lokal.
Semoga bermanfaat untuk pelestarian kebudayaan Nusantara! 🌺

# AKUN ADMIN USER:
- email : official@ikki.com
- password : 123