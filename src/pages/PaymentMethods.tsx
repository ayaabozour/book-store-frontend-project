import React, { useState, useEffect } from 'react';
import { CreditCard, Zap, ShieldCheck, Plus, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import type { PaymentMethod, ApiResponse } from '../../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { AddPaymentMethodModal } from '../components/AddPaymentModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

const ICON_MAP: Record<string, any> = {
  cash: ShieldCheck,
  paypal: Zap,
  credit_card: CreditCard,
};

export const PaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<PaymentMethod[]>>('/payment-methods');
      setMethods(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  // Add new payment method
  const handleAddMethod = async (data: Partial<PaymentMethod>) => {
    try {
      await api.post('/payment-methods', data);
      toast.success('Payment method added successfully');
      setShowAddModal(false);
      fetchPaymentMethods();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add payment method');
      throw error;
    }
  };

  // Delete payment method
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.delete(`/payment-methods/${deleteTarget.id}`);
      toast.success('Payment method deleted');
      setDeleteTarget(null);
      fetchPaymentMethods(); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete payment method');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment Gateways</h1>
          <p className="text-sm text-gray-500 font-medium">Configure and manage transaction providers.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center shadow-lg shadow-primary/10 hover:bg-secondary transition-all"
        >
          <Plus size={18} className="mr-2" />
          Add Gateway
        </button>
      </div>

      {showAddModal && <AddPaymentMethodModal onClose={() => setShowAddModal(false)} onAdd={handleAddMethod} />}

      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Payment Method"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />

      {methods.length === 0 ? (
        <div className="text-center text-gray-500">No payment methods found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((method) => {
            const Icon = ICON_MAP[method.code] ?? CreditCard;
            return (
              <div
                key={method.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-white">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-1">{method.name}</h3>
                  <p className="text-sm text-gray-500">Code: {method.code}</p>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center text-emerald-600 text-xs font-bold">
                      <CheckCircle2 size={14} className="mr-1" />
                      Active
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-end border-t border-gray-100">
                  <button
                    onClick={() => setDeleteTarget(method)}
                    className="text-rose-600 hover:text-white hover:bg-rose-600 px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-bold transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
