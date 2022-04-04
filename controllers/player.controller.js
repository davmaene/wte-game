const { Response } = require('../helpers/helper.message.server');
const { sendMessage } = require('../helpers/helpers.message');
const { Player } = require('../models/player.model.js');
const PlayerController = {
    login: async (req, res, next) => {
        return Response(res, 200, req.body)
    },
    webhook: async (req, res, next) => { // tous les sms atterissent ici
        const {
            secret,
            content,
            id,
            idservice,
            from_number,
            to_number
        } = req.body;
        sendMessage({
            to: '0970284772',
            content: 'salut kaka maisha ina sema aye kule'
        }, (er, dn) => {
            if(er) return Response(res, 200, er);
            else return Response(res, 200, dn)
        })
        
    }
}
module.exports = {
    PlayerController
}