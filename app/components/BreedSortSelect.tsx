"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function BreedSortSelect({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) {
  // Function to toggle sort order
  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    // Add any additional sorting logic here if needed
    console.log(`Sorting by: ${value}`);
  };

  return (
    <Select value={sortOrder} onValueChange={handleSortOrderChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by Breed" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="breed:asc">Breed (A to Z)</SelectItem>
        <SelectItem value="breed:desc">Breed (Z to A)</SelectItem>
      </SelectContent>
    </Select>
  );
}
