<template>
  <div class="affiliate-dashboard-wrapper">
    <!-- Momolive Background Shadow & Glow Layer -->
    <div class="momolive-bg-glow">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <img src="../../assets/momolive_bg.jpg" alt="Momolive Background Glow" class="momolive-bg-image" />
    </div>

    <!-- Affiliate Navbar -->
    <AffiliateNavbar />

    <!-- Main Content (Max-width 720px centered) -->
    <main class="affiliate-main-content animate-fade-up">
      <div class="affiliate-container">
        
        <!-- Header Title -->
        <div class="dashboard-header">
          <div>
            <h1 class="page-title">Dashboard Affiliate</h1>
            <p class="page-subtitle">Welcome back, Partner. Here is your current performance.</p>
          </div>
          <div class="chart-badge-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19V13M12 19V5M20 19V9M8 19V10M16 19V7" stroke="#7C4DFF" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Row 1: 3 Card Stats Grid -->
        <div class="stats-grid-3">
          <!-- Card 1: Total Referral -->
          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Total Referral</span>
              <div class="stat-icon-wrapper muted">
                <UserGroupIcon :size="20" />
              </div>
            </div>
            <div class="stat-value dark-value">{{ totalReferrals }}</div>
          </div>

          <!-- Card 2: Saldo Komisi (Gradient Purple) -->
          <div class="stat-card purple-card">
            <div class="stat-card-header">
              <span class="stat-label-light">Saldo Komisi</span>
              <div class="stat-icon-wrapper light">
                <Wallet01Icon :size="20" />
              </div>
            </div>
            <div class="stat-value light-value">Rp {{ commissionBalance.toLocaleString('id-ID') }}</div>
          </div>

          <!-- Card 3: Kode Referral -->
          <div class="stat-card ref-card">
            <div class="stat-card-header">
              <span class="stat-label-uppercase">KODE REFERRAL</span>
            </div>
            <div class="ref-code-value">{{ referralCode }}</div>
            <button class="btn-copy-code" @click="copyReferralCode">
              <Copy01Icon :size="16" />
              <span>Copy Referral Link</span>
            </button>
          </div>
        </div>

        <!-- Row 2: Card Tarik Saldo & Card Riwayat Komisi (Grid / Stack) -->
        <div class="dashboard-grid-2 margin-top-lg">
          
          <!-- Card Tarik Saldo -->
          <div class="dash-card card-withdraw">
            <h3 class="card-title">Tarik Saldo</h3>
            <div class="card-divider-light"></div>

            <form @submit.prevent="handleWithdraw">
              <div class="form-group">
                <label class="form-label-sm">Jumlah Penarikan</label>
                <div class="input-prefix-box">
                  <span class="prefix-text">Rp</span>
                  <input 
                    v-model.number="withdrawAmount" 
                    type="number" 
                    min="50000"
                    :max="commissionBalance"
                    step="1000"
                    required
                    class="input-withdraw" 
                    placeholder="0"
                  />
                </div>
                <p class="small-note-text">
                  <span class="info-icon-dot">ℹ️</span> Minimum penarikan: Rp 50.000
                </p>
              </div>

              <!-- Bank Terdaftar Info Box -->
              <div class="registered-bank-box">
                <div class="bank-icon-square">
                  <BankIcon :size="20" />
                </div>
                <div class="bank-details">
                  <span class="bank-label">Rekening Tujuan</span>
                  <strong class="bank-name">{{ registeredBank.name }}</strong>
                  <span class="bank-account-no">{{ registeredBank.accountNo }}</span>
                </div>
              </div>

              <!-- Submit Withdraw Button -->
              <button 
                type="submit" 
                class="btn btn-purple-submit margin-top-md"
                :disabled="isSubmittingWithdraw"
              >
                <span v-if="isSubmittingWithdraw">Memproses...</span>
                <span v-else class="btn-flex-inner">
                  Ajukan Penarikan
                  <ArrowRight01Icon :size="18" />
                </span>
              </button>
            </form>
          </div>

          <!-- Card Riwayat Komisi -->
          <div class="dash-card card-history">
            <div class="card-header-flex">
              <h3 class="card-title">Riwayat Komisi</h3>
              <button class="btn-icon-mini" title="Filter Transaksi">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </div>

            <div class="history-table-container margin-top-sm">
              <table class="history-table">
                <thead>
                  <tr>
                    <th>TANGGAL</th>
                    <th>TRANSAKSI</th>
                    <th class="text-right">JUMLAH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in commissionHistory" :key="item.id">
                    <td class="text-muted text-nowrap">{{ item.date }}</td>
                    <td>
                      <div class="trans-title font-semibold text-dark">{{ item.title }}</div>
                      <div class="trans-sub text-muted">{{ item.sub }}</div>
                    </td>
                    <td class="text-right font-bold text-nowrap" :class="item.amount > 0 ? 'text-green' : 'text-dark'">
                      {{ item.amount > 0 ? '+ ' : '' }}Rp {{ Math.abs(item.amount).toLocaleString('id-ID') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card-footer-action">
              <button class="btn-link-purple" @click="showAllHistory">
                Lihat Semua Transaksi
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="affiliate-footer">
      <div class="affiliate-container footer-inner">
        <div class="footer-left">
           
        </div>
        <div class="footer-right">
          <router-link to="/terms">Terms of Service</router-link>
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/contact">Help Center</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UserGroupIcon, Wallet01Icon, Copy01Icon, BankIcon, ArrowRight01Icon } from 'hugeicons-vue';
import AffiliateNavbar from '../../components/layout/AffiliateNavbar.vue';
import { useTopupStore } from '../../stores/topupStore';
import { authService } from '../../api/authService';

const store = useTopupStore();

// Dashboard Stats Data
const totalReferrals = ref(0);
const commissionBalance = ref(0);
const referralCode = ref('');
const registeredBank = ref({
  name: 'BCA',
  accountNo: '-'
});
const commissionHistory = ref([]);
const isLoading = ref(false);

// Form Tarik Saldo
const withdrawAmount = ref(0);
const isSubmittingWithdraw = ref(false);

const loadDashboard = async () => {
  isLoading.value = true;
  try {
    const res = await authService.getAffiliateDashboard();
    if (res?.data) {
      const data = res.data;
      totalReferrals.value = Number(data.total_referrals || data.referrals_count || 0);
      commissionBalance.value = Number(data.balance || data.commission_balance || 0);
      referralCode.value = data.referral_code || data.code || '';
      if (data.bank) {
        registeredBank.value = {
          name: data.bank.bank_name || data.bank.name || 'BCA',
          accountNo: data.bank.account_number || data.bank.accountNo || '-'
        };
      }
      if (data.history) {
        commissionHistory.value = data.history.map(h => ({
          id: h.id,
          date: h.created_at || h.date || new Date().toLocaleString('id-ID'),
          title: h.title || h.description || 'Komisi Referral',
          sub: h.subtitle || `via Ref: ${referralCode.value}`,
          amount: Number(h.amount || 0),
          status: h.status || 'Sukses'
        }));
      }
    }
  } catch (err) {
    console.warn('[AffiliateDashboard] Failed to fetch live dashboard stats', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadDashboard();
});

// Copy Code Handler
const copyReferralCode = () => {
  if (!referralCode.value) return;
  const fullUrl = `${window.location.origin}/?ref=${referralCode.value}`;
  navigator.clipboard.writeText(fullUrl);
  store.showToast(`Link referral ${fullUrl} berhasil disalin!`, 'success');
};

// Handle Withdraw Submission
const handleWithdraw = async () => {
  if (withdrawAmount.value < 50000) {
    store.showToast('Jumlah penarikan minimal Rp 50.000', 'warning');
    return;
  }
  if (withdrawAmount.value > commissionBalance.value) {
    store.showToast('Saldo komisi Anda tidak mencukupi.', 'error');
    return;
  }

  isSubmittingWithdraw.value = true;
  try {
    const res = await authService.withdrawCommission(withdrawAmount.value);
    if (res?.success || res?.data) {
      store.showToast(`Pengajuan penarikan Rp ${withdrawAmount.value.toLocaleString('id-ID')} berhasil diajukan!`, 'success');
      withdrawAmount.value = 0;
      await loadDashboard();
    }
  } catch (err) {
    store.showToast(err.message || 'Gagal mengajukan penarikan saldo', 'error');
  } finally {
    isSubmittingWithdraw.value = false;
  }
};

const showAllHistory = () => {
  store.showToast('Menampilkan seluruh riwayat komisi', 'info');
};

const showFooterNotice = (title) => {
  store.showToast(`Halaman ${title}`, 'info');
};
</script>

<style scoped>
.affiliate-dashboard-wrapper {
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
  background: radial-gradient(circle, rgba(124, 77, 255, 0.35) 0%, rgba(236, 72, 153, 0) 70%);
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(124, 77, 255, 0) 70%);
  bottom: 5%;
  right: -50px;
}

.affiliate-main-content {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 2.5rem 0 4rem 0;
}

.affiliate-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Dashboard Header */
.dashboard-header {
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

.chart-badge-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f3e8ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stats Grid 3 */
.stats-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .stats-grid-3 {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.25rem 1.35rem;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

.stat-label-light {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.stat-label-uppercase {
  font-size: 0.725rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.06em;
}

.stat-icon-wrapper.muted {
  color: #64748b;
}

.stat-icon-wrapper.light {
  color: #ffffff;
}

.stat-value.dark-value {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 0.5rem;
}

.purple-card {
  background: linear-gradient(135deg, #7c4dff 0%, #651fff 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 25px rgba(124, 77, 255, 0.35);
}

.stat-value.light-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-top: 0.5rem;
}

.ref-code-value {
  font-family: monospace;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0.5rem 0;
}

.btn-copy-code {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;
  width: fit-content;
}

.btn-copy-code:hover {
  background: #f8fafc;
  border-color: #7c4dff;
  color: #7c4dff;
}

/* Row 2: Dashboard Grid 2 */
.dashboard-grid-2 {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.25rem;
}

@media (max-width: 720px) {
  .dashboard-grid-2 {
    grid-template-columns: 1fr;
  }
}

.margin-top-lg {
  margin-top: 1.25rem;
}

.margin-top-sm {
  margin-top: 0.75rem;
}

.margin-top-md {
  margin-top: 1rem;
}

.dash-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.03);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.card-divider-light {
  height: 1px;
  background: #f1f5f9;
  margin: 1rem 0;
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-icon-mini {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.form-label-sm {
  font-size: 0.825rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
  display: block;
}

.input-prefix-box {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  overflow: hidden;
  padding: 0 0.85rem;
}

.prefix-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  margin-right: 0.4rem;
}

.input-withdraw {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0.65rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  outline: none;
}

.small-note-text {
  font-size: 0.775rem;
  color: #64748b;
  margin-top: 0.4rem;
}

.info-icon-dot {
  font-size: 0.8rem;
}

/* Registered Bank Box */
.registered-bank-box {
  background: #f5f3ff;
  border: 1px dashed #c4b5fd;
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.bank-icon-square {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #ffffff;
  color: #7c4dff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bank-details {
  display: flex;
  flex-direction: column;
}

.bank-label {
  font-size: 0.725rem;
  color: #64748b;
}

.bank-name {
  font-size: 0.85rem;
  color: #1e1b4b;

}

.bank-account-no {
  font-size: 0.8rem;
  color: #475569;
  font-family: monospace;
}

.btn-purple-submit {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 10px;
  background: #7c4dff;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 77, 255, 0.35);
  transition: all 0.2s ease;
}

.btn-purple-submit:hover:not(:disabled) {
  background: #651fff;
  transform: translateY(-1px);
}

.btn-flex-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

/* History Table */
.history-table-container {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.history-table th {
  color: #64748b;
  font-weight: 700;
  font-size: 0.725rem;
  letter-spacing: 0.04em;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
}

.history-table td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid #f8fafc;
  vertical-align: middle;
}

.trans-title {
  font-size: 0.875rem;

}

.trans-sub {
  font-size: 0.775rem;
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

.text-green {
  color: #059669;
}

.text-right {
  text-align: right;
}

.text-nowrap {
  white-space: nowrap;
}

.card-footer-action {
  text-align: center;
  margin-top: 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f8fafc;
}

.btn-link-purple {
  background: none;
  border: none;
  color: #7c4dff;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;

}

.btn-link-purple:hover {
  text-decoration: underline;
}

/* Footer */
.affiliate-footer {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  font-size: 0.825rem;
  color: #7c4dff;
  font-weight: 600;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  color: #7c4dff;
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
  color: #7c4dff;
}

@media (max-width: 640px) {
  .dashboard-container {
    padding: 1.25rem 0.85rem;
  }
  .header-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .dash-card {
    padding: 1.15rem 1rem;
    border-radius: 14px;
  }
  .stat-value.dark-value {
    font-size: 1.6rem;
  }
  .stat-value.light-value {
    font-size: 1.3rem;
  }
  .footer-inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
