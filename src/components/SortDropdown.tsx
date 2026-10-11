"use client";

import { useRouter, usePathname } from "next/navigation";

const SortDropdown = ({ current }: { current?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4 flex items-center justify-between gap-2 rounded-xl bg-white p-3 sm:justify-end sm:p-4">
      <label htmlFor="sort" className="text-sm font-medium">
        সাজান
      </label>
      <div className="relative">
        <select
          id="sort"
          defaultValue={current ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            router.push(v ? `${pathname}?sort=${v}` : pathname);
          }}
          className="appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
