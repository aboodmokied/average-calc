const express=require('express');
const { index, store, destroy } = require('../controllers/studentControllers');
const router=express.Router();
const {body, param}=require('express-validator');
const markValidation = require('../middlewares/markValidation');
const Student = require('../models/student');

// method override
router.use((req,res,next)=>{
    const {_method}=req.body;
    if(_method=='DELETE'||_method=='PUT'){
        req.method=_method;
    }
    delete req.body._method;
    next();
})



// Student Routes
router.get('/',index);
router.post('/student',[
    body('name').trim().notEmpty().withMessage('Name Required.').isString().withMessage('Name should be string.')
    .custom((value)=>{
        return Student.count({where:{name:value}}).then(count=>{
            if(count>0)return Promise.reject('This Student already exist.');
        })
    })
    ,
    markValidation('midMark'),
    markValidation('finalMark'),
    markValidation('activitiesMark'),
],store);

router.delete('/student/:id',
param('id').isNumeric({no_symbols:true}).withMessage('id should be number')
.custom(value=>{

    return Student.count({where:{id:value}}).then(count=>{
        console.log(count);
        if(count==0)return Promise.reject('User not found');
    })
})
,destroy);

module.exports=router;
