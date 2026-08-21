import axios from 'axios';

// Read configuration from environment variables (defaults to live REST API)
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.yaytopup.my.id/api/v1';
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

// Create Axios Instance
const axiosClient = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Attach Auth tokens
axiosClient.interceptors.request.use(
  (config) => {
    // Retrieve Auth token from localStorage if present
    const token = localStorage.getItem('yaytopup_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Queue for pending requests while refresh token is in-flight
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Standardize API responses & automatic token refresh on 401
axiosClient.interceptors.response.use(
  (response) => {
    // Directly return response payload data if available
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if 401 occurred and request is eligible for token refresh
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
      const refreshToken = localStorage.getItem('yaytopup_refresh_token');

      if (refreshToken) {
        if (isRefreshing) {
          // If a refresh is already in progress, wait in the queue
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Direct axios call to avoid circular interceptor execution
          const response = await axios.post(`${baseURL}/auth/refresh`, {
            refresh_token: refreshToken
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          const resData = response.data;
          const newAccessToken = resData?.data?.access_token || resData?.access_token;

          if (newAccessToken) {
            localStorage.setItem('yaytopup_auth_token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            processQueue(null, newAccessToken);
            return axiosClient(originalRequest);
          } else {
            throw new Error('Invalid refresh token response');
          }
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          localStorage.removeItem('yaytopup_auth_token');
          localStorage.removeItem('yaytopup_refresh_token');
          localStorage.removeItem('yaytopup_user_data');

          if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/affiliate')) {
            window.location.href = '/login';
          }

          return Promise.reject({
            status: 401,
            message: 'Sesi login telah berakhir. Silakan login kembali.',
            isNetworkError: false
          });
        } finally {
          isRefreshing = false;
        }
      } else {
        // No refresh token available in storage
        localStorage.removeItem('yaytopup_auth_token');
        localStorage.removeItem('yaytopup_user_data');
      }
    }

    // Format error response into standard payload structure
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Error occurred while contacting API',
      details: error.response?.data || null,
      isNetworkError: !error.response
    };

    if (error.response?.status === 401) {
      console.warn('[API Interceptor] Unauthorized request (401)');
    } else if (error.response?.status === 403) {
      console.warn('[API Interceptor] Forbidden request (403)');
    } else if (!error.response) {
      console.warn('[API Interceptor] Network disconnect or CORS failure');
    }

    return Promise.reject(customError);
  }
);

export default axiosClient;
