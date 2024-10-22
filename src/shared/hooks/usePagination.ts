import { useState } from 'react';

export const usePagination = (totalPages: number, visiblePages: number = 5) => {
  const [active, setActive] = useState(1);

  const next = () => setActive((prev) => Math.min(prev + 1, totalPages));
  const prev = () => setActive((prev) => Math.max(prev - 1, 1));

  const startPage = Math.floor((active - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  return { active, startPage, endPage, next, prev, setActive };
};
