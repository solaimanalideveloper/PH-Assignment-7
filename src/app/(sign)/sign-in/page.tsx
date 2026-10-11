"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

type SignInFormData = {
  email: string;
  password: string;
};

type SocialProvider = "google" | "github";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const GENERIC_ERROR = "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toastShown = useRef(false);

  useEffect(() => {
    if (toastShown.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirected") === "1") {
      toastShown.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।");
    }
  }, []);

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as SignInFormData;

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? GENERIC_ERROR);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push("/");
    router.refresh();
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? GENERIC_ERROR);
    }
  };

  return (
    <div className="bg-[#F4F6F4] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div>
          <h1 className="font-bold text-3xl text-center my-5">সাইন ইন</h1>
          <p className="mb-5 text-center text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Form
          className="flex w-full max-w-md flex-col gap-4 bg-white py-10 px-5 rounded-2xl mx-auto"
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
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password">
            <Label>পাসওয়ার্ড</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={showPassword ? "text" : "password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  onPress={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-11 rounded-lg bg-green-700 text-white font-semibold shadow-md hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              onPress={() => handleSocialSignIn("google")}
              className="h-11 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              onPress={() => handleSocialSignIn("github")}
              className="h-11 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-green-700 font-medium hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-gray-600">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
