const Location = require("../models/location");

const createLocation = (request, response) => {
  let location = new Location({
    name: request.body.name,
    male: request.body.male,
    female: request.body.female,
    parentLocation: request.body.parentLocation
  });

  location.save(error => {
    if (error) {
      return response.status(400).send(error.message);
    }

    return response.status(201).send({ message: "Location created", location });
  });
};

const getOneLocation = (request, response) => {
  Location.findOne({ _id: request.params.locationId }, (error, result) => {
    if (error) {
      return response.status(500).send({ message: error.message });
    }
    return response.status(200).send(result);
  });
};

module.exports = {
  createLocation,
  getOneLocation
};
