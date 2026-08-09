const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const listings = await Listing.find({ geometry: { $exists: false } });
    console.log(`${listings.length} listings found without geometry`);

    for (let listing of listings) {
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: `${listing.location}, ${listing.country}`,
                    format: "json",
                    limit: 1
                },
                headers: { "User-Agent": "WanderlustProject/1.0" }
            });

            if (response.data.length > 0) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [
                        parseFloat(response.data[0].lon),
                        parseFloat(response.data[0].lat)
                    ]
                };
            } else {
                listing.geometry = { type: "Point", coordinates: [0, 0] };
                console.log(`⚠️ Location not found for: ${listing.title}`);
            }

            await listing.save();
            console.log(`✅ Updated: ${listing.title}`);
        } catch (err) {
            console.log(`❌ Error for ${listing.title}:`, err.message);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("All listings updated!");
    mongoose.connection.close();
}

main();