const { Response } = require('../helpers/helper.message.server');
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { Player } = require("../models/player.model");

const AdminController = {
    signup: async (req, res, next) => {
        const { fsname, lsname, phone, email } = req.body;
        if(!fsname || !lsname || !phone || !email) return Response(res, 401, "this request must have body included fsname, lsname, phone, email")
        try {
            
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    login: async (req, res, next) => {

    },
    editplayer: async (req, res, next) => {

    },
    deleteplayer: async (req, res, next) => {

    }
}

module.exports = {
    AdminController
}