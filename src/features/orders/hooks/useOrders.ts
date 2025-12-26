import { useState, useEffect, useCallback } from 'react';
import { ordersService } from '../orders_services';
import type { Order } from '../../../../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const orders = await ordersService.list();
      setOrders(orders);
    } catch (error) {
      console.error('Failed to load orders', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, isLoading };
};
