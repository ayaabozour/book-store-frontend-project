import React from 'react';
import { useOrders } from '../features/orders/hooks/useOrders';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { ORDER_STATUS } from '../../types';

export const Orders: React.FC = () => {
  const { orders, isLoading } = useOrders();

  const STATUS_STYLES: Record<string, string> = {
    [ORDER_STATUS.PAID]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    [ORDER_STATUS.PENDING]: 'bg-amber-50 text-amber-700 border-amber-100',
    [ORDER_STATUS.CANCELLED]: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const getStatusColor = (status?: string) =>
    STATUS_STYLES[status ?? ''] ??
    'bg-gray-50 text-gray-700 border-gray-100';

  if (isLoading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-400 font-bold">
        No orders found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900">
          Order Management
        </h1>
        <p className="text-gray-500 text-lg">
          Track your library transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {order.items?.length} item(s)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-gray-400" />
                  <span className="font-bold text-primary text-lg">
                    ${order.total}
                  </span>
                </div>

                <span
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase border ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>
                    {item.book?.title} × {item.quantity}
                  </span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
