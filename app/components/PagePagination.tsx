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
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const MAX_VISIBLE_PAGES = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (page <= half) {
      end = Math.min(totalPages, MAX_VISIBLE_PAGES);
    } else if (page + half >= totalPages) {
      start = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {page > MAX_VISIBLE_PAGES && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {getVisiblePages().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
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
                href="#"
                onClick={(e) => handlePageChange(totalPages)}
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
