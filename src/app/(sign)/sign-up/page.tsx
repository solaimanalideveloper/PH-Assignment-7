"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn, signUp } from "@/lib/auth-client";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../lib/validation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SocialProvider = "google" | "github";

const GENERIC_ERROR = "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as SignUpFormData;

    const { error } = await signUp.email({
      name: data.name.trim(),
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? GENERIC_ERROR);
      return;
    }

     toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
     router.push("/sign-in");
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
          <h1 className="font-bold text-3xl text-center my-5">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mb-5 text-center text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          className="flex w-full max-w-md flex-col gap-4 bg-white py-10 px-5 rounded-2xl mx-auto"
          onSubmit={handleEmailSignUp}
        >
          <TextField isRequired name="name" validate={validateName}>
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={validateEmail}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            value={password}
            onChange={setPassword}
            validate={validatePassword}
          >
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
            <Description>
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
            </Description>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            validate={(value) =>
              value !== password ? "পাসওয়ার্ড মিলছে না" : null
            }
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={showConfirm ? "text" : "password"}
                placeholder="আবার লিখুন"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showConfirm ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  onPress={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <Eye /> : <EyeSlash />}
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
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onPress={() => handleSocialSignIn("google")}
              className="h-11 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              onPress={() => handleSocialSignIn("github")}
              className="h-11 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >

              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-green-700 font-medium hover:underline"
            >
              সাইন ইন করুন
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

export default SignUp;
