import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/data";
import ProductItem from "@/components/ProductItem";
import SortDropdown from "@/components/SortDropdown";
import { Product } from "@/types/product";
import { toBn } from "@/lib/format";

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
  if (sort === "price-asc")
    sorted.sort((a, b) => Number(a.today) - Number(b.today));
  if (sort === "price-desc")
    sorted.sort((a, b) => Number(b.today) - Number(a.today));

  const first = products[0];

  return (
    <div className="bg-green-100 px-4 py-8 sm:py-10">
      <div className="container mx-auto max-w-6xl">
        <section className="mb-6 flex items-center gap-4 rounded-xl bg-white p-4 sm:p-6">
          <div className="text-4xl sm:text-5xl">{first.categoryIcon}</div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              {first.categoryNameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <SortDropdown current={sort} />

        <p className="mb-4 text-sm text-gray-600">
          মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
