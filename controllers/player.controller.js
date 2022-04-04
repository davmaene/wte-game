const { fillphone } = require('../helpers/helper.fillphonenumber');
const { Response } = require('../helpers/helper.message.server');
const { logger } = require('../helpers/helper.writelogfile');
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
        if(content.length === 0){
            // means the content of the received message is empty and the request can not be executed
            sendMessage({
                to: fillphone(from_number),
                content: `nous ne pouvons pas traiter votre requête car le contenu de votre message est vide `
            }, (er, dn) => {
                if(er){
                    logger({message: "erreur on sending message", raison: er});
                    return Response(res, 200, er);
                }else return Response(res, 200, dn)
                
            })
        }else{
            // means the content of the received message is not empty
            sendMessage({
                to: '0970284772',
                content: 'salut kaka maisha ina sema aye kule'
            }, (er, dn) => {
                if(er) return Response(res, 200, er);
                else return Response(res, 200, dn)
            })
        }
    }
}
module.exports = {
    PlayerController
}