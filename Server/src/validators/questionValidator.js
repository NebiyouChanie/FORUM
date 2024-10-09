function isEmpty(value) {
    return !value || value.trim() === '';
}

function validateQuestion(data) {
    const {title,description} = data;

    const errors = []

    if(isEmpty(title)){
        errors.push({field:"title",msg:"Title is Required"})
    }
    if(isEmpty(description)){
        errors.push({field:"description",msg:"Description is Required"})
    }

   
    if (title.length > 100){
        errors.push({field:"title",msg:"The title character length can not execeed 100"})
    }

    
    if (description.length > 300){
        errors.push({field:"description",msg:"The title character length can not execeed 300"})
    }
    return errors;

}

module.exports={validateQuestion}