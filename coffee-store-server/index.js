const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Multer setup (for handling file uploads)
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage: storage });

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2x2eb3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const coffeeCollection = client.db("coffeeDB").collection("coffees");

    // Route: Handle form submission with file upload
    app.post("/add-coffee", upload.single("photo"), async (req, res) => {
      try {
        // console.log("Request body:", req.body);
        // console.log("Request file:", req.file);

        const { name, price, supplier, taste, category, details } = req.body;
        const file = req.file;

        if (
          !file ||
          !name ||
          !price ||
          !supplier ||
          !taste ||
          !category ||
          !details
        ) {
          return res.status(400).send({ error: "All fields are required" });
        }

        const newCoffee = {
          name,
          price,
          supplier,
          taste,
          category,
          details,
          photo: {
            data: file.buffer,
            contentType: file.mimetype,
            originalName: file.originalname,
          },
        };

        const result = await coffeeCollection.insertOne(newCoffee);
        res.send({ insertedId: result.insertedId });
      } catch (error) {
        // console.error("Upload error:", error);
        res.status(500).send({ error: "Failed to upload coffee" });
      }
    });

    app.get("/coffees", async (req, res) => {
      try {
        const cursor = coffeeCollection.find();
        const coffees = await cursor.toArray();

        // Convert photo buffer to base64 string
        const coffeesWithBase64 = coffees.map((coffee) => {
          if (coffee.photo && coffee.photo.data) {
            const base64 = coffee.photo.data.toString("base64");
            const contentType = coffee.photo.contentType || "image/jpeg"; // fallback type

            return {
              ...coffee,
              photo: `data:${contentType};base64,${base64}`,
            };
          }
          return coffee;
        });

        res.send(coffeesWithBase64);
      } catch (error) {
        console.error("Error fetching coffees:", error);
        res.status(500).send({ error: "Failed to fetch coffees" });
      }
    });
  } finally {
    // Keep client connected so server runs
  }
}
run().catch(console.dir);

app.listen(port, () => {
  //   console.log(`Server is running at http://localhost:${port}`);
});
