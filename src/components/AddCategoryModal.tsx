
import React, { useState } from 'react';
import { X, Layers, Loader2 } from 'lucide-react';

interface AddCategoryModalProps {
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onAdd }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAdd(name);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/20 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="bg-primary p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers size={24} className="text-accent" />
            <h2 className="text-xl font-bold">Add New Collection</h2>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
              Category Name
            </label>
            <input
              required
              autoFocus
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              placeholder="e.g. Contemporary Fiction"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              ' Create Category'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
