const express = require('express');
const router = express.Router();
const {getAllAnswers , postAnswer} = require('../controllers/answerControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const answerValidatorMiddleware = require('../middlewares/answerValidatorMiddleware');


router.get('/questions/:questionid/answers',authMiddleware,getAllAnswers)
router.post('/questions/:questionid/postanswer',authMiddleware,answerValidatorMiddleware,postAnswer)

module.exports = router