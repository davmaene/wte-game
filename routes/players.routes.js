const express = require("express");
const { PlayerController } = require("../controllers/player.controller");
const players = express.Router();

players.post("/", PlayerController.webhook)
players.get("/login", PlayerController.login)
players.get("/list", PlayerController.players)

module.exports = { players }