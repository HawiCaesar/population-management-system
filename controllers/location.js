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

const updateALocation = (request, response) => {
  Location.findOneAndUpdate(
    { _id: request.params.locationId },
    {
      $set: request.body
    },
    { new: true },
    (error, result) => {
      if (error) {
        return response.status(500).send({ message: error.message });
      }

      if (!result) {
        return response.status(404).send({ message: "Location not found" });
      }
      return response.status(200).send({ message: "Location updated", result });
    }
  );
};

const deleteLocation = (request, response) => {
  Location.deleteOne({ _id: request.params.locationId }, (error, result) => {
    if (result.ok === 1 && result.n === 1) {
      return response.status(204).send();
    } else {
      return response.status(404).send({ message: "Location not found" });
    }
  });
};

module.exports = {
  createLocation,
  getOneLocation,
  getAllLocations,
  updateALocation,
  deleteLocation
};
