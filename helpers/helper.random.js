const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');

dotenv.config();

const generateIdentifier = () => {
    const pfx = Math.floor(Math.random() * 1000);
    const sfx = `${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`;
    
    return `WTE-${pfx}-${sfx}`;

};

const randomVerifierAccount = () => {
    const len = 6;
    const ret = [];

    for(let k = 0; k < len; k++) ret.push(
       Math.floor( Math.random() * 10 )
    );
    
    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m;
};

const genFilename = async (length = new Number()) => {
    return randomstring.generate({
        length: 17,
        charset: process.env.app_accesskey
    })
};

const generatePasswordAndEncryptIt = async (roundsalt) => {

    const sfx = randomVerifierAccount()
    const salt = await bcrypt.genSalt(roundsalt ? roundsalt : 10);
    const hashed = await bcrypt.hash(sfx, salt);

    return {
        plain: sfx,
        encrypted: hashed
    }
};

module.exports = {

    generatePasswordAndEncryptIt,
    generateIdentifier,
    genFilename,
    randomVerifierAccount
    
}