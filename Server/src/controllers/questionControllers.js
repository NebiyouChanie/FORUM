const {StatusCodes} = require('http-status-codes')
const {queryAllQuestions,querySingleQuestions,inserQuestion} = require('../services/questionServices')

// GET ALL QUESTIONS
async function getAllQuestions(req,res) {
    try {
        const response = await queryAllQuestions()
        res.status(StatusCodes.OK).json({msg:"Success",response})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when geting question"})
    }
}

// GET A SINGLE QUESTIONS

async function getSingleQuestions(req,res) {
    const {questionid} = req.params;
    try {
        const response = await querySingleQuestions({questionid})
        res.status(StatusCodes.OK).json({msg:"Success",response})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when geting question"})
    }
}


// POST A QUESTIONS

async function postQuestion(req,res) {
    const {userid}=req.user
    
    try { 
        const {questionid,title,description,tag} = req.body
        const  response = await inserQuestion({questionid,userid,title,description,tag})
        res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when posting question"})
    }

}

module.exports = {getAllQuestions,getSingleQuestions,postQuestion}