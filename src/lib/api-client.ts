import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 5000;

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
    console.error('API Error:', message);

    throw new Error(message);
    // toast(message, { type: 'error', position: 'bottom-right' });
    // return Promise.reject(new Error(message));
  },
);

export const client = instance;
