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

// import { getAllProducts } from "@/lib/data";
// import Link from "next/link";
// import { Product } from "@/types/product";

// const ProductCard = async () => {
//   const allProductData = await getAllProducts();
//   const upItems = allProductData.filter(
//     (item: Product) => item.change?.dir === "up",
//   );
//   const downItems = allProductData.filter(
//     (item: Product) => item.change?.dir === "down",
//   );

//   return (
//     <div className="bg-green-100 py-15">
//       <div className="container mx-auto">
//         <div className="mb-10">
//           <h2 className="font-bold text-2xl">আজ দাম বেড়েছে</h2>
//           <div>
//             <div className="grid grid-cols-3 gap-4 mt-5">
//               {upItems.slice(0, 4).map((hightPrice: Product) => (
//                 <Link
//                   key={hightPrice.id}
//                   href={`/product/${hightPrice.slug}`}
//                   className=" p-4 rounded-2xl bg-white"
//                 >
//                   <div>
//                     <div className="flex gap-2 items-center">
//                       <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
//                         {hightPrice.image}
//                       </p>
//                       <div>
//                         <h2 className="font-semibold text-[17px]">
//                           {hightPrice.nameBn}
//                         </h2>
//                         <p>{hightPrice.unit}</p>
//                       </div>
//                     </div>

//                     <p className="my-2">আজকের দাম</p>
//                     <div className="flex justify-between">
//                       <h2 className="font-bold">
//                         {hightPrice.today} <span>টাকা</span>
//                       </h2>
//                       <p className="font-bold">{hightPrice.change.pct}</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mb-10">
//           <h2 className="font-bold text-2xl">আজ দাম কমেছে</h2>
//           <div>
//             <div className="grid grid-cols-3 gap-4 mt-5">
//               {downItems.slice(0, 4).map((downPrice: Product) => (
//                 <Link
//                   href={`/product/${downPrice.slug}`}
//                   key={downPrice.id}
//                   className=" p-4 rounded-2xl bg-white"
//                 >
//                   <div>
//                     <div className="flex gap-2 items-center">
//                       <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
//                         {downPrice.image}
//                       </p>
//                       <div>
//                         <h2 className="font-semibold text-[17px]">
//                           {downPrice.nameBn}
//                         </h2>
//                         <p>{downPrice.unit}</p>
//                       </div>
//                     </div>

//                     <p className="my-2">আজকের দাম</p>
//                     <div className="flex justify-between">
//                       <h2 className="font-bold">
//                         {downPrice.today} <span>টাকা</span>
//                       </h2>
//                       <p className="font-bold">{downPrice.change.pct}</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="font-bold text-2xl">সব পণ্য</h2>
//           <p className="mt-2">
//             মোট {allProductData.length} টি পণ্য দেখানো হচ্ছে
//           </p>
//           <div className="grid grid-cols-3 gap-4 mt-5">
//             {allProductData.map((product: Product) => (
//               <Link
//                 href={`/product/${product.slug}`}
//                 key={product.id}
//                 className=" p-4 rounded-2xl bg-white"
//               >
//                 <div>
//                   <div className="flex gap-2 items-center">
//                     <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
//                       {product.image}
//                     </p>
//                     <div>
//                       <h2 className="font-semibold text-[17px]">
//                         {product.nameBn}
//                       </h2>
//                       <p>{product.unit}</p>
//                     </div>
//                   </div>

//                   <p className="my-2">আজকের দাম</p>
//                   <div className="flex justify-between">
//                     <h2 className="font-bold">
//                       {product.today} <span>টাকা</span>
//                     </h2>
//                     <p className="font-bold">{product.change.pct}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
