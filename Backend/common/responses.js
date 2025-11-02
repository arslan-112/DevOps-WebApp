module.exports.responseSuccess = (res,data , msg="Operation Completed Successfully") => {
    res.status(200).send({
        success:true,
        data:data,
        message:msg
    })
}
module.exports.responseFailure = (res,msg="Operation Failed") => {
    res.status(500).send({
        success:false,
        message:msg
    })
}
module.exports.responseFobidden = (res,msg="Fobidden") => {
    res.status(401).send({
        success:false,
        message:msg
    })
}
module.exports.responseBadRequest = (res,msg="Bad Request") => {
    res.status(400).send ({
        success:false,
        message:msg
    })
}