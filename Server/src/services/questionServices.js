const dbConnection = require('../configuration/dbConfig');

// GET ALL QUESTIONS
async function queryAllQuestions() {
    const [result] = await dbConnection.query(
        `SELECT 
            questions.questionid, 
            questions.title, 
            questions.description, 
            users.username
        FROM  questions
        JOIN users 
        ON questions.userid = users.userid
        ORDER BY 
            questions.id DESC;
        `
    )
    return result
}

// GET A SINGLE QUESTIONS
async function querySingleQuestions({questionid}) {
    const [result] = await dbConnection.query(
        `SELECT 
            title,description
        FROM 
            questions
        where questionid=?`,
        [questionid]
    )
    return result
}

// POST A QUESTIONS
function generateQuestionId(){
    return Math.floor(100000 + Math.random()*900000).toString();
}
async function inserQuestion({userid,title,description,tag}) {
    const questionid = generateQuestionId();
    await dbConnection.query(
        "INSERT INTO QUESTIONS (questionid,userid,title,description,tag) VALUES (?,?,?,?,?)",
        [questionid,userid,title,description,tag]
    )
    return {msg:"question posted successfully!"}
}
module.exports = {queryAllQuestions,querySingleQuestions,inserQuestion}