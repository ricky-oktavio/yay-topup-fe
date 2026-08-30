<template>
  <div class="legal-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <!-- Main Content Container (Max-width 780px centered) -->
    <main class="legal-main-content animate-fade-up">
      <div class="legal-container">
        
        <!-- Header Section -->
        <div class="legal-header">
          <span class="legal-badge">Syarat & Ketentuan</span>
          <h1 class="page-title">Terms of Service</h1>
          <p class="page-subtitle">Terakhir diperbarui: 27 Agustus 2026</p>
        </div>

        <!-- Document Card -->
        <div class="legal-card-container">
          <div class="card-momolive-shadow"></div>
          
          <div class="legal-card">
            <div class="legal-intro-box">
              <InformationCircleIcon :size="22" class="intro-icon" />
              <p>
                Selamat datang di <strong>YayTopup</strong>. Harap baca Ketentuan Layanan ini secara saksama sebelum menggunakan platform top-up, layanan pembayaran, atau program afiliasi kami.
              </p>
            </div>

            <div class="legal-content">
              <!-- Section 1 -->
              <section class="legal-section">
                <h2>1. Ketentuan Umum</h2>
                <p>
                  Dengan mengakses dan menggunakan platform YayTopup, Anda menyatakan setuju untuk terikat oleh Ketentuan Layanan ini, seluruh hukum dan peraturan yang berlaku, serta bertanggung jawab atas kepatuhan terhadap hukum lokal yang berlaku. Jika Anda tidak menyetujui salah satu ketentuan ini, Anda dilarang menggunakan atau mengakses situs ini.
                </p>
              </section>

              <!-- Section 2 -->
              <section class="legal-section">
                <h2>2. Layanan Top-Up & Pembayaran</h2>
                <ul>
                  <li>Pengguna wajib memastikan bahwa ID Akun Game / Momocoin ID / Nomor Tujuan yang dimasukkan sudah benar sebelum melakukan konfirmasi pembayaran.</li>
                  <li>Seluruh transaksi yang telah berhasil diproses oleh sistem (status <strong>PAID</strong> atau <strong>SUCCESS</strong>) bersifat final dan tidak dapat dibatalkan atau dikembalikan (<em>non-refundable</em>), kecuali disebabkan oleh kesalahan atau kegagalan sistem YayTopup.</li>
                  <li>Waktu pemrosesan top-up instan rata-rata membutuhkan waktu 1-5 detik setelah konfirmasi pembayaran diterima dari Payment Gateway resmi (QRIS/Virtual Account/E-Wallet).</li>
                  <li>Harga produk yang tertera pada website dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya menyesuaikan dengan tarif resmi publisher game/layanan.</li>
                </ul>
              </section>

              <!-- Section 3 -->
              <section class="legal-section">
                <h2>3. Kebijakan Pengembalian Dana (Refund)</h2>
                <p>
                  Pengembalian dana hanya berlaku dalam situasi khusus sesuai dengan aturan ketat kami. Untuk mempelajari lebih lanjut syarat dan tata cara pengajuan klaim, silakan baca 
                  <router-link to="/refund" class="legal-link">Kebijakan Pengembalian Dana (Refund Policy)</router-link> kami.
                </p>
              </section>

              <!-- Section 4 -->
              <section class="legal-section">
                <h2>4. Program Afiliasi Partner</h2>
                <p>
                  Mitra afiliasi berhak menerima komisi sesuai dengan <em>Commission Rate</em> yang berlaku atas transaksi valid yang menggunakan Kode Referral resmi mitra.
                </p>
                <ul>
                  <li>Minimum batas penarikan saldo komisi adalah sebesar <strong>Rp 50.000</strong>.</li>
                  <li>YayTopup berhak menangguhkan atau membatalkan akun afiliasi jika terindikasi melakukan tindakan kecurangan, manipulasi referral, atau aktivitas spamming yang merugikan.</li>
                </ul>
              </section>

              <!-- Section 5 -->
              <section class="legal-section">
                <h2>5. Batasan Tanggung Jawab</h2>
                <p>
                  YayTopup tidak bertanggung jawab atas kerugian yang disebabkan oleh kesalahan penginputan ID akun oleh pengguna, gangguan jaringan dari penyedia game (<em>game publisher</em>), atau pemeliharaan server (<em>maintenance</em>) dari pihak ketiga.
                </p>
              </section>

              <!-- Section 6 -->
              <section class="legal-section">
                <h2>6. Hak Kekayaan Intelektual & Privasi</h2>
                <p>
                  Seluruh merek dagang, logo game, dan nama produk yang ditampilkan pada situs YayTopup adalah milik dari pemilik hak cipta masing-masing. Informasi pribadi Anda dilindungi sesuai dengan 
                  <router-link to="/privacy" class="legal-link">Kebijakan Privasi</router-link> kami.
                </p>
              </section>

              <!-- Section 7 -->
              <section class="legal-section">
                <h2>7. Pertanyaan & Bantuan FAQ</h2>
                <p>
                  Jika Anda memiliki pertanyaan seputar cara bertransaksi atau mengalami kendala teknis, silakan kunjungi halaman 
                  <router-link to="/faq" class="legal-link">FAQ & Pusat Bantuan</router-link> atau hubungi tim customer service melalui 
                  <router-link to="/contact" class="legal-link">Halaman Contact Us</router-link>.
                </p>
              </section>
            </div>

            <!-- Back Link -->
            <div class="legal-card-footer">
              <router-link to="/" class="btn-back-home">
                ← Kembali ke Halaman Utama
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="momolive-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
        </div>
        <nav class="footer-links">
          <router-link to="/terms">Syarat & Ketentuan</router-link>
          <router-link to="/refund">Kebijakan Refund</router-link>
          <router-link to="/privacy">Kebijakan Privasi</router-link>
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/contact">Hubungi Kami</router-link>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from 'hugeicons-vue';
</script>

<style scoped>
.legal-page-wrapper {
  position: relative;
  min-height: calc(100vh - 65px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.momolive-bg-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: 0.95;
}

.momolive-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  filter: blur(2px) opacity(0.45);
  transform: scale(1.02);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(219, 39, 119, 0) 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(124, 58, 237, 0) 70%);
  bottom: 10%;
  right: -50px;
}

.legal-main-content {
  position: relative;
  z-index: 1;
  padding: 3rem 1.25rem 5rem 1.25rem;
  flex: 1;
}

.legal-container {
  max-width: 780px;
  margin: 0 auto;
}

.legal-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.legal-badge {
  display: inline-block;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.85rem;
  border-radius: 99px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.page-subtitle {
  font-size: 0.925rem;
  color: #64748b;
  margin-top: 0.4rem;
}

.legal-card-container {
  position: relative;
}

.card-momolive-shadow {
  position: absolute;
  inset: -10px;
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.35), rgba(236, 72, 153, 0.35));
  filter: blur(12px);
  opacity: 0.7;
  z-index: -1;
}

.legal-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2.5rem 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06);
}

.legal-intro-box {
  background: #f8fafc;
  border-left: 4px solid #7c3aed;
  padding: 1rem 1.25rem;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.6;
}

.intro-icon {
  color: #7c3aed;
  flex-shrink: 0;
  margin-top: 2px;
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.legal-section h2 {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.legal-section p {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.7;
}

.legal-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.15s ease;
}

.legal-link:hover {
  color: #651fff;
}

.legal-section ul {
  margin-top: 0.5rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.legal-section li {
  font-size: 0.925rem;
  color: #475569;
  line-height: 1.6;
}

.legal-card-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.btn-back-home {
  color: #7c3aed;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.btn-back-home:hover {
  color: #651fff;
  text-decoration: underline;
}

/* Footer */
.momolive-footer {
  position: relative;
  z-index: 10;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  font-size: 0.85rem;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-emblem-clean {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
}

.footer-links a:hover {
  color: #7c3aed;
}

@media (max-width: 640px) {
  .legal-card {
    padding: 1.75rem 1.25rem;
  }
  .page-title {
    font-size: 1.85rem;
  }
  .footer-inner {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
