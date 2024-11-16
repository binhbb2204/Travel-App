import React from 'react';
import { Button } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Button
        key={i}
        variant={currentPage === i ? "default" : "outline"}
        className={`w-10 h-10 ${currentPage === i ? 'bg-blue-500 text-white rounded-lg' : 'rounded-lg'}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        className="w-10 h-10 rounded-lg"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {pages}
      <Button
        variant="outline"
        className="w-10 h-10 rounded-lg"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
