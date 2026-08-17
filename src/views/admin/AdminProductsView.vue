<template>
  <div class="admin-page-wrapper">
    <!-- Admin Navbar -->
    <AdminNavbar />

    <!-- Main Content Area -->
    <main class="admin-main-content animate-fade-up">
      <div class="admin-container">
        
        <!-- Header Section: Title & Add Product Button -->
        <div class="admin-header-row">
          <div class="header-titles">
            <h1 class="page-title">Kelola Produk</h1>
            <p class="page-subtitle">Kelola katalog produk, harga dasar, dan harga jual YayTopup.</p>
          </div>

          <button class="btn btn-solid-purple btn-add-product" @click="openAddModal">
            <Add01Icon :size="20" class="btn-icon" />
            <span>Tambah Produk</span>
          </button>
        </div>

        <!-- Filter & Search Bar (Optional / Minimalist) -->
        <div class="table-card-wrapper">
          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Provider Code</th>
                  <th>Harga Dasar</th>
                  <th>Harga Jual</th>
                  <th>Status</th>
                  <th class="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id" class="table-row">
                  <td class="font-bold text-dark">{{ product.name }}</td>
                  <td>
                    <code class="provider-code-badge">{{ product.providerCode }}</code>
                  </td>
                  <td class="text-muted">Rp {{ product.basePrice.toLocaleString('id-ID') }}</td>
                  <td class="font-semibold text-purple">Rp {{ product.sellingPrice.toLocaleString('id-ID') }}</td>
                  <td>
                    <span 
                      class="status-badge"
                      :class="product.status === 'active' ? 'badge-active' : 'badge-inactive'"
                    >
                      {{ product.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="text-right">
                    <button class="btn-edit-action" @click="openEditModal(product)">
                      <Edit01Icon :size="16" class="action-icon" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
                <tr v-if="products.length === 0">
                  <td colspan="6" class="text-center py-5 text-muted">Belum ada produk terdaftar.</td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer & Pagination -->
            <div class="table-pagination">
              <span class="pagination-info">
                Menampilkan 1 hingga {{ products.length }} dari {{ products.length }} produk
              </span>
              <div class="pagination-controls">
                <button class="pag-btn" disabled>Previous</button>
                <button class="pag-btn active">1</button>
                <button class="pag-btn">2</button>
                <button class="pag-btn">Next</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Modal: Tambah Produk -->
    <Transition name="modal-fade">
      <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title">Tambah Produk Baru</h3>
            <button class="modal-close-btn" @click="closeAddModal">&times;</button>
          </div>

          <form @submit.prevent="saveNewProduct">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Nama Produk</label>
                <input 
                  v-model="newProduct.name" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                  placeholder="e.g. 500 Momocoin" 
                />
              </div>

              <div class="form-group margin-top-sm">
                <label class="form-label">Provider Code</label>
                <input 
                  v-model="newProduct.providerCode" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                  placeholder="e.g. MOMO_500" 
                />
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Harga Dasar (Rp)</label>
                  <input 
                    v-model.number="newProduct.basePrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 45000" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Harga Jual (Rp)</label>
                  <input 
                    v-model.number="newProduct.sellingPrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 50000" 
                  />
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" @click="closeAddModal">Batal</button>
              <button type="submit" class="btn btn-solid-purple">Simpan Produk</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal: Edit Produk -->
    <Transition name="modal-fade">
      <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title">Edit Produk</h3>
            <button class="modal-close-btn" @click="closeEditModal">&times;</button>
          </div>

          <form @submit.prevent="saveEditProduct">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Nama Produk</label>
                <input 
                  v-model="editProductForm.name" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                />
              </div>

              <div class="form-group margin-top-sm">
                <label class="form-label">Provider Code</label>
                <input 
                  v-model="editProductForm.providerCode" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                />
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Harga Dasar (Rp)</label>
                  <input 
                    v-model.number="editProductForm.basePrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Harga Jual (Rp)</label>
                  <input 
                    v-model.number="editProductForm.sellingPrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                  />
                </div>
              </div>

              <div class="form-group margin-top-sm">
                <label class="form-label">Status Produk</label>
                <select v-model="editProductForm.status" class="form-input-styled select-styled">
                  <option value="active">Active (Aktif)</option>
                  <option value="inactive">Inactive (Non-Aktif)</option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" @click="closeEditModal">Batal</button>
              <button type="submit" class="btn btn-solid-purple">Simpan Perubahan</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

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
          <a href="#" @click.prevent="showFooterInfo('Support')">Support</a>
          <a href="#" @click.prevent="showFooterInfo('Privacy Policy')">Privacy Policy</a>
          <a href="#" @click.prevent="showFooterInfo('Terms of Service')">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Add01Icon, Edit01Icon } from 'hugeicons-vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

// Initial Mock Product Data
const products = ref([
  { id: 1, name: '100 Momocoin', providerCode: 'MOMO_100', basePrice: 9000, sellingPrice: 10000, status: 'active' },
  { id: 2, name: '500 Momocoin', providerCode: 'MOMO_500', basePrice: 45000, sellingPrice: 50000, status: 'active' },
  { id: 3, name: '1.000 Momocoin', providerCode: 'MOMO_1000', basePrice: 90000, sellingPrice: 100000, status: 'active' },
  { id: 4, name: '5.000 Momocoin', providerCode: 'MOMO_5000', basePrice: 450000, sellingPrice: 500000, status: 'active' },
  { id: 5, name: '10.000 Momocoin', providerCode: 'MOMO_10000', basePrice: 900000, sellingPrice: 1000000, status: 'active' },
  { id: 6, name: 'Mobile Legends 86 Diamonds', providerCode: 'MLBB_86', basePrice: 20000, sellingPrice: 22500, status: 'inactive' }
]);

// Modal States
const showAddModal = ref(false);
const showEditModal = ref(false);

const newProduct = ref({
  name: '',
  providerCode: '',
  basePrice: 0,
  sellingPrice: 0
});

const editProductForm = ref({
  id: null,
  name: '',
  providerCode: '',
  basePrice: 0,
  sellingPrice: 0,
  status: 'active'
});

// Add Modal Handlers
const openAddModal = () => {
  newProduct.value = {
    name: '',
    providerCode: '',
    basePrice: null,
    sellingPrice: null
  };
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const saveNewProduct = () => {
  const newId = products.value.length ? Math.max(...products.value.map(p => p.id)) + 1 : 1;
  products.value.unshift({
    id: newId,
    name: newProduct.value.name,
    providerCode: newProduct.value.providerCode.toUpperCase(),
    basePrice: Number(newProduct.value.basePrice),
    sellingPrice: Number(newProduct.value.sellingPrice),
    status: 'active'
  });

  store.showToast(`Produk "${newProduct.value.name}" berhasil ditambahkan!`, 'success');
  closeAddModal();
};

// Edit Modal Handlers
const openEditModal = (product) => {
  editProductForm.value = {
    id: product.id,
    name: product.name,
    providerCode: product.providerCode,
    basePrice: product.basePrice,
    sellingPrice: product.sellingPrice,
    status: product.status
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveEditProduct = () => {
  const index = products.value.findIndex(p => p.id === editProductForm.value.id);
  if (index !== -1) {
    products.value[index] = {
      id: editProductForm.value.id,
      name: editProductForm.value.name,
      providerCode: editProductForm.value.providerCode.toUpperCase(),
      basePrice: Number(editProductForm.value.basePrice),
      sellingPrice: Number(editProductForm.value.sellingPrice),
      status: editProductForm.value.status
    };
    store.showToast(`Produk "${editProductForm.value.name}" berhasil diperbarui!`, 'success');
  }
  closeEditModal();
};

const showFooterInfo = (title) => {
  store.showToast(`Admin ${title}`, 'info');
};
</script>

<style scoped>
.admin-page-wrapper {
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #1e293b;
}

.admin-main-content {
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

.btn-add-product {
  padding: 0.65rem 1.35rem;
  font-size: 0.925rem;
  font-weight: 600;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  display: inline-block;
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

.provider-code-badge {
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

.badge-active {
  background: #d1fae5;
  color: #059669;
}

.badge-inactive {
  background: #f1f5f9;
  color: #64748b;
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
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.15s ease;
}

.btn-edit-action:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
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

/* Modals */
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
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
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
  font-size: 1.2rem;
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

.modal-close-btn:hover {
  color: #0f172a;
}

.modal-body {
  padding: 1.5rem;
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

.margin-top-sm {
  margin-top: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.col-half {
  flex: 1;
}

.select-styled {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2064748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  appearance: none;
  padding-right: 2.25rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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
</style>
