import axiosClient from './axiosClient';

export const adminService = {
  /**
   * List the full product catalog
   * GET /api/v1/admin/products
   */
  async getProducts() {
    return axiosClient.get('/admin/products');
  },

  /**
   * Add a product to the catalog
   * POST /api/v1/admin/products
   * @param {Object} payload { name, provider_code, base_price, selling_price }
   */
  async createProduct(payload) {
    return axiosClient.post('/admin/products', payload);
  },

  /**
   * Edit a product
   * PATCH /api/v1/admin/products/{id}
   */
  async updateProduct(id, payload) {
    return axiosClient.patch(`/admin/products/${id}`, payload);
  },

  /**
   * List affiliate registrations
   * GET /api/v1/admin/affiliates
   */
  async getAffiliates(params = {}) {
    return axiosClient.get('/admin/affiliates', { params });
  },

  /**
   * Approve an affiliate
   * POST /api/v1/admin/affiliates/{id}/approve
   */
  async approveAffiliate(id) {
    return axiosClient.post(`/admin/affiliates/${id}/approve`);
  },

  /**
   * Reject an affiliate
   * POST /api/v1/admin/affiliates/{id}/reject
   */
  async rejectAffiliate(id) {
    return axiosClient.post(`/admin/affiliates/${id}/reject`);
  },

  /**
   * Override one affiliate's commission rate
   * PATCH /api/v1/admin/affiliates/{id}/commission-rate
   */
  async updateAffiliateCommissionRate(id, rate) {
    return axiosClient.patch(`/admin/affiliates/${id}/commission-rate`, { commission_rate: Number(rate) });
  },

  /**
   * View global settings
   * GET /api/v1/admin/settings
   */
  async getSettings() {
    return axiosClient.get('/admin/settings');
  },

  /**
   * Update global settings
   * PATCH /api/v1/admin/settings
   */
  async updateSettings(payload) {
    return axiosClient.patch('/admin/settings', payload);
  },

  /**
   * List commission withdrawal requests
   * GET /api/v1/admin/withdrawals
   */
  async getWithdrawals(params = {}) {
    return axiosClient.get('/admin/withdrawals', { params });
  },

  /**
   * Approve a withdrawal (triggers Xendit payout)
   * POST /api/v1/admin/withdrawals/{id}/approve
   */
  async approveWithdrawal(id) {
    return axiosClient.post(`/admin/withdrawals/${id}/approve`);
  },

  /**
   * Reject a withdrawal
   * POST /api/v1/admin/withdrawals/{id}/reject
   */
  async rejectWithdrawal(id) {
    return axiosClient.post(`/admin/withdrawals/${id}/reject`);
  },

  /**
   * Monitor transactions
   * GET /api/v1/admin/transactions
   */
  async getTransactions(params = {}) {
    return axiosClient.get('/admin/transactions', { params });
  }
};

export default adminService;
