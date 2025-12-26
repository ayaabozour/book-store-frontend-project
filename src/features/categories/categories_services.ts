import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, Category } from '../../../types';

export const categoriesService = {
  list: async (params?: any): Promise<Category[]> => {
  const { data } = await apiClient.get<{ success: boolean; message: string; data: Category[] }>(
    API_ENDPOINTS.categories.list,
    { params }
  );
  return data.data; 
  },

  store: async (name: string): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.categories.store,
      { name }
    );

    return response.data.data; 
  }
};
