import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";

const uri = process.env.BETTER_AUTH_MONGODB_URL;
if (!uri) throw new Error("BETTER_AUTH_MONGODB_URL সেট করা নেই");

// dev মোডে hot reload এ নতুন ক্লায়েন্ট বানিয়ে পুরনোটা বন্ধ হওয়া ঠেকায়
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

const client = globalForMongo._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db("assignment-7-project");

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : {}),
    ...(githubId && githubSecret
      ? { github: { clientId: githubId, clientSecret: githubSecret } }
      : {}),
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
