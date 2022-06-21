const { Response } = require('../helpers/helper.message.server');
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { Admin } = require("../models/admin.model");
const { generatePasswordAndEncryptIt, generateIdentifier } = require('../helpers/helper.random');
const { sendMessage } = require('../helpers/helpers.message');

const AdminController = {
    signup: async (req, res, next) => {
        const { fsname, lsname, phone, email } = req.body;

        if(!fsname || !lsname || !phone || !email) return Response(res, 401, "this request must have body included fsname, lsname, phone, email")
        try {
            const { plain, encrypted } = await generatePasswordAndEncryptIt()
            Admin.create({
                fsname,
                lsname,
                phone: fillphone(phone),
                email,
                ref: generateIdentifier(),
                accesslevel: 1,
                password: encrypted
            })
            .then(adm => {
                if(adm instanceof Admin){
                    sendMessage({
                        to: fillphone(phone),
                        content: `Bonjour ${fsname} - ${lsname} Votre compte admin vient d'être crée avec succès vos identifiants sont 
    Username: ${fillphone(phone)}
    Password: ${plain}`
                    }, (err, don) => {
                        if(don) console.log(don);
                        else console.log(err);
                    })
                    return Response(res, 200, adm)
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
        const { email, password } = req.body;
        if(!email || !password) return Response(res, 401, "This request must have username and password !");

        try {
            if(/^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(email)){
                await Admin.findOne({
                    where: {
                        email,
                        status: 1
                    }
                })
                .then(adm => {
                    if(adm instanceof Admin){

                    }else{
                        return Response(res, 203, "Email or Password incorect !" )
                    }
                })
                .catch(err => {
                    return Response(res, 500, err)
                })
            } else return Response(res, 400, 'The email adress is not respect the structure of an email adress');
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    editplayer: async (req, res, next) => {

    },
    deleteplayer: async (req, res, next) => {

    }
}

module.exports = {
    AdminController
}