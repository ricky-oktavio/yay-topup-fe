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
        
        <!-- Header Row: Title & Filter Tabs -->
        <div class="admin-header-row">
          <div class="header-titles">
            <h1 class="page-title">Kelola Affiliate</h1>
            <p class="page-subtitle">Pantau dan kelola jaringan afiliasi YayTopup.</p>
          </div>

          <!-- Filter Pills Box -->
          <div class="filter-pills-box">
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'all' }"
              @click="currentFilter = 'all'"
            >
              Semua
            </button>
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'pending' }"
              @click="currentFilter = 'pending'"
            >
              Pending
            </button>
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'active' }"
              @click="currentFilter = 'active'"
            >
              Active
            </button>
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'inactive' }"
              @click="currentFilter = 'inactive'"
            >
              Inactive
            </button>
          </div>
        </div>

        <!-- Table Card Wrapper -->
        <div class="table-card-wrapper">
          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Kode Referral</th>
                  <th>Komisi Rate</th>
                  <th class="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredAffiliates" :key="item.id" class="table-row">
                  <td class="font-bold text-dark">{{ item.name }}</td>
                  <td class="text-muted">{{ item.email }}</td>
                  <td>
                    <span 
                      class="status-badge"
                      :class="{
                        'badge-pending': item.status === 'pending',
                        'badge-active': item.status === 'active',
                        'badge-inactive': item.status === 'inactive'
                      }"
                    >
                      {{ capitalize(item.status) }}
                    </span>
                  </td>
                  <td>
                    <code v-if="item.referralCode" class="referral-code-badge">{{ item.referralCode }}</code>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td class="font-bold" :class="item.status === 'active' ? 'text-purple' : 'text-dark'">
                    {{ item.commissionRate }}%
                  </td>
                  <td class="text-right">
                    <!-- Pending Action: Approve (Green) & Reject (Red) -->
                    <template v-if="item.status === 'pending'">
                      <button class="btn-approve" @click="approveAffiliate(item)">Approve</button>
                      <button class="btn-reject" @click="rejectAffiliate(item)">Reject</button>
                    </template>

                    <!-- Active Action: Edit Komisi (Opens Modal) -->
                    <template v-else-if="item.status === 'active'">
                      <button class="btn-edit-action" @click="openCommissionModal(item)">
                        Edit Komisi
                      </button>
                    </template>

                    <!-- Inactive Action -->
                    <template v-else>
                      <button class="btn-edit-action" @click="openCommissionModal(item)">
                        Edit Komisi
                      </button>
                    </template>
                  </td>
                </tr>
                <tr v-if="filteredAffiliates.length === 0">
                  <td colspan="6" class="text-center py-5 text-muted">Tidak ada data afiliasi untuk kategori ini.</td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer & Pagination -->
            <div class="table-pagination">
              <span class="pagination-info">
                Menampilkan 1 hingga {{ filteredAffiliates.length }} dari {{ affiliates.length }} afiliasi
              </span>
              <div class="pagination-controls">
                <button class="pag-btn" disabled>Previous</button>
                <button class="pag-btn active">1</button>
                <button class="pag-btn">2</button>
                <button class="pag-btn">3</button>
                <button class="pag-btn">Next</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Modal Kecil: Edit Komisi Rate -->
    <Transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-card modal-small">
          <div class="modal-header">
            <h3 class="modal-title">Edit Komisi Affiliate</h3>
            <button class="modal-close-btn" @click="closeModal">&times;</button>
          </div>

          <form @submit.prevent="saveCommissionRate">
            <div class="modal-body">
              <p class="modal-desc">
                Ubah komisi rate untuk partner <strong class="text-dark">{{ selectedAffiliate?.name }}</strong>.
              </p>

              <div class="form-group margin-top-md">
                <label class="form-label">Commission Rate (%)</label>
                <input 
                  v-model.number="editCommissionRate" 
                  type="number" 
                  min="0"
                  max="100"
                  step="0.5"
                  required
                  class="form-input-styled" 
                  placeholder="e.g. 7"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" @click="closeModal">Batal</button>
              <button type="submit" class="btn btn-solid-purple">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Admin Footer -->
    <footer class="admin-footer">
      <div class="admin-container footer-inner">
        <div class="footer-left">
          <img src="../../assets/logo-yay-clean.png" alt="YayTopup Logo" class="footer-logo-clean" />
        </div>
        <div class="footer-center">
          © 2026 PT. JLIMA DIGITAL INDONESIA. All rights reserved.
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
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

const currentFilter = ref('all');

const affiliates = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', status: 'pending', referralCode: null, commissionRate: 5 },
  { id: 2, name: 'Siti Aminah', email: 'siti@email.com', status: 'active', referralCode: 'SITI2024', commissionRate: 7 },
  { id: 3, name: 'Andi Wijaya', email: 'andi@email.com', status: 'inactive', referralCode: 'ANDI99', commissionRate: 5 }
]);

const filteredAffiliates = computed(() => {
  if (currentFilter.value === 'all') return affiliates.value;
  return affiliates.value.filter(a => a.status === currentFilter.value);
});

// Modal state for Edit Komisi
const showModal = ref(false);
const selectedAffiliate = ref(null);
const editCommissionRate = ref(5);

const approveAffiliate = (item) => {
  item.status = 'active';
  item.referralCode = item.name.substring(0, 4).toUpperCase() + '2026';
  store.showToast(`Afiliasi ${item.name} berhasil disetujui!`, 'success');
};

const rejectAffiliate = (item) => {
  item.status = 'inactive';
  store.showToast(`Afiliasi ${item.name} ditolak.`, 'warning');
};

const openCommissionModal = (item) => {
  selectedAffiliate.value = item;
  editCommissionRate.value = item.commissionRate;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedAffiliate.value = null;
};

const saveCommissionRate = () => {
  if (selectedAffiliate.value) {
    selectedAffiliate.value.commissionRate = Number(editCommissionRate.value);
    store.showToast(`Komisi rate ${selectedAffiliate.value.name} berhasil diubah menjadi ${editCommissionRate.value}%!`, 'success');
  }
  closeModal();
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
  margin-bottom: 2rem;
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

/* Filter Pills Box */
.filter-pills-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 4px;
  border-radius: 12px;
  display: flex;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.pill-btn {
  background: none;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-btn:hover {
  color: #7c3aed;
}

.pill-btn.active {
  background: #7c3aed;
  color: #ffffff;
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

.referral-code-badge {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.775rem;
  font-weight: 700;
  border-radius: 99px;
}

.badge-pending {
  background: #fef08a;
  color: #a16207;
}

.badge-active {
  background: #d1fae5;
  color: #059669;
}

.badge-inactive {
  background: #e2e8f0;
  color: #475569;
}

/* Action Buttons */
.btn-approve {
  background: #10b981;
  color: #ffffff;
  border: none;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 0.4rem;
  transition: background 0.15s ease;
}

.btn-approve:hover {
  background: #059669;
}

.btn-reject {
  background: #dc2626;
  color: #ffffff;
  border: none;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-reject:hover {
  background: #b91c1c;
}

.btn-edit-action {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-edit-action:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
}

/* Modal Small */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card.modal-small {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 1.5rem;
}

.modal-desc {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.35rem;
}

.margin-top-md {
  margin-top: 1rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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
}

.pag-btn.active {
  background: #7c3aed;
  color: #ffffff;
  border-color: #7c3aed;
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

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
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
  .admin-card {
    padding: 1.25rem 0.85rem;
    border-radius: 16px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .filter-pills {
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    padding-bottom: 0.25rem;
  }
  .footer-inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
