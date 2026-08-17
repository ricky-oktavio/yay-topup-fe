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
          <span class="legal-badge green-badge">Perlindungan Data</span>
          <h1 class="page-title">Privacy Policy</h1>
          <p class="page-subtitle">Terakhir diperbarui: 18 Agustus 2026</p>
        </div>

        <!-- Document Card -->
        <div class="legal-card-container">
          <div class="card-momolive-shadow"></div>
          
          <div class="legal-card">
            <div class="legal-intro-box privacy-box">
              <InformationCircleIcon :size="22" class="intro-icon-green" />
              <p>
                Di <strong>YayTopup</strong>, kerahasiaan dan keamanan data pribadi Anda adalah prioritas utama kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
              </p>
            </div>

            <div class="legal-content">
              <!-- Section 1 -->
              <section class="legal-section">
                <h2>1. Informasi yang Kami Kumpulkan</h2>
                <p>Kami mengumpulkan informasi minimal yang diperlukan untuk memproses transaksi top-up dan memberikan pengalaman layanan terbaik:</p>
                <ul>
                  <li><strong>Informasi Transaksi:</strong> ID Game/Momocoin ID, jumlah top-up, metode pembayaran, serta waku transaksi.</li>
                  <li><strong>Informasi Pendaftaran Akun & Affiliate:</strong> Nama lengkap, alamat email, kata sandi terenkripsi, serta nomor rekening bank untuk penarikan saldo komisi.</li>
                  <li><strong>Informasi Teknis:</strong> Alamat IP, jenis perangkat, dan *log* aktivitas sistem untuk keamanan transaksi.</li>
                </ul>
              </section>

              <!-- Section 2 -->
              <section class="legal-section">
                <h2>2. Penggunaan Informasi</h2>
                <p>Informasi yang dikumpulkan digunakan secara eksklusif untuk:</p>
                <ul>
                  <li>Memproses dan memverifikasi pembayaran top-up secara instan.</li>
                  <li>Mengirimkan konfirmasi status transaksi dan pemberitahuan layanan.</li>
                  <li>Memproses pembayaran komisi saldo untuk mitra program afiliasi.</li>
                  <li>Mencegah aktivitas penipuan, pencucian uang, atau tindak ilegal lainnya.</li>
                </ul>
              </section>

              <!-- Section 3 -->
              <section class="legal-section">
                <h2>3. Perlindungan & Keamanan Data</h2>
                <p>
                  Kami menerapkan standar enkripsi **SSL/TLS 256-bit** dan protokol keamanan industri terkini untuk melindungi data pribadi Anda dari akses tanpa izin, peretasan, atau pengungkapan yang tidak sah. Seluruh kredensial sensitif disimpan dalam sistem terenkripsi.
                </p>
              </section>

              <!-- Section 4 -->
              <section class="legal-section">
                <h2>4. Pengungkapan Kepada Pihak Ketiga</h2>
                <p>
                  Kami tidak memperjualbelikan atau menyewakan data pribadi Anda kepada pihak mana pun. Informasi hanya dapat dibagikan kepada penyedia layanan pembayaran resmi (*Payment Gateway*) dan mitra penyedia *game* semata-mata untuk penyelesaian transaksi yang Anda minta.
                </p>
              </section>

              <!-- Section 5 -->
              <section class="legal-section">
                <h2>5. Hak Pengguna</h2>
                <p>
                  Anda berhak mengakses, memperbarui, atau meminta penghapusan informasi pribadi Anda dari database kami kapan saja dengan menghubungi tim dukungan pelanggan kami.
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
          <img src="../assets/logo_concept_2.png" alt="YayTopup Logo" class="footer-emblem-clean" />
        </div>
        <nav class="footer-links">
          <router-link to="/terms">Terms of Service</router-link>
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/contact">Contact Us</router-link>
        </nav>
        <p class="footer-copyright">© 2026 YayTopup. All rights reserved.</p>
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
  background: radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(124, 58, 237, 0) 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(16, 185, 129, 0) 70%);
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

.legal-badge.green-badge {
  display: inline-block;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
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
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(139, 92, 246, 0.3));
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

.privacy-box {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
}

.legal-intro-box {
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

.intro-icon-green {
  color: #10b981;
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
  color: #10b981;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.btn-back-home:hover {
  color: #059669;
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
  color: #10b981;
}

.footer-copyright {
  color: #94a3b8;
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
