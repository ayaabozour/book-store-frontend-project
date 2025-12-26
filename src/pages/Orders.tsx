
import React from 'react';
import { useOrders } from '../features/orders/hooks/useOrders';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ShoppingBag, Calendar, User, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { ORDER_STATUS } from '../../types';
import type { OrderStatus } from '../../types';


export const Orders: React.FC = () => {
  const { orders, isLoading, pagination, fetchOrders } = useOrders();

const STATUS_STYLES: Record<OrderStatus, string> = {
  [ORDER_STATUS.PAID]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  [ORDER_STATUS.PENDING]: 'bg-amber-50 text-amber-700 border-amber-100',
  [ORDER_STATUS.CANCELLED]: 'bg-rose-50 text-rose-700 border-rose-100',
};

const getStatusColor = (status: OrderStatus) =>
  STATUS_STYLES[status] ?? 'bg-gray-50 text-gray-700 border-gray-100';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
        <p className="text-gray-500 text-lg font-medium">Track and process your library transactions.</p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Order #{order.id}</h3>
                    <div className="flex items-center text-gray-500 text-sm font-medium mt-1">
                      <Calendar size={14} className="mr-1" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Customer</p>
                      <p className="font-bold text-gray-900">{order.user?.name || 'Guest'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Total Amount</p>
                      <p className="font-bold text-primary text-lg">${order.total}</p>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex items-center">
                    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-2xl font-bold text-sm hover:border-primary hover:text-primary transition-all shadow-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center justify-between bg-white px-8 py-6 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
              Page <span className="text-primary">{pagination.currentPage}</span> of <span className="text-primary">{pagination.totalPages}</span>
            </span>
            <div className="flex gap-3">
              <button 
                onClick={() => fetchOrders(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => fetchOrders(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
