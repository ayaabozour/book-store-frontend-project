
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, PaginatedResponse, Category } from '../../../types';

export const categoriesService = {
  list: async (params?: any): Promise<PaginatedResponse<Category>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Category>>>(
      API_ENDPOINTS.categories.list,
      { params }
    );
    return data.data;
  },

  store: async (name: string): Promise<Category> => {
    const { data } = await apiClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.categories.store,
      { name }
    );
    return data.data;
  }
};
