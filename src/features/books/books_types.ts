
import type { Category, User } from '../../../types';

export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
  author_id: number;
  author?: User;
}

export interface BookFilters {
  search?: string;
  category_id?: string;
  page?: number;
  per_page?: number;
}
