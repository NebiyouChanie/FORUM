 
 function isEmpty(value) {
    return !value || value.trim()  === '';
 }
 
 function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
 }

 function isLength(value,minLength) {
    return value.length >= minLength;
 }



 function validateUser(data){
    const errors = [];

    if (isEmpty(data.username)) {
        errors.push({field: 'username', message:'Username is required'})
    }else if (!isLength(data.username , 4)){
        errors.push({field: 'username', message:'Username must be atleas 4 characters'})
    }


    if (isEmpty(data.email)) {
        errors.push({field: 'email', message:'email is required'})
    }else if (!isEmail(data.email )){
        errors.push({field: 'email', message:'Please provide a valid email address'})
    }

    if (isEmpty(data.password)) {
        errors.push({field: 'password', message:'Password is required'})
    }else if (!isLength(data.password,8)){
        errors.push({field: 'password', message:'password must be atleas 8 characters'})
    }
    
    return errors;

 }

 function validateLogin(data){
    errors = []
    if (isEmpty(data.email)) {
        errors.push({field: 'email', message:'email is required'})
    }else if (!isEmail(data.email )){
        errors.push({field: 'email', message:'Please provide a valid email address'})
    }

    if (isEmpty(data.password)) {
        errors.push({field: 'password', message:'Password is required'})
    } 
    
    return errors;
 }

 

 module.exports = { validateUser, validateLogin };