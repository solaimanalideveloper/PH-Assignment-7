import { formatPct } from "@/lib/format";

type Props = {
  dir?: string;
  pct?: number | string;
};

const ChangeBadge = ({ dir, pct = 0 }: Props) => {
  const isUp = dir === "up";
  const isDown = dir === "down";

  const style = isUp
    ? "bg-green-50 text-green-700"
    : isDown
      ? "bg-red-50 text-red-600"
      : "bg-gray-100 text-gray-500";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${style}`}
    >
      <span>{arrow}</span>
      <span>{formatPct(pct)}%</span>
    </span>
  );
};

export default ChangeBadge;
