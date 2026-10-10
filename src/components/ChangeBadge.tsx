type Props = {
  dir: "up" | "down" | "flat";
  pct: number;
};

const ChangeBadge = ({ dir, pct }: Props) => {
  const styles = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-600",
    flat: "bg-gray-100 text-gray-500",
  };
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${styles[dir]}`}>
      {icon} {Math.abs(pct)}%
    </span>
  );
};

export default ChangeBadge;
