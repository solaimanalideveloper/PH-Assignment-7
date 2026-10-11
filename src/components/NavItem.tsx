import { getCategories } from "@/lib/data";
import { Category } from "@/types/product";
import CategoryLinks from "./CategoryLinks";
import PriceTicker from "./PriceTicker";

const NavItem = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div>
      <CategoryLinks
        categories={categories.map((c) => ({
          slug: c.slug,
          icon: c.icon,
          nameBn: c.nameBn,
        }))}
      />
      <PriceTicker />
    </div>
  );
};

export default NavItem;
