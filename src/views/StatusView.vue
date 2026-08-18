<template>
  <div class="status-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <div class="container status-content animate-fade-up">
      <!-- Title Header -->
      <div class="hero-header">
        <h1 class="main-title">Cek Status Transaksi</h1>
      </div>

      <!-- Main Status Search Card -->
      <div class="topup-card-container">
        <!-- Glowing Momolive Shadow Frame -->
        <div class="card-momolive-shadow"></div>

        <div class="topup-card">
          <!-- Input Form -->
          <div class="form-group">
            <label class="form-label-uppercase">ID TRANSAKSI</label>
            <input 
              v-model="searchId" 
              type="text" 
              class="form-input-styled" 
              placeholder="Masukkan ID Transaksi"
              @keyup.enter="handleCheckStatus"
            />
          </div>

          <button 
            class="btn btn-gradient-submit margin-top-md"
            :disabled="isSearching"
            @click="handleCheckStatus"
          >
            <span v-if="isSearching">⏳ Mencari...</span>
            <span v-else>Cek Status</span>
          </button>

          <!-- Result Details Box -->
          <div v-if="searchResult" class="result-section">
            <div class="card-divider"></div>

            <div class="result-rows">
              <div class="result-row">
                <span class="row-label">ID Transaksi</span>
                <strong class="row-value dark-val">{{ searchResult.id }}</strong>
              </div>

              <div class="result-row">
                <span class="row-label">Produk</span>
                <span class="row-value">{{ searchResult.product }}</span>
              </div>

              <div class="result-row">
                <span class="row-label">Target User ID</span>
                <span class="row-value">{{ searchResult.targetUser }}</span>
              </div>

              <div class="result-row">
                <span class="row-label">Status</span>
                <span 
                  class="badge-status"
                  :class="searchResult.status === 'PAID' || searchResult.status === 'SUCCESS' ? 'badge-paid' : 'badge-pending'"
                >
                  {{ searchResult.status }}
                </span>
              </div>

              <div class="result-row">
                <span class="row-label">Total Bayar</span>
                <span class="total-pink-price">Rp {{ searchResult.amount.toLocaleString('id-ID') }}</span>
              </div>

              <div class="result-row">
                <span class="row-label">Tanggal Transaksi</span>
                <span class="row-value mute-val">{{ searchResult.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Footer -->
    <footer class="momolive-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
          <span class="brand-text">
            <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
          </span>
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
import { useTopupStore } from '../stores/topupStore';

const store = useTopupStore();

const searchId = ref('YT123456789');
const isSearching = ref(false);

const searchResult = ref({
  id: 'YT123456789',
  product: 'Momocoin',
  targetUser: '123456789',
  status: 'PAID',
  amount: 50000,
  date: '15 May 2024, 14:20'
});

const handleCheckStatus = () => {
  if (!searchId.value.trim()) return;

  isSearching.value = true;

  setTimeout(() => {
    isSearching.value = false;
    
    // Check in store transactions first
    const foundInStore = store.transactions.find(
      (t) => t.id.toLowerCase() === searchId.value.trim().toLowerCase()
    );

    if (foundInStore) {
      searchResult.value = {
        id: foundInStore.id,
        product: foundInStore.productName || 'Momocoin',
        targetUser: foundInStore.targetAccount,
        status: foundInStore.status === 'SUCCESS' ? 'PAID' : foundInStore.status,
        amount: foundInStore.amount,
        date: foundInStore.createdAt
      };
      store.showToast('Data transaksi ditemukan!', 'success');
    } else {
      // Default demo result matching screenshot
      searchResult.value = {
        id: searchId.value.trim().toUpperCase(),
        product: 'Momocoin',
        targetUser: '123456789',
        status: 'PAID',
        amount: 50000,
        date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      store.showToast(`Status transaksi ${searchId.value.trim()} berhasil dicek!`, 'info');
    }
  }, 400);
};

const showFooterInfo = (title) => {
  store.showToast(`Halaman ${title} YayTopup`, 'info');
};
</script>

<style scoped>
.status-page-wrapper {
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

.status-content {
  position: relative;
  z-index: 1;
  padding-top: 3.5rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.03em;
}

.topup-card-container {
  position: relative;
  width: 100%;
  max-width: 470px;
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

.topup-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
}

.margin-top-md {
  margin-top: 1.25rem;
}

.card-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 1.5rem 0;
}

/* Result Section */
.result-rows {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.row-label {
  color: #6b7280;
}

.row-value {
  color: #4b5563;
}

.row-value.dark-val {
  color: #111827;
  font-size: 1rem;
}

.row-value.mute-val {
  color: #6b7280;
  font-size: 0.9rem;
}

.total-pink-price {
  font-size: 1.45rem;
  font-weight: 800;
  color: #ec4899;
}

.badge-status {
  padding: 0.2rem 0.65rem;
  font-size: 0.775rem;
  font-weight: 800;
  border-radius: 99px;
  letter-spacing: 0.04em;
}

.badge-paid {
  background: #d1fae5;
  color: #059669;
}

.badge-pending {
  background: #fef3c7;
  color: #d97706;
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
  gap: 0.55rem;
  justify-content: center;
}

.footer-emblem-clean {
  height: 32px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(124, 58, 237, 0.2));
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.brand-yay {
  color: #0f172a;
}

.brand-topup {
  background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
