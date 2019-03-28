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

module.exports = {
  createLocation
};
