<template>
  <div class="history-page container animate-fade-in">
    <div class="page-header">
      <div>
        <h1 class="page-title">Riwayat Transaksi</h1>
        <p class="page-desc">Daftar transaksi top up yang telah diproses.</p>
      </div>

      <button class="btn btn-secondary btn-sm" @click="store.fetchTransactionHistory()">
        Refresh Data
      </button>
    </div>

    <!-- Search / Filter Bar -->
    <div class="filter-bar glass-card">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-input search-input" 
          placeholder="Cari No. Referensi, ID Transaksi, atau Layanan..."
        />
      </div>

      <div class="status-filter">
        <button 
          class="filter-chip"
          :class="{ active: statusFilter === 'ALL' }"
          @click="statusFilter = 'ALL'"
        >
          Semua
        </button>
        <button 
          class="filter-chip"
          :class="{ active: statusFilter === 'SUCCESS' }"
          @click="statusFilter = 'SUCCESS'"
        >
          Berhasil
        </button>
        <button 
          class="filter-chip"
          :class="{ active: statusFilter === 'PENDING' }"
          @click="statusFilter = 'PENDING'"
        >
          Pending
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.isLoadingHistory" class="loading-box glass-card">
      <p>Memuat riwayat transaksi...</p>
    </div>

    <!-- History List -->
    <div v-else-if="filteredTransactions.length > 0" class="transaction-list">
      <div 
        v-for="trx in filteredTransactions" 
        :key="trx.id" 
        class="trx-card glass-card"
      >
        <div class="trx-header">
          <div class="trx-meta">
            <span class="trx-id">{{ trx.id }}</span>
            <span class="trx-date">{{ trx.createdAt }}</span>
          </div>

          <span 
            class="badge"
            :class="trx.status === 'SUCCESS' ? 'badge-success' : 'badge-warning'"
          >
            {{ trx.status }}
          </span>
        </div>

        <div class="trx-body">
          <div class="trx-info">
            <h3 class="trx-title">{{ trx.productName }}</h3>
            <p class="trx-denom">{{ trx.denominationLabel }}</p>
            <p class="trx-target">Target: <code>{{ trx.targetAccount }}</code></p>
          </div>

          <div class="trx-pricing">
            <span class="trx-method">{{ trx.paymentMethod }}</span>
            <span class="trx-amount">Rp {{ formatNumber(trx.amount) }}</span>
          </div>
        </div>

        <div class="trx-footer">
          <span class="ref-label">No. Referensi:</span>
          <code class="ref-code">{{ trx.referenceNo }}</code>
          <button class="copy-btn" @click="copyRef(trx.referenceNo)">Salin</button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-box glass-card">
      <h3>Belum ada riwayat transaksi</h3>
      <p>Lakukan transaksi untuk melihat catatan di sini.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTopupStore } from '../stores/topupStore';

const store = useTopupStore();

const searchQuery = ref('');
const statusFilter = ref('ALL');

onMounted(() => {
  store.fetchTransactionHistory();
});

const filteredTransactions = computed(() => {
  let list = store.transactions;

  if (statusFilter.value !== 'ALL') {
    list = list.filter((t) => t.status === statusFilter.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.productName.toLowerCase().includes(q) ||
        t.referenceNo.toLowerCase().includes(q) ||
        t.targetAccount.toLowerCase().includes(q)
    );
  }

  return list;
});

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const copyRef = (refNo) => {
  navigator.clipboard.writeText(refNo);
  store.showToast(`No. Ref '${refNo}' berhasil disalin!`, 'info');
};
</script>

<style scoped>
.history-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 1.8rem;
}

.page-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.filter-bar {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 260px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
}

.search-input {
  padding-left: 2.75rem;
}

.status-filter {
  display: flex;
  gap: 0.5rem;
}

.filter-chip {
  padding: 0.4rem 0.9rem;
  font-size: 0.825rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  cursor: pointer;
}

.filter-chip.active {
  background: var(--accent-primary);
  color: #fff;
  border-color: transparent;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trx-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trx-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.trx-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.trx-id {
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--accent-primary);
}

.trx-date {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.trx-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.trx-title {
  font-size: 1.1rem;
}

.trx-denom {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.trx-target {
  font-size: 0.825rem;
  color: var(--text-dim);
  margin-top: 0.25rem;
}

.trx-pricing {
  text-align: right;
  display: flex;
  flex-direction: column;
}

.trx-method {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.trx-amount {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--accent-secondary);
}

.trx-footer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: var(--text-dim);
  background: rgba(11, 15, 25, 0.5);
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
}

.ref-code {
  color: #a5b4fc;
}

.copy-btn {
  background: none;
  border: none;
  color: var(--accent-primary);
  font-size: 0.775rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
}

.loading-box, .empty-box {
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
}
</style>
