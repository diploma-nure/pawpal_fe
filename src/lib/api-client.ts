import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 5000;

/**
 * Base API instance for public endpoints (no auth required)
 */
const instance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.response?.data?.Message;

    if (error.response?.status === 401) {
      window.location.href = '/pets';
    }

    return Promise.reject(new Error(message));
  },
);

export const client = setupCache(instance);
