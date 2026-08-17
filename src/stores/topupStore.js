import { defineStore } from 'pinia';
import { topupService } from '../api/topupService';

export const useTopupStore = defineStore('topup', {
  state: () => ({
    // Data states
    categories: [],
    productsByCategory: {},
    currentProduct: null,
    paymentMethods: [],
    transactions: [],
    
    // Active Checkout Order State
    currentOrder: {
      momocoinId: '',
      referralCode: '',
      coinAmount: 0,
      totalPrice: 0
    },
    
    // Status states
    isLoadingCategories: false,
    isLoadingProducts: false,
    isLoadingCheckout: false,
    isLoadingHistory: false,
    apiStatus: {
      connected: true,
      mode: import.meta.env.VITE_USE_MOCK_API === 'true' ? 'MOCK' : 'LIVE',
      lastChecked: null,
      message: ''
    },

    // User Auth & Session State
    isLoggedIn: false,
    user: null,

    // User Balance / Points
    userBalance: 250000,
    userPoints: 1450,

    // Global Notification Toasts
    toast: {
      show: false,
      message: '',
      type: 'info' // 'success' | 'error' | 'info' | 'warning'
    }
  }),

  getters: {
    formattedBalance: (state) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(state.userBalance);
    },
    transactionCount: (state) => state.transactions.length
  },

  actions: {
    // Auth actions
    loginUser(userData = { name: 'User', role: 'user' }) {
      this.isLoggedIn = true;
      this.user = userData;
    },
    logoutUser() {
      this.isLoggedIn = false;
      this.user = null;
      this.showToast('Anda telah logout.', 'info');
    },

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
      this.currentOrder = { ...orderData };
    },

    // Check API Status
    async checkApiStatus() {
      try {
        const res = await topupService.checkHealth();
        this.apiStatus.connected = true;
        this.apiStatus.message = res.message || 'Connected to API';
        this.apiStatus.lastChecked = new Date().toLocaleTimeString();
      } catch (err) {
        this.apiStatus.connected = false;
        this.apiStatus.message = err.message || 'Failed to reach API';
        this.apiStatus.lastChecked = new Date().toLocaleTimeString();
      }
    },

    // Fetch Categories
    async fetchCategories() {
      this.isLoadingCategories = true;
      try {
        const res = await topupService.getCategories();
        this.categories = res.data || [];
      } catch (err) {
        this.showToast(err.message || 'Gagal memuat kategori', 'error');
      } finally {
        this.isLoadingCategories = false;
      }
    },

    // Fetch Products by Category ID
    async fetchProductsByCategory(categoryId) {
      if (this.productsByCategory[categoryId]) return; // cached
      this.isLoadingProducts = true;
      try {
        const res = await topupService.getProductsByCategory(categoryId);
        this.productsByCategory[categoryId] = res.data || [];
      } catch (err) {
        this.showToast(err.message || 'Gagal memuat produk', 'error');
      } finally {
        this.isLoadingProducts = false;
      }
    },

    // Fetch Single Product Details
    async fetchProductById(productId) {
      this.isLoadingProducts = true;
      try {
        const res = await topupService.getProductById(productId);
        this.currentProduct = res.data || null;
      } catch (err) {
        this.showToast(err.message || 'Produk tidak ditemukan', 'error');
        this.currentProduct = null;
      } finally {
        this.isLoadingProducts = false;
      }
    },

    // Fetch Payment Methods
    async fetchPaymentMethods() {
      if (this.paymentMethods.length > 0) return;
      try {
        const res = await topupService.getPaymentMethods();
        this.paymentMethods = res.data || [];
      } catch (err) {
        this.showToast(err.message || 'Gagal memuat metode pembayaran', 'error');
      }
    },

    // Submit Top-up Order
    async submitTopupOrder(payload) {
      this.isLoadingCheckout = true;
      try {
        const res = await topupService.createTopupTransaction(payload);
        if (res.success && res.data) {
          // Prepend to transaction history
          this.transactions.unshift(res.data);
          this.showToast('Transaksi Berhasil! Top-up telah dikirim.', 'success');
          return { success: true, transaction: res.data };
        }
      } catch (err) {
        this.showToast(err.message || 'Transaksi gagal diproses', 'error');
        return { success: false, error: err };
      } finally {
        this.isLoadingCheckout = false;
      }
    },

    // Fetch History
    async fetchTransactionHistory() {
      if (this.transactions.length > 0) return;
      this.isLoadingHistory = true;
      try {
        const res = await topupService.getTransactionHistory();
        this.transactions = res.data || [];
      } catch (err) {
        this.showToast(err.message || 'Gagal memuat riwayat transaksi', 'error');
      } finally {
        this.isLoadingHistory = false;
      }
    }
  }
});
