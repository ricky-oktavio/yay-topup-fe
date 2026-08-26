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
        
        <!-- Header Section: Title & Search/Filter Controls -->
        <div class="admin-header-row">
          <div class="header-titles">
            <h1 class="page-title">Monitor Transaksi</h1>
            <p class="page-subtitle">Pantau seluruh aktivitas top-up dan transaksi secara real-time.</p>
          </div>

          <div class="header-search-filter">
            <div class="search-input-box">
              <Search01Icon :size="18" class="search-icon" />
              <input 
                v-model="searchQuery" 
                type="text" 
                class="search-input" 
                placeholder="Cari ID / User..." 
              />
            </div>
            
            <button class="btn btn-outline btn-filter" @click="toggleFilter">
              <FilterIcon :size="18" class="btn-icon" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <!-- Table Card Wrapper -->
        <div class="table-card-wrapper">
          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tanggal</th>
                  <th>Produk</th>
                  <th>Target User</th>
                  <th>Jumlah</th>
                  <th>Referral Code</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredTransactions" :key="item.id" class="table-row">
                  <td class="font-bold text-muted">{{ item.id }}</td>
                  <td class="text-dark">{{ item.date }}</td>
                  <td>
                    <div class="product-cell flex-center-left">
                      <span class="product-icon-badge">
                        <GameController01Icon :size="16" />
                      </span>
                      <span class="font-semibold text-dark">{{ item.product }}</span>
                    </div>
                  </td>
                  <td class="font-mono text-dark">{{ item.targetUser }}</td>
                  <td class="font-bold text-purple">Rp {{ item.amount.toLocaleString('id-ID') }}</td>
                  <td>
                    <code v-if="item.referralCode && item.referralCode !== '-'" class="ref-code-badge">{{ item.referralCode }}</code>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                    <span 
                      class="status-badge-dot"
                      :class="`badge-${item.status.toLowerCase()}`"
                    >
                      <span class="badge-dot"></span>
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
                <tr v-if="filteredTransactions.length === 0">
                  <td colspan="7" class="text-center py-5 text-muted">Tidak ada transaksi ditemukan.</td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer & Pagination -->
            <div class="table-pagination">
              <span class="pagination-info">
                Menampilkan 1-{{ filteredTransactions.length }} dari 124 transaksi
              </span>
              <div class="pagination-controls">
                <button class="pag-btn" disabled>&lt;</button>
                <button class="pag-btn active">1</button>
                <button class="pag-btn">2</button>
                <button class="pag-btn">3</button>
                <span class="pag-ellipsis">...</span>
                <button class="pag-btn">25</button>
                <button class="pag-btn">&gt;</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Admin Footer -->
    <footer class="admin-footer">
      <div class="admin-container footer-inner">
        <div class="footer-left font-bold text-dark">
           
        </div>
        <div class="footer-right">
          <router-link to="/contact">Support</router-link>
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/terms">Terms of Service</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search01Icon, FilterIcon, GameController01Icon } from 'hugeicons-vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';
import { adminService } from '../../api/adminService';

const store = useTopupStore();

const searchQuery = ref('');
const transactions = ref([]);
const isLoading = ref(false);

const formatDate = (isoString) => {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\./g, ':') + ' WIB';
  } catch (e) {
    return isoString;
  }
};

const loadTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await adminService.getTransactions();
    const list = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.data) 
          ? res.data 
          : (Array.isArray(res?.data?.transactions) 
              ? res.data.transactions 
              : (Array.isArray(res?.data?.data) ? res.data.data : [])));

    transactions.value = list.map(t => ({
      id: t.id ? `#${t.id}` : (t.transaction_id ? `#${t.transaction_id}` : '#TRX'),
      date: formatDate(t.created_at || t.date || t.createdAt),
      product: t.product_name || t.product || 'Momo Live Coin',
      targetUser: t.target_user_id || t.targetUser || '-',
      amount: Number(t.gross_amount || t.amount || 0),
      referralCode: t.affiliate_code || t.referralCode || '-',
      status: t.payment_status || t.status || 'Paid'
    }));
  } catch (err) {
    store.showToast(err.message || 'Gagal memuat transaksi', 'error');
    transactions.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadTransactions();
});

const filteredTransactions = computed(() => {
  if (!searchQuery.value.trim()) return transactions.value;
  const q = searchQuery.value.trim().toLowerCase();
  return transactions.value.filter(
    t => t.id.toLowerCase().includes(q) ||
         t.targetUser.toLowerCase().includes(q) ||
         t.product.toLowerCase().includes(q) ||
         (t.referralCode && t.referralCode.toLowerCase().includes(q))
  );
});

const toggleFilter = () => {
  loadTransactions();
  store.showToast('Filter pencarian transaksi diterapkan.', 'info');
};

const showFooterInfo = (title) => {
  store.showToast(`Admin ${title}`, 'info');
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
  padding: 2.5rem 0 4rem 0;
}

.admin-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header Row */
.admin-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  gap: 1.5rem;

}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.header-search-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  padding: 0.55rem 0.85rem 0.55rem 2.4rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  font-size: 0.875rem;
  color: #0f172a;
  width: 210px;
  outline: none;
  transition: all 0.15s ease;
}

.search-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.btn-filter {
  padding: 0.55rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-filter:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
}

/* Table Card Wrapper */
.table-card-wrapper {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.925rem;
}

.admin-table th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 700;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.825rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.admin-table td {
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.table-row {
  transition: background 0.15s ease;
}

.table-row:hover {
  background: #f8fafc;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-mono {
  font-family: monospace;
}

.text-dark {
  color: #0f172a;
}

.text-muted {
  color: #64748b;
}

.text-purple {
  color: #7c3aed;
}

.flex-center-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ede9fe;
  color: #7c3aed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ref-code-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.825rem;
  font-weight: 600;
}

/* Status Badges with Dots */
.status-badge-dot {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.775rem;
  font-weight: 700;
  border-radius: 99px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

/* Paid = Green */
.badge-paid {
  background: #d1fae5;
  color: #059669;
}
.badge-paid .badge-dot {
  background: #059669;
}

/* Pending = Yellow/Orange */
.badge-pending {
  background: #fef3c7;
  color: #d97706;
}
.badge-pending .badge-dot {
  background: #d97706;
}

/* Processing = Blue */
.badge-processing {
  background: #e0f2fe;
  color: #0284c7;
}
.badge-processing .badge-dot {
  background: #0284c7;
}

/* Failed = Red */
.badge-failed {
  background: #fee2e2;
  color: #dc2626;
}
.badge-failed .badge-dot {
  background: #dc2626;
}

/* Pagination */
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #64748b;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pag-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #475569;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
}

.pag-btn:hover:not(:disabled) {
  border-color: #7c3aed;
  color: #7c3aed;
}

.pag-btn.active {
  background: #7c3aed;
  color: #ffffff;
  border-color: #7c3aed;
}

.pag-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pag-ellipsis {
  color: #94a3b8;
  padding: 0 0.25rem;
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

@media (max-width: 640px) {
  .admin-container {
    padding: 0 1rem;
  }
  .admin-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }
  .page-title {
    font-size: 1.75rem;
  }
  .filter-search-wrapper {
    flex-direction: column;
    gap: 0.75rem;
  }
  .status-filters {
    overflow-x: auto;
    width: 100%;
    padding-bottom: 0.25rem;
  }
  .table-card-wrapper {
    border-radius: 12px;
  }
  .footer-inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
