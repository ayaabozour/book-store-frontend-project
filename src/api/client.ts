
import axios, { type AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as any;

    if (status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.hash = '#/login';
      toast.error('Session expired. Please login again.');
    } else if (status === 422) {
      if (data?.errors) {
        Object.values(data.errors).flat().forEach((msg: any) => toast.error(msg));
      } else {
        toast.error(data?.message || 'Validation failed');
      }
    } else {
      toast.error(data?.message || 'A server error occurred');
    }
    return Promise.reject(error);
  }
);
