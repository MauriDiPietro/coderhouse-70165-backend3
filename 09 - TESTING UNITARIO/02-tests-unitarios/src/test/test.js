import assert from "node:assert";
import test, { describe } from "node:test";
import { fakerES as faker } from "@faker-js/faker";
import mongoose from "mongoose";
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";
import { logger } from "../logs/news.logs.js";

const newsDao = new DaoMongo();
DaoMongo.init();
await mongoose.connection.collections["news"].drop();
logger.info("se limpió la colección news!");

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe("Tests unitarios de Dao News", () => {

  test("Deberia retornar todas las noticias de la colección", async () => {
    const result = await newsDao.getAllNews();
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 0);
    assert.notEqual(result, {});
    assert.doesNotThrow(() => result);
  });

  test("Deberia agregar una noticia a la coleccion", async () => {
    const obj = mockNew();
    const result = await newsDao.createNew(obj);
    const news = await newsDao.getAllNews();

    assert.ok(result._id);

    assert.deepStrictEqual(result.title, obj.title);
    assert.deepStrictEqual(result.body, obj.body);
    assert.deepStrictEqual(result.author, obj.author);
    assert.deepStrictEqual(result.image, obj.image);

    assert.deepStrictEqual(typeof obj.body, "string");

    assert.equal(news.length, 1);
  });
});
