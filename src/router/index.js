import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StatusView from '../views/StatusView.vue';
import PaymentView from '../views/PaymentView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TopupView from '../views/TopupView.vue';
import HistoryView from '../views/HistoryView.vue';
import ApiTestView from '../views/ApiTestView.vue';

// Legal & Contact Views
import TermsView from '../views/TermsView.vue';
import PrivacyView from '../views/PrivacyView.vue';
import ContactView from '../views/ContactView.vue';

// Affiliate Views
import AffiliateView from '../views/affiliate/AffiliateView.vue';
import AffiliateDashboardView from '../views/affiliate/AffiliateDashboardView.vue';

// Admin Views
import AdminProductsView from '../views/admin/AdminProductsView.vue';
import AdminAffiliateView from '../views/admin/AdminAffiliateView.vue';
import AdminWithdrawalView from '../views/admin/AdminWithdrawalView.vue';
import AdminTransactionsView from '../views/admin/AdminTransactionsView.vue';
import AdminSettingsView from '../views/admin/AdminSettingsView.vue';
import AdminMessagesView from '../views/admin/AdminMessagesView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'YayTopup - Platform Topup Game & E-Wallet' }
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: { title: 'Terms of Service - YayTopup' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: { title: 'Privacy Policy - YayTopup' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact Us - YayTopup' }
  },
  {
    path: '/affiliate/dashboard',
    name: 'affiliate-dashboard',
    component: AffiliateDashboardView,
    meta: { title: 'Dashboard Affiliate - YayTopup' }
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: AdminProductsView,
    meta: { title: 'Kelola Produk - YayTopup Admin' }
  },
  {
    path: '/admin/affiliate',
    name: 'admin-affiliate',
    component: AdminAffiliateView,
    meta: { title: 'Kelola Affiliate - YayTopup Admin' }
  },
  {
    path: '/admin/withdrawal',
    name: 'admin-withdrawal',
    component: AdminWithdrawalView,
    meta: { title: 'Kelola Penarikan - YayTopup Admin' }
  },
  {
    path: '/admin/transactions',
    name: 'admin-transactions',
    component: AdminTransactionsView,
    meta: { title: 'Monitor Transaksi - YayTopup Admin' }
  },
  {
    path: '/admin/messages',
    name: 'admin-messages',
    component: AdminMessagesView,
    meta: { title: 'Pesan & Dukungan - YayTopup Admin' }
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: { title: 'Pengaturan - YayTopup Admin' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login - YayTopup' }
  },
  {
    path: '/register',
    name: 'register',
    component: AffiliateView,
    meta: { title: 'Daftar Affiliate - YayTopup' }
  },
  {
    path: '/affiliate',
    name: 'affiliate',
    component: AffiliateView,
    meta: { title: 'Daftar Affiliate - YayTopup' }
  },
  {
    path: '/status',
    name: 'status',
    component: StatusView,
    meta: { title: 'Cek Status Transaksi - YayTopup' }
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView,
    meta: { title: 'Pembayaran - YayTopup' }
  },
  {
    path: '/topup/:productId',
    name: 'topup',
    component: TopupView,
    props: true,
    meta: { title: 'Isi Saldo / Topup - YayTopup' }
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: { title: 'Riwayat Transaksi - YayTopup' }
  },
  {
    path: '/api-studio',
    name: 'api-studio',
    component: ApiTestView,
    meta: { title: 'API Integration Studio - YayTopup' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Navigation guard for document titles & Open Graph meta tags
router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || 'YayTopup - Platform Topup Game & E-Wallet';
  document.title = pageTitle;

  // Dynamically sync Open Graph Title
  const ogTitleElement = document.querySelector('meta[property="og:title"]');
  if (ogTitleElement) {
    ogTitleElement.setAttribute('content', pageTitle);
  }

  const twitterTitleElement = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitleElement) {
    twitterTitleElement.setAttribute('content', pageTitle);
  }

  next();
});

export default router;
