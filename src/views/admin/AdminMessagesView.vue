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
            <h1 class="page-title">Pesan & Dukungan</h1>
            <p class="page-subtitle">Kelola pesan kontak dan kendala dari pelanggan & calon partner.</p>
          </div>

          <!-- Filter Pills Box -->
          <div class="filter-pills-box">
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'all' }"
              @click="setFilter('all')"
            >
              Semua
            </button>
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'open' }"
              @click="setFilter('open')"
            >
              Terbuka (Open)
            </button>
            <button 
              class="pill-btn" 
              :class="{ active: currentFilter === 'resolved' }"
              @click="setFilter('resolved')"
            >
              Selesai (Resolved)
            </button>
          </div>
        </div>

        <!-- Table Card Wrapper -->
        <div class="table-card-wrapper">
          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Pengirim</th>
                  <th>Pesan / Kendala</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th class="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="msg in messages" :key="msg.id" class="table-row">
                  <td>
                    <div class="sender-info">
                      <span class="font-bold text-dark">{{ msg.name }}</span>
                      <span class="text-sub font-mono">{{ msg.email }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="message-body-box">
                      <p class="message-text">{{ msg.message }}</p>
                    </div>
                  </td>
                  <td>
                    <span class="text-muted font-mono">{{ formatDate(msg.createdAt) }}</span>
                  </td>
                  <td>
                    <span 
                      class="status-badge"
                      :class="msg.status === 'resolved' ? 'badge-resolved' : 'badge-open'"
                    >
                      {{ msg.status === 'resolved' ? 'Resolved' : 'Open' }}
                    </span>
                  </td>
                  <td class="text-right">
                    <div class="action-buttons-group">
                      <button 
                        v-if="msg.status !== 'resolved'"
                        class="btn-resolve-action"
                        @click="handleResolveMessage(msg)"
                        title="Tandai Selesai"
                      >
                        <Tick01Icon :size="16" />
                        <span>Resolve</span>
                      </button>
                      <button 
                        class="btn-delete-action"
                        @click="openDeleteModal(msg)"
                        title="Hapus Pesan"
                      >
                        <Delete02Icon :size="16" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="messages.length === 0">
                  <td colspan="5" class="text-center py-5 text-muted">
                    {{ isLoading ? 'Memuat pesan...' : 'Belum ada pesan kontak.' }}
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer & Pagination -->
            <div class="table-pagination">
              <span class="pagination-info">
                Menampilkan {{ messages.length }} pesan
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Modal: Konfirmasi Hapus Pesan -->
    <Transition name="modal-fade">
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
        <div class="modal-card delete-confirm-card">
          <div class="delete-modal-header">
            <div class="danger-icon-wrapper">
              <Delete02Icon :size="28" class="danger-icon" />
            </div>
            <h3 class="delete-modal-title">Hapus Pesan Kontak</h3>
            <p class="delete-modal-subtitle">Apakah Anda yakin ingin menghapus pesan kontak ini?</p>
          </div>

          <div class="delete-modal-body" v-if="messageToDelete">
            <div class="delete-info-box">
              <div class="delete-info-row">
                <span class="info-label">Pengirim:</span>
                <strong class="info-val text-dark">{{ messageToDelete.name }}</strong>
              </div>
              <div class="delete-info-row">
                <span class="info-label">Email:</span>
                <code class="info-val code-val">{{ messageToDelete.email }}</code>
              </div>
              <div class="delete-info-row message-preview-row">
                <span class="info-label">Isi Pesan:</span>
                <p class="info-message-preview">"{{ messageToDelete.message }}"</p>
              </div>
            </div>
          </div>

          <div class="delete-modal-footer">
            <button type="button" class="btn btn-outline" @click="closeDeleteModal" :disabled="isDeleting">
              Batal
            </button>
            <button type="button" class="btn btn-danger-gradient" @click="confirmDeleteMessage" :disabled="isDeleting">
              <span v-if="isDeleting">Menghapus...</span>
              <span v-else class="btn-flex-inner">
                <Delete02Icon :size="16" />
                Ya, Hapus Pesan
              </span>
            </button>
          </div>
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
import { ref, onMounted } from 'vue';
import { Tick01Icon, Delete02Icon } from 'hugeicons-vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';
import { adminService } from '../../api/adminService';

const store = useTopupStore();

const messages = ref([]);
const isLoading = ref(false);
const currentFilter = ref('all');

const loadMessages = async () => {
  isLoading.value = true;
  try {
    const params = {};
    if (currentFilter.value !== 'all') {
      params.status = currentFilter.value;
    }
    const res = await adminService.getContactMessages(params);
    const list = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.data) 
          ? res.data 
          : (Array.isArray(res?.data?.messages) 
              ? res.data.messages 
              : (Array.isArray(res?.data?.data) ? res.data.data : [])));

    messages.value = list.map(m => ({
      id: m.id,
      name: m.name || 'Pelanggan',
      email: m.email || '',
      message: m.message || '',
      status: m.status || 'open',
      createdAt: m.createdAt || m.created_at || new Date().toISOString()
    }));
  } catch (err) {
    store.showToast(err.message || 'Gagal memuat pesan kontak.', 'error');
    messages.value = [];
  } finally {
    isLoading.value = false;
  }
};

const setFilter = (filter) => {
  currentFilter.value = filter;
  loadMessages();
};

const handleResolveMessage = async (msg) => {
  try {
    const res = await adminService.resolveContactMessage(msg.id);
    if (res?.success || res?.data) {
      store.showToast(`Pesan dari "${msg.name}" berhasil ditandai selesai.`, 'success');
    } else {
      store.showToast(`Pesan dari "${msg.name}" ditandai selesai.`, 'success');
    }
    await loadMessages();
  } catch (err) {
    store.showToast(err.response?.data?.message || err.message || 'Gagal mengubah status pesan.', 'error');
  }
};

// Delete Modal Handlers
const showDeleteModal = ref(false);
const messageToDelete = ref(null);
const isDeleting = ref(false);

const openDeleteModal = (msg) => {
  messageToDelete.value = msg;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  messageToDelete.value = null;
};

const confirmDeleteMessage = async () => {
  if (!messageToDelete.value) return;

  isDeleting.value = true;
  try {
    const res = await adminService.deleteContactMessage(messageToDelete.value.id);
    if (res?.success || res?.data) {
      store.showToast(`Pesan dari "${messageToDelete.value.name}" berhasil dihapus.`, 'success');
    } else {
      store.showToast(`Pesan dari "${messageToDelete.value.name}" berhasil dihapus.`, 'success');
    }
    await loadMessages();
    closeDeleteModal();
  } catch (err) {
    store.showToast(err.response?.data?.message || err.message || 'Gagal menghapus pesan.', 'error');
  } finally {
    isDeleting.value = false;
  }
};

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

onMounted(() => {
  loadMessages();
});
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

/* Filter Pills */
.filter-pills-box {
  display: flex;
  gap: 0.35rem;
  background: #ffffff;
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.pill-btn {
  background: transparent;
  border: none;
  padding: 0.4rem 0.85rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: #64748b;
  border-radius: 8px;
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

.sender-info {
  display: flex;
  flex-direction: column;
}

.font-bold {
  font-weight: 700;
}

.text-dark {
  color: #0f172a;
}

.text-sub {
  font-size: 0.8rem;
  color: #64748b;
}

.font-mono {
  font-family: monospace;
}

.message-body-box {
  max-width: 380px;
}

.message-text {
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.45;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.text-muted {
  color: #64748b;
}

.text-right {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.775rem;
  font-weight: 700;
  border-radius: 99px;
}

.badge-open {
  background: #fef3c7;
  color: #d97706;
}

.badge-resolved {
  background: #d1fae5;
  color: #059669;
}

.action-buttons-group {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-resolve-action {
  background: #ffffff;
  border: 1px solid #d1fae5;
  color: #059669;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;
}

.btn-resolve-action:hover {
  background: #ecfdf5;
  border-color: #059669;
}

.btn-delete-action {
  background: #ffffff;
  border: 1px solid #fee2e2;
  color: #ef4444;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;
}

.btn-delete-action:hover {
  background: #fef2f2;
  border-color: #ef4444;
  color: #dc2626;
}

/* Modal Overlay & Delete Card Styling */
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

.modal-card {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 25px 50px -12px rgba(225, 29, 72, 0.25);
  overflow: hidden;
}

.delete-confirm-card {
  text-align: center;
}

.delete-modal-header {
  padding: 2rem 1.75rem 1rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.danger-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffe4e6;
  color: #e11d48;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px rgba(225, 29, 72, 0.2);
}

.delete-modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
}

.delete-modal-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.35rem;
}

.delete-modal-body {
  padding: 0 1.75rem 1.5rem 1.75rem;
}

.delete-info-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.delete-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.delete-info-row .info-label {
  color: #64748b;
  font-weight: 500;
}

.delete-info-row .code-val {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.message-preview-row {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.info-message-preview {
  font-size: 0.825rem;
  color: #334155;
  font-style: italic;
  margin: 0;
  word-break: break-word;
}

.delete-modal-footer {
  padding: 1.25rem 1.75rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.delete-modal-footer button {
  flex: 1;
}

.btn-danger-gradient {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: #ffffff;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);
  transition: all 0.2s ease;
}

.btn-danger-gradient:hover:not(:disabled) {
  background: linear-gradient(135deg, #be123c 0%, #9f1239 100%);
  transform: translateY(-1px);
}

.btn-flex-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.table-pagination {
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #64748b;
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
  .footer-inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
