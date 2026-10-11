import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import HeroSection from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";

const HomeContent = async () => {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  return <ProductCard isLoggedIn={!!session} />;
};

const HomeSkeleton = () => (
  <div className="bg-green-100 px-4 py-10">
    <div className="container mx-auto">
      <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
      <SkeletonGrid count={6} />
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
