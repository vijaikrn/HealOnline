const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", () => console.log("mongodb is connected"));

connection.on("error", () => console.log("error in mongodb connection"));

module.exports = mongoose