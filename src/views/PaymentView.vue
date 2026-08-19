<template>
  <div class="payment-page-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <div class="container payment-content animate-fade-up">
      <!-- Header with Back Button and Centered Title -->
      <div class="header-nav">
        <button class="back-link" @click="goBack">
          <ArrowLeft01Icon :size="18" class="back-arrow" />
          Kembali
        </button>
        <h1 class="header-page-title">Pembayaran</h1>
        <div class="header-right-space"></div>
      </div>

      <!-- Card 1: RINGKASAN PESANAN -->
      <div class="card-box summary-card-box">
        <h2 class="card-section-label">RINGKASAN PESANAN</h2>

        <div class="summary-rows">
          <div class="summary-item-row">
            <span class="item-name">ID Momocoin</span>
            <strong class="item-value dark-value">{{ orderDetails.momocoinId }}</strong>
          </div>

          <div class="summary-item-row">
            <span class="item-name">Kode Referral</span>
            <span class="item-value mute-value">{{ orderDetails.referralCode || '-' }}</span>
          </div>

          <div class="summary-item-row">
            <span class="item-name">Nominal Koin</span>
            <strong class="item-value purple-value">{{ formattedCoins }} Koin</strong>
          </div>

          <div class="card-divider"></div>

          <div class="summary-item-row total-item-row">
            <span class="total-text">Total Bayar</span>
            <span class="total-pink-price">Rp {{ formattedTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Pilih Metode Pembayaran -->
      <div class="card-box payment-methods-box">
        <h2 class="card-main-title">Pilih Metode Pembayaran</h2>

        <div class="methods-list">
          <!-- Option 1: QRIS -->
          <div 
            class="method-option qris-option"
            :class="{ selected: selectedMethod === 'qris' }"
            @click="selectedMethod = 'qris'"
          >
            <div class="qris-radio-col">
              <div class="radio-circle" :class="{ active: selectedMethod === 'qris' }">
                <div class="radio-inner-dot" v-if="selectedMethod === 'qris'"></div>
              </div>
            </div>
            <div class="qris-content-col">
              <span class="method-title-bold">QRIS</span>
              <p class="method-description-text">Scan QR dari e-wallet manapun</p>
            </div>
          </div>

          <!-- Option 2: Transfer Bank -->
          <div class="method-option accordion-option" @click="toggleGroup('bank')">
            <div class="accordion-top-row">
              <span class="method-title-bold">Transfer Bank</span>
              <ArrowDown01Icon :size="20" class="chevron-arrow" :class="{ open: openGroup === 'bank' }" />
            </div>

            <div v-if="openGroup === 'bank'" class="bank-sub-list" @click.stop>
              <div 
                v-for="bank in bankOptions" 
                :key="bank.id"
                class="sub-item-row"
                :class="{ active: selectedMethod === bank.id }"
                @click="selectedMethod = bank.id"
              >
                <div class="radio-circle-sm">
                  <div class="radio-inner-dot" v-if="selectedMethod === bank.id"></div>
                </div>
                <span class="sub-item-name">{{ bank.name }}</span>
              </div>
            </div>
          </div>

          <!-- Option 3: E-Wallet -->
          <div class="method-option accordion-option" @click="toggleGroup('ewallet')">
            <div class="accordion-top-row">
              <span class="method-title-bold">E-Wallet</span>
              <ArrowDown01Icon :size="20" class="chevron-arrow" :class="{ open: openGroup === 'ewallet' }" />
            </div>

            <div v-if="openGroup === 'ewallet'" class="bank-sub-list" @click.stop>
              <div 
                v-for="wallet in ewalletOptions" 
                :key="wallet.id"
                class="sub-item-row"
                :class="{ active: selectedMethod === wallet.id }"
                @click="selectedMethod = wallet.id"
              >
                <div class="radio-circle-sm">
                  <div class="radio-inner-dot" v-if="selectedMethod === wallet.id"></div>
                </div>
                <span class="sub-item-name">{{ wallet.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Submit Button -->
      <div class="action-btn-wrapper">
        <button 
          class="btn btn-gradient-submit" 
          :disabled="isProcessing"
          @click="handleConfirmPayment"
        >
          <span v-if="isProcessing">Memproses Pembayaran...</span>
          <span v-else>Bayar Sekarang</span>
        </button>
      </div>

      <!-- Modal QRIS Simulation -->
      <div v-if="showQrisModal" class="modal-backdrop" @click.self="showQrisModal = false">
        <div class="modal-card animate-fade-up">
          <button class="modal-close-btn" @click="showQrisModal = false">&times;</button>
          <div class="modal-pill">PEMBAYARAN QRIS</div>
          <h2>Pembayaran {{ getMethodLabel(selectedMethod) }}</h2>
          <p class="modal-desc">Scan kode QR di bawah menggunakan aplikasi e-wallet / m-banking Anda.</p>

          <div class="qr-box">
            <svg viewBox="0 0 100 100" width="160" height="160" fill="#0f172a">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,0 h20 v10 h-20 z M40,20 h10 v20 h-10 z M60,40 h20 v10 h-20 z M50,60 h30 v20 h-30 z M70,80 h20 v20 h-20 z" />
            </svg>
          </div>

          <div class="modal-total-box">
            <span>Total yang Harus Dibayar:</span>
            <strong class="total-pink-price">Rp {{ formattedTotal }}</strong>
          </div>

          <button class="btn btn-gradient-submit" @click="finishTransaction">
            Saya Sudah Bayar
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="momolive-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <img src="../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-emblem-clean" />
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft01Icon, ArrowDown01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const openGroup = ref(null);
const selectedMethod = ref('qris');
const isProcessing = ref(false);
const showQrisModal = ref(false);

const orderDetails = computed(() => {
  const storeOrder = store.currentOrder;
  if (storeOrder && storeOrder.momocoinId) {
    return storeOrder;
  }
  return {
    momocoinId: '123456789',
    referralCode: '-',
    coinAmount: 1000,
    totalPrice: 100000
  };
});

const bankOptions = [
  { id: 'bca', name: 'BCA Virtual Account' },
  { id: 'mandiri', name: 'Mandiri Virtual Account' },
  { id: 'bni', name: 'BNI Virtual Account' },
  { id: 'bri', name: 'BRI Virtual Account' }
];

const ewalletOptions = [
  { id: 'gopay', name: 'GoPay' },
  { id: 'ovo', name: 'OVO' },
  { id: 'dana', name: 'DANA' },
  { id: 'shopeepay', name: 'ShopeePay' }
];

const formattedCoins = computed(() => {
  const val = Number(orderDetails.value.coinAmount) || 0;
  return val.toLocaleString('id-ID');
});

const formattedTotal = computed(() => {
  const val = Number(orderDetails.value.totalPrice) || 0;
  return val.toLocaleString('id-ID');
});

const toggleGroup = (groupName) => {
  if (openGroup.value === groupName) {
    openGroup.value = null;
  } else {
    openGroup.value = groupName;
  }
};

const goBack = () => {
  router.push('/');
};

const getMethodLabel = (id) => {
  if (id === 'qris') return 'QRIS';
  const b = bankOptions.find((x) => x.id === id);
  if (b) return b.name;
  const e = ewalletOptions.find((x) => x.id === id);
  if (e) return e.name;
  return 'Metode Pembayaran';
};

const handleConfirmPayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      productId: 'momocoin',
      productName: 'Momocoin Top Up',
      denominationId: `momo-${orderDetails.value.coinAmount}`,
      denominationLabel: `${orderDetails.value.coinAmount} Momocoin`,
      targetAccount: orderDetails.value.momocoinId,
      paymentMethodId: selectedMethod.value,
      amount: orderDetails.value.totalPrice
    };

    const res = await store.submitTopupOrder(payload);
    if (res?.success) {
      showQrisModal.value = true;
    }
  } finally {
    isProcessing.value = false;
  }
};

const finishTransaction = () => {
  showQrisModal.value = false;
  store.showToast('Pembayaran berhasil dikonfirmasi!', 'success');
  router.push('/history');
};

const showNotice = (title) => {
  store.showToast(`Halaman ${title}`, 'info');
};
</script>

<style scoped>
.payment-page-wrapper {
  position: relative;
  min-height: calc(100vh - 65px);
  background: #ffffff;
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

.payment-content {
  position: relative;
  z-index: 1;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 3.5rem;
}

/* Header Nav */
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.back-link {
  background: none;
  border: none;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.back-link:hover {
  color: #7c3aed;
  background: #f1f5f9;
}

.back-arrow {
  width: 18px;
  height: 18px;
}

.header-page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.header-right-space {
  width: 80px;
}

/* Cards General */
.card-box {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 1.75rem 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
}

/* Summary Card */
.card-section-label {
  font-size: 0.775rem;
  font-weight: 800;
  color: #6b7280;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.summary-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.item-name {
  color: #4b5563;
}

.item-value.dark-value {
  color: #111827;
  font-weight: 700;
  font-size: 1rem;
}

.item-value.mute-value {
  color: #6b7280;
}

.item-value.purple-value {
  color: #7c3aed;
  font-weight: 700;
  font-size: 1rem;
}

.card-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.4rem 0;
}

.total-item-row {
  font-size: 1.05rem;
  margin-top: 0.2rem;
}

.total-text {
  font-weight: 600;
  color: #111827;
}

.total-pink-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ec4899;
}

/* Payment Methods Card */
.card-main-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.25rem;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.method-option {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

/* QRIS Option Styling */
.qris-option {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  transition: all 0.2s ease;
}

.qris-option.selected {
  background: #ede9fe;
  border: 1px solid #ddd6fe;
  border-left: 4px solid #7c3aed;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  margin-top: 2px;
  transition: border-color 0.2s ease;
}

.radio-circle.active {
  border-color: #7c3aed;
}

.radio-inner-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #7c3aed;
}

.qris-content-col {
  display: flex;
  flex-direction: column;
}

.method-title-bold {
  font-size: 0.975rem;
  font-weight: 700;
  color: #111827;
}

.method-description-text {
  font-size: 0.825rem;
  color: #4b5563;
  line-height: 1.4;
  margin-top: 0.2rem;
}

/* Accordion Options */
.accordion-option {
  background: #ffffff;
  padding: 1.15rem 1.25rem;
}

.accordion-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chevron-arrow {
  width: 20px;
  height: 20px;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.chevron-arrow.open {
  transform: rotate(180deg);
}

.bank-sub-list {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sub-item-row {
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #374151;
  transition: background 0.15s ease;
}

.sub-item-row:hover, .sub-item-row.active {
  background: #f3f4f6;
  color: #7c3aed;
  font-weight: 600;
}

.radio-circle-sm {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-item-row.active .radio-circle-sm {
  border-color: #7c3aed;
}

.action-btn-wrapper {
  margin-top: 1.5rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
}

.modal-pill {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  font-size: 0.75rem;
  font-weight: 800;
  border-radius: 99px;
  margin-bottom: 0.75rem;
}

.modal-desc {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.35rem;
  margin-bottom: 1.5rem;
}

.qr-box {
  background: #ffffff;
  padding: 1rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  display: inline-flex;
  margin-bottom: 1.25rem;
}

.modal-total-box {
  background: #f9fafb;
  padding: 0.85rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.85rem;
  color: #6b7280;
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
  font-size: 1.35rem;
  font-weight: 800;
}

.brand-yay {
  color: #18181b;
}

.brand-topup {
  color: #7c3aed;
}

.footer-emblem-clean {
  height: 32px;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  flex-wrap: wrap;
  justify-content: center;
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
