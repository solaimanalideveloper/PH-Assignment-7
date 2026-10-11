import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, unitLabel } from "@/lib/format";
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
      <div className="flex items-center gap-3">
        <p className="rounded-2xl bg-[#f0f5f0] p-2 text-3xl">{product.image}</p>
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold sm:text-[17px]">
            {product.nameBn}
          </h2>
          <p className="text-sm text-gray-500">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">
          {formatPrice(product.today)} <span className="text-sm">টাকা</span>
        </h2>
        <ChangeBadge dir={product.change?.dir} pct={product.change?.pct} />
      </div>
    </Link>
  );
};

export default ProductItem;
