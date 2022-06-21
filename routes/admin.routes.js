const express = require("express");
const { AdminController } = require("../controllers/admin.controller.js");
const admin = express.Router();

admin.post("/admin/signin", AdminController.login)
admin.post("/admin/signup", AdminController.signup)

admin.put("/edit/pl/:player", AdminController.editplayer)
admin.delete("/delete/pl/:player", AdminController.deleteplayer)

admin.put("/edit/ad/:admin", AdminController.editadmin)
admin.delete("/delete/ad/:admin", AdminController.deletadmin)


module.exports = { admin }