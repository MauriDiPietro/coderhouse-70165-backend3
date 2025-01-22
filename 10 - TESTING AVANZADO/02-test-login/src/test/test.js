import { describe, test } from "node:test"; //en proximas versiones de node, van a ser obligatorio el prefijo node:
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const mockUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ max: 100 }),
    password: faker.string.hexadecimal(),
  };
};

const API_URL = "http://localhost:8080/api";

describe("TESTS API", () => {
  let user = null;
  let cookieToken = null;

  test("[POST] /register", async () => {
    const body = mockUser();

    user = {
      email: body.email,
      password: body.password,
    };

    const responseAPI = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const { data } = await responseAPI.json();

    assert.ok(data, '_id');
    assert.equal(body.first_name, data.first_name);
    assert.equal(responseAPI.status, 200);
    assert.rejects();

  });

  test("[POST] /login", async () => {
    // console.log(user)
    const responseAPI = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: 'include'
    });
const response = await responseAPI.json();
    console.log(response)

    assert.equal(responseAPI.status, 200, 'Deberia retornar status 200');

    const setCookieHeader = responseAPI.headers.get('set-cookie');

    /*
    token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzkwMzFiMTk0
    MDBmYzQwZWJjOTZjZTYiLCJmaXJzdF9uYW1lIjoiTWF0aWFzIiwibGFzdF9uYW1lIjoiTWV
    ybG8iLCJlbWFpbCI6Im1hdGlAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNz
    UwMzE2NSwiZXhwIjoxNzM3NTAzNDY1fQ.Dz7pnKnvi9l_8_HzAkfowELXdZ9KDwjw-yTVwdhruZo; 
    Path=/; 
    HttpOnly
    */

    assert.ok(setCookieHeader.includes('token='), 'Deberia contener el token');

    cookieToken = setCookieHeader.split(';')[0];
  
  });

  test("[GET] /current", async () => {
    const responseAPI = await fetch(`${API_URL}/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieToken
      },
      credentials: 'include'
    });

    const { data } = await responseAPI.json();

    assert.equal(responseAPI.status, 200, 'Deberia retornar status 200');
    assert.ok(data, '_id');
    assert.equal(user.email, data.email);
  });
});
