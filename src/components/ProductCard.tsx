import { getProducts } from "@/lib/data";
import { Product } from "@/types/product";
import { toBn } from "@/lib/format";
import ProductItem from "./ProductItem";

const absPct = (p: Product) => Math.abs(Number(p.change?.pct ?? 0));

const ProductCard = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const all: Product[] = await getProducts();

  const risers = all
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => absPct(b) - absPct(a))
    .slice(0, 6);

  const fallers = all
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => absPct(b) - absPct(a))
    .slice(0, 6);

  const grid3 = "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";
  const grid4 =
    "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="bg-green-100 px-4 py-10">
      <div className="container mx-auto">
        <section className="mb-10">
          <h2 className="text-xl font-bold sm:text-2xl">আজ দাম বেড়েছে ▲</h2>
          <div className={grid3}>
            {risers.map((p) => (
              <ProductItem key={p.id} product={p} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold sm:text-2xl">আজ দাম কমেছে ▼</h2>
          <div className={grid3}>
            {fallers.map((p) => (
              <ProductItem key={p.id} product={p} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>

        <section id="সব-পণ্য" className="scroll-mt-4">
          <h2 className="text-xl font-bold sm:text-2xl">সব পণ্য</h2>
          <p className="mt-2 text-sm text-gray-700 sm:text-base">
            মোট {toBn(all.length)}টি পণ্য দেখানো হচ্ছে
          </p>
          <div className={grid4}>
            {all.map((p) => (
              <ProductItem key={p.id} product={p} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
