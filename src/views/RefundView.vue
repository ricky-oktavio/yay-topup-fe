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
          <span class="legal-badge amber-badge">Jaminan Transaksi</span>
          <h1 class="page-title">Refund Policy</h1>
          <p class="page-subtitle">Kebijakan Pengembalian Dana & Jaminan Layanan YayTopup</p>
        </div>

        <!-- Document Card -->
        <div class="legal-card-container">
          <div class="card-momolive-shadow"></div>
          
          <div class="legal-card">
            <div class="legal-intro-box amber-box">
              <InformationCircleIcon :size="22" class="intro-icon-amber" />
              <p>
                Komitmen kami di <strong>YayTopup</strong> adalah memberikan pengalaman top-up cepat, aman, dan transparan. Kebijakan ini mengatur syarat, prosedur, serta ketentuan pengembalian dana (refund) untuk kenyamanan Anda.
              </p>
            </div>

            <div class="legal-content">
              <!-- Section 1 -->
              <section class="legal-section">
                <h2>1. Syarat Pengajuan Refund</h2>
                <p>Pengembalian dana hanya dapat diproses dan disetujui apabila memenuhi salah satu kondisi berikut:</p>
                <ul>
                  <li><strong>Kegagalan Sistem YayTopup:</strong> Pembayaran telah berhasil terpotong dari rekening/E-Wallet Anda, namun pesanan dinyatakan gagal oleh sistem kami dan produk tidak terisi.</li>
                  <li><strong>Pembayaran Ganda (Overpayment):</strong> Terjadi pemotongan saldo lebih dari satu kali untuk nomor pesanan/invoice yang sama akibat gangguan pada gateway pembayaran.</li>
                  <li><strong>Keterlambatan Pengiriman Khusus:</strong> Produk top-up belum diterima dalam waktu lebih dari <strong>24 jam</strong> sejak pembayaran berhasil, dan terdapat konfirmasi gangguan dari pihak publisher game.</li>
                </ul>
              </section>

              <!-- Section 2 -->
              <section class="legal-section">
                <h2>2. Kondisi Non-Refundable (Tidak Dapat Dikembalikan)</h2>
                <p>YayTopup tidak dapat memproses pengembalian dana atas transaksi yang disebabkan oleh kendala di luar kendali sistem kami, meliputi:</p>
                <ul>
                  <li><strong>Kesalahan Input oleh Pengguna:</strong> Salah memasukkan ID Akun Game, User ID, Zone ID, atau Nomor HP tujuan. Transaksi yang terlanjur terkirim ke ID yang salah tidak dapat ditarik kembali.</li>
                  <li><strong>Transaksi yang Sudah Berhasil (PAID / SUCCESS):</strong> Top-up yang sudah sukses masuk ke akun game tujuan tidak dapat dibatalkan atau dikembalikan dengan alasan apa pun.</li>
                  <li><strong>Voucher Digital yang Telah Diterbitkan:</strong> Kode voucher digital atau gift card yang sudah berhasil terbit dan dikirimkan kepada pembeli bersifat final.</li>
                  <li><strong>Akun Game Terbanned:</strong> Pembatasan atau pemblokiran akun game oleh pihak publisher yang disebabkan oleh aktivitas ilegal pengguna.</li>
                </ul>
              </section>

              <!-- Section 3 -->
              <section class="legal-section">
                <h2>3. Alur & Prosedur Pengajuan Refund</h2>
                <p>Jika Anda mengalami kendala yang memenuhi syarat pengembalian dana, ikuti langkah pengajuan berikut:</p>
                <div class="step-guide">
                  <div class="step-item">
                    <span class="step-num">1</span>
                    <div class="step-text">
                      <strong>Siapkan Bukti Transaksi</strong>
                      <p>Catat Nomor Invoice / ID Transaksi YayTopup dan simpan bukti pembayaran resmi (receipt/screenshot transfer).</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <span class="step-num">2</span>
                    <div class="step-text">
                      <strong>Hubungi Customer Support</strong>
                      <p>Kirimkan laporan kendala beserta bukti ke WhatsApp CS resmi atau email <code>support@yaytopup.com</code>.</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <span class="step-num">3</span>
                    <div class="step-text">
                      <strong>Verifikasi & Pemrosesan Dana</strong>
                      <p>Tim CS akan melakukan verifikasi log sistem dalam 1x24 jam. Jika disetujui, dana akan ditransfer kembali ke rekening/E-Wallet Anda.</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Section 4 -->
              <section class="legal-section">
                <h2>4. Metode & Estimasi Waktu Pengembalian</h2>
                <ul>
                  <li><strong>E-Wallet & QRIS:</strong> Pengembalian dana diproses langsung ke E-Wallet asli atau saldo akun YayTopup dalam <strong>1 - 3 hari kerja</strong>.</li>
                  <li><strong>Transfer Bank / Virtual Account:</strong> Pengembalian akan dikirimkan ke rekening bank atas nama pembeli dalam waktu <strong>1 - 3 hari kerja</strong> setelah verifikasi akun.</li>
                  <li>Potongan biaya admin dari pihak ketiga (jika ada) dapat dikenakan sesuai ketentuan penyelenggara pembayaran.</li>
                </ul>
              </section>

              <!-- Section 5 -->
              <section class="legal-section">
                <h2>5. Layanan Bantuan Lebih Lanjut</h2>
                <p>
                  Jika ada pertanyaan yang belum jelas terkait proses klaim refund, silakan lihat 
                  <router-link to="/faq" class="legal-link">Halaman FAQ</router-link> kami atau hubungi kami langsung di 
                  <router-link to="/contact" class="legal-link">Formulir Kontak CS</router-link>.
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
  background: radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(124, 58, 237, 0) 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(245, 158, 11, 0) 70%);
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

.legal-badge.amber-badge {
  display: inline-block;
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
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
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(139, 92, 246, 0.3));
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

.amber-box {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
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

.intro-icon-amber {
  color: #f59e0b;
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
  color: #d97706;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.15s ease;
}

.legal-link:hover {
  color: #b45309;
}

.legal-section ul {
  margin-top: 0.5rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legal-section li {
  font-size: 0.925rem;
  color: #475569;
  line-height: 1.6;
}

/* Step Guide Component */
.step-guide {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 1rem 1.15rem;
  border-radius: 14px;
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-text strong {
  display: block;
  font-size: 0.95rem;
  color: #0f172a;
  margin-bottom: 0.2rem;
}

.step-text p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.step-text code {
  background: #e2e8f0;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #0f172a;
}

.legal-card-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.btn-back-home {
  color: #d97706;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.btn-back-home:hover {
  color: #b45309;
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
  color: #d97706;
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
