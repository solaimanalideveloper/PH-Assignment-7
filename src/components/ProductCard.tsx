import { getProducts } from "@/lib/data";
import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

const ProductCard = async () => {
  const all: Product[] = await getProducts();
  const upItems = all.filter((p) => p.change?.dir === "up");
  const downItems = all.filter((p) => p.change?.dir === "down");

  return (
    <div className="bg-green-100 py-15">
      <div className="container mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">আজ দাম বেড়েছে</h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {upItems.slice(0, 4).map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold">আজ দাম কমেছে</h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {downItems.slice(0, 4).map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">সব পণ্য</h2>
          <p className="mt-2">মোট {all.length} টি পণ্য দেখানো হচ্ছে</p>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {all.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
