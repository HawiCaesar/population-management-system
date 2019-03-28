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

    if (!result) {
      return response.status(404).send({ message: "Location not found" });
    }

    return response.status(200).send(result);
  });
};

const getAllLocations = (request, response) => {
  Location.aggregate(
    [
      {
        $project: {
          _id: "$_id",
          name: "$name",
          male: "$male",
          female: "$female",
          parentLocation: "$parentLocation",
          totalResidents: { $add: ["$male", "$female"] }
        }
      }
    ],
    (error, results) => {
      if (error) {
        return response.status(500).send({ message: error.message });
      }

      if (!results) {
        return response.status(200).send([]);
      }

      return response.status(200).send(results);
    }
  );
};

module.exports = {
  createLocation,
  getOneLocation,
  getAllLocations
};
