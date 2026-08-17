<template>
  <div class="login-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <div class="container login-content animate-fade-up">
      <!-- Main Register Form Card -->
      <div class="topup-card-container">
        <!-- Glowing Momolive Shadow Frame -->
        <div class="card-momolive-shadow"></div>

        <div class="topup-card login-card">
          <!-- Title & Subtitle -->
          <div class="login-header">
            <h1 class="login-title">Daftar Akun</h1>
            <p class="login-subtitle">Bergabung sebagai Partner & Affiliate YayTopup</p>
          </div>

          <form @submit.prevent="handleRegisterSubmit">
            <!-- Field 1: Nama Lengkap -->
            <div class="form-group">
              <label class="form-label-bold">Nama Lengkap</label>
              <input 
                v-model="name" 
                type="text" 
                required
                class="form-input-styled" 
                placeholder="Masukkan nama lengkap"
              />
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
                  placeholder="Masukkan email"
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
                  :type="showPassword ? 'text' : 'password'" 
                  required
                  class="form-input-styled has-icon has-toggle" 
                  placeholder="Buat password"
                />
                <button 
                  type="button" 
                  class="toggle-eye-btn" 
                  @click="showPassword = !showPassword"
                >
                  <ViewIcon v-if="!showPassword" :size="20" />
                  <ViewOffIcon v-else :size="20" />
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-gradient-submit margin-top-lg"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Memproses Pendaftaran...</span>
              <span v-else>Daftar Sekarang</span>
            </button>
          </form>

          <!-- Login Footer Link -->
          <div class="login-card-footer">
            <span class="muted-text">Sudah punya akun?</span>
            <router-link to="/login" class="purple-link">Login ke akun kamu</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Footer -->
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Mail01Icon, Key01Icon, ViewIcon, ViewOffIcon } from 'hugeicons-vue';
import { useTopupStore } from '../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);

const handleRegisterSubmit = () => {
  if (!name.value || !email.value || !password.value) return;

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    store.showToast(`Pendaftaran berhasil! Selamat datang, ${name.value}!`, 'success');
    router.push('/login');
  }, 500);
};

const showFooterInfo = (title) => {
  store.showToast(`Halaman ${title} YayTopup`, 'info');
};
</script>

<style scoped>
.login-page-wrapper {
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

.login-content {
  position: relative;
  z-index: 1;
  padding-top: 3.5rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topup-card-container {
  position: relative;
  width: 100%;
  max-width: 440px;
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

.login-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 2.5rem 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-size: 0.95rem;
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
  margin-top: 1.25rem;
}

.margin-top-lg {
  margin-top: 1.5rem;
}

.form-input-styled.has-toggle {
  padding-right: 2.75rem;
}

.toggle-eye-btn {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transition: color 0.15s ease;
}

.toggle-eye-btn:hover {
  color: #7c3aed;
}

.login-card-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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
