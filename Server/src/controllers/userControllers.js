const  {StatusCodes} = require('http-status-codes')
const userServices = require('../services/userServices')

//REGISTER FUNCTION
async function register(req,res) {

    const {username,firstname,lastname,email,password} = req.body;

    try {
        const response = await userServices.registerUser({username,firstname,lastname,email,password})
        res.status(StatusCodes.CREATED).json(response)
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}


//LOGIN FUNCTION
async function login(req,res) {
    const { email ,password } = req.body
    try {
        const response = await userServices.loginUser({email,password});
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

module.exports = {register ,login}