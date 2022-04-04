const { fillphone } = require('../helpers/helper.fillphonenumber');
const { Response } = require('../helpers/helper.message.server');
const { logger } = require('../helpers/helper.writelogfile');
const { sendMessage } = require('../helpers/helpers.message');
const { Cogs } = require('../models/cogs.model');
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

        if(!content || !from_number) return Response(res, 401, 'cette requete doit contenir au minimum `content`, `from_number`')
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
            const cogs = await Cogs.findOne({
                where: {
                    id: 1
                }
            });

            if(cogs instanceof Cogs){
                switch (cogs['session']) {
                    case 1:
                        // means inscriptions sont en cours
                        
                        break;
                    case 2:
                        // means gaming is opened

                        break;
                    case 3:
                        // means no session opened
                        sendMessage({
                            to: fillphone(from_number),
                            content: `Toutes les sesssion sont fermées sont fermées pour l'instat`
                        }, (er, dn) => {
                            if(er){
                                logger({message: "erreur on sending message", raison: er});
                                return Response(res, 200, er);
                            }else return Response(res, 200, dn)
                        }) 
                        break;
                    default:
                        sendMessage({
                            to: fillphone(from_number),
                            content: `Toutes les sesssion sont fermées sont fermées pour l'instat`
                        }, (er, dn) => {
                            if(er){
                                logger({message: "erreur on sending message", raison: er});
                                return Response(res, 200, er);
                            }else return Response(res, 200, dn)
                        }) 
                        break;
                }
            }else{

                sendMessage({
                    to: fillphone(from_number),
                    content: `Toutes les sesssion sont fermées sont fermées pour l'instat`
                }, (er, dn) => {
                    if(er){
                        logger({message: "erreur on sending message", raison: er});
                        return Response(res, 200, er);
                    }else return Response(res, 200, dn)
                }) 
            }
        }
    }
}
module.exports = {
    PlayerController
}