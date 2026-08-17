<template>
  <div id="app">
    <!-- Render Public Navbar only when not on Admin or Affiliate Dashboard routes -->
    <Navbar v-if="!isCustomNavbarRoute" />

    <!-- Main View Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Global Toast Notification -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/layout/Navbar.vue';
import ToastNotification from './components/common/ToastNotification.vue';

const route = useRoute();
const isCustomNavbarRoute = computed(() => 
  route.path.startsWith('/admin') || route.path.startsWith('/affiliate/dashboard')
);
</script>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
