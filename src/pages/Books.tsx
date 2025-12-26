import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, BookOpen, Archive, DollarSign, X } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../features/categories/hooks/useCategories';
import { AddBookModal } from '../components/AddBookModal';
import { useBooks } from '../features/books/hooks/useBooks';

export const Books: React.FC = () => {
  const { user } = useAuth();
  const { categories = [] } = useCategories();
  const isAuthor = user?.role?.name.toLowerCase() === 'author';


  const { books, isLoading, filters, updateFilters, addBook, removeBook } = useBooks();
  const [showAddModal, setShowAddModal] = useState(false);

  const hasActiveFilters = filters.search || filters.category_id;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
            <BookOpen size={14} className="text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Inventory</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Library Collection</h1>
        </div>

        {(isAuthor) && (
          <button
            onClick={() => setShowAddModal(true)}
            className="group bg-primary text-white pl-5 pr-7 py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest flex items-center shadow-2xl shadow-primary/20 hover:bg-secondary active:scale-95 transition-all w-fit"
          >
            <Plus size={20} className="mr-3 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
            Add New Title
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="relative group max-w-3xl">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
            <Search size={22} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search by title, author or ISBN..."
            className="w-full pl-16 pr-24 py-5 bg-white border-2 border-gray-100 rounded-[2rem] focus:border-primary outline-none"
            value={filters.search || ''}
            onChange={e => updateFilters({ search: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => updateFilters({ category_id: undefined })}
            className={`px-6 py-3 rounded-full text-xs font-black uppercase border ${!filters.category_id ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}
          >
            All Collections
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => updateFilters({ category_id: cat.id.toString() })}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase border ${filters.category_id === cat.id.toString() ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}
            >
              {cat.name}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={() => updateFilters({ search: '', category_id: undefined })}
              className="flex items-center gap-2 text-rose-500"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {books.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Archive size={48} className="text-gray-200 mb-4" />
          <p className="text-xl font-bold text-gray-400">No titles match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map(book => (
            <div
              key={book.id}
              className="group relative bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="p-8 pb-0 flex justify-between items-start">
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                    book.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {book.stock > 0 ? 'In Stock' : 'Sold Out'}
                </div>
                {(isAuthor) && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <button className="p-2 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-xl">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeBook(book.id)}
                      className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-8 space-y-4">
                <div>
                  <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Collection</span>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{book.category?.name}</p>
                </div>
                <h3 className="text-2xl font-black text-gray-900">{book.title}</h3>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={16} />${book.price}
                  </div>
                  <div>{book.stock} Units</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && <AddBookModal onClose={() => setShowAddModal(false)} onAdd={addBook} />}
    </div>
  );
};
