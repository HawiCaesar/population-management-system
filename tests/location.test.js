const requests = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const locationFixtures = require("./fixtures");
const teardown = require("./teardown");

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
});
