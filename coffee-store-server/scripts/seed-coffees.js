const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

function loadEnv() {
    const candidatePaths = [
        process.env.DOTENV_CONFIG_PATH,
        path.resolve(process.cwd(), ".env.vercel.production.local"),
        path.resolve(process.cwd(), ".env.production.local"),
        path.resolve(process.cwd(), ".env.local"),
        path.resolve(process.cwd(), ".env"),
    ].filter(Boolean);

    for (const envPath of candidatePaths) {
        if (fs.existsSync(envPath)) {
            dotenv.config({ path: envPath });
            return envPath;
        }
    }

    dotenv.config();
    return null;
}

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

function getSeedData() {
    // Note: These are the 6 landing-page coffees. Adjust text/price if you want them to match your exact UI.
    return [
        {
            seedKey: "landing-1",
            imageFile: "1.png",
            name: "Americano Coffee",
            price: "890",
            supplier: "Espresso Emporium",
            taste: "Bold",
            category: "Americano",
            details:
                "Classic espresso diluted with hot water for a rich, smooth taste.",
        },
        {
            seedKey: "landing-2",
            imageFile: "2.png",
            name: "Cappuccino",
            price: "990",
            supplier: "Espresso Emporium",
            taste: "Creamy",
            category: "Milk Coffee",
            details: "Espresso with steamed milk and a thick layer of foam.",
        },
        {
            seedKey: "landing-3",
            imageFile: "3.png",
            name: "Latte",
            price: "950",
            supplier: "Espresso Emporium",
            taste: "Smooth",
            category: "Milk Coffee",
            details:
                "Espresso with lots of steamed milk for a mellow, smooth finish.",
        },
        {
            seedKey: "landing-4",
            imageFile: "4.png",
            name: "Espresso",
            price: "799",
            supplier: "Espresso Emporium",
            taste: "Strong",
            category: "Espresso",
            details: "A concentrated shot with intense aroma and flavor.",
        },
        {
            seedKey: "landing-5",
            imageFile: "5.png",
            name: "Mocha",
            price: "1050",
            supplier: "Espresso Emporium",
            taste: "Chocolate",
            category: "Specialty",
            details: "Espresso mixed with chocolate and steamed milk.",
        },
        {
            seedKey: "landing-6",
            imageFile: "6.png",
            name: "Macchiato",
            price: "920",
            supplier: "Espresso Emporium",
            taste: "Caramel",
            category: "Specialty",
            details: "Espresso topped with a small amount of foamed milk.",
        },
    ];
}

async function main() {
    loadEnv();

    const dbName = process.env.DB_NAME || "coffeeDB";
    const collectionName = process.env.COLLECTION_NAME || "coffees";

    const imagesDir = path.resolve(
        __dirname,
        "..",
        "..",
        "coffee-store-client",
        "public",
        "resources",
        "images",
    );

    const seedData = getSeedData();

    for (const item of seedData) {
        const imagePath = path.join(imagesDir, item.imageFile);
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Missing seed image: ${imagePath}`);
        }
    }

    const uri = buildMongoUriFromEnv();
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();

        const collection = client.db(dbName).collection(collectionName);

        const ops = seedData.map((item) => {
            const imagePath = path.join(imagesDir, item.imageFile);
            const buffer = fs.readFileSync(imagePath);

            const doc = {
                seedKey: item.seedKey,
                name: item.name,
                price: item.price,
                supplier: item.supplier,
                taste: item.taste,
                category: item.category,
                details: item.details,
                photo: {
                    data: buffer,
                    contentType: "image/png",
                    originalName: item.imageFile,
                },
            };

            return {
                updateOne: {
                    filter: { seedKey: item.seedKey },
                    update: { $set: doc },
                    upsert: true,
                },
            };
        });

        const result = await collection.bulkWrite(ops, { ordered: false });
        console.log(
            JSON.stringify(
                {
                    acknowledged: result.isOk?.() ?? true,
                    inserted: result.insertedCount ?? 0,
                    upserted: result.upsertedCount ?? 0,
                    modified: result.modifiedCount ?? 0,
                    matched: result.matchedCount ?? 0,
                },
                null,
                2,
            ),
        );
    } finally {
        await client.close();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
