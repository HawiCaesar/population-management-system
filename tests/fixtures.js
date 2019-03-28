const { ObjectID } = require("mongodb");

const testObjectId1 = new ObjectID();
const testObjectId2 = new ObjectID();

const locations = [
  {
    _id: testObjectId1,
    name: "Nairobi",
    male: 10950,
    female: 12800
  },
  {
    _id: testObjectId2,
    name: "Mombasa",
    male: 10850,
    female: 11800
  }
];

const locationWrongMaleCount = {
  name: "Kisumu",
  male: "test",
  female: 800
};

const locationWrongFemaleCount = {
  name: "Kisumu",
  male: 500,
  female: "test"
};

const locationNameTooShort = {
  name: "k",
  male: 10850,
  female: 11800
};

module.exports = {
  testObjectId1,
  testObjectId2,
  locations,
  locationNameTooShort,
  locationWrongFemaleCount,
  locationWrongMaleCount
};
