
import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const setPagination = useCallback((meta: any) => {
    setCurrentPage(meta.current_page);
    setTotalPages(meta.last_page);
  }, []);

  const nextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

  return { currentPage, totalPages, setPagination, setCurrentPage, nextPage, prevPage };
};
