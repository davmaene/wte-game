const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config()

const hashPWD = async (oldplaintext, cb) => {
    return bcrypt.hash(oldplaintext, process.env.app_accessapp)
}

const comparePWD = async (oldplaintext, hashedtext, cb) => {
    const valide = await bcrypt.compare(oldplaintext, hashedtext)
    if(valide) cb(undefined, valide)
    else cb('error pwds not matching', undefined)
}

module.exports = {
    hashPWD,
    comparePWD
}