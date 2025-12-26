
import React from 'react';
import { Search, Filter, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useBooks } from '../features/books/hooks/useBooks';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../features/categories/hooks/useCategories';

export const Books: React.FC = () => {
  const { user } = useAuth();
  const { categories } = useCategories();
  const isAuthor = user?.role?.name.toLowerCase() === 'author';

  const { 
    books, 
    isLoading, 
    pagination, 
    filters, 
    updateFilters, 
    changePage, 
    removeBook 
  } = useBooks({ per_page: 10 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Library Inventory</h1>
          <p className="text-gray-500 text-lg font-medium">Manage and track your collection in real-time.</p>
        </div>
        {isAuthor && (
          <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-xl shadow-primary/20 hover:bg-secondary active:scale-95 transition-all">
            <Plus size={20} className="mr-2" />
            Add New Title
          </button>
        )}
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search titles..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-primary focus-within:bg-white transition-all shadow-sm">
            <Filter className="text-gray-400 mr-2" size={18} />
            <select
              className="bg-transparent text-gray-700 font-bold outline-none cursor-pointer"
              value={filters.category_id || ''}
              onChange={(e) => updateFilters({ category_id: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Book Details</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Availability</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Unit Price</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {books.map(book => (
                  <tr key={book.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">{book.title}</div>
                      <div className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-tighter">{book.category?.name || 'General'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-tight ${book.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${book.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-gray-900 font-black text-xl tracking-tight">${book.price}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {isAuthor && (
                          <>
                            <button className="p-3 text-gray-400 hover:text-primary hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-gray-100">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => removeBook(book.id)}
                              className="p-3 text-gray-400 hover:text-rose-600 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-gray-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
              Page <span className="text-primary">{pagination.currentPage}</span> of <span className="text-primary">{pagination.totalPages}</span>
            </span>
            <div className="flex gap-3">
              <button 
                onClick={() => changePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-primary hover:text-primary disabled:opacity-40 transition-all shadow-sm"
              >
                <ChevronLeft size={18} className="mr-1" />
                Previous
              </button>
              <button 
                onClick={() => changePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-primary hover:text-primary disabled:opacity-40 transition-all shadow-sm"
              >
                Next
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
