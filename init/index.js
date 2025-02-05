const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Creating mongodb (creating database)
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
    
}).catch((err)=>{
    console.log(err);
    
})

async function main() {
    await mongoose.connect(MONGO_URL) 
}

// 
const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj , owner:"66ed5749f98409cdf4d28550"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    
}

initDB();  // finction call