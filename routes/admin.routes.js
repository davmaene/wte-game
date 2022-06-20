const express = require("express");
const { AdminController } = require("../controllers/admin.controller.js");
const admin = express.Router();

admin.get("/admin/login", AdminController.login)
admin.get("/admin/signup", AdminController.signup)
admin.put("/player/:player", AdminController.editplayer)
admin.delete("/player/:player", AdminController.deleteplayer)

module.exports = { admin }