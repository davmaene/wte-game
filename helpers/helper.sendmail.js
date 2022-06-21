const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient(
  { authorizationToken: "pk_prod_VN993XB7Z6MHWGG381SK1VAY240R" }
);
 
const sendMail = async ({ to, body, title }, cb) => {
    try {
        const { requestId } = await courier.send({
            message: {
              content: {
                title: title ? title : "WTE Game",
                body,
              },
              to: {
                email: to
              }
            }
        });
        if(requestId) cb( undefined, requestId );
        else cb( 'error on sending email', undefined );
    } catch (error) {
        cb(error, undefined)
    }
};

module.exports = { sendMail };