const {validateAnswer} = require('../validators/answerValidator')
const {StatusCodes} = require('http-status-codes');


function answerValidatorMiddleware(req,res,next) {
    const errors = validateAnswer(req.body);
   
    if (errors.length>0){
        res.status(StatusCodes.BAD_REQUEST).json(errors)
    }
    next()
}

module.exports = answerValidatorMiddleware