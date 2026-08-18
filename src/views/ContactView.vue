<template>
  <div class="contact-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <!-- Main Content Container (Max-width 780px centered) -->
    <main class="contact-main-content animate-fade-up">
      <div class="contact-container">
        
        <!-- Header Section -->
        <div class="contact-header">
          <span class="contact-badge">Dukungan Pelanggan 24/7</span>
          <h1 class="page-title">Contact Us</h1>
          <p class="page-subtitle">Tim Customer Service kami siap membantu kendala top-up & pertanyaan Anda.</p>
        </div>

        <!-- Contact Cards Grid (Top Contact Info + Bottom Form) -->
        <div class="contact-grid-wrapper">
          
          <!-- Top 3 Quick Info Cards -->
          <div class="quick-contact-cards">
            <!-- Card 1: Email Support -->
            <div class="info-card" @click="handleCopyEmail">
              <div class="info-icon-box purple">
                <Mail01Icon :size="22" />
              </div>
              <div class="info-text-box">
                <span class="info-label">Email Support</span>
                <strong class="info-value">support@yaytopup.com</strong>
                <span class="info-sub">Respon cepat &lt; 15 menit</span>
              </div>
            </div>

            <!-- Card 2: WhatsApp CS -->
            <div class="info-card" @click="handleOpenWA">
              <div class="info-icon-box green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div class="info-text-box">
                <span class="info-label">WhatsApp Live Chat</span>
                <strong class="info-value">+62 812-3456-7890</strong>
                <span class="info-sub">Aktif 24 Jam Nonstop</span>
              </div>
            </div>

            <!-- Card 3: Head Office -->
            <div class="info-card">
              <div class="info-icon-box blue">
                <Location01Icon :size="22" />
              </div>
              <div class="info-text-box">
                <span class="info-label">Kantor Utama</span>
                <strong class="info-value">PT. JLIMA DIGITAL INDONESIA</strong>
                <span class="info-sub">Jakarta South District, Indonesia</span>
              </div>
            </div>
          </div>

          <!-- Main Contact Form Card -->
          <div class="contact-card-container margin-top-lg">
            <div class="card-momolive-shadow"></div>
            
            <div class="contact-card">
              <h2 class="card-form-title">Kirim Pesan Langsung</h2>
              <p class="card-form-desc">Isi formulir di bawah ini untuk bantuan kendala transaksi atau kemitraan.</p>

              <form @submit.prevent="handleFormSubmit">
                <!-- Row 1: Nama & Email -->
                <div class="form-row-2">
                  <div class="form-group">
                    <label class="form-label-sm">Nama Lengkap</label>
                    <input 
                      v-model="name" 
                      type="text" 
                      required 
                      class="form-input-styled" 
                      placeholder="e.g. Ricky Oktavio"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label-sm">Email Aktif</label>
                    <input 
                      v-model="email" 
                      type="email" 
                      required 
                      class="form-input-styled" 
                      placeholder="e.g. ricky@email.com"
                    />
                  </div>
                </div>

                <!-- Row 2: Subjek -->
                <div class="form-group margin-top-md">
                  <label class="form-label-sm">Kategori Pertanyaan / Kendala</label>
                  <select v-model="subject" class="form-select-styled" required>
                    <option value="" disabled selected>Pilih Kategori Perihal</option>
                    <option value="Kendala Top-Up / Pembayaran">Kendala Top-Up / Pembayaran</option>
                    <option value="Program Affiliate & Komisi">Program Affiliate & Komisi</option>
                    <option value="Kemitraan & Kerjasama">Kemitraan & Kerjasama</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  </select>
                </div>

                <!-- Row 3: Pesan -->
                <div class="form-group margin-top-md">
                  <label class="form-label-sm">Pesan / Detail Kendala</label>
                  <textarea 
                    v-model="message" 
                    rows="4" 
                    required 
                    class="form-textarea-styled" 
                    placeholder="Tuliskan nomor ID pesanan atau pesan lengkap Anda..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  class="btn btn-purple-submit margin-top-lg"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Mengirim Pesan...</span>
                  <span v-else class="btn-flex-inner">
                    Kirim Pesan Sekarang
                    <ArrowRight01Icon :size="18" />
                  </span>
                </button>
              </form>
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
        <p class="footer-copyright">© 2026 PT. JLIMA DIGITAL INDONESIA. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mail01Icon, Location01Icon, ArrowRight01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../stores/topupStore';

const store = useTopupStore();

const name = ref('');
const email = ref('');
const subject = ref('Kendala Top-Up / Pembayaran');
const message = ref('');
const isSubmitting = ref(false);

const handleFormSubmit = () => {
  if (!name.value || !email.value || !message.value) return;

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    store.showToast(`Terima kasih ${name.value}, pesan Anda berhasil terkirim! Tim CS akan membalas ke ${email.value}`, 'success');
    name.value = '';
    email.value = '';
    message.value = '';
  }, 600);
};

const handleCopyEmail = () => {
  navigator.clipboard.writeText('support@yaytopup.com');
  store.showToast('Email support@yaytopup.com berhasil disalin!', 'success');
};

const handleOpenWA = () => {
  store.showToast('Menghubungkan ke WhatsApp CS YayTopup...', 'info');
};
</script>

<style scoped>
.contact-page-wrapper {
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
  background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(236, 72, 153, 0) 70%);
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

.contact-main-content {
  position: relative;
  z-index: 1;
  padding: 3rem 1.25rem 5rem 1.25rem;
  flex: 1;
}

.contact-container {
  max-width: 780px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.contact-badge {
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
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.4rem;
}

/* Quick Contact Cards */
.quick-contact-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .quick-contact-cards {
    grid-template-columns: 1fr;
  }
}

.info-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  border-color: #7c3aed;
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.12);
}

.info-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon-box.purple {
  background: #f3e8ff;
  color: #7c3aed;
}

.info-icon-box.green {
  background: #d1fae5;
  color: #059669;
}

.info-icon-box.blue {
  background: #dbeafe;
  color: #2563eb;
}

.info-text-box {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.info-value {
  font-size: 0.875rem;
  color: #0f172a;
  font-weight: 700;

}

.info-sub {
  font-size: 0.725rem;
  color: #94a3b8;
}

/* Contact Card Form */
.contact-card-container {
  position: relative;
}

.margin-top-lg {
  margin-top: 1.5rem;
}

.margin-top-md {
  margin-top: 1rem;
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

.contact-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06);
}

.card-form-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}

.card-form-desc {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label-sm {
  font-size: 0.825rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.4rem;
}

.form-input-styled, .form-select-styled, .form-textarea-styled {
  width: 100%;
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  transition: all 0.15s ease;
}

.form-input-styled:focus, .form-select-styled:focus, .form-textarea-styled:focus {
  background: #ffffff;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.form-textarea-styled {
  resize: vertical;
  font-family: inherit;
}

.btn-purple-submit {
  width: 100%;
  padding: 0.85rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 12px;
  background: #7c3aed;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
  transition: all 0.2s ease;
}

.btn-purple-submit:hover:not(:disabled) {
  background: #651fff;
  transform: translateY(-1px);
}

.btn-flex-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
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

.footer-copyright {
  color: #94a3b8;
}

@media (max-width: 640px) {
  .contact-card {
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
