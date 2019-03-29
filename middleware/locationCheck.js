const Location = require("../models/location");

const locationCheck = (request, response, next) => {
  const { parentLocation, male, female } = request.body;

  if (!parentLocation) {
    return next();
  }
  Location.findOne({ _id: parentLocation }, (error, result) => {
    if (error) {
      return response.status(400).send({ message: error.message });
    }

    if (!result) {
      return response.status(404).send({ message: "Location not found" });
    }

    if (male && result.male < male) {
      return response.status(400).send({
        message:
          "The male total cannot be greater than the parent location male total"
      });
    }

    if (female && result.female < female) {
      return response.status(400).send({
        message:
          "The female total cannot be greater than the parent location female total"
      });
    }

    return next();
  });
};

module.exports = locationCheck;
