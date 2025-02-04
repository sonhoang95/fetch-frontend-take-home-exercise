"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PagePagination({
  page,
  setPage,
  totalResults,
}: {
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
}) {
  const RESULTS_PER_PAGE = 24;
  const MAX_VISIBLE_PAGES = 5;
  const totalPages = Math.floor(totalResults / RESULTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      if (start === 1) {
        end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {page > MAX_VISIBLE_PAGES && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {getVisiblePages().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className="cursor-pointer"
              isActive={page === pageNumber}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < totalPages - MAX_VISIBLE_PAGES + 1 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            className={
              page >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
