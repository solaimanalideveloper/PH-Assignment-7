"use client";
import { signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUp = () => {
  const handelUpDateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("data from the form: ", data);

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });
    console.log("the resData: ", resData, error);
  };

  const handelSignUpGoogle = async () => {
    const resData = await signIn.social({
      provider: "google",
    });
    console.log("the handel signUp button with google: ", resData);
  };

  const handelSignUpGithub = async () => {
    const resData = await signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="bg-green-100 ">
      <div className="container mx-auto my-10 ">
        <div>
          <h1 className="font-bold text-3xl text-center my-5">সাইন ইন</h1>
          <p className="mb-5 text-center">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>
        <Form
          className="flex w-96 flex-col gap-4 border-amber-50 bg-white py-10 px-5 rounded-2xl mx-auto"
          onSubmit={handelUpDateUser}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
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
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="পাসওয়ার্ড" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit">সাবমিট </Button>
            <Button type="reset" variant="secondary">
              রিসেট
            </Button>
          </div>

          <p className="text-center m">অথবা</p>
          <div className="flex gap-2">
            <Button onClick={handelSignUpGoogle}>
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button onClick={handelSignUpGithub}>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
