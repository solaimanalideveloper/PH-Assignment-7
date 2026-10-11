"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const HeroButton = () => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "#সব-পণ্য" : "/sign-in"} className="btn btn-success">
      সব পণ্য দেখুন
    </Link>
  );
};

export default HeroButton;
