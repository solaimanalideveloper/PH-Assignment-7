# বাজার দর (Bazar Dor)

বাংলাদেশের বাজার দর, পণ্য মূল্য, এবং মূল্য পরিবর্তনের তথ্য সহজে দেখতে এই প্রকল্পটি তৈরি করা হয়েছে। এটি একটি Next.js ভিত্তিক e-commerce/price-tracker অ্যাপ্লিকেশন, যেখানে ব্যবহারকারী পণ্য দেখতে পারে, ক্যাটাগরি অনুযায়ী ব্রাউজ করতে পারে, এবং সাইন আপ/সাইন ইন করে প্রোফাইল ব্যবহার করতে পারে।

## প্রকল্পের ধারণা

এটি মূলত একটি বাজার দর ট্র্যাকিং ও প্রোডাক্ট ডিরেক্টরি অ্যাপ। ব্যবহারকারী:

- বর্তমান বাজারে কী পণ্যের দাম কত তা দেখতে পারে
- কোন পণ্য দাম বেড়েছে বা কমেছে তা জানতে পারে
- ক্যাটাগরি অনুযায়ী পণ্য খুঁজে পেতে পারে
- সাইন আপ/সাইন ইন করে ব্যক্তিগত প্রোফাইল ব্যবহার করতে পারে
- Google কিংবা GitHub অ্যাকাউন্ট দিয়ে দ্রুত লগইন করতে পারে

## প্রধান ফিচার

- Next.js App Router ব্যবহার করে ডাইনামিক পেজ
- রেসপনসিভ UI (মোবাইল/ডেস্কটপ)
- পণ্য ক্যাটাগরি ও ডিটেইল পেজ
- পণ্য মূল্য বাড়া/কমা দেখানো
- ইমেইল/পাসওয়ার্ড সাইন আপ ও সাইন ইন
- Google ও GitHub OAuth সাইন-ইন
- MongoDB-ভিত্তিক Better Auth সেটআপ
- প্রোফাইল দেখা ও আপডেট করার সুবিধা
- Toast notification, form validation, loading states

## ব্যবহারকৃত প্রযুক্তি

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- HeroUI
- DaisyUI
- Better Auth
- MongoDB
- ESLint

## প্রজেক্টের স্ট্রাকচার

```bash
b14-a7-bazar-dor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── category/
│   │   ├── product/
│   │   ├── (sign)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   ├── lib/
│   └── types/
├── public/
├── .env.local
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── node_modules/
```

## কী কী পেজ আছে

- `/` → হোম পেজ, দাম বেড়েছে/কমেছে এমন পণ্য দেখানো
- `/category/[id]` → ক্যাটাগরি অনুযায়ী পণ্য তালিকা
- `/product/[slug]` → পণ্যের বিস্তারিত তথ্য
- `/sign-up` → নতুন অ্যাকাউন্ট তৈরি
- `/sign-in` → লগইন
- `/profile` → প্রোফাইল
- `/profile/update` → প্রোফাইল আপডেট

## টেকনিক্যাল সংক্ষিপ্তসার

প্রকল্পটি মূলত `src/lib/data.ts` ফাইলে `api.abcz.workers.dev` থেকে বাজারের ডেটা ফেচ করে। এই ডেটা ব্যবহার করে হোম পেজে সবচেয়ে বেশি বেড়েছে এমন পণ্য এবং সবচেয়ে কমেছে এমন পণ্য দেখানো হয়।

অথেনটিকেশন সেটআপ `src/lib/auth.ts` ফাইলে করা আছে। এখানে MongoDB adapter এবং Google/GitHub OAuth provider কনফিগার করা হয়েছে।

## লোকাল ডেভেলপমেন্ট সেটআপ

প্রথমে রিপোজিটরি ক্লোন করুন:

```bash
git clone <repo-url>
cd b14-a7-bazar-dor
```

তারপর নির্ভরতা ইন্সটল করুন:

```bash
npm install
```

এবার `.env.local` ফাইল তৈরি করুন এবং নিচের ভ্যারিয়েবলগুলো যোগ করুন:

```env
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_MONGODB_URL=mongodb://localhost:27017/your-db-name

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

তারপর ডেভ সার্ভার চালু করুন:

```bash
npm run dev
```

ব্রাউজারে এই লিংকে যান:

```text
http://localhost:3000
```

## build / production

প্রজেক্ট build করতে:

```bash
npm run build
```

Production server চালাতে:

```bash
npm run start
```

## Google OAuth সেটআপ

Google Cloud Console-এ নতুন OAuth Client তৈরি করুন:

- Application type: Web application
- Authorized JavaScript origins:
  - `http://localhost:3000`
- Authorized redirect URIs:
  - `http://localhost:3000/api/auth/google/callback`

তারপর Client ID এবং Secret `.env.local`-এ বসান।

## GitHub OAuth সেটআপ

GitHub Developer Settings-এ নতুন OAuth App তৈরি করুন:

- Homepage URL:
  - `http://localhost:3000`
- Authorization callback URL:
  - `http://localhost:3000/api/auth/github/callback`

এরপর Client ID এবং Secret `.env.local`-এ বসান।

## গুরুত্বপূর্ণ নোট

- `BETTER_AUTH_SECRET`-এর মান খুব কঠিন/র‍্যান্ডম হওয়া উচিত
- `BETTER_AUTH_MONGODB_URL`-এ MongoDB URI দিতে হবে
- `.env.local` ফাইলটি Git এ push করবেন না
- সামাজিক লগইন activate করতে হলে Google/GitHub OAuth app-এ callback URL ঠিকভাবে সেট করতে হবে

## রান করার জন্য npm scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## ডেভেলপারদের জন্য

আপনি চাইলে এই প্রজেক্টকে আরও এগিয়ে নিয়ে যেতে পারেন:

- ফিল্টার/সার্চ বৈশিষ্ট্য যোগ করা
- পণ্যের দাম history chart তৈরি
- wishlist/compare feature
- admin panel
- DB schema customization
- better API cache strategy

## লিসেন্স

এই প্রকল্পটি ব্যক্তিগত ডেভেলপমেন্ট বা শিক্ষা/প্রদর্শনী উদ্দেশ্যে ব্যবহারের বিবেচনায় তৈরি।

## সম্পর্কে

এই অ্যাপটি মূলত বাজার দর, পণ্য মূল্য, তুলনা, এবং ব্যবহারকারীর সাইন-ইন/প্রোফাইল ব্যবস্থাপনা নিয়ে কাজ করে। এটি বাংলায় UI তৈরি করা হয়েছে, তাই ব্যবহারকারীরা সহজে বাজারের দাম ও পণ্য তথ্য বুঝতে পারে।

যদি আপনি চাইলে, আমি পরের ধাপে এই README-কে আরও বেশি প্রফেশনাল, সুন্দর, এবং Production-grade আকারে সাজিয়ে দিতে পারি।
