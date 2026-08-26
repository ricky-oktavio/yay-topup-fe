<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- Brand Logo (3D Gaming Emblem + Clean Typography) -->
      <router-link to="/" class="navbar-brand" title="YayTopup">
        <img src="../../assets/logo-yay-clean.png" alt="YayTopup Logo" class="brand-emblem-clean" />
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
          <button class="btn-logout-icon" title="Logout" @click="handleLogout">
            <Logout01Icon :size="18" />
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { UserIcon, Logout01Icon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const router = useRouter();
const store = useTopupStore();

const handleLogout = () => {
  store.logoutUser();
  router.push('/login');
};

const handleProfile = () => {
  const token = store.accessToken || localStorage.getItem('yaytopup_auth_token');
  if (!store.isLoggedIn || !token) {
    store.showToast('Silakan login terlebih dahulu.', 'warning');
    router.push('/login');
    return;
  }

  let user = store.user;
  if (!user) {
    try {
      const raw = localStorage.getItem('yaytopup_user_data');
      if (raw && raw !== 'null' && raw !== 'undefined') {
        user = JSON.parse(raw);
      }
    } catch (e) {
      user = null;
    }
  }

  const role = (user?.role || user?.role_name || '').toLowerCase();
  const email = (user?.email || '').toLowerCase();

  // Navigate to Super Admin / Affiliate dashboard according to user role data
  if (role === 'admin' || role === 'superadmin' || role === 'super_admin' || email.includes('admin')) {
    router.push('/admin/products');
  } else {
    router.push('/affiliate/dashboard');
  }
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
  height: 38px;
  width: 38px;
  object-fit: contain;
  padding: 3px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
  box-shadow: 
    0 4px 14px rgba(15, 23, 42, 0.35),
    0 2px 8px rgba(124, 58, 237, 0.3),
    inset 0 0 0 1px rgba(139, 92, 246, 0.35);
  image-rendering: -webkit-optimize-contrast;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  transform: translateY(-1px) scale(1.06);
  box-shadow: 
    0 6px 20px rgba(124, 58, 237, 0.45),
    0 3px 10px rgba(15, 23, 42, 0.4),
    inset 0 0 0 1px rgba(192, 132, 252, 0.5);
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

@media (max-width: 640px) {
  .navbar-header {
    padding: 0.65rem 0;
  }
  .brand-emblem-clean {
    height: 30px;
  }
  .brand-text {
    font-size: 1.15rem;
  }
  .navbar-right {
    gap: 0.45rem;
  }
  .nav-link-status {
    font-size: 0.8rem;
  }
  .btn-auth {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
