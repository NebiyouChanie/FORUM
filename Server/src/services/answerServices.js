const dbConnection = require('../configuration/dbConfig');



// GET ANSWERS OF SPECIFIC QUESTION
async function queryAnswers({questionid}) {
    const [answers] = await dbConnection.query(
        "SELECT answer,username from answers join users on answers.userid=users.userid where questionid=?" ,
        [questionid]
    )

    return answers
}



// POST ANSWER

function generateAnswerid(){
    return Math.floor(100000 + Math.random()*900000).toString();
}

async function insertAnswer({userId,questionid,answer}) {
    answerId = generateAnswerid()
    await dbConnection.query(
        "INSERT INTO answers (answerid,userid,questionid,answer) VALUE(?,?,?,?)",
        [answerId,userId,questionid,answer]
    )

    return {msg:"Answer posted Successfully!"}
}

module.exports = { queryAnswers, insertAnswer }