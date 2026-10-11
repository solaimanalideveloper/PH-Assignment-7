const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => BN_DIGITS[+d]);

export const formatPrice = (n: number | string) =>
  toBn(Number(n).toLocaleString("en-US"));

export const formatPct = (n: number | string) =>
  toBn(Math.abs(Number(n)).toFixed(1));

const UNIT_MAP: Record<string, string> = {
  kg: "প্রতি কেজি",
  কেজি: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  l: "প্রতি লিটার",
  লিটার: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  ডজন: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  পিস: "প্রতি পিস",
};

export const unitLabel = (unit?: string) => {
  if (!unit) return "";
  const key = unit.trim().toLowerCase();
  return UNIT_MAP[key] ?? (unit.startsWith("প্রতি") ? unit : `প্রতি ${unit}`);
};
