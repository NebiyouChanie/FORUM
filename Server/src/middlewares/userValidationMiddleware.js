const { validateUser , validateLogin } = require('../validators/userValidator')
const  {StatusCodes} = require('http-status-codes')

function validateUserRegstration(req,res,next) {

    const errors = validateUser(req.body);
    if(errors.length > 0){
        return res.status(StatusCodes.BAD_REQUEST).json({errors});
    }
    next();
}

function validateUserLogin(req,res,next) {
    const errors = validateLogin(req.body)
    if(errors.length > 0){
        return res.status(StatusCodes.BAD_REQUEST).json({err: errors});
    }
    next();
}
module.exports = {validateUserRegstration ,validateUserLogin} ;