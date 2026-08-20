import axiosClient from './axiosClient';

export const topupService = {
  /**
   * List active coin packages customers can buy
   * GET /api/v1/topup/products
   */
  async getProducts() {
    return axiosClient.get('/topup/products');
  },

  /**
   * Validate a target game / user ID before checkout
   * POST /api/v1/topup/check-id
   * @param {Object} payload { game_code, user_id, zone_id }
   */
  async checkUserId(payload) {
    return axiosClient.post('/topup/check-id', {
      game_code: payload.game_code || 'momolive',
      user_id: payload.user_id?.toString() || payload.target_user_id?.toString(),
      zone_id: payload.zone_id || ''
    });
  },

  /**
   * Start a purchase and get a Xendit invoice to pay
   * POST /api/v1/topup/checkout
   * @param {Object} payload { product_id, target_user_id, target_zone_id, affiliate_code }
   */
  async checkout(payload) {
    return axiosClient.post('/topup/checkout', {
      product_id: payload.product_id,
      target_user_id: payload.target_user_id?.toString(),
      target_zone_id: payload.target_zone_id || '',
      affiliate_code: payload.affiliate_code || undefined
    });
  },

  /**
   * Check a transaction's current status
   * GET /api/v1/topup/transactions/{id}
   * @param {string} transactionId
   */
  async getTransactionStatus(transactionId) {
    return axiosClient.get(`/topup/transactions/${transactionId}`);
  }
};

export default topupService;
