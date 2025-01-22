import app from "../../server.js";
import request from "supertest";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe('Conjunto de pruebas Api News', ()=>{
    beforeAll(async()=>{
        await mongoose.connection.collections['news'].drop();
    });

    test('[POST] /news', async()=>{
        const doc = mockNew();
        const response = await request(app).post('/news').send(doc)
        // console.log(response.body);
        const id = response.body._id;
        const titleResponse = response.body.title;
        const bodyResponse = response.body.body;
        const statusCode = response.statusCode;
        expect(id).toBeDefined();
        expect(response.body).toHaveProperty('_id');
        expect(titleResponse).toBe(doc.title);
        expect(bodyResponse).toBe(doc.body);
        expect(statusCode).toBe(200);
    });

    test('[GET] /news', async()=>{
        const response = await request(app).get('/news');
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(1);
        const dateResponse = response.body[0].date;
        const dateExpected = expect.stringContaining('2025')
        expect(dateResponse).toEqual(dateExpected);
    });

    test('[GET] /:id', async()=>{
        const doc = mockNew();
        const response = await request(app).post('/news').send(doc)
        // console.log(response.body);
        const id = response.body._id;
        
        const responseGetById = await request(app).get(`/news/${id}`);
        const statusCodeGetById = responseGetById.statusCode;
        const titleResponseGetById = responseGetById.body.title;
        const bodyResponseGetById = responseGetById.body.body;

        expect(statusCodeGetById).toEqual(200);
        expect(titleResponseGetById).toEqual(doc.title);
        expect(bodyResponseGetById).toEqual(doc.body);

        const idFaker = '67901eb9d9fac0e577eeec82';

        const getByIdFail = await request(app).get(`/news/${idFaker}`);
        const statusCodeGetByIdFail = getByIdFail.statusCode;
        expect(statusCodeGetByIdFail).toEqual(404);
        expect(getByIdFail.body.msg).toEqual(`No se encontró el id ${idFaker} en la base de datos.`);
    })
})