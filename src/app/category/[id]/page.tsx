import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/data";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/types/product";
import SortDropdown from "@/components/SortDropdown";

const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

const CategoryDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { id } = await params;
  const { sort } = await searchParams;

  const products: Product[] = await getProductsByCategory(id);
  if (products.length === 0) notFound();

  const sorted = [...products];
  if (sort === "price-asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "price-desc") sorted.sort((a, b) => b.today - a.today);
  if (sort === "name")
    sorted.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));

  const first = products[0];

  return (
    <div className="bg-green-100 py-10">
      <div className="container mx-auto max-w-5xl px-4">
        {/* হেডার */}
        <section className="mb-6 flex items-center gap-4 rounded-xl bg-white p-6">
          <div className="text-5xl">{first.categoryIcon}</div>
          <div>
            <h1 className="text-2xl font-bold">{first.categoryNameBn}</h1>
            <p className="text-sm text-gray-500">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* সাজান */}
        <SortDropdown current={sort} />
        {/* SortDropdown আপনার আছে, নিচে ব্যাখ্যা দেখুন */}

        <p className="mb-4 text-sm text-gray-500">
          মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sorted.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
