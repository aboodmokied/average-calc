const {body}=require('express-validator');
module.exports=(name)=>{
    return body(name).notEmpty().withMessage(`${name} Required`).isNumeric().withMessage(`${name} should be number.'`).custom((value)=>{
        if(value>100 || value<0){
            throw Error('Value should be between 0 to 100.');
        }
        return true;
    })
}