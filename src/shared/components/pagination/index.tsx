'use client';
import React, { FunctionComponent } from 'react';
import { PaginationProps } from './props';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { usePagination } from '@/shared/hooks/usePagination';

export const Pagination: FunctionComponent<PaginationProps> = ({
  totalPages,
  onPageChange
}) => {
  const { active, startPage, endPage, next, prev, setActive } =
    usePagination(totalPages);

  const handlePageChange = (page: number) => {
    setActive(page);
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center lg:gap-4">
      <Button
        variant="text"
        className="items-center lg:gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        <div className="hidden lg:block">Previous</div>
      </Button>

      <div className="flex items-center lg:gap-2">
        {startPage > 1 && <span className="hidden lg:block">...</span>}
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <IconButton
            variant={active === startPage + index ? 'filled' : 'text'}
            key={index}
            onClick={() => handlePageChange(startPage + index)}
            color="gray"
          >
            {startPage + index}
          </IconButton>
        ))}
        {endPage < totalPages && <span className="hidden lg:block">...</span>}
      </div>
      <Button
        variant="text"
        className="items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === totalPages}
      >
        <div className="hidden lg:block">Next</div>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};
