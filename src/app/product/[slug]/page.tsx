import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { Market } from "@/types/product";

const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const lowest = Math.min(...product.markets.map((m: Market) => m.min));
  const highest = Math.max(...product.markets.map((m: Market) => m.max));
  const diff = product.today - product.yesterday;

  const sorted = [...product.markets].sort(
    (a: Market, b: Market) => (a.min + a.max) / 2 - (b.min + b.max) / 2,
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/">হোম</Link> ›{" "}
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>{" "}
        › <span>{product.nameBn}</span>
      </nav>

      <section className="mb-6 flex items-center justify-between rounded-xl border bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{product.image}</div>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি কেজি · {product.categoryNameBn}
            </p>
            <p className="text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              <b>{diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত"}</b>
              {diff !== 0 && ` · ${toBn(Math.abs(diff))} টাকা`}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(product.today)}</p>
          <p className="text-xs text-gray-500">টাকা / কেজি</p>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="সর্বনিম্ন দাম" value={lowest} color="text-green-700" />
        <Stat label="সর্বাধিক দাম" value={highest} color="text-red-600" />
        <Stat
          label="আজকের গড় দাম"
          value={product.today}
          color="text-green-700"
        />
      </section>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3 text-right">সর্বনিম্ন</th>
                <th className="p-3 text-right">সর্বাধিক</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m: Market) => (
                <tr key={m.market} className="border-t even:bg-green-50/50">
                  <td className="p-3 font-medium">{m.market}</td>
                  <td className="p-3">{m.division}</td>
                  <td className="p-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="p-3 text-right">{toBn(m.max)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {toBn(value)} <span className="text-sm">টাকা</span>
      </p>
    </div>
  );
}

export default ProductDetailsPage;
