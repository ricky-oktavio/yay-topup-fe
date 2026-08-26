<template>
  <div class="topup-page container animate-fade-in">
    <!-- Breadcrumb Nav -->
    <div class="breadcrumb">
      <router-link to="/">Beranda</router-link>
      <span class="sep">/</span>
      <span>Topup {{ product?.name || 'Produk' }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="store.isLoadingProducts || !product" class="loading-state glass-card">
      <p>Memuat data produk...</p>
    </div>

    <!-- Topup Form Layout -->
    <div v-else class="topup-grid">
      <!-- Left Column: Product Info & Steps -->
      <div class="product-sidebar glass-card">
        <div class="sidebar-header">
          <img :src="product.image" :alt="product.name" class="sidebar-img" />
          <div class="sidebar-details">
            <span class="badge badge-primary">{{ product.publisher }}</span>
            <h2>{{ product.name }}</h2>
            <p class="sidebar-hint">Proses Otomatis 24/7</p>
          </div>
        </div>

        <div class="steps-guide">
          <h3>📌 Cara Topup</h3>
          <ol>
            <li>Masukkan {{ product.inputRequirement }}.</li>
            <li>Pilih nominal nominal produk yang diinginkan.</li>
            <li>Pilih metode pembayaran (QRIS / E-Wallet / VA).</li>
            <li>Klik <strong>Bayar Sekarang</strong> & selesaikan pembayaran.</li>
          </ol>
        </div>
      </div>

      <!-- Right Column: Interactive Selection Form -->
      <div class="form-content">
        <!-- Step 1: Input Account ID -->
        <div class="form-step glass-card">
          <div class="step-title">
            <span class="step-num">1</span>
            <h3>Lengkapi Data Akun</h3>
          </div>
          
          <div class="step-body">
            <div class="form-group">
              <label class="form-label">{{ product.inputRequirement }} *</label>
              <input 
                v-model="targetAccount" 
                type="text" 
                class="form-input" 
                :placeholder="`Contoh: 12345678 (2094)`"
              />
              <span class="input-tip">Pastikan ID yang dimasukkan sudah benar.</span>
            </div>
          </div>
        </div>

        <!-- Step 2: Select Denomination -->
        <div class="form-step glass-card">
          <div class="step-title">
            <span class="step-num">2</span>
            <h3>Pilih Nominal Topup</h3>
          </div>

          <div class="step-body">
            <div class="denom-grid">
              <div 
                v-for="denom in product.denominations" 
                :key="denom.id"
                class="denom-card"
                :class="{ active: selectedDenom?.id === denom.id }"
                @click="selectedDenom = denom"
              >
                <div class="denom-header">
                  <span class="denom-label">{{ denom.label }}</span>
                  <span v-if="denom.badge" class="badge badge-success">{{ denom.badge }}</span>
                </div>
                <span class="denom-price">Rp {{ formatNumber(denom.price) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Select Payment Method -->
        <div class="form-step glass-card">
          <div class="step-title">
            <span class="step-num">3</span>
            <h3>Pilih Metode Pembayaran</h3>
          </div>

          <div class="step-body">
            <div class="payment-grid">
              <div 
                v-for="method in store.paymentMethods" 
                :key="method.id"
                class="payment-card"
                :class="{ active: selectedPayment?.id === method.id }"
                @click="selectedPayment = method"
              >
                <div class="payment-icon">{{ method.icon }}</div>
                <div class="payment-info">
                  <span class="payment-name">{{ method.name }}</span>
                  <span class="payment-speed">{{ method.speed }}</span>
                </div>
                <div class="payment-fee">
                  <span v-if="method.fee === 0" class="badge badge-success">Bebas Biaya</span>
                  <span v-else class="fee-text">+Rp {{ formatNumber(method.fee) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Checkout Summary & Submit -->
        <div class="form-step glass-card checkout-box">
          <div class="step-title">
            <span class="step-num">4</span>
            <h3>Ringkasan Transaksi</h3>
          </div>

          <div class="step-body">
            <div class="summary-details">
              <div class="summary-row">
                <span>Produk:</span>
                <strong>{{ product.name }}</strong>
              </div>
              <div class="summary-row">
                <span>Nominal:</span>
                <strong>{{ selectedDenom?.label || '-' }}</strong>
              </div>
              <div class="summary-row">
                <span>Harga Produk:</span>
                <span>Rp {{ formatNumber(selectedDenom?.price || 0) }}</span>
              </div>
              <div class="summary-row">
                <span>Biaya Admin:</span>
                <span>Rp {{ formatNumber(selectedPayment?.fee || 0) }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row total-row">
                <span>Total Pembayaran:</span>
                <span class="total-price">Rp {{ formatNumber(totalAmount) }}</span>
              </div>
            </div>

            <button 
              class="btn btn-primary btn-checkout"
              :disabled="!isFormValid || store.isLoadingCheckout"
              @click="handleCheckout"
            >
              <span v-if="store.isLoadingCheckout" class="btn-spinner">⏳ Memproses ke API...</span>
              <span v-else>🚀 Bayar Sekarang via {{ selectedPayment?.name || 'API' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt / Success Modal -->
    <div v-if="receiptTransaction" class="modal-overlay">
      <div class="modal-card glass-card animate-fade-in">
        <div class="modal-icon">🎉</div>
        <h2>Transaksi Berhasil!</h2>
        <p class="modal-sub">Permintaan top-up telah diproses oleh API server.</p>

        <div class="receipt-box">
          <div class="receipt-row">
            <span>No. Ref:</span>
            <code>{{ receiptTransaction.referenceNo }}</code>
          </div>
          <div class="receipt-row">
            <span>ID Transaksi:</span>
            <strong>{{ receiptTransaction.id }}</strong>
          </div>
          <div class="receipt-row">
            <span>Produk:</span>
            <span>{{ receiptTransaction.productName }}</span>
          </div>
          <div class="receipt-row">
            <span>Akun Tujuan:</span>
            <span>{{ receiptTransaction.targetAccount }}</span>
          </div>
          <div class="receipt-row">
            <span>Nominal:</span>
            <span>{{ receiptTransaction.denominationLabel }}</span>
          </div>
          <div class="receipt-row">
            <span>Total:</span>
            <span class="receipt-amount">Rp {{ formatNumber(receiptTransaction.amount) }}</span>
          </div>
          <div class="receipt-row">
            <span>Status:</span>
            <span class="badge badge-success">BERHASIL (200 OK)</span>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="closeModal">Tutup</button>
          <router-link to="/history" class="btn btn-primary">Lihat Riwayat</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTopupStore } from '../stores/topupStore';

const route = useRoute();
const store = useTopupStore();

const targetAccount = ref('');
const selectedDenom = ref(null);
const selectedPayment = ref(null);
const receiptTransaction = ref(null);

const product = computed(() => store.currentProduct);

onMounted(async () => {
  const pid = route.params.productId;
  await store.fetchProductById(pid);
  await store.fetchPaymentMethods();

  if (product.value?.denominations?.length > 0) {
    selectedDenom.value = product.value.denominations[0];
  }
  if (store.paymentMethods.length > 0) {
    selectedPayment.value = store.paymentMethods[0];
  }
});

watch(() => product.value, (newVal) => {
  if (newVal?.denominations?.length > 0) {
    selectedDenom.value = newVal.denominations[0];
  }
});

const totalAmount = computed(() => {
  const price = selectedDenom.value?.price || 0;
  const fee = selectedPayment.value?.fee || 0;
  return price + fee;
});

const isFormValid = computed(() => {
  return targetAccount.value.trim().length >= 3 && selectedDenom.value && selectedPayment.value;
});

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const handleCheckout = async () => {
  if (!isFormValid.value) return;

  const res = await store.submitCheckout({
    product_id: product.value?.id,
    target_user_id: targetAccount.value,
    affiliate_code: undefined
  });

  if (res?.success && res?.invoice_url) {
    window.location.href = res.invoice_url;
  } else if (res?.success && res?.data) {
    receiptTransaction.value = {
      id: res.data.transaction_id || res.data.id || 'TRX-SUCCESS',
      referenceNo: res.data.duitku_reference || res.data.reference_no || 'REF-OK',
      productName: product.value?.name || 'Topup Coin',
      targetAccount: targetAccount.value,
      denominationLabel: selectedDenom.value?.label || 'Koin',
      amount: totalAmount.value
    };
  }
};

const closeModal = () => {
  receiptTransaction.value = null;
  targetAccount.value = '';
};
</script>

<style scoped>
.topup-page {
  padding-top: 1.5rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.breadcrumb a {
  color: var(--accent-primary);
  text-decoration: none;
}

.topup-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
}

/* Sidebar */
.product-sidebar {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

.sidebar-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.sidebar-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.steps-guide {
  border-top: 1px solid var(--border-color);
  padding-top: 1.25rem;
}

.steps-guide h3 {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.steps-guide ol {
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Form Steps */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-step {
  padding: 1.5rem;
}

.step-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-gradient);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
}

.input-tip {
  font-size: 0.775rem;
  color: var(--text-dim);
}

/* Denominations */
.denom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.denom-card {
  padding: 1rem;
  background: rgba(11, 15, 25, 0.6);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: var(--transition-fast);
}

.denom-card:hover {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.08);
}

.denom-card.active {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.18);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
}

.denom-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.denom-label {
  font-size: 0.9rem;
  font-weight: 700;
}

.denom-price {
  font-size: 1rem;
  font-weight: 800;
  color: var(--accent-secondary);
}

/* Payment Methods */
.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.payment-card {
  padding: 1rem;
  background: rgba(11, 15, 25, 0.6);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: var(--transition-fast);
}

.payment-card:hover, .payment-card.active {
  border-color: var(--accent-secondary);
  background: rgba(16, 185, 129, 0.12);
}

.payment-icon {
  font-size: 1.5rem;
}

.payment-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.payment-name {
  font-size: 0.875rem;
  font-weight: 700;
}

.payment-speed {
  font-size: 0.725rem;
  color: var(--text-dim);
}

.fee-text {
  font-size: 0.775rem;
  color: var(--text-muted);
}

/* Summary Box */
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.925rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
}

.summary-row strong {
  color: var(--text-main);
}

.summary-divider {
  height: 1px;
  background: var(--border-color);
  margin: 0.25rem 0;
}

.total-row {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
}

.total-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent-secondary);
}

.btn-checkout {
  width: 100%;
  padding: 1rem;
  font-size: 1.05rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card {
  max-width: 480px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  border-color: rgba(16, 185, 129, 0.4);
}

.modal-icon {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}

.modal-sub {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.receipt-box {
  background: rgba(11, 15, 25, 0.8);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-align: left;
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
}

.receipt-amount {
  color: var(--accent-secondary);
  font-weight: 800;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions .btn {
  flex: 1;
}

@media (max-width: 850px) {
  .topup-grid {
    grid-template-columns: 1fr;
  }
}
</style>
