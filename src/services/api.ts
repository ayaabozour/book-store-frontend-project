
import axios, { type AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || 'An error occurred';

    if (status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.hash = '#/login';
      toast.error('Session expired. Please login again.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 422) {
      const errors = (error.response?.data as any)?.errors;
      if (errors) {
        Object.values(errors).forEach((err: any) => toast.error(err[0]));
      } else {
        toast.error(message);
      }
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: any) => axiosInstance.get<T>(url, { params }).then(res => res.data),
  post: <T>(url: string, data?: any) => axiosInstance.post<T>(url, data).then(res => res.data),
  put: <T>(url: string, data?: any) => axiosInstance.put<T>(url, data).then(res => res.data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url).then(res => res.data),
};
