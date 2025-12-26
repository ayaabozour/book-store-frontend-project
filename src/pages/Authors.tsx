import React, { useEffect, useState } from 'react';
import { Mail, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import type { User } from '../../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const res = await api.get<{ success: boolean; data: User[]; message: string }>('/admin/users/authors');
      setAuthors(res.data); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to load authors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Authors Directory</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your network of contributing writers.</p>
        </div>
      </div>

      {authors.length === 0 ? (
        <div className="text-center text-gray-500">No authors found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Author</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden md:table-cell">Biography</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {authors.map((author) => (
                <tr key={author.id} className="group hover:bg-primary/[0.01] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center font-bold text-sm border border-primary/10 shrink-0`}>
                        {author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">{author.name}</div>
                        <div className="text-[11px] text-gray-400 flex items-center mt-0.5 font-medium">
                          <Mail size={10} className="mr-1" /> {author.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-xs text-gray-500 max-w-xs line-clamp-1 italic font-medium">
                      No bio available.
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider 
                     bg-emerald-50 text-emerald-600 border border-emerald-100`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-emerald-500 `} />
                      active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 opacity-100 transition-opacity">
                      <button title="Edit" className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button title="Delete" className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                      <button title="Options" className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {authors.length} authors</span>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white text-gray-300">Prev</button>
              <button disabled className="px-3 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white text-gray-300">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
