const express = require("express");
const { AdminController } = require("../controllers/admin.controller.js");
const admin = express.Router();

admin.post("/admin/login", AdminController.login)
admin.post("/admin/signup", AdminController.signup)
admin.put("/player/:player", AdminController.editplayer)
admin.delete("/player/:player", AdminController.deleteplayer)

module.exports = { admin }