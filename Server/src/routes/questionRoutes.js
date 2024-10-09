const express = require('express')
const router = express.Router()
const authMiddleware =require('../middlewares/authMiddleware')
const {getAllQuestions,getSingleQuestions,postQuestion} = require('../controllers/questionControllers')
const questionValidateMiddleware = require('../middlewares/questionValidatorMiddleware')


// GET ALL QUESTIONS
router.get('/all',authMiddleware,getAllQuestions)

//GET A SINGLE QUESTION

router.get('/:questionid',authMiddleware,getSingleQuestions)


//POST A QUESTION
router.post('/ask',authMiddleware,questionValidateMiddleware,postQuestion)


module.exports = router