import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "./UpdateProfileForm";

const UpdateSkeleton = () => (
  <div className="bg-[#F4F6F4] min-h-screen">
    <div className="container mx-auto py-10 px-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl py-10 px-5 flex flex-col gap-4 animate-pulse">
        <div className="size-24 rounded-full bg-gray-200 mx-auto" />
        <div className="h-11 rounded-lg bg-gray-200" />
        <div className="h-11 rounded-lg bg-gray-200" />
        <div className="h-11 rounded-lg bg-gray-200" />
        <div className="h-11 rounded-lg bg-gray-200" />
      </div>
    </div>
  </div>
);

const UpdateContent = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <UpdateProfileForm
      initialName={session.user.name}
      initialImage={session.user.image ?? ""}
      email={session.user.email}
    />
  );
};

const UpdateProfilePage = () => {
  return (
    <Suspense fallback={<UpdateSkeleton />}>
      <UpdateContent />
    </Suspense>
  );
};

export default UpdateProfilePage;
