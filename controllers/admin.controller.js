const { Response } = require('../helpers/helper.message.server');
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { Admin } = require("../models/admin.model");

const AdminController = {
    signup: async (req, res, next) => {
        const { fsname, lsname, phone, email, password } = req.body;
        if(!fsname || !lsname || !phone || !email || !password) return Response(res, 401, "this request must have body included fsname, lsname, phone, email")
        try {
            Admin.create({
                fsname,
                lsname,
                phone: fillphone(phone),
                email,
                ref: "",
                accesslevel: 1,

            })
            .then(adm => {
                if(adm instanceof Admin){

                }else Response(res, 400, adm)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
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