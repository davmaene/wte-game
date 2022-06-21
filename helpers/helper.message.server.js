const Response = (res, status, body) => {
    if(1 && res && status){
        const sts = parseInt(status);
        switch(sts){
            
            case 200:
            res.status(200).json({
                status: 200,
                message: "Success execution",
                data: body ? body : {}
            });
            break;

            case 402:
            res.status(402).json({
                status: 402,
                message: "le numero de telephone est utiliser par un autre compte",
                data: body ? body : {}
            });
            break;

            case 203:
            res.status(203).json({
                status: 203,
                message: "Login failed `password` or `identifier` is incorrect !",
                data: body ? body : {}
            });
            break;

            case 244:
            res.status(244).json({
                status: 244,
                message: "Login failed cause account is not activate",
                data: body ? body : {}
            });
            break;

            case 404:
            res.status(404).json({
                status: 404,
                message: "Ressource not found on this server !",
                data: body ? body : {}
            });
            break;

            case 403: 
            res.status(403).json({
                status: 403,
                message: "You don't have right access to this server ! please check your app and access key",
                data: body ? body : {}
            })
            break;

            case 400: 
            res.status(400).json({
                status: 400,
                message: "Success execution but nothing to render",
                data: body ? body : {}
            })
            break;
            case 401:
            res.status(401).json({
                status: 401,
                message: "missing params to the request !",
                data: body ? body : {}
            });
            break;

            case 301:
            res.status(301).json({
                status: 301,
                message: "Session has expired !",
                data: body ? body : {}
            });
            break;

            case 503: 
            res.status(503).json({
                status: 503,
                message: "Duplicate entry in deb",
                data: body ? body : {}
            })
            break;

            case 500: 
            res.status(500).json({
                status: 500,
                message: "An internal server error occured !",
                data: body ? body : {}
            })
            break;
            default: 
            res.status(222).json({
                status: 222,
                message: "unknown internal server occured on this server | please contact + 243 970 284 772 if the problem persists",
                data: []
            })
            break;
        }
    }else{
        res.status(222).json({
            status: 222,
            message: "missing params to the request ",
            data: "case where missing `res` or `status` object in switch case"
        });
    }
}
module.exports = { Response }