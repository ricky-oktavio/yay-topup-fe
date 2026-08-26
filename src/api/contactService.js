import axiosClient from './axiosClient';

export const contactService = {
  /**
   * Submit a support/partnership message (public contact form)
   * POST /api/v1/contact
   * @param {Object} payload { name, email, message }
   */
  async createContactMessage(payload) {
    return axiosClient.post('/contact', payload);
  }
};

export default contactService;
