import Link from "next/link";
import { Product } from "@/types/product";
import ChangeBadge from "./ChangeBadge";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl bg-white p-4"
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

// import Link from "next/link";
// import { Product } from "@/types/product";

// const ProductItem = ({ product }: { product: Product }) => {
//   return (
//     <Link
//       href={`/product/${product.slug}`}
//       className="block rounded-2xl bg-white p-4"
//     >
//       <div className="text-3xl">{product.image}</div>
//       <h2 className="font-semibold">{product.nameBn}</h2>
//       <p>
//         ৳{product.today}/{product.unit}
//       </p>
//     </Link>
//   );
// };

// export default ProductItem;
