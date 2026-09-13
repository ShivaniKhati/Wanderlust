require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

const initDB = async () => {

    // Existing listing se owner ID le lenge
    const existingListing = await Listing.findOne();

    if (!existingListing) {
        console.log("No existing listing found.");
        return;
    }

    const newListings = initData.data.map((obj) => ({
        ...obj,
        owner: existingListing.owner,
    }));

    // Existing listings DELETE nahi hongi
    await Listing.insertMany(newListings);

    console.log("6 new listings added successfully");
};

initDB();