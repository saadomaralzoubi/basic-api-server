"use strict";
const express = require("express");
const { clothes } = require("../models/index.js");
const routers = express.Router();

routers.get("/clothes", getClothes);
routers.post("/clothes", addClothes);
routers.get("/clothes/:id", getClothesById);
routers.delete("/clothes/:id", deleteClothes);
routers.put("/clothes/:id", updatedClothes);

async function getClothes(req, res) {
  let allClothes = await clothes.findAll();
  res.status(200).json(allClothes);
}

async function addClothes(req, res) {
  let newclothes = req.body;
  let addclothes = await clothes.create(newclothes);
  res.status(201).json(addclothes);
}
async function getClothesById(req, res) {
  let addedId = parseInt(req.params.id);
  let target = await clothes.findOne({ where: { id: addedId } });
  res.status(200).json(target);
}

async function deleteClothes(req, res) {
  let deletedId = parseInt(req.params.id);
  let deletedClothes = await clothes.destroy({ where: { id: deletedId } });
  res.status(204).json(deletedClothes);
}

async function updatedClothes(req, res) {
  let body = req.body;
  let id = req.params.id;
  let target = await clothes.findOne({ where: { id: id } });
  const UpdatedClothes = await target.update(body);
  res.status(201).json(UpdatedClothes);
}

module.exports = routers;
