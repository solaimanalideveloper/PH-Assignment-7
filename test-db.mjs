import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL, {
  serverSelectionTimeoutMS: 5000,
});

try {
  await client.connect();
  await client.db("assignment-7-project").command({ ping: 1 });
  console.log("সংযোগ সফল");
} catch (e) {
  console.error("ব্যর্থ:", e.message);
} finally {
  await client.close();
}
