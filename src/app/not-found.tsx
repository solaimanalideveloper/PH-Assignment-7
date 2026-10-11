import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-green-100 px-4 text-center">
      <div className="mb-3 text-6xl">🛒</div>
      <h1 className="text-5xl font-bold text-green-700">৪০৪</h1>
      <h2 className="mt-3 text-xl font-semibold">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        আপনি যে পণ্য বা ক্যাটাগরি খুঁজছেন সেটি নেই, অথবা লিংকটি ভুল।
      </p>
      <Link href="/" className="btn btn-success mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
