const mongoose = require("mongoose");

let mongodb;

if (process.env.NODE_ENV) {
  mongodb = process.env.TEST_MONGODB_URI;
} else {
  mongodb = process.env.MONGODB_URI;
}
mongoose.connect(mongodb, { useNewUrlParser: true, useFindAndModify: false });

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDb Connection error"));
