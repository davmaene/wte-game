const telerivet = require('telerivet');
const dotenv = require("dotenv");

dotenv.config()

const tr = new telerivet.API(process.env.APP_APIKEY);
const project = tr.initProjectById(process.env.APP_PROJECTID); 

const sendMessage = async ({ to, content }, cb ) => {
    await project.sendMessage({
        to_number: to, 
        content,
    }, (err, message) => {
        if (err) cb(err, undefined)
        else cb(undefined, message)
    });
}
module.exports = {
    sendMessage
}