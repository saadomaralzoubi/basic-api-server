"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food.js");
const clothes = require("./clothes.js");
require("dotenv").config();

const POSTGRES_URL = process.env.DATABASE_URL;

let sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

let sequelize = new Sequelize(POSTGRES_URL, {});

module.exports = {
  db: sequelize,
  food: food(sequelize, DataTypes),
  clothes: clothes(sequelize, DataTypes),
};
