"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
let id;

describe("testing 404", () => {
  it("testing /person", async () => {
    const response = await request.post("/");
    expect(response.status).toEqual(404);
  });

  it("testing bad method", async () => {
    id = 1;
    const response = await request.get("/clothes/1");
    expect(parseInt(response.body.id)).toEqual(id);
  });
});

describe("test food routes", () => {
  it("test get all food", async () => {
    const response = await request.get("/food");
    expect(response.status).toEqual(200);
  });
  it("add new food", async () => {
    const response = await request.post("/food").send({
      foodName: "test",
      dishFamily: "test",
    });
    expect(response.status).toEqual(201);
    id = response.body.id;
  });

  it("testfood get by id ", async () => {
    const response = await request.get(`/food/${id}`);
    expect(response.status).toEqual(200);
  });

  it("update new food", async () => {
    const response = await request.put(`/food/${id}`).send({
      foodName: "test",
      dishFamily: "test",
    });
    expect(response.status).toEqual(201);
  });

  it("delete food by id", async () => {
    const response = await request.delete(`/food/${id}`);
    expect(response.status).toEqual(204);
  });
});

describe("testing clothes routes", () => {
  it("testing get all clothes", async () => {
    const response = await request.get("/clothes");
    expect(response.status).toEqual(200);
  });
  it("post new clothes", async () => {
    const response = await request.post("/clothes").send({
      clothesType: "test",
      clothesBrand: "test",
    });
    expect(response.status).toEqual(201);
    id = response.body.id;
  });

  it("test clothes get by id ", async () => {
    const response = await request.get(`/clothes/${id}`);
    expect(response.status).toEqual(200);
  });

  it("update new clothes", async () => {
    const response = await request.put(`/clothes/${id}`).send({
      clothesType: "test",
      clothesBrand: "test",
    });
    expect(response.status).toEqual(201);
  });
  it("delete clothes by id", async () => {
    const response = await request.delete(`/clothes/${id}`);
    expect(response.status).toEqual(204);
  });
});
