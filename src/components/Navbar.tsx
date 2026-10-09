import Image from "next/image";
import Logo from "../../public/logo-icon.png";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <div className="container mx-auto mt-5 flex justify-between">
      {/* Left side: Logo image and text, date */}
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={Logo}
            alt="Logo image loading..."
            className="w-15 h-15 p-3 bg-[#05893e] border border-fuchsia-400 rounded-2xl"
          ></Image>
        </div>
        <div>
          <h2 className="font-bold text-2xl">বাজার দর</h2>
          <p>{date}</p>
        </div>
      </div>
      {/* Right side Sign-In and Sign-up */}
      <div className="flex gap-2 items-center">
        <button className="btn font-semibold text-[18px]">সাইন ইন</button>
        <button className="btn font-semibold text-[18px]">সাইন আপ</button>
      </div>
    </div>
  );
};

export default Navbar;
