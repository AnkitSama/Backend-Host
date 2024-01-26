const express = require("express");
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
app.use(cors());
const port = 3000;

// Replace with your MongoDB Atlas connection string
const uri =
  "mongodb+srv://ankityadav2002atr:BQEz0qUBRMghDPPy@cluster1.lwnseai.mongodb.net/?retryWrites=true&w=majority";

app.get("/read", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    //console.log("Connected to the database");

    const database = client.db("yes_no_count");
    const collection = database.collection("yes_no_count");

    const query = {
      _id: new ObjectId("65b37d12c6f7ab61cacab4d6"),
    };
    const result = await collection.find(query).toArray();

    res.json(result);
  } finally {
    await client.close();
    //console.log("Connection to the database closed");
  }
});


app.get("/update", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    //console.log("Connected to the database");

    const database = client.db("yes_no_count");
    const collection = database.collection("yes_no_count");

    const objectId = new ObjectId("65b37d12c6f7ab61cacab4d6"); // Extract the id from the request parameters
    const query = { _id: objectId };

    // Replace this with the update you want to perform
    const update = { $inc: { yes: 1 } };

    const result = await collection.updateOne(query, update);

    res.json(result);
  } finally {
    await client.close();
    //console.log("Connection to the database closed");
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
