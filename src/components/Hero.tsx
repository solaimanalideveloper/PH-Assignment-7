import Image from "next/image";
import Hero from "../../public/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
  return (
    <div className="bg-green-100 py-15">
      <div className="container mx-auto flex justify-between bg-white  rounded-3xl ">
        <div className="ml-3">
          <p className="my-2 text-2xl font-semibold text-[#05893E]">{date}</p>
          <h1 className="font-bold text-4xl mb-5">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mb-5 ">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button className="btn btn-success mb-10">সব পণ্য দেখুন</button>
        </div>

        <div>
          <Image src={Hero} alt="Hero image loading..."></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
