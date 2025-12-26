
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, PaginatedResponse, Order } from '../../../types';

export const ordersService = {
  list: async (params?: any): Promise<PaginatedResponse<Order>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
      API_ENDPOINTS.orders.list,
      { params }
    );
    return data.data;
  },

  store: async (payload: any): Promise<Order> => {
    const { data } = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.orders.store,
      payload
    );
    return data.data;
  }
};
