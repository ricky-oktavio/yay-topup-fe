<template>
  <header class="affiliate-navbar-header">
    <div class="affiliate-nav-container">
      <!-- Brand Logo -->
      <router-link to="/" class="affiliate-brand-logo" title="YayTopup Home">
        <img src="../../assets/logo_concept_2.png" alt="YayTopup Logo" class="affiliate-logo-img" />
        <span class="brand-text">
          <span class="brand-yay">Yay</span><span class="brand-topup">Topup</span>
          <span class="partner-pill-badge">PARTNER</span>
        </span>
      </router-link>

      <!-- Middle Nav Links (Optional/Minimalist) -->
      <nav class="affiliate-nav-links">
        <router-link to="/affiliate/dashboard" class="affiliate-nav-item active">Dashboard</router-link>
        
      </nav>

      <!-- Right User Controls & Logout -->
      <div class="affiliate-nav-right">
        <div class="user-partner-badge">
          <div class="partner-avatar">
            <UserIcon :size="18" />
          </div>
          <span class="partner-name">Partner</span>
        </div>

        <button class="btn-logout-nav" title="Logout" @click="handleLogout">
          <Logout01Icon :size="16" />
          <span>Logout</span>
        </button>
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
  store.showToast('Anda telah logout dari Dashboard Affiliate.', 'info');
  router.push('/login');
};

const showNavNotice = (section) => {
  store.showToast(`Menu ${section} Affiliate`, 'info');
};
</script>

<style scoped>
.affiliate-navbar-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
}

.affiliate-nav-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.affiliate-brand-logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
}

.affiliate-logo-img {
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

.partner-pill-badge {
  background: #fdf4ff;
  color: #c026d3;
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
  border: 1px solid #f0abfc;
}

.affiliate-nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  height: 100%;
}

.affiliate-nav-item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}

.affiliate-nav-item:hover, .affiliate-nav-item.active {
  color: #7c4dff;
  border-bottom-color: #7c4dff;
}

.affiliate-nav-right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.user-partner-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.partner-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #7c4dff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}

.partner-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.btn-logout-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.btn-logout-nav:hover {
  background: #fef2f2;
  color: #dc2626;
}

@media (max-width: 640px) {
  .affiliate-nav-links {
    display: none;
  }
}
</style>
