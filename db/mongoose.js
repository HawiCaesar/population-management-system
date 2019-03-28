const mongoose = require("mongoose");

let mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDb Connection error"));
