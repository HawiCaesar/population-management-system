const { ObjectID } = require("mongodb");
const validateGenderFigures = (request, response, next) => {
  const { male, female } = request.body;

  if (!male || isNaN(male) || parseInt(male, 10) < 0) {
    return response.status(400).send({
      message:
        "Invalid male count. Male count must be greater or equal to zero and must be an integer"
    });
  }

  if (!female || isNaN(female) || parseInt(female, 10) < 0) {
    return response.status(400).send({
      message:
        "Invalid female count. Female count must be greater or equal to zero and must be an integer"
    });
  }

  return next();
};

const validateLocationName = (request, response, next) => {
  const { name } = request.body;

  if (name.trim().length <= 2) {
    return response.status(400).send({
      message: "The location name should be greater than 2 characters"
    });
  }
  return next();
};

const objectIdValidationInBody = (request, response, next) => {
  if (request.body.parentLocation) {
    if (!ObjectID.isValid(request.body.parentLocation)) {
      return response.status(404).send({ message: "Location id not found" });
    }
  }
  return next();
};

const objectIdValidationInParams = (request, response, next) => {
  if (!ObjectID.isValid(request.params.locationId)) {
    return response.status(404).send({ message: "Location id not found" });
  }
  return next();
};

module.exports = {
  validateGenderFigures,
  validateLocationName,
  objectIdValidationInBody,
  objectIdValidationInParams
};
