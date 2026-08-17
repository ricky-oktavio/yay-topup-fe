<template>
  <div class="admin-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <!-- Admin Navbar -->
    <AdminNavbar />

    <!-- Main Content Area -->
    <main class="admin-main-content animate-fade-up">
      <div class="admin-container">
        
        <!-- Page Title -->
        <h1 class="page-title">Pengaturan</h1>

        <!-- Settings Form Card (Max-width 480px centered) -->
        <div class="settings-card-wrapper">
          <div class="topup-card settings-card">
            <form @submit.prevent="handleSaveSettings">
              
              <!-- Field 1: Global Commission Rate (%) -->
              <div class="form-group">
                <label class="form-label-styled">Global Commission Rate (%)</label>
                <input 
                  v-model.number="globalCommissionRate" 
                  type="number" 
                  min="0"
                  max="100"
                  step="0.1"
                  required 
                  class="form-input-styled" 
                  placeholder="5" 
                />
              </div>

              <!-- Field 2: Minimum Withdrawal Amount (Rp) -->
              <div class="form-group margin-top-lg">
                <label class="form-label-styled">Minimum Withdrawal Amount (Rp)</label>
                <input 
                  v-model.number="minWithdrawalAmount" 
                  type="number" 
                  min="0"
                  step="1000"
                  required 
                  class="form-input-styled" 
                  placeholder="50000" 
                />
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="btn btn-gradient-submit margin-top-xl"
                :disabled="isSaving"
              >
                <span v-if="isSaving">Menyimpan...</span>
                <span v-else>Simpan Perubahan</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>

    <!-- Admin Footer -->
    <footer class="admin-footer">
      <div class="admin-container footer-inner">
        <div class="footer-left">
          © 2026 YayTopup. All rights reserved.
        </div>
        <div class="footer-right">
          <router-link to="/contact">Support</router-link>
          <router-link to="/terms">Terms & Policies</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

const globalCommissionRate = ref(5);
const minWithdrawalAmount = ref(50000);
const isSaving = ref(false);

const handleSaveSettings = () => {
  isSaving.value = true;

  setTimeout(() => {
    isSaving.value = false;
    store.showToast('Pengaturan sistem berhasil disimpan!', 'success');
  }, 400);
};

const showFooterInfo = (title) => {
  store.showToast(`Halaman ${title}`, 'info');
};
</script>

<style scoped>
.admin-page-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #1e293b;
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
  opacity: 0.85;
}

.momolive-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  filter: blur(3px) opacity(0.35);
  transform: scale(1.02);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}

.orb-1 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(236, 72, 153, 0) 70%);
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(124, 58, 237, 0) 70%);
  bottom: 5%;
  right: -50px;
}

.admin-main-content {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 3rem 0 5rem 0;
}

.admin-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

/* Settings Card Wrapper (Max-width 480px centered) */
.settings-card-wrapper {
  max-width: 480px;
  margin: 0 auto;
}

.settings-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 2.5rem 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label-styled {
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.margin-top-lg {
  margin-top: 1.5rem;
}

.margin-top-xl {
  margin-top: 2rem;
}

.btn-gradient-submit {
  width: 100%;
  padding: 0.85rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
  transition: all 0.2s ease;
}

.btn-gradient-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
}

.btn-gradient-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Footer */
.admin-footer {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  font-size: 0.85rem;
  color: #64748b;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-right {
  display: flex;
  gap: 1.5rem;
}

.footer-right a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
}

.footer-right a:hover {
  color: #7c3aed;
}
</style>
