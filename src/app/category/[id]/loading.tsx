import { SkeletonGrid } from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="bg-green-100 px-4 py-8 sm:py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 h-20 animate-pulse rounded-xl bg-white" />
        <div className="mb-4 h-14 animate-pulse rounded-xl bg-white" />
        <SkeletonGrid count={6} />
      </div>
    </div>
  );
}
