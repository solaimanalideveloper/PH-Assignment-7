"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/auth-client";
import { validateName } from "@/lib/validation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

type Props = {
  initialName: string;
  initialImage: string;
  email: string;
};

const validateImage = (value: string) => {
  if (!value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? null
      : "সঠিক ছবির লিংক দিন";
  } catch {
    return "সঠিক ছবির লিংক দিন";
  }
};

const UpdateProfileForm = ({ initialName, initialImage, email }: Props) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateUser({
      name: name.trim(),
      image: image.trim() || null,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "প্রোফাইল আপডেট করা যায়নি।");
      return;
    }

    toast.success("প্রোফাইল আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  };

  const showPreview = image.trim() && !validateImage(image) && !previewFailed;

  return (
    <div className="bg-[#F4F6F4] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="font-bold text-3xl text-center my-5">প্রোফাইল আপডেট</h1>

        <Form
          className="flex w-full max-w-md flex-col gap-4 bg-white py-10 px-5 rounded-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            {showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.trim()}
                alt="প্রিভিউ"
                onError={() => setPreviewFailed(true)}
                className="size-24 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="size-24 rounded-full bg-green-700 text-white text-4xl font-bold flex items-center justify-center">
                {name.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>

          <TextField
            isRequired
            name="name"
            value={name}
            onChange={setName}
            validate={validateName}
          >
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

          <TextField isDisabled name="email" value={email}>
            <Label>ইমেইল</Label>
            <Input />
            <Description>ইমেইল বদলানো যাবে না</Description>
          </TextField>

          <TextField
            name="image"
            value={image}
            onChange={(v) => {
              setImage(v);
              setPreviewFailed(false);
            }}
            validate={validateImage}
          >
            <Label>ছবির লিংক</Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <Description>ছবির সরাসরি লিংক দিন (ঐচ্ছিক)</Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-11 rounded-lg bg-green-700 text-white font-semibold shadow-md hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সংরক্ষণ করুন"}
          </Button>

          <Link
            href="/profile"
            className="text-center text-sm text-gray-600 hover:underline"
          >
            বাতিল করুন
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
