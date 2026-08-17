<template>
  <Transition name="toast-slide">
    <div 
      v-if="store.toast.show" 
      class="toast-box" 
      :class="`toast-${store.toast.type}`"
    >
      <span class="toast-icon">
        <Tick01Icon v-if="store.toast.type === 'success'" :size="20" class="icon-success" />
        <Alert01Icon v-else-if="store.toast.type === 'error'" :size="20" class="icon-error" />
        <Alert01Icon v-else-if="store.toast.type === 'warning'" :size="20" class="icon-warning" />
        <InformationCircleIcon v-else :size="20" class="icon-info" />
      </span>
      <span class="toast-message">{{ store.toast.message }}</span>
      <button class="toast-close" @click="store.toast.show = false">&times;</button>
    </div>
  </Transition>
</template>

<script setup>
import { Tick01Icon, Alert01Icon, InformationCircleIcon } from 'hugeicons-vue';
import { useTopupStore } from '../../stores/topupStore';

const store = useTopupStore();
</script>

<style scoped>
.toast-box {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  background: #0f172a;
  color: #f8fafc;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.925rem;
  max-width: 400px;
}

.toast-icon {
  display: flex;
  align-items: center;
}

.icon-success {
  color: #10b981;
}

.icon-error {
  color: #ef4444;
}

.icon-warning {
  color: #f59e0b;
}

.icon-info {
  color: #3b82f6;
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-warning {
  border-left: 4px solid #f59e0b;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

.toast-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
