const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("./db/mongoose");
const router = require("./routes");

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

module.exports = app;
