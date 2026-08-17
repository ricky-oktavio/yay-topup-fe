import axios from 'axios';

// Read configuration from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.yaytopup.com/v1';
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

// Create Axios Instance
const axiosClient = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Platform': 'Web-Vue3',
    'X-App-Version': '1.0.0'
  }
});

// Request Interceptor: Attach Auth tokens, timestamp, dynamic headers
axiosClient.interceptors.request.use(
  (config) => {
    // Retrieve Auth token from localStorage if present
    const token = localStorage.getItem('yaytopup_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach request timestamp for debugging / tracking
    config.headers['X-Request-Timestamp'] = new Date().toISOString();
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardize API responses & global error handling
axiosClient.interceptors.response.use(
  (response) => {
    // Directly return response payload data if available
    return response.data;
  },
  (error) => {
    // Format error response into standard payload structure
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Error occurred while contacting API',
      details: error.response?.data || null,
      isNetworkError: !error.response
    };

    if (error.response?.status === 401) {
      // Handle unauthorized logic (e.g. redirect to login, clear storage)
      console.warn('[API Interceptor] Unauthorized request detected (401)');
    } else if (error.response?.status === 403) {
      console.warn('[API Interceptor] Forbidden request (403)');
    } else if (!error.response) {
      console.warn('[API Interceptor] Network disconnect or CORS failure');
    }

    return Promise.reject(customError);
  }
);

export default axiosClient;
