const Location = require("../models/location");

const locationCheck = (request, response, next) => {
  const { parentLocation, male, female } = request.body;

  if (!parentLocation) {
    next();
  } else {
    Location.findOne({ _id: parentLocation }, (error, result) => {
      if (error) {
        return response.status(500).send({ message: error.message });
      }

      if (result.male < male) {
        return response.status(400).send({
          message:
            "The male total cannot be greater than the parent location male total"
        });
      }

      if (result.female < female) {
        return response.status(400).send({
          message:
            "The female total cannot be greater than the parent location female total"
        });
      }

      next();
    });
  }
};

module.exports = locationCheck;
