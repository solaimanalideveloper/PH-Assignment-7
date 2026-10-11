import Image from "next/image";
import HeroImg from "../../public/bazar-hero.png";
import TodayDate from "./ToDayDate";
import HeroButton from "./HeroButton";

const HeroSection = () => {
  return (
    <div className="bg-green-100 px-4 py-8 sm:py-12">
      <div className="container mx-auto flex flex-col-reverse items-center gap-6 rounded-3xl bg-white p-6 sm:p-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <TodayDate />
          <h1 className="mb-3 text-2xl font-bold sm:mb-5 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mb-5 text-sm text-gray-700 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <HeroButton />
        </div>

        <div className="w-full max-w-55 shrink-0 sm:max-w-xs md:max-w-sm">
          <Image
            src={HeroImg}
            alt="বাজারের পণ্যের ছবি"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
