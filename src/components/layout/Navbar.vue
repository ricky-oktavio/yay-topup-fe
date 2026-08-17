<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- Brand Logo (3D Gaming Emblem Concept 2 - Transparent PNG) -->
      <router-link to="/" class="navbar-brand" title="YayTopup">
        <img src="../../assets/logo_concept_2.png" alt="YayTopup Logo" class="brand-emblem-clean" />
      </router-link>

      <!-- Navigation Right Controls -->
      <div class="navbar-right">
        <router-link to="/status" class="nav-link-status">Cek Status</router-link>
        <router-link to="/login" class="btn btn-outline btn-auth">Login</router-link>
        <router-link to="/register" class="btn btn-solid-purple btn-auth">Register</router-link>
        
        <button class="user-avatar-btn" title="Akun Saya" @click="handleProfile">
          <UserIcon :size="20" class="huge-icon" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { UserIcon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

const handleLogin = () => {
  store.showToast('Fitur Login siap diintegrasikan dengan API auth', 'info');
};

const handleRegister = () => {
  store.showToast('Fitur Registrasi siap diintegrasikan dengan API auth', 'info');
};

const handleProfile = () => {
  store.showToast('Profil Pengguna Momolive Topup', 'info');
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
  text-decoration: none;
  background: transparent;
}

.brand-emblem-clean {
  height: 42px;
  width: auto;
  object-fit: contain;
  background: transparent;
  box-shadow: none;
  border: none;
  transition: transform 0.2s ease;
}

.navbar-brand:hover .brand-emblem-clean {
  transform: scale(1.08);
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
