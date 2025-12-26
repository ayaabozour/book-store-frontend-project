
import { useState, useEffect, useCallback } from 'react';
import { booksService } from '../books_services';
import type { Book, BookFilters } from '../books_types';
import toast from 'react-hot-toast';

export const useBooks = (initialFilters: BookFilters = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState<BookFilters>(initialFilters);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await booksService.getBooks(filters);
      setBooks(data.data);
      setPagination({
        currentPage: data.meta.current_page,
        totalPages: data.meta.last_page,
        totalItems: data.meta.total
      });
    } catch (err) {
      // Errors handled by interceptor
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const removeBook = async (id: number) => {
    if (!window.confirm('Delete this book permanently?')) return;
    try {
      await booksService.deleteBook(id);
      toast.success('Book removed');
      fetchBooks();
    } catch (err) {}
  };

  const updateFilters = (newFilters: Partial<BookFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return {
    books,
    isLoading,
    pagination,
    filters,
    removeBook,
    updateFilters,
    changePage,
    refresh: fetchBooks
  };
};
