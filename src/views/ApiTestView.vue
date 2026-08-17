<template>
  <div class="api-studio container animate-fade-in">
    <div class="studio-header">
      <div>
        <span class="badge badge-primary">⚡ Developer Studio</span>
        <h1 class="page-title">API Integration & Debugger</h1>
        <p class="page-desc">Uji coba endpoint API, kustomisasi header, payload JSON, & inspeksi respons.</p>
      </div>

      <!-- Quick Preset Buttons -->
      <div class="preset-buttons">
        <button class="btn btn-secondary btn-sm" @click="loadPreset('health')">GET /health</button>
        <button class="btn btn-secondary btn-sm" @click="loadPreset('categories')">GET /categories</button>
        <button class="btn btn-secondary btn-sm" @click="loadPreset('topup')">POST /transactions</button>
      </div>
    </div>

    <!-- Active API Config Summary Card -->
    <div class="config-card glass-card">
      <div class="config-item">
        <span class="config-label">Base URL:</span>
        <code class="config-val">{{ apiBaseUrl }}</code>
      </div>
      <div class="config-item">
        <span class="config-label">Mode API:</span>
        <span class="badge" :class="store.apiStatus.mode === 'MOCK' ? 'badge-warning' : 'badge-success'">
          {{ store.apiStatus.mode }} MODE
        </span>
      </div>
      <div class="config-item">
        <span class="config-label">Status Koneksi:</span>
        <span class="badge" :class="store.apiStatus.connected ? 'badge-success' : 'badge-danger'">
          {{ store.apiStatus.connected ? 'CONNECTED (200 OK)' : 'DISCONNECTED' }}
        </span>
      </div>
    </div>

    <!-- API Request Studio Grid -->
    <div class="studio-grid">
      <!-- Left Panel: Request Builder -->
      <div class="builder-card glass-card">
        <h3>🛠️ Request Builder</h3>

        <div class="form-group margin-top">
          <label class="form-label">HTTP Method & Endpoint</label>
          <div class="method-url-group">
            <select v-model="requestMethod" class="form-select method-select">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input 
              v-model="requestEndpoint" 
              type="text" 
              class="form-input url-input" 
              placeholder="/transactions atau URL lengkap"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Custom Request Headers (JSON)</label>
          <textarea 
            v-model="requestHeaders" 
            class="form-textarea code-font" 
            rows="3"
            placeholder='{ "Authorization": "Bearer token_xyz" }'
          ></textarea>
        </div>

        <div v-if="requestMethod !== 'GET'" class="form-group">
          <label class="form-label">Request Body Payload (JSON)</label>
          <textarea 
            v-model="requestBody" 
            class="form-textarea code-font" 
            rows="7"
            placeholder='{ "productId": "mlbb", "amount": 21500 }'
          ></textarea>
        </div>

        <button 
          class="btn btn-primary send-btn"
          :disabled="isExecuting"
          @click="executeApiRequest"
        >
          <span v-if="isExecuting">⏳ Sending Request...</span>
          <span v-else>🚀 Send HTTP Request</span>
        </button>
      </div>

      <!-- Right Panel: Response Inspector -->
      <div class="inspector-card glass-card">
        <div class="inspector-header">
          <h3>📦 Response Inspector</h3>
          <span v-if="responseMeta" class="badge" :class="responseMeta.isSuccess ? 'badge-success' : 'badge-danger'">
            {{ responseMeta.status }} ({{ responseMeta.latency }}ms)
          </span>
        </div>

        <div v-if="isExecuting" class="inspector-loading">
          <p>Sending request to API server...</p>
        </div>

        <div v-else-if="responseBody !== null" class="inspector-body">
          <div class="response-json-box">
            <pre><code>{{ formattedResponseBody }}</code></pre>
          </div>
        </div>

        <div v-else class="inspector-empty">
          <span class="empty-icon">📡</span>
          <p>Tekan "Send HTTP Request" untuk menguji endpoint API.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTopupStore } from '../stores/topupStore';
import { topupService } from '../api/topupService';

const store = useTopupStore();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.yaytopup.com/v1';

const requestMethod = ref('GET');
const requestEndpoint = ref('/categories');
const requestHeaders = ref('{\n  "Content-Type": "application/json"\n}');
const requestBody = ref('{\n  "productId": "mlbb",\n  "denominationId": "ml-1",\n  "targetAccount": "12345678 (2094)",\n  "paymentMethodId": "qris",\n  "amount": 21500\n}');

const isExecuting = ref(false);
const responseBody = ref(null);
const responseMeta = ref(null);

const formattedResponseBody = computed(() => {
  if (responseBody.value === null) return '';
  try {
    return JSON.stringify(responseBody.value, null, 2);
  } catch {
    return String(responseBody.value);
  }
});

const loadPreset = (type) => {
  if (type === 'health') {
    requestMethod.value = 'GET';
    requestEndpoint.value = '/health';
  } else if (type === 'categories') {
    requestMethod.value = 'GET';
    requestEndpoint.value = '/categories';
  } else if (type === 'topup') {
    requestMethod.value = 'POST';
    requestEndpoint.value = '/transactions';
  }
};

const executeApiRequest = async () => {
  isExecuting.value = true;
  responseBody.value = null;
  responseMeta.value = null;

  const startTime = performance.now();

  try {
    const res = await topupService.executeCustomRequest({
      method: requestMethod.value,
      endpoint: requestEndpoint.value,
      headers: requestHeaders.value,
      data: requestMethod.value !== 'GET' ? requestBody.value : null
    });

    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    responseBody.value = res;
    responseMeta.value = {
      status: '200 OK',
      isSuccess: true,
      latency
    };
    store.showToast(`Request ke ${requestEndpoint.value} sukses! (${latency}ms)`, 'success');
  } catch (err) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    responseBody.value = err.details || err;
    responseMeta.value = {
      status: `Error ${err.status || 500}`,
      isSuccess: false,
      latency
    };
    store.showToast(`Request gagal: ${err.message}`, 'error');
  } finally {
    isExecuting.value = false;
  }
};
</script>

<style scoped>
.api-studio {
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.studio-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.preset-buttons {
  display: flex;
  gap: 0.5rem;
}

.config-card {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
}

.config-label {
  color: var(--text-muted);
}

.config-val {
  color: #a5b4fc;
}

.studio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.builder-card, .inspector-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.margin-top {
  margin-top: 0.5rem;
}

.method-url-group {
  display: flex;
  gap: 0.5rem;
}

.method-select {
  width: 110px;
  font-weight: 700;
  color: var(--accent-primary);
}

.code-font {
  font-family: 'Fira Code', monospace, sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
}

.send-btn {
  width: 100%;
  padding: 0.9rem;
}

.inspector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inspector-empty, .inspector-loading {
  padding: 4rem 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.75rem;
}

.response-json-box {
  background: #070a12;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
  max-height: 400px;
  overflow: auto;
}

.response-json-box pre {
  font-family: 'Fira Code', monospace;
  font-size: 0.825rem;
  color: #34d399;
}

@media (max-width: 900px) {
  .studio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
