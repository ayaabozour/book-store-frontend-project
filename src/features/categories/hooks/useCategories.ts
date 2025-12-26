import { useState, useEffect, useCallback } from 'react';
import { categoriesService } from '../categories_services';
import type { Category } from '../../../../types';
import toast from 'react-hot-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

 const fetchCategories = useCallback(async () => {
  setIsLoading(true);
  try {
    const res = await categoriesService.list({ per_page: 50 });
    setCategories(res); 
  } catch (err) {
    console.error('Failed to fetch categories', err);
  } finally {
    setIsLoading(false);
  }
}, []);

  const addCategory = async (name: string) => {
    try {
      await categoriesService.store(name);
      toast.success(`Category "${name}" created.`);
      await fetchCategories(); 
    } catch (err) {
      toast.error('Failed to create category.');
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, refresh: fetchCategories, addCategory };
};
