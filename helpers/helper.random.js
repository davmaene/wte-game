const randomstring = require("randomstring");
const dotenv = require('dotenv');

dotenv.config();

const generateIdentifier = () => {
    const pfx = Math.floor(Math.random() * 1000);
    const sfx = Math.floor(Math.random() * 100);
    
    return `OPR-${pfx}-${sfx}`;

}
const randomVoucherRecharge = () => {
    const len = 18;
    const ret = [];

    for(let k = 0; k < len; k++) ret.push(
       Math.floor( Math.random() * 10 )
    );
    
    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m;
}
const randomVerifierAccount = () => {
    const len = 6;
    const ret = [];

    for(let k = 0; k < len; k++) ret.push(
       Math.floor( Math.random() * 10 )
    );
    
    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m;
}
const genFilename = async (length = new Number()) => {
    return randomstring.generate({
        length: 17,
        charset: process.env.app_accesskey
    })
}

module.exports = {
    generateIdentifier,
    genFilename,
    randomVerifierAccount,
    randomVoucherRecharge
}