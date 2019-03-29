const requests = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const locationFixtures = require("./fixtures");
const teardown = require("./teardown");
const Location = require("../models/location");

const api = new requests(app);

describe("Location tests", () => {
  afterAll(done => {
    teardown();
    done();
  });
  test("should create a new location successfully", done => {
    api
      .post("/api/locations")
      .set("Content-Type", "application/json")
      .send(locationFixtures.locations[0])
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(201);
        expect(response.body.message).toMatch("Location created");
        done();
      });
  });
  test("should show an error when location has string in male count", done => {
    api
      .post("/api/locations")
      .set("Content-Type", "application/json")
      .send(locationFixtures.locationWrongMaleCount)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Invalid male count. Male count must be greater or equal to zero and must be an integer"
        );
        done();
      });
  });

  test("should show an error when location has string in female count", done => {
    api
      .post("/api/locations")
      .set("Content-Type", "application/json")
      .send(locationFixtures.locationWrongFemaleCount)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Invalid female count. Female count must be greater or equal to zero and must be an integer"
        );
        done();
      });
  });

  test("should show an error when location has a name with too little characters", done => {
    api
      .post("/api/locations")
      .set("Content-Type", "application/json")
      .send(locationFixtures.locationNameTooShort)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "The location name should be greater than 2 characters"
        );
        done();
      });
  });

  test("should fetch one location", done => {
    Location.create(locationFixtures.locations[1], (error, result) => {
      if (error) {
        console.log("Error occurred while inserting");
        done();
      } else {
        api.get(`/api/locations/${result._id}`).end((error, response) => {
          if (error) {
            throw done(error);
          }
          expect(response.status).toEqual(200);
          expect(response.body.name).toMatch(
            locationFixtures.locations[1].name
          );
          done();
        });
      }
    });
  });

  test("should not fetch with wrong location id", done => {
    Location.create(locationFixtures.locations[2], (error, result) => {
      if (error) {
        console.log("Error occurred while inserting");
        done();
      } else {
        api
          .get(`/api/locations/5b1c76bd9e0e83f458f4c646`)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Location not found");
            done();
          });
      }
    });
  });

  test("should fetch all locations with totals", done => {
    api.get(`/api/locations`).end((error, response) => {
      if (error) {
        throw done(error);
      }
      expect(response.status).toEqual(200);
      expect(response.body[0]).toHaveProperty("totalResidents");
      done();
    });
  });

  test("should update one location", done => {
    const updatedLocation = {
      name: "Eldi",
      male: 24000,
      female: 23900
    };
    Location.create(locationFixtures.locations[3], (error, result) => {
      if (error) {
        console.log("Error occurred while inserting");
        done();
      } else {
        expect(result.name).toMatch(locationFixtures.locations[3].name);
        expect(result.male).toEqual(locationFixtures.locations[3].male);
        expect(result.female).toEqual(locationFixtures.locations[3].female);

        api
          .put(`/api/locations/${result._id}`)
          .set("Content-Type", "application/json")
          .send(updatedLocation)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.result.name).toMatch(updatedLocation.name);
            expect(response.body.result.male).toEqual(updatedLocation.male);
            expect(response.body.result.female).toEqual(updatedLocation.female);
            done();
          });
      }
    });
  });

  test("should not update the location if female count is more than parent location", done => {
    Location.create(locationFixtures.locations[4], (error, result) => {
      if (error) {
        console.log("Error occurred while inserting");
        done();
      } else {
        Location.create(
          {
            name: "Bem Beach",
            male: 5000,
            female: 4500
          },
          (error, latestResult) => {
            if (error) {
              console.log("Error occurred while inserting");
              done();
            }
            api
              .put(`/api/locations/${latestResult._id}`)
              .set("Content-Type", "application/json")
              .send({ female: 50000, parentLocation: result._id })
              .end((error, response) => {
                if (error) {
                  throw done(error);
                }
                expect(response.status).toEqual(400);
                expect(response.body.message).toMatch(
                  "The female total cannot be greater than the parent location female total"
                );
                done();
              });
          }
        );
      }
    });
  });

  test("should not update the location if male count is more than parent location", done => {
    Location.create(locationFixtures.locations[5], (error, result) => {
      if (error) {
        console.log("Error occurred while inserting");
        done();
      } else {
        Location.create(
          {
            name: "Busia ndogo",
            male: 400,
            female: 500
          },
          (error, latestResult) => {
            if (error) {
              console.log("Error occurred while inserting");
              done();
            }
            api
              .put(`/api/locations/${latestResult._id}`)
              .set("Content-Type", "application/json")
              .send({ male: 44000, parentLocation: result._id })
              .end((error, response) => {
                if (error) {
                  throw done(error);
                }
                expect(response.status).toEqual(400);
                expect(response.body.message).toMatch(
                  "The male total cannot be greater than the parent location male total"
                );
                done();
              });
          }
        );
      }
    });
  });
});
