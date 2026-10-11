"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

type SignInFormData = {
  email: string;
  password: string;
};

type SocialProvider = "google" | "github";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as SignInFormData;

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      setErrorMsg(error.message ?? "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
    setLoading(false);
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setErrorMsg(null);
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      setErrorMsg(error.message ?? "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="bg-green-100">
      <div className="container mx-auto my-10">
        <div>
          <h1 className="font-bold text-3xl text-center my-5">সাইন ইন</h1>
          <p className="mb-5 text-center">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Form
          className="flex w-96 flex-col gap-4 bg-white py-10 px-5 rounded-2xl mx-auto"
          onSubmit={handleEmailSignIn}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) =>
              EMAIL_REGEX.test(value) ? null : "সঠিক ইমেইল ঠিকানা দিন"
            }
          >
            <Label>ইমেইল</Label>
            <Input placeholder="ইমেইল" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="পাসওয়ার্ড" />
            <FieldError />
          </TextField>

          {errorMsg && (
            <p className="text-red-600 text-sm" role="alert">
              {errorMsg}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" isDisabled={loading}>
              {loading ? "অপেক্ষা করুন..." : "সাবমিট"}
            </Button>
          </div>

          <p className="text-center">অথবা</p>

          <div className="flex gap-2">
            <Button onPress={() => handleSocialSignIn("google")}>
              Google
            </Button>
            <Button onPress={() => handleSocialSignIn("github")}>
              GitHub
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
