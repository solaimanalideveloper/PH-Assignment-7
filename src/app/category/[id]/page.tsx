import { getProducts } from "@/lib/data";
import { Product } from "@/types/product";
import ProductItem from "@/components/ProductItem";

const CategoryDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const all = await getProducts();
  const products = all.filter((p: Product) => p.category === id);

  return (
    <div className="bg-green-100 py-10">
      <div className="container mx-auto">
        {products.length === 0 ? (
          <p>কোনো প্রোডাক্ট পাওয়া যায়নি</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.map((p: Product) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
