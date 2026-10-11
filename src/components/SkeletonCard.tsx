const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
    <div className="flex items-center gap-3">
      <div className="size-14 rounded-2xl bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
    <div className="mt-4 h-3 w-1/4 rounded bg-gray-200" />
    <div className="mt-2 flex items-center justify-between">
      <div className="h-5 w-1/3 rounded bg-gray-200" />
      <div className="h-6 w-16 rounded-full bg-gray-200" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
