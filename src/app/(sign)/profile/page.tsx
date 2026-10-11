import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";

const ProfileSkeleton = () => (
  <div className="w-full max-w-md mx-auto bg-white rounded-2xl py-10 px-5 flex flex-col items-center gap-4 animate-pulse">
    <div className="size-24 rounded-full bg-gray-200" />
    <div className="h-5 w-40 rounded bg-gray-200" />
    <div className="h-4 w-52 rounded bg-gray-200" />
    <div className="h-11 w-full rounded-lg bg-gray-200" />
  </div>
);

const ProfileContent = async () => {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "?";
  const joined = new Date(user.createdAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl py-10 px-5 flex flex-col items-center gap-4">
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={user.name}
          className="size-24 rounded-full object-cover border border-gray-200"
        />
      ) : (
        <div className="size-24 rounded-full bg-green-700 text-white text-4xl font-bold flex items-center justify-center">
          {initial}
        </div>
      )}

      <div className="text-center">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-400 text-xs mt-1">যোগ দিয়েছেন: {joined}</p>
      </div>

      <Link
        href="/profile/update"
        className="w-full h-11 rounded-lg bg-green-700 text-white font-semibold shadow-md hover:bg-green-800 flex items-center justify-center"
      >
        প্রোফাইল আপডেট করুন
      </Link>

      <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="bg-[#F4F6F4] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="font-bold text-3xl text-center my-5">আমার প্রোফাইল</h1>
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
