require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully.")
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error)
    }
}

module.exports = mongoDB;