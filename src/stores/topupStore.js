import { defineStore } from 'pinia';
import { topupService } from '../api/topupService';
import { authService } from '../api/authService';

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('yaytopup_user_data');
    if (!raw || raw === 'null' || raw === 'undefined') return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const useTopupStore = defineStore('topup', {
  state: () => ({
    // Data states
    products: [],
    transactions: [],
    
    // Active Checkout Order State
    currentOrder: {
      productId: '',
      momocoinId: '',
      referralCode: '',
      coinAmount: 0,
      totalPrice: 0,
      invoiceUrl: '',
      transactionId: '',
      paymentMethod: 'QRIS',
      whatsapp: ''
    },
    
    // Status states
    isLoadingProducts: false,
    isLoadingCheckout: false,
    isLoadingHistory: false,
    isLoadingCheckId: false,
    
    // User Auth & Session State
    isLoggedIn: !!localStorage.getItem('yaytopup_auth_token'),
    user: getInitialUser(),
    accessToken: localStorage.getItem('yaytopup_auth_token') || '',
    refreshToken: localStorage.getItem('yaytopup_refresh_token') || '',

    // Global Notification Toasts
    toast: {
      show: false,
      message: '',
      type: 'info' // 'success' | 'error' | 'info' | 'warning'
    }
  }),

  getters: {
    transactionCount: (state) => state.transactions.length
  },

  actions: {
    // Show Toast Notification
    showToast(message, type = 'info', duration = 3500) {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, duration);
    },

    // Set Active Order Details
    setCurrentOrder(orderData) {
      this.currentOrder = { ...this.currentOrder, ...orderData };
    },

    // Fetch Active Products from Live API
    async fetchProducts() {
      this.isLoadingProducts = true;
      try {
        const res = await topupService.getProducts();
        if (res && res.data && res.data.length > 0) {
          this.products = res.data;
        }
        return res;
      } catch (err) {
        console.warn('[TopupStore] Could not fetch products from API, using fallback catalog', err);
      } finally {
        this.isLoadingProducts = false;
      }
    },

    // Check / Validate User ID via Live API
    async checkUserId(userId, gameCode = 'momolive') {
      if (!userId || userId.toString().trim().length < 3) return null;
      this.isLoadingCheckId = true;
      try {
        const res = await topupService.checkUserId({
          game_code: gameCode,
          user_id: userId.toString().trim()
        });
        return res;
      } catch (err) {
        console.warn('[TopupStore] ID Validation response:', err);
        return null;
      } finally {
        this.isLoadingCheckId = false;
      }
    },

    // Submit Checkout Order to Live API
    async submitCheckout(payload) {
      this.isLoadingCheckout = true;
      try {
        const res = await topupService.checkout({
          product_id: payload.product_id || payload.productId,
          target_user_id: payload.target_user_id || payload.momocoinId,
          target_zone_id: payload.target_zone_id || '',
          affiliate_code: payload.affiliate_code || payload.referralCode || undefined
        });

        const resData = res?.data?.data || res?.data || res;
        const invoiceUrl = resData?.invoice_url || resData?.invoiceUrl || '';
        const transactionId = resData?.transaction_id || resData?.transactionId || resData?.id || '';
        const duitkuRef = resData?.duitku_reference || resData?.duitkuReference || '';

        if (invoiceUrl || transactionId) {
          this.currentOrder.transactionId = transactionId;
          this.currentOrder.invoiceUrl = invoiceUrl;
          this.currentOrder.duitkuReference = duitkuRef;
          
          // Prepend to local history
          this.transactions.unshift({
            id: transactionId || `TRX-${Date.now().toString().slice(-6)}`,
            productName: 'Momo Live Coin',
            denominationLabel: `${(Number(this.currentOrder.coinAmount) || 0).toLocaleString('id-ID')} Koin`,
            targetAccount: this.currentOrder.momocoinId,
            paymentMethod: this.currentOrder.paymentMethod || 'Duitku Payment',
            amount: this.currentOrder.totalPrice,
            status: 'PENDING',
            referenceNo: duitkuRef || transactionId,
            createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
            invoiceUrl: invoiceUrl
          });

          this.showToast('Pesanan berhasil dibuat. Mengarahkan ke pembayaran...', 'success');
          return { success: true, invoice_url: invoiceUrl, transaction_id: transactionId, data: resData };
        }

        return { success: false, error: res };
      } catch (err) {
        const errMsg = err.response?.data?.message || err.message || 'Gagal memproses pesanan ke server';
        this.showToast(errMsg, 'error');
        return { success: false, error: err };
      } finally {
        this.isLoadingCheckout = false;
      }
    },

    // Check Transaction Status from Live API
    async getTransactionStatus(transactionId) {
      try {
        const res = await topupService.getTransactionStatus(transactionId);
        return res;
      } catch (err) {
        console.warn('[TopupStore] Failed to fetch transaction status', err);
        return null;
      }
    },

    // User / Admin Login via Live API
    async loginUser(credentials) {
      try {
        const res = await authService.login(credentials);
        if (res && res.data) {
          const { access_token, refresh_token, user } = res.data;
          this.accessToken = access_token;
          this.refreshToken = refresh_token || '';
          this.user = user || { email: credentials.email, role: 'admin' };
          this.isLoggedIn = true;

          localStorage.setItem('yaytopup_auth_token', access_token);
          if (refresh_token) {
            localStorage.setItem('yaytopup_refresh_token', refresh_token);
          }
          localStorage.setItem('yaytopup_user_data', JSON.stringify(this.user));
          this.showToast('Login berhasil!', 'success');
          return { success: true, user: this.user };
        }
        return { success: false, message: 'Response invalid' };
      } catch (err) {
        this.showToast(err.message || 'Email atau password salah', 'error');
        return { success: false, error: err };
      }
    },

    // Logout
    logoutUser() {
      this.isLoggedIn = false;
      this.user = null;
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('yaytopup_auth_token');
      localStorage.removeItem('yaytopup_refresh_token');
      localStorage.removeItem('yaytopup_user_data');
      this.showToast('Anda telah logout.', 'info');
    }
  }
});

export default useTopupStore;
