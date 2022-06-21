const { Response } = require('../helpers/helper.message.server');
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { Admin } = require("../models/admin.model");
const { generatePasswordAndEncryptIt, generateIdentifier } = require('../helpers/helper.random');
const { sendMessage } = require('../helpers/helpers.message');
const { comparePWD, hashPWD } = require('../helpers/helper.crypthash');
const { sendMail } = require('../helpers/helper.sendmail');
const dotenv = require('dotenv');
const { Player } = require('../models/player.model');

dotenv.config()

const AdminController = {
    // creation d;un compte admin
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
                        Username: ${email} ou ${fillphone(phone)}
                        Password: ${plain}`
                    }, (err, don) => { })
                    sendMail({
                        to: email,
                        body: `Bonjour ${fsname} - ${lsname} Votre compte admin vient d'être crée avec succès vos identifiants sont 
                        Username: ${email} ou ${fillphone(phone)}
                        Password: ${plain}`
                    }, (err, done) => { })

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
    // connexion admin
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
                        comparePWD({hashedtext: adm.password, oldplaintext: password}, (notmatch, matched) => {
                            if(matched){
                                sendMail({
                                    to: email,
                                    body: `Une connexion vient d'être signaler avec vos identifiants dans le système ${process.env.APP_NAME},
                                    S'il ne s'agit pas de vous veuillez nous le faire savoir ou tout simplement vous pouvez changer vos indetifiants enfin de protéger votre compte !`,
                                }, (err, sent) => { })
                                return Response( res, 200, adm )
                            }else{
                                return Response(res, 203, "Email or Password incorect !")
                            }
                        })
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
    // modification compte joueur
    editplayer: async (req, res, next) => {
        const { player } = req.params;
        const { fsname, lsname, phone, email, province, ville, pays } = req.body;
        if(!player || isNaN(parseInt(player))) return Response(res, 401, "Parameter `player` must be integer !")
        if(Object.keys(req.body).length === 0) return Response(res, 401, "Params in body leaks !")
        try {
            await Player.findOne({
                where: {
                    id: parseInt(player)
                }
            })
            .then(pl => {
                if(pl instanceof Player){
                    pl.update({

                        fsname: fsname ? fsname : pl['fsname'],
                        lsname: lsname ? lsname : pl['lsname'],
                        email: email ? email : pl['email'],
                        phone: phone ? phone : pl['phone'],
                        province: province ? province : pl['province'],
                        ville: ville ? ville : pl['ville'],
                        pays: pays ? pays : pl['pays']

                    })
                    .then(U => {
                        return Response(res, 200, { modifiedvalues: U, item: pl })
                    })
                    .catch(err => {
                        return Response(res, 500, err)
                    })
                }else return Response(res, 404, `The record with ID ${player} not found !`)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // suppression compte joueur
    deleteplayer: async (req, res, next) => {
        const { player } = req.params;
        if(!player || isNaN(parseInt(player))) return Response(res, 401, "Parameter `player` must be integer !")
        try {
            await Player.findOne({
                where: {
                    id: parseInt(player)
                }
            })
            .then(pl => {
                if(pl instanceof Player){
                    if(pl.status === 1){
                        pl.update({
                            status: 0
                        })
                        .then(U => {
                            return Response(res, 200, { message: "Item deleted successfuly !", item : pl })
                        })
                        .catch(err => {
                            return Response(res, 400, err)
                        })
                    }else Response(res, 400, `The record with ID ${player} has already deleted !` )
                }else return Response(res, 404, `The record with ID ${player} not found !`)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // modification compte admin
    editadmin: async (req, res, next) => {
        const { admin } = req.params;
        const { fsname, lsname, phone, email, accesslevel } = req.body;

        if(!admin || isNaN(parseInt(admin))) return Response(res, 401, "Parameter `admin` must be integer !");
        if(Object.keys(req.body).length === 0) return Response(res, 401, "Params in body leaks !");

        try {
            await Admin.findOne({
                where: {
                    id: parseInt(admin)
                }
            })
            .then(pl => {
                if(pl instanceof Admin){
                    pl.update({

                        fsname: fsname ? fsname : pl['fsname'],
                        lsname: lsname ? lsname : pl['lsname'],
                        email: email ? email : pl['email'],
                        phone: phone ? phone : pl['phone'],
                        accesslevel: accesslevel ? accesslevel : pl['accesslevel']

                    })
                    .then(U => {
                        return Response(res, 200, { modifiedvalues: U, item: pl })
                    })
                    .catch(err => {
                        return Response(res, 500, err)
                    })
                }else return Response(res, 404, `The record with ID ${admin} not found !`)
            })
            .catch(err => {
                console.log(err);
                return Response(res, 500, err)
            })
        } catch (error) {
            console.log(error);
            return Response(res, 500, error)
        }
    },
    // suppression compte admin
    deletadmin: async (req, res, next) => {
        const { admin } = req.params;
        if(!admin || isNaN(parseInt(admin))) return Response(res, 401, "Parameter `admin` must be integer !")
        try {
            await Admin.findOne({
                where: {
                    id: parseInt(admin)
                }
            })
            .then(pl => {
                if(pl instanceof Admin){
                    if(pl.status === 1){
                        pl.update({
                            status: 0
                        })
                        .then(U => {
                            return Response(res, 200, { message: "Item deleted successfuly !", item : pl })
                        })
                        .catch(err => {
                            return Response(res, 400, err)
                        })
                    }else Response(res, 400, `The record with ID ${admin} has already deleted !` )
                }else return Response(res, 404, `The record with ID ${admin} not found !`)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // edit password compte admin
    changeadminpassword: async (req, res, next) => {

        const { admin } = req.params;
        const { oldpassword, newpassword } = req.body;

        if(!admin || isNaN(parseInt(admin))) return Response(res, 401, "Parameter `admin` must be integer !");
        if(!oldpassword || !newpassword) return Response(res, 401, "this request must have at least `oldpassword` and `newpassord` parameters !");

        try {
            const password = await hashPWD({ plaintext: newpassword, roundsalt: 10 });
            await Admin.findOne({
                where: {
                    id: parseInt(admin)
                }
            })
            .then(pl => {
                if(pl instanceof Admin){
                    if(pl.status === 1){
                        comparePWD({
                            oldplaintext: oldpassword,
                            hashedtext: pl['password']
                        }, (notmatch, matched) => {
                            if(matched){
                                pl.update({
                                    password
                                })
                                .then(U => {
                                    return Response(res, 200, pl)
                                })
                                .catch(err => {
                                    return Response(res, 400, err)
                                })
                            }else return Response(res, 203, "The old password is incorrecte !")
                        })
                    }else Response(res, 400, `The record with ID ${admin} has already deleted !` )
                }else return Response(res, 404, `The record with ID ${admin} not found !`)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}

module.exports = {
    AdminController
}