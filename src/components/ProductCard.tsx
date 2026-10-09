import { getAllProducts } from "@/lib/data";

interface AllProduct {
  image: string;
  today: number;
  nameBn: string;
  unit: string;
  id: number;
  change: {
    pct: number;
    dir: string;
  };
}

const ProductCard = async () => {
  const allProductData = await getAllProducts();
  const upItems = allProductData.filter(
    (item: AllProduct) => item.change?.dir === "up",
  );
  const downItems = allProductData.filter(
    (item: AllProduct) => item.change?.dir === "down",
  );

  return (
    <div className="bg-green-100 py-15">
      <div className="container mx-auto">
        <div className="mb-10">
          <h2 className="font-bold text-2xl">আজ দাম বেড়েছে</h2>
          <div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {upItems.slice(0, 4).map((hightPrice: AllProduct) => (
                <div key={hightPrice.id} className=" p-4 rounded-2xl bg-white">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
                        {hightPrice.image}
                      </p>
                      <div>
                        <h2 className="font-semibold text-[17px]">
                          {hightPrice.nameBn}
                        </h2>
                        <p>{hightPrice.unit}</p>
                      </div>
                    </div>

                    <p className="my-2">আজকের দাম</p>
                    <div className="flex justify-between">
                      <h2 className="font-bold">
                        {hightPrice.today} <span>টাকা</span>
                      </h2>
                      <p className="font-bold">{hightPrice.change.pct}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-bold text-2xl">আজ দাম কমেছে</h2>
          <div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {downItems.slice(0, 4).map((hightPrice: AllProduct) => (
                <div key={hightPrice.id} className=" p-4 rounded-2xl bg-white">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
                        {hightPrice.image}
                      </p>
                      <div>
                        <h2 className="font-semibold text-[17px]">
                          {hightPrice.nameBn}
                        </h2>
                        <p>{hightPrice.unit}</p>
                      </div>
                    </div>

                    <p className="my-2">আজকের দাম</p>
                    <div className="flex justify-between">
                      <h2 className="font-bold">
                        {hightPrice.today} <span>টাকা</span>
                      </h2>
                      <p className="font-bold">{hightPrice.change.pct}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl">সব পণ্য</h2>
          <p className="mt-2">
            মোট {allProductData.length} টি পণ্য দেখানো হচ্ছে
          </p>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {allProductData.map((product: AllProduct) => (
              <div key={product.id} className=" p-4 rounded-2xl bg-white">
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-3xl bg-[#f0f5f0] p-2 rounded-2xl ">
                      {product.image}
                    </p>
                    <div>
                      <h2 className="font-semibold text-[17px]">
                        {product.nameBn}
                      </h2>
                      <p>{product.unit}</p>
                    </div>
                  </div>

                  <p className="my-2">আজকের দাম</p>
                  <div className="flex justify-between">
                    <h2 className="font-bold">
                      {product.today} <span>টাকা</span>
                    </h2>
                    <p className="font-bold">{product.change.pct}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
