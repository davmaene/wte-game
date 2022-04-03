const express = require("express");
const { Response } = require("./helpers/helper.message.server.js")
const fprs = require("express-fileupload");
const dotenv = require('dotenv');
const cors = require('cors');
const { Configs } = require("./configs/Configs.js");

dotenv.config();
const PORT = process.env.PORT || process.env.STATIC_PORT
const app = express();

app.use(cors());
app.use(fprs());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    // console.log(req.url);
    return Response(res, 404, `No ressource found on ${req.url}`)
})

app.listen(PORT, () => {
    try {
        Configs.authenticate()
        console.log("----------------------------------------------");
        console.log("----------- APP RUNNING ON PORT " + PORT + " ---------");
        console.log("----------------------------------------------");
    } catch (error) {
        console.error(error)
    }
})