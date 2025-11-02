const jwt = require("jsonwebtoken");
const { AuthenticationSecretKey } = require("../constants/AppConstants");
const { responseSuccess, responseFailure, responseFobidden } = require("./responses");
getTokenMiddleware = async (req, res, next) => {
    try{
    if (req.headers.authorization != null) {

        const usertoken = req.headers.authorization;
        console.log(usertoken)
        const token = usertoken.split(' ');
        console.log(token)
        console.log(token[1])
        const decoded = jwt.verify(token[1], AuthenticationSecretKey);
        console.log("CHECK")
        console.log(decoded);
        console.log(decoded.user.id)

        if (decoded.user?.id != null) {
            req.userObject = decoded.user
            next();
        }
        else {
            res.json("user not found")
        }
    }
    else{
        return responseFobidden(res)
    }
}
catch(e){
    return responseFobidden(res)
}
    
}

module.exports.getTokenMiddleware = getTokenMiddleware
