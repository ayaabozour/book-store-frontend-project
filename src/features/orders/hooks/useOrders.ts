
import { useState, useEffect, useCallback } from 'react';
import { ordersService } from '../orders_services';
import type { Order } from '../../../../types';

export const useOrders = (initialPage = 1) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });

  const fetchOrders = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const data = await ordersService.list({ page });
      setOrders(data.data);
      setPagination({
        currentPage: data.meta.current_page,
        totalPages: data.meta.last_page
      });
    } catch (err) {
      // Handled by client interceptor
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(initialPage);
  }, [fetchOrders, initialPage]);

  return { orders, isLoading, pagination, fetchOrders };
};
