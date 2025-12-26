import { useState, useEffect, useCallback } from 'react';
import type { Book, BookFilters } from '../books_types';
import { api } from '../../../services/api';
import toast from 'react-hot-toast';

interface PaginatedBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}

export const useBooks = (initialFilters: BookFilters = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<BookFilters>(initialFilters);

const fetchBooks = useCallback(async () => {
  setIsLoading(true);
  try {
    const params: any = {
      search: filters.search || '',
      category_id: filters.category_id || '',
    };

    const res = await api.get<PaginatedBooksResponse>('/books', { params });

    if (res.data) {
      setBooks(res.data);
    } else {
      toast.error('Failed to load books');
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to load books');
  } finally {
    setIsLoading(false);
  }
}, [filters]);

  useEffect(() => {
  const timeout = setTimeout(() => {
    fetchBooks();
  }, 300);

  return () => clearTimeout(timeout);
}, [filters.search, filters.category_id]);

  const addBook = async (payload: Partial<Book>) => {
    try {
      await api.post('/books', payload);
      toast.success('Book added successfully');
      fetchBooks();
    } catch {
      toast.error('Failed to add book');
    }
  };

  const removeBook = async (id: number) => {
    if (!window.confirm('Delete this book permanently?')) return;
    try {
      await api.delete(`/books/${id}`);
      toast.success('Book removed');
      fetchBooks();
    } catch {
      toast.error('Failed to delete book');
    }
  };

 const updateFilters = (newFilters: Partial<BookFilters>) => {
  setFilters(prev => ({ ...prev, page: 1, ...newFilters })); 
};

  return { books, isLoading, filters, updateFilters, addBook, removeBook, refresh: fetchBooks };
};
