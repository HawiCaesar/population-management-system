const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("./db/mongoose");
const router = require("./routes");

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/api", (request, response) => {
  response.status(200).send({
    message: "Welcome to population management api"
  });
});

app.get("*", (request, response) =>
  response.status(404).send({
    message: "Oops resource not found"
  })
);

module.exports = app;
