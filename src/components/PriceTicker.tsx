import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getProducts } from "@/lib/data";

interface Product {
  id: number;
  nameBn: string;
  today: string;
  categoryIcon: string;
  change: {
    pct: number;
  };
}

const PriceTicker = async () => {
  const data = await getProducts();

  return (
    <MarqueeText direction="right" duration={10}>
      <div className="border border-amber-200 py-3">
        {data.map((span: Product) => (
          <span key={span.id} className="">
            <span className="mx-5">
              <span className="text-1.5xl">{span.categoryIcon}</span>
              <span className="mx-2 font-bold">{span.nameBn}</span>
              <span>
                {span.today} <span className="mx-1"> টাকা/কেজি</span>{" "}
              </span>
              <span className="mx-2 ">{span.change.pct}</span>
            </span>
          </span>
        ))}
      </div>
    </MarqueeText>
  );
};

export default PriceTicker;
