"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut, useSession } from "@/lib/auth-client";

const AuthButtons = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক করলে মেনু বন্ধ
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    const { error } = await signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };

   if (isPending) {
     return <div className="h-10 w-40 rounded-lg bg-gray-100 animate-pulse" />;
   }

    if (!session) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/sign-in"
            className="btn btn-sm font-semibold sm:btn-md sm:text-lg"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-sm font-semibold sm:btn-md sm:text-lg"
          >
            সাইন আপ
          </Link>
        </div>
      );
    }

  const { user } = session;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="ইউজার মেনু"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="size-10 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <span className="size-10 rounded-full bg-green-700 text-white font-bold flex items-center justify-center">
            {initial}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-200 shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            আমার প্রোফাইল
          </Link>
          <Link
            href="/profile/update"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            প্রোফাইল আপডেট
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
