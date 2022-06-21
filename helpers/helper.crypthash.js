const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { randomVerifierAccount } = require('./helper.random');

dotenv.config()

const hashPWD = async ({ plaintext, roundsalt }, cb) => {

    const sfx = randomVerifierAccount()
    const salt = await bcrypt.genSalt(roundsalt ? roundsalt : 10);
    const hashed = await bcrypt.hash(plaintext, salt);
    return hashed;

}

const comparePWD = async ({ oldplaintext, hashedtext }, cb) => {

    const valide = await bcrypt.compare(oldplaintext, hashedtext)
    if(valide) cb(undefined, valide)
    else cb('error pwds not matching', undefined)

}

module.exports = {

    hashPWD,
    comparePWD

}