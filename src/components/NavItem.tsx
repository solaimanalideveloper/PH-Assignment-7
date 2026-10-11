import Link from "next/link";
import { getCategories } from "@/lib/data";
import { Category } from "@/types/product";
import PriceTicker from "./PriceTicker";

const NavItem = async () => {
  const categories = await getCategories();

  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="flex">
          {categories.map((cat: Category) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="mx-3 flex items-center font-semibold"
            >
              <span className="mx-2">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
      <PriceTicker></PriceTicker>
    </div>
  );
};

export default NavItem;
