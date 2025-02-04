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

import { useState } from "react";

export function PagePagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (page: number) => void;
}) {
  const totalPages = 5; // Example total pages

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={page === index + 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && <PaginationEllipsis />}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
