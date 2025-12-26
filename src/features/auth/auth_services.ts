
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, User } from '../../../types';

export const authService = {
  login: async (credentials: any): Promise<User> => {
    const { data } = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.auth.login, 
      credentials
    );
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.logout);
  }
};
