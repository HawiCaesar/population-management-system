const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location");
const validation = require("../middleware/validation");
const locationCheck = require("../middleware/locationCheck");

router.post(
  "/locations",
  validation.validateLocationName,
  validation.validateGenderFigures,
  validation.objectIdValidationInBody,
  locationCheck,
  locationController.createLocation
);

router.get(
  "/locations/:locationId",
  validation.objectIdValidationInParams,
  locationController.getOneLocation
);

router.get("/locations", locationController.getAllLocations);
router.put(
  "/locations/:locationId",
  validation.objectIdValidationInParams,
  validation.objectIdValidationInBody,
  locationCheck,
  locationController.updateALocation
);

router.delete(
  "/locations/:locationId",
  validation.objectIdValidationInParams,
  locationController.deleteLocation
);

module.exports = router;
