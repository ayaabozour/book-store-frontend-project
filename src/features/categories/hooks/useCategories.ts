
import { useState, useEffect } from 'react';
import { categoriesService } from '../categories_services';
import type { Category } from '../../../../types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoriesService.list({ per_page: 50 });
      setCategories(data.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, refresh: fetchCategories };
};
