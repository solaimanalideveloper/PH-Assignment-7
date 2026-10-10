"use client";

import { useRouter, usePathname } from "next/navigation";

const SortDropdown = ({ current }: { current?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4 flex items-center justify-end gap-2 rounded-xl bg-white p-4">
      <span className="text-sm">সাজান</span>
      <select
        defaultValue={current ?? ""}
        onChange={(e) => router.push(`${pathname}?sort=${e.target.value}`)}
        className="rounded border px-3 py-1 text-sm"
      >
        <option value="">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
        <option value="name">নাম</option>
      </select>
    </div>
  );
};

export default SortDropdown;
