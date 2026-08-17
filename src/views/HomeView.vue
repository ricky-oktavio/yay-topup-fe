<template>
  <div class="momolive-topup-page">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <div class="container main-content-wrapper animate-fade-up">
      <!-- Title & Subtitle Section -->
      <div class="hero-header">
        <h1 class="main-title">Top Up Momocoin</h1>
        <p class="main-subtitle">Isi saldo Momocoin dengan cepat & aman</p>
      </div>

      <!-- Main Topup Card -->
      <div class="topup-card-container">
        <!-- Glowing Momolive Shadow Frame -->
        <div class="card-momolive-shadow"></div>

        <div class="topup-card">
          <!-- Field 1: ID MOMOCOIN -->
          <div class="form-group">
            <label class="form-label-uppercase">ID MOMOCOIN</label>
            <input 
              v-model="momocoinId" 
              type="text" 
              class="form-input-styled" 
              placeholder="Masukkan ID Momocoin kamu"
            />
            <span class="hint-text">Contoh: 123456789</span>
          </div>

          <!-- Field 2: KODE REFERRAL -->
          <div class="form-group margin-top-md">
            <label class="form-label-uppercase">KODE REFERRAL</label>
            <input 
              v-model="referralCode" 
              type="text" 
              class="form-input-styled" 
              placeholder="Masukkan kode referral (opsional)"
            />
          </div>

          <!-- Field 3: NOMINAL KOIN -->
          <div class="form-group margin-top-md">
            <label class="form-label-uppercase">NOMINAL KOIN</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <Coins01Icon :size="20" />
              </span>
              <input 
                v-model.number="coinAmount" 
                type="number" 
                min="0"
                class="form-input-styled has-icon" 
                placeholder="Masukkan jumlah koin"
              />
            </div>
          </div>

          <!-- Quick Preset Selection Chips -->
          <div class="coin-presets">
            <button 
              v-for="preset in presets" 
              :key="preset"
              class="preset-chip"
              :class="{ active: coinAmount === preset }"
              @click="coinAmount = preset"
            >
              +{{ preset.toLocaleString('id-ID') }} Koin
            </button>
          </div>

          <!-- Calculation Summary Box -->
          <div class="summary-section">
            <div class="summary-line">
              <span class="summary-label">Nominal Koin</span>
              <span class="summary-value">{{ formattedCoins }}</span>
            </div>
            <div class="summary-line total-line">
              <span class="total-label">Total Bayar</span>
              <span class="total-amount">Rp {{ formattedTotal }}</span>
            </div>
          </div>

          <!-- Primary Submit Button -->
          <button 
            class="btn btn-gradient-submit" 
            :disabled="!isFormValid || isLoading"
            @click="handlePayNow"
          >
            <span v-if="isLoading">Memproses Transaksi...</span>
            <span v-else class="btn-flex-inner">
              Bayar Sekarang 
              <ArrowRight01Icon :size="20" class="btn-icon" />
            </span>
          </button>
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
          <a href="#" @click.prevent="showFooterInfo('Terms of Service')">Terms of Service</a>
          <a href="#" @click.prevent="showFooterInfo('Privacy Policy')">Privacy Policy</a>
          <a href="#" @click.prevent="showFooterInfo('Contact Us')">Contact Us</a>
        </nav>
        <p class="footer-copyright">© 2026 YayTopup. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Coins01Icon, ArrowRight01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const momocoinId = ref('');
const referralCode = ref('');
const coinAmount = ref(0);
const isLoading = ref(false);

const presets = [100, 500, 1000, 5000, 10000];

// 1 Momocoin = Rp 100
const PRICE_PER_COIN = 100;

const formattedCoins = computed(() => {
  const val = Number(coinAmount.value) || 0;
  return val.toLocaleString('id-ID');
});

const totalPrice = computed(() => {
  const val = Number(coinAmount.value) || 0;
  return val * PRICE_PER_COIN;
});

const formattedTotal = computed(() => {
  return totalPrice.value.toLocaleString('id-ID');
});

const isFormValid = computed(() => {
  return momocoinId.value.trim().length >= 4 && coinAmount.value > 0;
});

const handlePayNow = () => {
  if (!isFormValid.value) return;

  store.setCurrentOrder({
    momocoinId: momocoinId.value,
    referralCode: referralCode.value || '-',
    coinAmount: coinAmount.value,
    totalPrice: totalPrice.value
  });

  router.push('/payment');
};

const showFooterInfo = (title) => {
  store.showToast(`Halaman ${title} YayTopup`, 'info');
};
</script>

<style scoped>
.momolive-topup-page {
  position: relative;
  min-height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
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

.main-content-wrapper {
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
  font-size: 2.75rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.main-subtitle {
  font-size: 1.05rem;
  color: #6b7280;
  margin-top: 0.5rem;
  font-weight: 500;
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

.coin-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.6rem;
}

.preset-chip {
  padding: 0.3rem 0.65rem;
  font-size: 0.775rem;
  font-weight: 600;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.15s ease;
}

.preset-chip:hover, .preset-chip.active {
  background: rgba(168, 85, 247, 0.12);
  border-color: #a855f7;
  color: #7c3aed;
}

.summary-section {
  margin-top: 1.75rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #4b5563;
}

.summary-value {
  font-weight: 700;
  color: #111827;
}

.total-line {
  font-size: 1.05rem;
  margin-top: 0.25rem;
}

.total-label {
  font-weight: 600;
  color: #111827;
}

.total-amount {
  font-size: 1.45rem;
  font-weight: 800;
  color: #ec4899;
}

.btn-flex-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  display: inline-block;
}

.momolive-footer {
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  padding: 2.25rem 0;
  z-index: 1;
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
  mix-blend-mode: multiply;
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
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #7c3aed;
}

.footer-copyright {
  font-size: 0.8rem;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .main-title {
    font-size: 2.1rem;
  }
  .topup-card {
    padding: 1.75rem 1.25rem;
  }
}
</style>
