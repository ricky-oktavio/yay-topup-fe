<template>
  <header class="admin-navbar-header">
    <div class="admin-nav-container">
      <!-- Admin Brand Logo -->
      <router-link to="/" class="admin-brand-logo" title="YayTopup Home">
        <img src="../../assets/logo_concept_2.png" alt="YayTopup Admin" class="admin-logo-img" />
        <span class="brand-text">
          <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
          <span class="admin-pill-badge">ADMIN</span>
        </span>
      </router-link>

      <!-- Admin Nav Links -->
      <nav class="admin-nav-links">
        <router-link to="/admin/affiliate" class="admin-nav-item">Affiliate</router-link>
        <router-link to="/admin/products" class="admin-nav-item">Produk</router-link>
        <router-link to="/admin/withdrawal" class="admin-nav-item">Withdrawal</router-link>
        <router-link to="/admin/transactions" class="admin-nav-item">Transaksi</router-link>
        <router-link to="/admin/settings" class="admin-nav-item">Settings</router-link>
      </nav>

      <!-- Admin Right Actions -->
      <div class="admin-nav-right">
        <button class="admin-icon-btn" title="Notifikasi">
          <Notification01Icon :size="18" class="admin-icon" />
          <span class="notification-dot"></span>
        </button>

        <button class="admin-avatar-btn" title="Profil Admin">
          <UserIcon :size="18" class="admin-icon" />
        </button>

        <span class="nav-divider">|</span>

        <!-- Logout Button -->
        <button class="btn-logout-nav" title="Keluar Akun" @click="handleLogout">
          <Logout01Icon :size="16" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Notification01Icon, UserIcon, Logout01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const handleLogout = () => {
  store.showToast('Anda telah logout dari Admin YayTopup.', 'info');
  router.push('/login');
};
</script>

<style scoped>
.admin-navbar-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
}

.admin-nav-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-brand-logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
}

.admin-logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(124, 58, 237, 0.22));
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.brand-yay {
  color: #0f172a;
}

.brand-topup {
  background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-pill-badge {
  background: #f1f5f9;
  color: #64748b;
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
  border: 1px solid #e2e8f0;
}

.admin-nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  height: 100%;
}

.admin-nav-item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.25rem;
  font-size: 0.925rem;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.15s ease;
}

.admin-nav-item:hover {
  color: #7c3aed;
}

.admin-nav-item.active, .router-link-exact-active.admin-nav-item {
  color: #7c3aed;
  border-bottom-color: #7c3aed;
}

.admin-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-icon-btn {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  transition: background 0.15s ease;
}

.admin-icon-btn:hover {
  background: #f1f5f9;
  color: #7c3aed;
}

.notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.admin-avatar-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #334155;
  transition: all 0.15s ease;
}

.admin-avatar-btn:hover {
  background: #f8fafc;
  border-color: #7c3aed;
  color: #7c3aed;
}

.nav-divider {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.btn-logout-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.btn-logout-nav:hover {
  background: #fef2f2;
  color: #dc2626;
}

@media (max-width: 768px) {
  .admin-nav-links {
    gap: 0.85rem;
    font-size: 0.825rem;
  }
}
</style>
