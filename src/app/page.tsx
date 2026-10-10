import HeroSection from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategoryDetailPage from "./category/[slug]/page";


export default function Home() {
  return (
    <div>
    <HeroSection></HeroSection>
    <ProductCard></ProductCard>
    <CategoryDetailPage></CategoryDetailPage>
    </div>
  );
}
