import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 5000;

/**
 * Base API instance for public endpoints (no auth required)
 */
export const client = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request) {
      console.error('Network error', error.request);
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  },
);
