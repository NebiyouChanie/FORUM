function isEmpty(value) {
    return !value || value.trim() === '';
}

function validateAnswer(data) {
    const {answer} = data;
    const errors = []

    
    if(isEmpty(answer)){
        errors.push({field:"answer",msg:"Answer cant be empty"})
    }

 
    if (answer.length > 300){
        errors.push({field:"answer",msg:"The answer character length can not execeed 300"})
    }

    return errors;

}

module.exports={validateAnswer}