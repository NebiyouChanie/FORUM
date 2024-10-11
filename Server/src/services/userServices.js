const dbConnection = require('../configuration/dbConfig')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//REGISTER LOGIC

async function registerUser({username,firstname,lastname,email,password}) {

    //CHEK IF THE USER ALREADY EXIST
    const [existingUsers] = await dbConnection.query(
        "select username,email from users where  username=?  or email=?" , 
        [username,email]);

    if(existingUsers.length > 0){
        throw new Error("User already registered");
    }

    // ENCRYPT PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 

    // INSERT THE NEW USER INTO THE DATABASE
    await dbConnection.query(
        "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
        [username,firstname,lastname,email,hash]);
    return {msg:"User registered successfully"}
  
}


//LOGIN LOGIC
async function loginUser({email , password}) {
     
    const [existingUsers] =await dbConnection.query(
    "SELECT userid,username, firstname, lastname, email, password FROM users WHERE email=? ",
    [email])


    if (existingUsers.length === 0) {
        throw new Error("Invalid user: email not found");
    }
         
    const user=existingUsers[0]
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(existingUsers && !isMatch){
         throw new Error("Incorrect password")
    }

    const token = jwt.sign({userid:user.userid,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn : '1d'});
    
    const {username} = user
    return {msg:"User Logedin successfully",token,username}

}
module.exports = {registerUser , loginUser}



 
