import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/data";
import { Market, Product } from "@/types/product";
import { formatPrice, toBn, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);
  if (!product) notFound();

  const markets = product.markets ?? [];
  const hasMarkets = markets.length > 0;

  const lowest = hasMarkets ? Math.min(...markets.map((m) => m.min)) : 0;
  const highest = hasMarkets ? Math.max(...markets.map((m) => m.max)) : 0;
  const average = hasMarkets
    ? Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
          markets.length,
      )
    : product.today;

  const sorted = [...markets].sort(
    (a, b) => (a.min + a.max) / 2 - (b.min + b.max) / 2,
  );
  const cheapest = sorted[0];

  const diff = product.today - product.yesterday;
  const trendText = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত";
  const unit = unitLabel(product.unit);

  const summary = hasMarkets
    ? `${toBn(markets.length)}টি বাজারের তথ্য অনুযায়ী ${product.nameBn}-এর আজকের গড় দাম ${formatPrice(average)} টাকা। সবচেয়ে কম দাম পাওয়া যাচ্ছে ${cheapest.market}-এ।`
    : `${product.nameBn}-এর আজকের দাম ${formatPrice(product.today)} টাকা।`;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          হোম
        </Link>{" "}
        ›{" "}
        <Link
          href={`/category/${product.category}`}
          className="hover:underline"
        >
          {product.categoryNameBn}
        </Link>{" "}
        › <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      {/* সামারি */}
      <section className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{product.image}</div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-gray-600">{summary}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {unit}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                আজ দাম {trendText}
              </span>
            </div>

            <p className="mt-3 text-sm">
              গতকালের তুলনায়{" "}
              {diff !== 0
                ? `${toBn(Math.abs(diff))} টাকা ${trendText}`
                : "কোনো পরিবর্তন নেই"}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-green-50 p-4 text-center sm:min-w-40">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
          <p className="mb-2 text-xs text-gray-500">টাকা · {unit}</p>
          <ChangeBadge dir={product.change?.dir} pct={product.change?.pct} />
        </div>
      </section>

      {/* দামের সারসংক্ষেপ */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="সর্বনিম্ন দাম" value={lowest} color="text-green-700" />
        <Stat label="সর্বাধিক দাম" value={highest} color="text-red-600" />
        <Stat label="গড় দাম" value={average} color="text-gray-900" />
      </section>

      {/* বাজারভিত্তিক দাম */}
      <section className="rounded-xl border bg-white p-4 sm:p-6">
        <h2 className="mb-4 font-semibold">বাজারভিত্তিক আজকের দাম</h2>

        {hasMarkets ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">বাজার</th>
                  <th className="p-3">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বাধিক</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((m: Market, i) => (
                  <tr
                    key={`${m.market}-${m.division}`}
                    className="border-t even:bg-green-50/50"
                  >
                    <td className="p-3 font-medium">
                      {m.market}
                      {i === 0 && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                          সবচেয়ে কম
                        </span>
                      )}
                    </td>
                    <td className="p-3">{m.division}</td>
                    <td className="p-3 text-right">
                      {formatPrice(m.min)} টাকা
                    </td>
                    <td className="p-3 text-right">
                      {formatPrice(m.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক তথ্য এখনও নেই।
          </p>
        )}
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
        {formatPrice(value)} <span className="text-sm">টাকা</span>
      </p>
    </div>
  );
}

export default ProductDetailsPage;
