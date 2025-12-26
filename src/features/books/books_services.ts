
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Book, BookFilters } from './books_types';

export const booksService = {
  getBooks: async (filters: BookFilters): Promise<PaginatedResponse<Book>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Book>>>(
      API_ENDPOINTS.books.list, 
      { params: filters }
    );
    return data.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.books.delete(id));
  },

  updateBook: async (id: number, payload: Partial<Book>): Promise<Book> => {
    const { data } = await apiClient.put<ApiResponse<Book>>(
      API_ENDPOINTS.books.update(id), 
      payload
    );
    return data.data;
  }
};
