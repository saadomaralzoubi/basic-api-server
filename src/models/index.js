"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food.js");
const clothes = require("./clothes.js");
require("dotenv").config();
const POSTGRES_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  food: food(sequelize, DataTypes),
  clothes: clothes(sequelize, DataTypes),
};
