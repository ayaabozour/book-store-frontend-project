import React, { useState, useMemo } from 'react';
import { useCategories } from '../features/categories/hooks/useCategories';
import {
  Hash,
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  BookOpen,
  Layers,
} from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { AddCategoryModal } from '../components/AddCategoryModal';

export const Categories: React.FC = () => {
  const { categories = [], isLoading, addCategory } = useCategories();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredCategories = useMemo(
    () =>
      categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  const handleAddCategory = async (name: string) => {
    await addCategory(name);
    setShowModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Category Collections
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Organize your library inventory with taxonomies.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center shadow-xl shadow-primary/20 hover:bg-secondary transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" />
          New Category
        </button>
      </div>
      <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 flex items-center">
        <div className="relative flex-1">
          <Hash
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full pl-12 pr-6 py-4 bg-transparent outline-none font-medium text-gray-600"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredCategories.length === 0 ? (
        <div className="py-20 text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest">
            No categories found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <div
              key={category.id}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Layers size={24} />
                </div>
                <button className="p-2 text-gray-300 hover:text-gray-900">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">
                {category.name}
              </h3>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <BookOpen size={14} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Books: {category.books_count ?? 0}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddCategory}
        />
      )}
    </div>
  );
};
