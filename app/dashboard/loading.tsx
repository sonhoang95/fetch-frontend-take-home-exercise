"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "../components/SkeletonCard";

function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6 mb-10">
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
    </div>
  );
}

export default Loading;
