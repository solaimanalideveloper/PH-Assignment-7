import Image from "next/image";
import Hero from "../../public/bazar-hero.png";
import TodayDate from "./ToDayDate";

const HeroSection = () => {
  return (
    <div className="bg-green-100 py-15">
      <div className="container mx-auto flex justify-between bg-white  rounded-3xl pt-7">
        <div className="ml-3">
          <TodayDate></TodayDate>
          <h1 className="font-bold text-4xl mb-5">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mb-5 ">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button className="btn btn-success ">সব পণ্য দেখুন</button>
        </div>

        <div>
          <Image src={Hero} alt="Hero image loading..."></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
