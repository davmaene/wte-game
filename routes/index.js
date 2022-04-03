const express = require('express');
const routes = express.Router();
const { players } = require("./players.routes.js");
const { admin } = require("./admin.routes.js");

routes.use('/players', players )
routes.use('/admin', admin)

exports.module = { routes }