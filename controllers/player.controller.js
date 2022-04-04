const { Response } = require('../helpers/helper.message.server');
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
        return Response(res, 200, req.body)
    }
}
module.exports = {
    PlayerController
}