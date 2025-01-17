import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";
import { expect } from "chai";
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

//   beforeEach(function (done) {
//     this.timeout(5000); // A very long environment setup.
//     setTimeout(done, 5000);
//   });

  after(() => {
    logger.info("finalizaron las pruebas!");
  });

  it("Deberia retornar todas las noticias de la colección", async () => {
    const result = await newsDao.getAllNews();
    expect(Array.isArray(result)).to.be.equal(true);
    expect(result.length).to.be.equal(0);
    expect(result).to.have.length(0);
  });

  it("Deberia agregar una noticia a la coleccion", async () => {
    const result = await newsDao.createNew(obj);
    const news = await newsDao.getAllNews();

    expect(result).to.have.property("_id");

    expect(result.title).to.be.equal(obj.title);

    expect(typeof obj.body).to.be.equal("string");

    expect(news).to.have.length(1);
  });

  it("Deberia encontrar un documento por id", async () => {
    const obj = {
        title: "Noticia3",
        body: "Se vino el verano con todo....",
        author: "Jorge Tormenta",
        image: ".....",
      };
    const response = await newsDao.createNew(obj);
    // console.log(response._id.toString());
    const responseId = response._id.toString();
    const doc = await newsDao.getNew(responseId);
    expect(doc._id.toString()).to.equal(responseId);
    expect(doc.body).to.equal(response.body);
    expect(doc.title).to.equal(response.title);
    expect(doc.author).to.equal(response.author);
    expect(doc.image).to.equal(response.image);
  });
});
