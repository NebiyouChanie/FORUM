//{answerId,userId,questionId,postAnswer}
const {StatusCodes} = require('http-status-codes');
const { queryAnswers, insertAnswer} = require('../services/answerServices')

// GET ANSWERS
async function getAllAnswers(req,res) {
    const {questionid} = req.params;
    try {
        const response = await queryAnswers({questionid});
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when geting Answers"})
    }
}



// POST ANSWER

async function postAnswer(req,res) {
    const {answer} = req.body;
    console.log("answer controlller", answer)
    const {questionid} = req.params;
    const userId = req.user.userid;

    try {
        const response = await insertAnswer({userId,questionid,answer})
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when posting Answers"})
    }
}


module.exports = {getAllAnswers , postAnswer}