const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
async function run() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB");

    const database = client.db("mydatabase");
    const contactsCollection = database.collection("contacts");
  } finally {
    await client.close();
  }
}

run().catch(console.error);
