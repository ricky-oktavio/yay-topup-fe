<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- Brand Logo (3D Gaming Emblem + Clean Typography) -->
      <router-link to="/" class="navbar-brand" title="YayTopup">
        <img src="../../assets/logo_concept_2.png" alt="YayTopup Logo" class="brand-emblem-clean" />
        <span class="brand-text">
          <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
        </span>
      </router-link>

      <!-- Navigation Right Controls -->
      <div class="navbar-right">
        <router-link to="/status" class="nav-link-status">Cek Status</router-link>

        <!-- Tampilkan Tombol Login & Register Jika BELUM Login -->
        <template v-if="!store.isLoggedIn">
          <router-link to="/login" class="btn btn-outline btn-auth">Login</router-link>
          <router-link to="/register" class="btn btn-solid-purple btn-auth">Register</router-link>
        </template>

        <!-- Tampilkan Profile Avatar & Logout Jika SUDAH Login -->
        <template v-else>
          <button class="user-avatar-btn" title="Akun Saya" @click="handleProfile">
            <UserIcon :size="20" class="huge-icon" />
          </button>
          <button class="btn-logout-icon" title="Logout" @click="store.logoutUser">
            <Logout01Icon :size="18" />
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { UserIcon, Logout01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

const handleProfile = () => {
  store.showToast(`Halo, ${store.user?.name || 'User'}! Saldo Anda: ${store.formattedBalance}`, 'info');
};
</script>

<style scoped>
.navbar-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.85rem 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  background: transparent;
}

.brand-emblem-clean {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(124, 58, 237, 0.22));
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-text {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.brand-yay {
  color: #0f172a;
}

.brand-topup {
  background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-brand:hover .brand-emblem-clean {
  transform: scale(1.1) rotate(2deg);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link-status {
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-link-status:hover, .router-link-exact-active.nav-link-status {
  color: #7c3aed;
}

.btn-auth {
  padding: 0.5rem 1.15rem;
  font-size: 0.875rem;
  border-radius: 8px;
  font-weight: 600;
}

.user-avatar-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3f3f46;
  transition: all 0.2s ease;
  margin-left: 0.25rem;
}

.user-avatar-btn:hover {
  background: #f4f4f5;
  border-color: #cbd5e1;
  color: #7c3aed;
}

.huge-icon {
  color: currentColor;
}
</style>
