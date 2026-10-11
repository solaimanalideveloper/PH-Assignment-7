import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import HeroSection from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const HomeContent = async () => {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  return <ProductCard isLoggedIn={!!session} />;
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<div className="bg-green-100 min-h-64" />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}