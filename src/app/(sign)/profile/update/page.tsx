import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "../update/UpdateProfileForm";

const UpdateProfilePage = async () => {
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

export default UpdateProfilePage;
