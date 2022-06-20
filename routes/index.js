const express = require('express');
const { players } = require("./players.routes.js");
const { admin } = require("./admin.routes.js");
const routes = express.Router();

routes.use('/webhook/player', players )
routes.use('/admins', admin )

module.exports = { routes }