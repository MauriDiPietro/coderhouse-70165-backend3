import test, { before, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";
import DaoMongo from "../../persistence/DAOS/mongo/news.mongo.dao.js";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

const API_URL = "http://localhost:8080/news";

describe("Conjunto de pruebas Api News", () => {
  before(async () => {
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
  });

  test("[POST] /news", async () => {
    const doc = mockNew();
    const responseAPI = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });
    const response = await responseAPI.json();
    // console.log(response)
    const id = response._id;
    const titleResponse = response.title;
    const bodyResponse = response.body;
    const statusCode = responseAPI.status;
    assert.ok(responseAPI, "_id");
    assert.equal(typeof id, "string");
    assert.equal(typeof titleResponse, "string");
    assert.equal(typeof bodyResponse, "string");
    assert.equal(titleResponse, doc.title);
    assert.equal(bodyResponse, doc.body);
    assert.equal(statusCode, 200);
  });

  test("[GET] /news", async () => {
    const responseAPI = await fetch(API_URL);
    const response = await responseAPI.json();
    assert.strictEqual(Array.isArray(response), true);
    assert.equal(response.length, 1);
    const statusCode = responseAPI.status;
    assert.equal(statusCode, 200);
    const dateResponse = response[0].date;
    const dateExpected = dateResponse.includes("2025");
    assert.equal(dateExpected, true);
  });

  test("[GET] /:id", async () => {
    const doc = mockNew();
    const responseAPI = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });
    const response = await responseAPI.json();
    const id = response._id;

    const responseGetByIdAPI = await fetch(`${API_URL}/${id}`);
    const responseGetById = await responseGetByIdAPI.json();
    const statusCodeGetById = responseGetByIdAPI.status;
    const titleResponseGetById = responseGetById.title;
    const bodyResponseGetById = responseGetById.body;

    assert.deepStrictEqual(statusCodeGetById, 200);
    assert.deepEqual(titleResponseGetById, doc.title);
    assert.deepEqual(bodyResponseGetById, doc.body);

    const idFaker = "67901eb9d9fac0e577eeec82";

    const getByIdFailAPI = await fetch(`${API_URL}/${idFaker}`);
    const getByIdFail = await getByIdFailAPI.json();
    const statusCodeGetByIdFail = getByIdFailAPI.status;
    assert.equal(statusCodeGetByIdFail, 404);
    assert.equal(
      getByIdFail.msg,
      `No se encontró el id ${idFaker} en la base de datos.`
    );
  });
});
