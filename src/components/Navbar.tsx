import Image from "next/image";
import Logo from "../../public/logo-icon.png";
import TodayDate from "./ToDayDate";
import Link from "next/link";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <div className="container mx-auto mt-5 flex justify-between">
      {/* Left side: Logo image and text, date */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div>
          <Image
            src={Logo}
            alt="Logo image loading..."
            className="w-15 h-15 p-3 bg-[#05893e] border border-fuchsia-400 rounded-2xl"
          ></Image>
        </div>
        <div>
          <h2 className="font-bold text-2xl">বাজার দর</h2>
          <TodayDate></TodayDate>
        </div>
      </Link>

      {/* Right side: লগইন অবস্থা অনুযায়ী বাটন বা ইউজার মেনু */}
      <div className="flex gap-2 items-center">
        <AuthButtons />
      </div>
    </div>
  );
};

export default Navbar;
