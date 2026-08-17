import axiosClient from './axiosClient';

export const topupService = {
  /**
   * Check Backend API Health / Connection Status
   */
  async checkHealth() {
    return axiosClient.get('/health');
  },

  /**
   * Get all product categories
   */
  async getCategories() {
    return axiosClient.get('/categories');
  },

  /**
   * Get products by category ID
   */
  async getProductsByCategory(categoryId) {
    return axiosClient.get(`/categories/${categoryId}/products`);
  },

  /**
   * Get details of a single product
   */
  async getProductById(productId) {
    return axiosClient.get(`/products/${productId}`);
  },

  /**
   * Get available payment methods
   */
  async getPaymentMethods() {
    return axiosClient.get('/payment-methods');
  },

  /**
   * Create a new top-up order / checkout
   * @param {Object} payload { productId, targetAccount, paymentMethodCode, referralCode }
   */
  async createOrder(payload) {
    return axiosClient.post('/orders', payload);
  },

  /**
   * Get transaction details by order ID
   * @param {string} orderId
   */
  async getOrderById(orderId) {
    return axiosClient.get(`/orders/${orderId}`);
  },

  /**
   * Get transaction history for current user / session
   */
  async getTransactionHistory() {
    return axiosClient.get('/transactions');
  }
};

export default topupService;
