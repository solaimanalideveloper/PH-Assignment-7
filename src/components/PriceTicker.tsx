import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getProducts } from "@/lib/data";
import { Product } from "@/types/product";
import { formatPct, formatPrice } from "@/lib/format";

const PriceTicker = async () => {
  const data: Product[] = await getProducts();

  return (
    <MarqueeText direction="right" duration={10}>
      <div className="border-y border-amber-200 bg-amber-50 py-2 text-sm whitespace-nowrap sm:py-3 sm:text-base">
        {data.map((p) => {
          const dir = p.change?.dir;
          const color =
            dir === "up"
              ? "text-red-600"
              : dir === "down"
                ? "text-green-700"
                : "text-gray-500";
          const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

          return (
            <span key={p.id} className="mx-4 sm:mx-5">
              <span>{p.categoryIcon}</span>
              <span className="mx-2 font-bold">{p.nameBn}</span>
              <span>{formatPrice(p.today)} টাকা/কেজি</span>
              <span className={`mx-2 font-semibold ${color}`}>
                {arrow} {formatPct(p.change?.pct ?? 0)}%
              </span>
            </span>
          );
        })}
      </div>
    </MarqueeText>
  );
};

export default PriceTicker;
