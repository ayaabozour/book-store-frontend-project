import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, Order } from '../../../types';

export const ordersService = {
  list: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<ApiResponse<Order[]>>(
      API_ENDPOINTS.orders.list
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
