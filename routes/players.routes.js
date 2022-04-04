const express = require("express");
const { PlayerController } = require("../controllers/player.controller");
const players = express.Router();

players.get("/login", PlayerController.login)
players.get("/", PlayerController.login)

module.exports = { players }