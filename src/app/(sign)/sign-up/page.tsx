"use client";

import { useState, type FormEvent } from "react";
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
  Label,
  TextField,
} from "@heroui/react";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

type SocialProvider = "google" | "github";

const GENERIC_ERROR = "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as SignUpFormData;

    const { error } = await signUp.email({
      name: data.name.trim(),
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      setErrorMsg(error.message ?? GENERIC_ERROR);
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
      setErrorMsg(error.message ?? GENERIC_ERROR);
    }
  };

  return (
    <div className="bg-green-100">
      <div className="container mx-auto my-10">
        <div>
          <h1 className="font-bold text-3xl text-center my-5">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mb-5 text-center">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          className="flex w-96 flex-col gap-4 bg-white py-10 px-5 rounded-2xl mx-auto"
          onSubmit={handleEmailSignUp}
        >
          <TextField isRequired name="name" validate={validateName}>
            <Label>নাম</Label>
            <Input placeholder="নাম" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={validateEmail}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="ইমেইল" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={validatePassword}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="পাসওয়ার্ড" />
            <Description>
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
            </Description>
            <FieldError />
          </TextField>

          {errorMsg && (
            <p className="text-red-600 text-sm" role="alert">
              {errorMsg}
            </p>
          )}

          <div className="w-96">
            <Button type="submit" isDisabled={loading}>
              {loading ? "অপেক্ষা করুন..." : "সাবমিট"}
            </Button>
          </div>

          <p className="text-center">অথবা</p>

          <div className="flex gap-2">
            <Button onPress={() => handleSocialSignIn("google")}>Google</Button>
            <Button onPress={() => handleSocialSignIn("github")}>GitHub</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
