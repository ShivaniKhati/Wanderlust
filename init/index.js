const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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


const initDB = async ()=> {
    await Listing.deleteMany();
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a746c6a4a85409da29fee64",
    }));

    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}
initDB();