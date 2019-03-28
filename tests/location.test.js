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
});
