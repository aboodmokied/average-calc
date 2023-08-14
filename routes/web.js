const express=require('express');
const { index, store, destroy } = require('../controllers/studentControllers');
const router=express.Router();
const {body}=require('express-validator');
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
router.post('/',[
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

router.delete('/:id',destroy);

module.exports=router;
