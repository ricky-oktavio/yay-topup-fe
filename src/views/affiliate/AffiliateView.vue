<template>
  <div class="affiliate-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <div class="container affiliate-content animate-fade-up">
      <!-- Main Affiliate Form Card -->
      <div class="topup-card-container">
        <!-- Glowing Momolive Shadow Frame -->
        <div class="card-momolive-shadow"></div>

        <div class="topup-card affiliate-card">
          <!-- Top Badge Icon -->
          <div class="badge-icon-wrapper">
            <div class="handshake-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11L18.5 8.5C19.3284 7.67157 20.6716 7.67157 21.5 8.5V8.5C22.3284 9.32843 22.3284 10.6716 21.5 11.5L15 18L10.5 13.5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 13L2.5 7.5C1.67157 6.67157 1.67157 5.32843 2.5 4.5V4.5C3.32843 3.67157 4.67157 3.67157 5.5 4.5L12 11L15.5 7.5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.5 13.5L12.5 15.5" stroke="#7C3AED" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <!-- Header Title & Subtitle -->
          <div class="affiliate-header">
            <h1 class="affiliate-title">Daftar Affiliate</h1>
            <p class="affiliate-subtitle">Bergabung dan dapatkan komisi dari setiap referral</p>
          </div>

          <form @submit.prevent="handleAffiliateSubmit">
            <!-- Field 1: Nama Lengkap -->
            <div class="form-group">
              <label class="form-label-bold">Nama Lengkap</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <UserIcon :size="20" />
                </span>
                <input 
                  v-model="name" 
                  type="text" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            <!-- Field 2: Email -->
            <div class="form-group margin-top-md">
              <label class="form-label-bold">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <Mail01Icon :size="20" />
                </span>
                <input 
                  v-model="email" 
                  type="email" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <!-- Field 3: Password -->
            <div class="form-group margin-top-md">
              <label class="form-label-bold">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <Key01Icon :size="20" />
                </span>
                <input 
                  v-model="password" 
                  type="password" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="Minimal 8 karakter"
                />
              </div>
            </div>

            <!-- Bank Section Divider -->
            <div class="bank-section-divider">
              <span class="divider-line"></span>
              <span class="divider-text">INFORMASI BANK</span>
              <span class="divider-line"></span>
            </div>

            <!-- Field 4: Nama Bank -->
            <div class="form-group">
              <label class="form-label-bold">Nama Bank</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <BankIcon :size="20" />
                </span>
                <input 
                  v-model="bankName" 
                  type="text" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="Contoh: BCA, BNI, BRI"
                />
              </div>
            </div>

            <!-- Field 5: Nomor Rekening -->
            <div class="form-group margin-top-md">
              <label class="form-label-bold">Nomor Rekening</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <CreditCardAcceptIcon :size="20" />
                </span>
                <input 
                  v-model="accountNumber" 
                  type="text" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="Masukkan nomor rekening"
                />
              </div>
            </div>

            <!-- Field 6: Nama Pemilik Rekening -->
            <div class="form-group margin-top-md">
              <label class="form-label-bold">Nama Pemilik Rekening</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <UserIcon :size="20" />
                </span>
                <input 
                  v-model="accountHolder" 
                  type="text" 
                  required
                  class="form-input-styled has-icon" 
                  placeholder="Sesuai buku tabungan"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-gradient-submit margin-top-lg"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Memproses Pendaftaran...</span>
              <span v-else class="btn-flex-inner">
                Daftar Sekarang
                <ArrowRight01Icon :size="20" class="btn-icon" />
              </span>
            </button>
          </form>

          <!-- Login Footer Link -->
          <div class="login-card-footer">
            <span class="muted-text">Sudah punya akun?</span>
            <router-link to="/login" class="purple-link">Login</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Footer -->
    <footer class="momolive-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="../../assets/logo_concept_2.png" alt="YayTopup Logo" class="footer-emblem-clean" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserIcon, Mail01Icon, Key01Icon, BankIcon, CreditCardAcceptIcon, ArrowRight01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const name = ref('');
const email = ref('');
const password = ref('');
const bankName = ref('');
const accountNumber = ref('');
const accountHolder = ref('');
const isSubmitting = ref(false);

const handleAffiliateSubmit = () => {
  if (!name.value || !email.value || !password.value || !bankName.value || !accountNumber.value) return;

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    store.showToast(`Pendaftaran Affiliate Berhasil! Selamat bergabung, ${name.value}!`, 'success');
    router.push('/login');
  }, 600);
};

const showFooterInfo = (title) => {
  store.showToast(`Halaman ${title} YayTopup`, 'info');
};
</script>

<style scoped>
.affiliate-page-wrapper {
  position: relative;
  min-height: calc(100vh - 65px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

/* Momolive Background Shadow & Glow Layer */
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
  filter: blur(2px) opacity(0.5);
  transform: scale(1.02);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.15) 70%, transparent 100%);
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(99, 102, 241, 0.15) 70%, transparent 100%);
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.affiliate-content {
  position: relative;
  z-index: 1;
  padding-top: 3rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topup-card-container {
  position: relative;
  width: 100%;
  max-width: 450px;
}

.card-momolive-shadow {
  position: absolute;
  inset: -10px;
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
  filter: blur(10px);
  opacity: 0.75;
  z-index: -1;
  animation: shadowPulse 4s ease-in-out infinite alternate;
}

@keyframes shadowPulse {
  0% {
    opacity: 0.65;
    filter: blur(8px);
    transform: scale(0.99);
  }
  100% {
    opacity: 0.85;
    filter: blur(14px);
    transform: scale(1.01);
  }
}

.affiliate-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
}

.badge-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.handshake-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ede9fe;
  display: flex;
  align-items: center;
  justify-content: center;
}

.affiliate-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.affiliate-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.affiliate-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 0.35rem;
  font-weight: 500;
}

.form-label-bold {
  font-size: 0.875rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.4rem;
  display: block;
}

.margin-top-md {
  margin-top: 1.15rem;
}

.margin-top-lg {
  margin-top: 1.5rem;
}

/* Bank Section Divider */
.bank-section-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.75rem 0 1.25rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider-text {
  font-size: 0.725rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.btn-flex-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.login-card-footer {
  margin-top: 1.75rem;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  align-items: center;
}

.muted-text {
  color: #6b7280;
}

.purple-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease;
}

.purple-link:hover {
  color: #6366f1;
  text-decoration: underline;
}

/* Footer */
.momolive-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  padding: 2.25rem 0;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-emblem-clean {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 1.75rem;
  font-size: 0.875rem;
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
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>
