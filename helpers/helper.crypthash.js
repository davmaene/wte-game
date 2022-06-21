const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { randomVerifierAccount } = require('./helper.random');

dotenv.config()

const hashPWD = async ({ plaintext, roundsalt }, cb) => {

    try {
        const sfx = randomVerifierAccount()
        const salt = await bcrypt.genSalt(roundsalt ? roundsalt : 10);
        const hashed = await bcrypt.hash(plaintext, salt);
        return hashed;
    } catch (error) {
       console.log("Error on hash password fnk => ", error);
       return null;
    }

}

const comparePWD = async ({ oldplaintext, hashedtext }, cb) => {
    try {
        bcrypt.compare(oldplaintext, hashedtext, (err, same) => {
            if(same) cb(undefined, same)
            else cb(err, undefined)
        })
    } catch (error) {
        cb(error, undefined)
    }

}

module.exports = {

    hashPWD,
    comparePWD

}