
import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">{title}</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 active:scale-[0.98] transition-all shadow-lg shadow-rose-500/20 disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="animate-spin" size={20} /> : 'Delete Permanently'}
            </button>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
            >
              Keep Gateway
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
