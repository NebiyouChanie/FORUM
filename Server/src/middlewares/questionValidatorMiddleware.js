const {validateQuestion} = require('../validators/questionValidator')
const {StatusCodes} = require('http-status-codes');


function questionValidateMiddleware(req,res,next) {
    const errors = validateQuestion(req.body);
    if (errors.length > 0){
        res.status(StatusCodes.BAD_REQUEST).json(errors)
    }
    next()
}

module.exports = questionValidateMiddleware