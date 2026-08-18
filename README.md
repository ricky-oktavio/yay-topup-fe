# 💎 YayTopup Frontend (`yay-topup-fe`)

> **YayTopup** — Platform Web Top-up Game, Koin, E-Wallet, Program Afiliasi Partner, dan Suite Panel Kelola Admin modern. Built with **Vue 3**, **Vite**, **Pinia**, **Vue Router 4**, dan **Hugeicons**.

---

## ✨ Fitur Utama (Features Overview)

### 🛒 1. Pengguna & Transaksi Top-Up
- **Kalkulator Top-Up & Nominal Dynamic**: Perhitungan harga otomatis real-time (1 Koin = Rp 100) dilengkapi *preset chip* (+100, +500, +1.000, +5.000, +10.000).
- **Pembayaran QRIS & Bank VA**: Simulasi modul pembayaran QRIS dinamis dan metode transfer Virtual Account.
- **Background Shadow Glow Momolive**: Lapisan latar belakang penuh *full-screen* dengan efek aura *glow* berkilau 3D.
- **Cek Status Transaksi**: Pencarian instant status transaksi (`PAID`, `PENDING`, `EXPIRED`).

### 🤝 2. Program Partner Afiliasi
- **Pendaftaran Affiliate**: Form pendaftaran terstruktur (Informasi Akun + Informasi Bank Rekening Tujuan).
- **Dashboard Affiliate Partner** (`/affiliate/dashboard`):
  - **3 Card Statistik**: Total Referral, Saldo Komisi (Gradien Ungu), Kode Referral dengan fitur *Copy-to-Clipboard*.
  - **Form Tarik Saldo**: Pengajuan klaim komisi (minimum Rp 50.000) dengan verifikasi saldo otomatis.
  - **Riwayat Komisi**: Tabel riwayat komisi dan penarikan terperinci.

### 👑 3. Suite Panel Admin (`/admin/*`)
- **📦 Kelola Produk** (`/admin/products`): Tambah & Sunting katalog produk, Provider Code, Harga Dasar, Harga Jual, dan Status *Active/Inactive*.
- **🤝 Kelola Affiliate** (`/admin/affiliate`): Persetujuan (*Approve*) & Penolakan (*Reject*) pendaftaran partner, serta Modal Edit Komisi Rate per Partner.
- **💳 Kelola Penarikan / Withdrawal** (`/admin/withdrawal`): Filter status penarikan (*Semua, Pending, Approved, Paid, Failed*), Export CSV, dan simulasi *Approve Payout via Xendit*.
- **📊 Monitor Transaksi** (`/admin/transactions`): Pemantauan transaksi real-time (*Read-only table*) dilengkapi indikator status ber-titik warna (*colored dot badges*).
- **⚙️ Pengaturan Admin** (`/admin/settings`): Konfigurasi *Global Commission Rate (%)* dan *Minimum Withdrawal Amount (Rp)*.

---

## 📁 Struktur Direktori Proyek

```
yaytopup/
├── src/
│   ├── api/                       # HTTP Client & Service Integration
│   │   ├── axiosClient.js         # Interceptor Request/Response
│   │   └── topupService.js        # API Endpoint Integration
│   ├── assets/                    # Gambar & Aset Visual Transparan
│   │   ├── logo-yay.jpeg          # Logo Utama Platform YayTopup
│   │   └── momolive_bg.jpg        # Backdrop Momolive Glow
│   ├── components/
│   │   ├── common/                # Komponen Shared (Global)
│   │   │   ├── ApiStatusBadge.vue
│   │   │   └── ToastNotification.vue
│   │   └── layout/                # Navigasi Header / Navbar
│   │       ├── AdminNavbar.vue
│   │       ├── AffiliateNavbar.vue
│   │       └── Navbar.vue
│   ├── router/
│   │   └── index.js               # Konfigurasi Rute Vue Router 4
│   ├── stores/
│   │   └── topupStore.js          # State Management Pinia
│   ├── views/                     # Halaman Publik
│   │   ├── ApiTestView.vue
│   │   ├── HistoryView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── PaymentView.vue
│   │   ├── RegisterView.vue
│   │   ├── StatusView.vue
│   │   ├── TopupView.vue
│   │   ├── admin/                 # Halaman Panel Admin
│   │   │   ├── AdminAffiliateView.vue
│   │   │   ├── AdminProductsView.vue
│   │   │   ├── AdminSettingsView.vue
│   │   │   ├── AdminTransactionsView.vue
│   │   │   └── AdminWithdrawalView.vue
│   │   └── affiliate/             # Halaman Partner Affiliate
│   │       ├── AffiliateDashboardView.vue
│   │       └── AffiliateView.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env.example
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 🌐 Peta Rute Aplikasi (Routing Roadmap)

| Rute Path | Komponen View | Deskripsi Halaman |
| :--- | :--- | :--- |
| `/` | `HomeView.vue` | Halaman Utama Top-up Momocoin & Game |
| `/status` | `StatusView.vue` | Cek Status Transaksi |
| `/payment` | `PaymentView.vue` | Summary Pembayaran & QRIS |
| `/login` | `LoginView.vue` | Form Log In Akun |
| `/register` / `/affiliate` | `AffiliateView.vue` | Form Pendaftaran Partner Affiliate |
| `/affiliate/dashboard` | `AffiliateDashboardView.vue` | Dashboard Performa Partner Affiliate |
| `/admin/products` | `AdminProductsView.vue` | Admin: Kelola Katalog Produk |
| `/admin/affiliate` | `AdminAffiliateView.vue` | Admin: Kelola Jaringan Affiliate |
| `/admin/withdrawal` | `AdminWithdrawalView.vue` | Admin: Kelola Penarikan Saldo Affiliate |
| `/admin/transactions` | `AdminTransactionsView.vue` | Admin: Monitor Aktivitas Transaksi |
| `/admin/settings` | `AdminSettingsView.vue` | Admin: Pengaturan Komisi & Minimal Penarikan |

---

## 🛠️ Teknologi & Library Utama

- **[Vue 3](https://vuejs.org/)**: Composition API (`<script setup>`) untuk performa tinggi & reactive logic.
- **[Vite 8](https://vitejs.dev/)**: Frontend build tool super cepat.
- **[Pinia](https://pinia.vuejs.org/)**: Manajemen state global yang terstruktur.
- **[Vue Router 4](https://router.vuejs.org/)**: Navigasi halaman & URL routing.
- **[Hugeicons Vue](https://hugeicons.com/)**: Icon library modern & minimalis.
- **[Axios](https://axios-http.com/)**: HTTP Client untuk integrasi API backend.

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat
- Node.js versi 18.x atau yang lebih baru
- npm / yarn / pnpm

### Langkah Instalasi & Jalankan Dev Server

1. **Clone repository & masuk ke direktori proyek**:
   ```bash
   cd yaytopup
   ```

2. **Install dependensi proyek**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembang (Local Dev Server)**:
   ```bash
   npm run dev
   ```
   Buka browser di: `http://localhost:5173`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📄 Lisensi & Hak Cipta

© 2026 **PT. JLIMA DIGITAL INDONESIA**. All rights reserved.
