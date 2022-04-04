const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config()

const logger = ({message, raison}) => {
    const fl = fs.createWriteStream('assets/log/log.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\n${process.env.APP_ESCAPSTRING} ${message}\n${raison} \nTemps: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
}

module.exports = {
    logger
}