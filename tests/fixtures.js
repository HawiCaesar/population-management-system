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
  },
  {
    name: "Nakuru",
    male: 20850,
    female: 21800
  },
  {
    name: "Eldoret",
    male: 24850,
    female: 24800
  },
  {
    name: "Kisumu",
    male: 29850,
    female: 24900
  },
  {
    name: "Busia",
    male: 30850,
    female: 34900
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
