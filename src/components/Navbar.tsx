import Image from "next/image";
import Logo from "../../public/logo-icon.png";
import TodayDate from "./ToDayDate";
import Link from "next/link";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <div className="container mx-auto mt-3 flex items-center justify-between gap-2 px-4 sm:mt-5">
      <Link href="/" className="flex min-w-0 items-center gap-2">
        <Image
          src={Logo}
          alt="বাজার দর লোগো"
          className="size-11 shrink-0 rounded-2xl border border-fuchsia-400 bg-[#05893e] p-2.5 sm:size-14 sm:p-3"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-bold sm:text-2xl">বাজার দর</h2>
          <TodayDate className="text-xs font-semibold text-[#05893E] sm:text-base" />
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        <AuthButtons />
      </div>
    </div>
  );
};

export default Navbar;
