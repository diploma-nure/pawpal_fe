import { getErrorMessage } from '@/config/responseCodes';
import axios from 'axios';
import { toast } from 'react-toastify';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
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
    const message = getErrorMessage(
      error.response?.data?.code || error.response?.data?.Code,
    );

    toast(message, { type: 'error', position: 'bottom-right' });
  },
);

export const client = instance;
