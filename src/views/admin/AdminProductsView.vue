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
                  <th>Jumlah Koin</th>
                  <th>Harga Dasar</th>
                  <th>Harga Jual</th>
                  <th>Status</th>
                  <th class="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id" class="table-row">
                  <td>
                    <div class="product-name-col">
                      <span class="font-bold text-dark">{{ product.name }}</span>
                      <span v-if="product.flag" class="product-flag-badge">{{ product.flag }}</span>
                    </div>
                  </td>
                  <td>
                    <code class="provider-code-badge">{{ product.providerCode }}</code>
                  </td>
                  <td>
                    <div class="coin-col">
                      <span class="font-semibold text-dark">{{ Number(product.coinAmount || 0).toLocaleString('id-ID') }} Koin</span>
                      <span v-if="product.bonusCoin > 0" class="text-bonus">+{{ Number(product.bonusCoin).toLocaleString('id-ID') }} Bonus</span>
                    </div>
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
                    <div class="action-buttons-group">
                      <button class="btn-edit-action" @click="openEditModal(product)">
                        <Edit01Icon :size="16" class="action-icon" />
                        <span>Edit</span>
                      </button>
                      <button class="btn-delete-action" @click="openDeleteModal(product)">
                        <Delete02Icon :size="16" class="action-icon" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="products.length === 0">
                  <td colspan="7" class="text-center py-5 text-muted">Belum ada produk terdaftar.</td>
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
                <label class="form-label">Nama Produk <span class="text-danger">*</span></label>
                <input 
                  v-model="newProduct.name" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                  placeholder="e.g. Momo Live 500.000 Koin (+5.000 Bonus)" 
                />
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Provider Code <span class="text-danger">*</span></label>
                  <input 
                    v-model="newProduct.providerCode" 
                    type="text" 
                    required 
                    class="form-input-styled" 
                    placeholder="e.g. MOMO_500K" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Flag / Badge (Opsional)</label>
                  <select v-model="newProduct.flagType" class="form-input-styled select-styled" @change="handleNewFlagTypeChange">
                    <option value="">-- Tanpa Flag --</option>
                    <option value="Terlaris">Terlaris</option>
                    <option value="Populer">Populer</option>
                    <option value="Promo">Promo</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Hot Deals">Hot Deals</option>
                    <option value="custom">Kustom (Tulis Sendiri)...</option>
                  </select>
                  <input 
                    v-if="newProduct.flagType === 'custom'"
                    v-model="newProduct.customFlag" 
                    type="text" 
                    class="form-input-styled margin-top-xs" 
                    placeholder="Tulis label flag custom..." 
                  />
                </div>
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Jumlah Koin Utama <span class="text-danger">*</span></label>
                  <input 
                    v-model.number="newProduct.coinAmount" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 500000" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Bonus Koin (Opsional)</label>
                  <input 
                    v-model.number="newProduct.bonusCoin" 
                    type="number" 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 5000" 
                  />
                </div>
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Harga Dasar (Rp) <span class="text-danger">*</span></label>
                  <input 
                    v-model.number="newProduct.basePrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 450000" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Harga Jual (Rp) <span class="text-danger">*</span></label>
                  <input 
                    v-model.number="newProduct.sellingPrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                    placeholder="e.g. 500000" 
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
                <label class="form-label">Nama Produk <span class="text-danger">*</span></label>
                <input 
                  v-model="editProductForm.name" 
                  type="text" 
                  required 
                  class="form-input-styled" 
                />
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Provider Code <span class="text-danger">*</span></label>
                  <input 
                    v-model="editProductForm.providerCode" 
                    type="text" 
                    required 
                    class="form-input-styled" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Flag / Badge (Opsional)</label>
                  <select v-model="editProductForm.flagType" class="form-input-styled select-styled" @change="handleEditFlagTypeChange">
                    <option value="">-- Tanpa Flag --</option>
                    <option value="Terlaris">Terlaris</option>
                    <option value="Populer">Populer</option>
                    <option value="Promo">Promo</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Hot Deals">Hot Deals</option>
                    <option value="custom">Kustom (Tulis Sendiri)...</option>
                  </select>
                  <input 
                    v-if="editProductForm.flagType === 'custom'"
                    v-model="editProductForm.customFlag" 
                    type="text" 
                    class="form-input-styled margin-top-xs" 
                    placeholder="Tulis label flag custom..." 
                  />
                </div>
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Jumlah Koin Utama <span class="text-danger">*</span></label>
                  <input 
                    v-model.number="editProductForm.coinAmount" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Bonus Koin (Opsional)</label>
                  <input 
                    v-model.number="editProductForm.bonusCoin" 
                    type="number" 
                    min="0"
                    class="form-input-styled" 
                  />
                </div>
              </div>

              <div class="form-row margin-top-sm">
                <div class="form-group col-half">
                  <label class="form-label">Harga Dasar (Rp) <span class="text-danger">*</span></label>
                  <input 
                    v-model.number="editProductForm.basePrice" 
                    type="number" 
                    required 
                    min="0"
                    class="form-input-styled" 
                  />
                </div>

                <div class="form-group col-half">
                  <label class="form-label">Harga Jual (Rp) <span class="text-danger">*</span></label>
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

    <!-- Modal: Konfirmasi Hapus Produk -->
    <Transition name="modal-fade">
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
        <div class="modal-card delete-confirm-card">
          <div class="delete-modal-header">
            <div class="danger-icon-wrapper">
              <Delete02Icon :size="28" class="danger-icon" />
            </div>
            <h3 class="delete-modal-title">Hapus Produk</h3>
            <p class="delete-modal-subtitle">Apakah Anda yakin ingin menghapus produk ini dari katalog?</p>
          </div>

          <div class="delete-modal-body" v-if="productToDelete">
            <div class="delete-info-box">
              <div class="delete-info-row">
                <span class="info-label">Nama Produk:</span>
                <strong class="info-val text-dark">{{ productToDelete.name }}</strong>
              </div>
              <div class="delete-info-row">
                <span class="info-label">Provider Code:</span>
                <code class="info-val code-val">{{ productToDelete.providerCode }}</code>
              </div>
              <div class="delete-info-row">
                <span class="info-label">Harga Jual:</span>
                <strong class="info-val text-purple">Rp {{ productToDelete.sellingPrice.toLocaleString('id-ID') }}</strong>
              </div>
            </div>
            <p class="delete-warning-note">⚠️ Produk yang dihapus akan disembunyikan dari daftar katalog top-up pelanggan.</p>
          </div>

          <div class="delete-modal-footer">
            <button type="button" class="btn btn-outline" @click="closeDeleteModal" :disabled="isDeleting">
              Batal
            </button>
            <button type="button" class="btn btn-danger-gradient" @click="confirmDeleteProduct" :disabled="isDeleting">
              <span v-if="isDeleting">Menghapus...</span>
              <span v-else class="btn-flex-inner">
                <Delete02Icon :size="16" />
                Ya, Hapus Produk
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
import { ref, onMounted } from 'vue';
import { Add01Icon, Edit01Icon, Delete02Icon } from 'hugeicons-vue';
import AdminNavbar from '../../components/layout/AdminNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';
import { adminService } from '../../api/adminService';

const store = useTopupStore();

const products = ref([]);
const isLoading = ref(false);

const PRESET_FLAGS = ['Terlaris', 'Populer', 'Promo', 'Best Seller', 'Hot Deals'];

const loadProducts = async () => {
  isLoading.value = true;
  try {
    const res = await adminService.getProducts();
    const list = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.data) 
          ? res.data 
          : (Array.isArray(res?.data?.products) 
              ? res.data.products 
              : (Array.isArray(res?.data?.data) ? res.data.data : [])));

    products.value = list.map(p => ({
      id: p.id,
      name: p.name,
      providerCode: p.provider_code || p.providerCode || '',
      basePrice: Number(p.base_price || p.basePrice || 0),
      sellingPrice: Number(p.selling_price || p.sellingPrice || 0),
      coinAmount: Number(p.coin_amount || p.coinAmount || 0),
      bonusCoin: Number(p.bonus_coin || p.bonusCoin || 0),
      flag: p.flag || '',
      status: p.status || 'active'
    }));
  } catch (err) {
    store.showToast(err.message || 'Gagal memuat produk dari server', 'error');
    products.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadProducts();
});

// Modal States
const showAddModal = ref(false);
const showEditModal = ref(false);

const newProduct = ref({
  name: '',
  providerCode: '',
  basePrice: null,
  sellingPrice: null,
  coinAmount: null,
  bonusCoin: 0,
  flagType: '',
  customFlag: ''
});

const editProductForm = ref({
  id: null,
  name: '',
  providerCode: '',
  basePrice: 0,
  sellingPrice: 0,
  coinAmount: 0,
  bonusCoin: 0,
  flagType: '',
  customFlag: '',
  status: 'active'
});

const handleNewFlagTypeChange = () => {
  if (newProduct.value.flagType !== 'custom') {
    newProduct.value.customFlag = '';
  }
};

const handleEditFlagTypeChange = () => {
  if (editProductForm.value.flagType !== 'custom') {
    editProductForm.value.customFlag = '';
  }
};

// Add Modal Handlers
const openAddModal = () => {
  newProduct.value = {
    name: '',
    providerCode: '',
    basePrice: null,
    sellingPrice: null,
    coinAmount: null,
    bonusCoin: 0,
    flagType: '',
    customFlag: ''
  };
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const saveNewProduct = async () => {
  try {
    let finalFlag = null;
    if (newProduct.value.flagType === 'custom') {
      finalFlag = newProduct.value.customFlag?.trim() || null;
    } else if (newProduct.value.flagType) {
      finalFlag = newProduct.value.flagType;
    }

    const payload = {
      name: newProduct.value.name?.trim(),
      provider_code: newProduct.value.providerCode?.trim().toUpperCase(),
      base_price: Number(newProduct.value.basePrice),
      selling_price: Number(newProduct.value.sellingPrice),
      coin_amount: Number(newProduct.value.coinAmount),
      bonus_coin: newProduct.value.bonusCoin ? Number(newProduct.value.bonusCoin) : 0,
      flag: finalFlag
    };

    const res = await adminService.createProduct(payload);
    if (res?.success || res?.data) {
      store.showToast(`Produk "${newProduct.value.name}" berhasil ditambahkan!`, 'success');
      await loadProducts();
      closeAddModal();
    }
  } catch (err) {
    store.showToast(err.message || 'Gagal menambahkan produk', 'error');
  }
};

// Edit Modal Handlers
const openEditModal = (product) => {
  const isPreset = PRESET_FLAGS.includes(product.flag);
  const flagType = product.flag ? (isPreset ? product.flag : 'custom') : '';
  const customFlag = isPreset ? '' : (product.flag || '');

  editProductForm.value = {
    id: product.id,
    name: product.name,
    providerCode: product.providerCode,
    basePrice: product.basePrice,
    sellingPrice: product.sellingPrice,
    coinAmount: product.coinAmount,
    bonusCoin: product.bonusCoin || 0,
    flagType,
    customFlag,
    status: product.status
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveEditProduct = async () => {
  try {
    let finalFlag = null;
    if (editProductForm.value.flagType === 'custom') {
      finalFlag = editProductForm.value.customFlag?.trim() || null;
    } else if (editProductForm.value.flagType) {
      finalFlag = editProductForm.value.flagType;
    }

    const payload = {
      name: editProductForm.value.name?.trim(),
      provider_code: editProductForm.value.providerCode?.trim().toUpperCase(),
      base_price: Number(editProductForm.value.basePrice),
      selling_price: Number(editProductForm.value.sellingPrice),
      coin_amount: Number(editProductForm.value.coinAmount),
      bonus_coin: editProductForm.value.bonusCoin ? Number(editProductForm.value.bonusCoin) : 0,
      flag: finalFlag,
      status: editProductForm.value.status
    };

    const res = await adminService.updateProduct(editProductForm.value.id, payload);
    if (res?.success || res?.data) {
      store.showToast(`Produk "${editProductForm.value.name}" berhasil diperbarui!`, 'success');
      await loadProducts();
      closeEditModal();
    }
  } catch (err) {
    store.showToast(err.message || 'Gagal memperbarui produk', 'error');
  }
};

// Delete Modal Handlers
const showDeleteModal = ref(false);
const productToDelete = ref(null);
const isDeleting = ref(false);

const openDeleteModal = (product) => {
  productToDelete.value = product;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const confirmDeleteProduct = async () => {
  if (!productToDelete.value) return;

  isDeleting.value = true;
  try {
    const res = await adminService.deleteProduct(productToDelete.value.id);
    if (res?.success || res?.data) {
      store.showToast(`Produk "${productToDelete.value.name}" berhasil dihapus.`, 'success');
    } else {
      store.showToast(`Produk "${productToDelete.value.name}" berhasil dihapus.`, 'success');
    }
    await loadProducts();
    closeDeleteModal();
  } catch (err) {
    store.showToast(err.response?.data?.message || err.message || 'Gagal menghapus produk.', 'error');
  } finally {
    isDeleting.value = false;
  }
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

.action-buttons-group {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-edit-action {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
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

.btn-edit-action:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
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

.product-name-col {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.product-flag-badge {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  color: #ea580c;
  border: 1px solid rgba(234, 88, 12, 0.2);
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.coin-col {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.text-bonus {
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
}

.text-danger {
  color: #ef4444;
}

.modal-card {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* Delete Confirmation Modal Styling */
.delete-confirm-card {
  max-width: 460px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(225, 29, 72, 0.25);
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
  margin-bottom: 0.85rem;
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

.delete-warning-note {
  font-size: 0.775rem;
  color: #94a3b8;
  margin: 0;
  text-align: center;
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

.margin-top-xs {
  margin-top: 0.5rem;
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
  .footer-inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
