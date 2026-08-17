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
        
        <!-- Header Section: Title & Export CSV Button -->
        <div class="admin-header-row">
          <div class="header-titles">
            <h1 class="page-title">Kelola Penarikan</h1>
            <p class="page-subtitle">Manage affiliate withdrawal requests.</p>
          </div>

          <button class="btn btn-outline btn-export" @click="exportCSV">
            <Download01Icon :size="18" class="btn-icon" />
            <span>Export CSV</span>
          </button>
        </div>

        <!-- Filter Tabs Line -->
        <div class="filter-tabs-line">
          <button 
            class="tab-link" 
            :class="{ active: currentTab === 'all' }"
            @click="currentTab = 'all'"
          >
            Semua
          </button>
          <button 
            class="tab-link" 
            :class="{ active: currentTab === 'pending' }"
            @click="currentTab = 'pending'"
          >
            Pending
          </button>
          <button 
            class="tab-link" 
            :class="{ active: currentTab === 'approved' }"
            @click="currentTab = 'approved'"
          >
            Approved
          </button>
          <button 
            class="tab-link" 
            :class="{ active: currentTab === 'paid' }"
            @click="currentTab = 'paid'"
          >
            Paid
          </button>
          <button 
            class="tab-link" 
            :class="{ active: currentTab === 'failed' }"
            @click="currentTab = 'failed'"
          >
            Failed
          </button>
        </div>

        <!-- Table Card Wrapper -->
        <div class="table-card-wrapper margin-top-md">
          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Affiliate</th>
                  <th>Jumlah</th>
                  <th>Bank / Wallet</th>
                  <th>No Rekening</th>
                  <th>Status</th>
                  <th class="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredWithdrawals" :key="item.id" class="table-row">
                  <td class="text-muted">{{ item.date }}</td>
                  <td class="font-bold text-dark">{{ item.affiliateName }}</td>
                  <td class="font-bold text-purple">Rp {{ item.amount.toLocaleString('id-ID') }}</td>
                  <td class="font-semibold text-dark">{{ item.bank }}</td>
                  <td class="font-mono text-muted">{{ item.accountNumber }}</td>
                  <td>
                    <span 
                      class="status-badge"
                      :class="`badge-${item.status}`"
                    >
                      {{ capitalize(item.status) }}
                    </span>
                  </td>
                  <td class="text-right">
                    <!-- Pending Status Action -->
                    <button 
                      v-if="item.status === 'pending'"
                      class="btn-approve-green" 
                      :disabled="item.isProcessing"
                      @click="approveWithdrawal(item)"
                    >
                      <span v-if="item.isProcessing">Processing...</span>
                      <span v-else>Approve</span>
                    </button>

                    <!-- Approved Status Action -->
                    <button 
                      v-else-if="item.status === 'approved'"
                      class="btn-icon-action"
                      title="Lihat Detail Transaksi Xendit"
                      @click="showDetail(item)"
                    >
                      ⋮
                    </button>

                    <!-- Paid Status Action -->
                    <button 
                      v-else-if="item.status === 'paid'"
                      class="btn-icon-action"
                      title="Lihat Resi Pembayaran"
                      @click="showDetail(item)"
                    >
                      <File01Icon :size="16" />
                    </button>

                    <!-- Failed Status Action -->
                    <button 
                      v-else-if="item.status === 'failed'"
                      class="btn-icon-action"
                      title="Lihat Detail Kegagalan"
                      @click="showDetail(item)"
                    >
                      <InformationCircleIcon :size="16" />
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredWithdrawals.length === 0">
                  <td colspan="7" class="text-center py-5 text-muted">Tidak ada data penarikan untuk kategori ini.</td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer & Pagination -->
            <div class="table-pagination">
              <span class="pagination-info">
                Showing 1 to {{ filteredWithdrawals.length }} of 24 entries
              </span>
              <div class="pagination-controls">
                <button class="pag-btn" disabled>&lt;</button>
                <button class="pag-btn active">1</button>
                <button class="pag-btn">2</button>
                <button class="pag-btn">3</button>
                <span class="pag-ellipsis">...</span>
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
        <div class="footer-left">
          <img src="../../assets/logo_concept_2.png" alt="YayTopup Logo" class="footer-logo-clean" />
        </div>
        <div class="footer-center">
          © 2026 YayTopup Admin. All rights reserved.
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
import { ref, computed } from 'vue';
import { Download01Icon, File01Icon, InformationCircleIcon } from 'hugeicons-vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

const currentTab = ref('all');

const withdrawals = ref([
  { id: 1, date: '24 Oct 2023, 10:45', affiliateName: 'Budi Santoso', amount: 500000, bank: 'BCA', accountNumber: '8739182390', status: 'pending', isProcessing: false },
  { id: 2, date: '23 Oct 2023, 14:20', affiliateName: 'Siti Aminah', amount: 1200000, bank: 'Mandiri', accountNumber: '123456789012', status: 'approved', isProcessing: false },
  { id: 3, date: '22 Oct 2023, 09:15', affiliateName: 'Ahmad Reza', amount: 350000, bank: 'GoPay', accountNumber: '081234567890', status: 'paid', isProcessing: false },
  { id: 4, date: '21 Oct 2023, 16:30', affiliateName: 'Dewi Lestari', amount: 750000, bank: 'OVO', accountNumber: '089876543210', status: 'failed', isProcessing: false },
  { id: 5, date: '24 Oct 2023, 11:05', affiliateName: 'Joko Widodo', amount: 2500000, bank: 'BNI', accountNumber: '0987654321', status: 'pending', isProcessing: false }
]);

const filteredWithdrawals = computed(() => {
  if (currentTab.value === 'all') return withdrawals.value;
  return withdrawals.value.filter(w => w.status === currentTab.value);
});

const approveWithdrawal = (item) => {
  item.isProcessing = true;

  setTimeout(() => {
    item.isProcessing = false;
    item.status = 'approved';
    store.showToast(`Withdrawal Rp ${item.amount.toLocaleString('id-ID')} untuk ${item.affiliateName} disetujui & diproses via Xendit Payout!`, 'success');
  }, 700);
};

const showDetail = (item) => {
  store.showToast(`Status: ${capitalize(item.status)} — Transfer Rp ${item.amount.toLocaleString('id-ID')} (${item.bank} - ${item.accountNumber})`, 'info');
};

const exportCSV = () => {
  store.showToast('Mengekspor data penarikan ke CSV...', 'info');
};

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  align-items: center;
  margin-bottom: 1.5rem;
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

.btn-export {
  padding: 0.55rem 1.15rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-export:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
}

/* Filter Tabs Line */
.filter-tabs-line {
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.tab-link {
  background: none;
  border: none;
  padding: 0.75rem 0.25rem;
  font-size: 0.925rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}

.tab-link:hover {
  color: #7c3aed;
}

.tab-link.active {
  color: #7c3aed;
  border-bottom-color: #7c3aed;
}

.margin-top-md {
  margin-top: 1rem;
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
  padding: 1.1rem 1.25rem;
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

.text-right {
  text-align: right;
}

/* Strictly Specified Status Badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.775rem;
  font-weight: 700;
  border-radius: 99px;
}

/* pending = kuning */
.badge-pending {
  background: #fef08a;
  color: #a16207;
}

/* approved = biru */
.badge-approved {
  background: #e0f2fe;
  color: #0284c7;
}

/* paid = hijau */
.badge-paid {
  background: #d1fae5;
  color: #059669;
}

/* failed = merah */
.badge-failed {
  background: #fee2e2;
  color: #dc2626;
}

/* Action Buttons */
.btn-approve-green {
  background: #10b981;
  color: #ffffff;
  border: none;
  padding: 0.45rem 1.15rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-approve-green:hover:not(:disabled) {
  background: #059669;
}

.btn-approve-green:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon-action {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  font-size: 1.1rem;
  transition: all 0.15s ease;
}

.btn-icon-action:hover {
  background: #f1f5f9;
  color: #0f172a;
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

.footer-logo-clean {
  height: 28px;
  width: auto;
  object-fit: contain;
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
