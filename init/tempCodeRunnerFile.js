const mongoose = require("mongoose");
const listing = require("../modules/listing.js");
const init_Data = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderWise";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connection was successfully established");
}

main()
    .then(() => {
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

    const init_Db = async () => {
        try {
            await listing.deleteMany({});
            init_Data.data=init_Data.data.map((obj)=>({ ...obj,owner:"6658764d4caaf0e94c5dcba8"}));
            await listing.insertMany(init_Data.data);
            console.log("Data was saved.");
        } catch (err) {
            console.error("Error initializing database with initial data:", err);
        }
    };

init_Db();