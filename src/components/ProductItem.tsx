import Link from "next/link";
import { Product } from "@/types/product";
import ChangeBadge from "./ChangeBadge";

const ProductItem = ({
  product,
  isLoggedIn = true,
}: {
  product: Product;
  isLoggedIn?: boolean;
}) => {
  return (
    <Link
      href={isLoggedIn ? `/product/${product.slug}` : "/sign-in"}
      className="block rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.12)] hover:ring-emerald-100"
    >
      <div className="flex items-center gap-2">
        <p className="rounded-2xl bg-[#f0f5f0] p-2 text-3xl">{product.image}</p>
        <div>
          <h2 className="text-[17px] font-semibold">{product.nameBn}</h2>
          <p>{product.unit}</p>
        </div>
      </div>

      <p className="my-2">আজকের দাম</p>
      <div className="flex justify-between">
        <h2 className="font-bold">
          {product.today} <span>টাকা</span>
        </h2>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
};

export default ProductItem;
