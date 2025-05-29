import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 5000;

export const authClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.response?.data?.Message;

    toast(message, { type: 'error', position: 'bottom-right' });
  },
);

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.response?.data?.Message;

    if (error.response && error.response.status === 401) {
      console.error(message);
      window.location.href = '/log-in';
    }

    if (message.includes('Survey for user with id')) {
      window.location.href = '/survey';
    }

    if (typeof window !== 'undefined') {
      toast(message, {
        type: 'error',
      });
    }

    if (message) {
      return Promise.reject(message);
    }
  },
);
