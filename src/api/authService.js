import axiosClient from './axiosClient';

export const authService = {
  /**
   * Log in and get access + refresh token
   * POST /api/v1/auth/login
   * @param {Object} credentials { email, password }
   */
  async login(credentials) {
    return axiosClient.post('/auth/login', credentials);
  },

  /**
   * Trade refresh token for new access token
   * POST /api/v1/auth/refresh
   * @param {string} refreshToken
   */
  async refreshToken(refreshToken) {
    return axiosClient.post('/auth/refresh', { refresh_token: refreshToken });
  },

  /**
   * Sign up as an affiliate (starts pending approval)
   * POST /api/v1/affiliate/register
   * @param {Object} payload { name, email, password, bank_name, account_number, account_holder }
   */
  async registerAffiliate(payload) {
    return axiosClient.post('/affiliate/register', payload);
  },

  /**
   * Referral stats, commission balance, and history
   * GET /api/v1/affiliate/dashboard
   */
  async getAffiliateDashboard() {
    return axiosClient.get('/affiliate/dashboard');
  },

  /**
   * Request a commission payout
   * POST /api/v1/affiliate/withdraw
   * @param {number} amount
   */
  async withdrawCommission(amount) {
    return axiosClient.post('/affiliate/withdraw', { amount: Number(amount) });
  }
};

export default authService;
