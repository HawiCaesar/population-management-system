const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location");
const validation = require("../middleware/validation");
const locationCheck = require("../middleware/locationCheck");

router.post(
  "/locations",
  validation.validateLocationName,
  validation.validateGenderFigures,
  locationCheck,
  locationController.createLocation
);

module.exports = router;
