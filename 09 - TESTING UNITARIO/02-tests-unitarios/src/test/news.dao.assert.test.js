import assert from "node:assert";
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";
import mongoose from "mongoose";
import { logger } from "../logs/news.logs.js";

const obj = {
  title: "Calor en todo el país",
  body: "Se vino el verano con todo....",
  author: "Jorge Tormenta",
  image: ".....",
};

describe("Tests unitarios de Dao News", () => {
  let newsDao;
  before(async () => {
    newsDao = new DaoMongo();
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
    logger.info("se limpió la colección news!");
  });

  after(() => {
    logger.info("finalizaron las pruebas!");
  });

  it("Deberia retornar todas las noticias de la colección", async () => {
    const result = await newsDao.getAllNews();
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 0);
  });

  it("Deberia agregar una noticia a la coleccion", async () => {
    const result = await newsDao.createNew(obj);
    const news = await newsDao.getAllNews();

    assert.ok(result._id);

    assert.deepStrictEqual(result.title, obj.title);

    assert.deepStrictEqual(typeof obj.body, "string");

    assert.equal(news.length, 1);
  });
});
