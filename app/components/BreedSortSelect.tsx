"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BreedSortSelect({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) {
  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
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
