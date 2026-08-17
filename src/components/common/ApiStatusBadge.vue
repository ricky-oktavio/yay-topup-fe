<template>
  <div 
    class="api-badge"
    :class="{ 
      'is-connected': store.apiStatus.connected, 
      'is-error': !store.apiStatus.connected 
    }"
    @click="store.checkApiStatus()"
    title="Klik untuk tes koneksi API"
  >
    <span class="status-dot"></span>
    <span class="status-mode">{{ store.apiStatus.mode }} API</span>
    <span class="status-text">{{ store.apiStatus.connected ? 'Online' : 'Offline' }}</span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();

onMounted(() => {
  store.checkApiStatus();
});
</script>

<style scoped>
.api-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid var(--border-color);
  background: rgba(15, 23, 42, 0.6);
  transition: var(--transition-fast);
  user-select: none;
}

.api-badge:hover {
  transform: scale(1.03);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.is-connected .status-dot {
  background-color: var(--status-success);
  box-shadow: 0 0 8px var(--status-success);
}

.is-error .status-dot {
  background-color: var(--status-error);
  box-shadow: 0 0 8px var(--status-error);
}

.status-mode {
  color: #a5b4fc;
}

.status-text {
  color: var(--text-muted);
}
</style>
