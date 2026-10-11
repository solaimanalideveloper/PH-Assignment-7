"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryLink = {
  slug: string;
  icon: string;
  nameBn: string;
};

const CategoryLinks = ({ categories }: { categories: CategoryLink[] }) => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto my-3 px-4 sm:my-5">
      <nav className="flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-3">
        {categories.map((cat) => {
          const active = pathname === `/category/${cat.slug}`;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:text-base ${
                active
                  ? "bg-green-700 text-white"
                  : "text-gray-800 hover:bg-green-100"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default CategoryLinks;
