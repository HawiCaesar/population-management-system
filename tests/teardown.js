const Location = require("../models/location");

const destroyLocations = () => {
  Location.deleteMany({}).then(() => {
    return "Location table truncated";
  });
};

module.exports = destroyLocations;
