const locations = [
  {
    name: "Nairobi",
    male: 10950,
    female: 12800
  },
  {
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
  locations,
  locationNameTooShort,
  locationWrongFemaleCount,
  locationWrongMaleCount
};
