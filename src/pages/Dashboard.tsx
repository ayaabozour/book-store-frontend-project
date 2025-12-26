
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { ApiResponse, Book, Order, User } from '../../types';
import { BookOpen, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ books: 0, orders: 0, users: 0, revenue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksRes, ordersRes,authorRes] = await Promise.all([
          api.get<ApiResponse<Book[]>>('books'),
          api.get<ApiResponse<Order[]>>('orders'),
          api.get<ApiResponse<User[]>>('admin/users/authors')
        ]);

        const books = booksRes.data;
        const orders = ordersRes.data;
        const authors = authorRes.data;
        
        setStats({
          books: books.length,
          orders: orders.length,
          users: authors.length,
          revenue: ordersRes.data.reduce((acc, curr) => acc + Number(curr.total), 0)
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed fetching data, try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const cards = [
    { label: 'Total Books', value: stats.books, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Authors', value: stats.users, icon: Users, color: 'bg-purple-500' },
    { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500">Here's what's happening with your library today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className={`${card.color} p-4 rounded-xl text-white mr-4 shadow-lg`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Inventory Trends</h3>
            <span className="flex items-center text-sm text-green-600 font-bold">
              <TrendingUp size={16} className="mr-1" /> +12.5%
            </span>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 95, 75].map((h, i) => (
              <div 
                key={i} 
                className="w-full bg-primary/20 rounded-t-lg hover:bg-primary transition-colors cursor-pointer" 
                style={{ height: `${h}%` }}
                title={`Month ${i + 1}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group">
              <p className="font-bold group-hover:text-primary">New Order</p>
              <p className="text-sm text-gray-500">Create a customer order</p>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group">
              <p className="font-bold group-hover:text-primary">Restock Books</p>
              <p className="text-sm text-gray-500">Update inventory levels</p>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group">
              <p className="font-bold group-hover:text-primary">Reports</p>
              <p className="text-sm text-gray-500">Download monthly summary</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
