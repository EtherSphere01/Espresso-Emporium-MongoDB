const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const { ObjectId } = require("mongodb");

const app = express();
// Note: On Vercel, do not call app.listen(); Vercel runs this as a Serverless Function.

// Middleware
app.use(cors());

// Multer setup (for handling file uploads)
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage: storage });

// MongoDB setup
function buildMongoUriFromEnv() {
    const directUri = process.env.MONGODB_URI;
    if (directUri && directUri.trim()) return directUri.trim();

    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    const dbHost = process.env.DB_HOST;

    if (!dbUser || !dbPass || !dbHost) {
        throw new Error(
            "Missing MongoDB env vars. Set MONGODB_URI (recommended) or DB_USER, DB_PASS, and DB_HOST.",
        );
    }

    return `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(
        dbPass,
    )}@${dbHost}/?retryWrites=true&w=majority`;
}

let client;

function getMongoClient() {
    if (client) return client;
    const uri = buildMongoUriFromEnv();
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    return client;
}

let coffeeCollection;
let connectPromise;
const dbName = process.env.DB_NAME || "coffeeDB";
const collectionName = process.env.COLLECTION_NAME || "coffees";

async function getCoffeeCollection() {
    if (coffeeCollection) return coffeeCollection;
    if (!connectPromise) {
        connectPromise = getMongoClient().connect();
    }
    await connectPromise;
    coffeeCollection = client.db(dbName).collection(collectionName);
    return coffeeCollection;
}

// Route: Handle form submission with file upload
app.post("/add-coffee", upload.single("photo"), async (req, res) => {
    try {
        const collection = await getCoffeeCollection();
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

        const result = await collection.insertOne(newCoffee);
        res.send({ insertedId: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: "Failed to upload coffee" });
    }
});

app.get("/coffees", async (req, res) => {
    try {
        const collection = await getCoffeeCollection();
        const coffees = await collection.find().toArray();

        const coffeesWithBase64 = coffees.map((coffee) => {
            if (coffee.photo && coffee.photo.data) {
                const base64 = coffee.photo.data.toString("base64");
                const contentType = coffee.photo.contentType || "image/jpeg";
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

app.delete("/delete-coffee/:id", async (req, res) => {
    try {
        const collection = await getCoffeeCollection();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Failed to delete coffee" });
    }
});

app.get("/coffees/:id", async (req, res) => {
    try {
        const collection = await getCoffeeCollection();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const coffee = await collection.findOne(query);
        if (coffee && coffee.photo && coffee.photo.data) {
            const base64 = coffee.photo.data.toString("base64");
            const contentType = coffee.photo.contentType || "image/jpeg";
            coffee.photo = `data:${contentType};base64,${base64}`;
        }
        res.send(coffee);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch coffee" });
    }
});

app.put("/update-coffee/:id", upload.single("photo"), async (req, res) => {
    try {
        const collection = await getCoffeeCollection();
        const id = req.params.id;
        const { name, price, supplier, taste, category, details } = req.body;
        const file = req.file;

        const updatedCoffee = {
            name,
            price,
            supplier,
            taste,
            category,
            details,
        };

        if (file) {
            updatedCoffee.photo = {
                data: file.buffer,
                contentType: file.mimetype,
                originalName: file.originalname,
            };
        }

        const query = { _id: new ObjectId(id) };
        const result = await collection.updateOne(query, {
            $set: updatedCoffee,
        });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Failed to update coffee" });
    }
});

// Export for Vercel (Serverless Function handler)
module.exports = (req, res) => app(req, res);
