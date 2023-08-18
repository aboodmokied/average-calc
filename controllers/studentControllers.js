const Student=require('../models/student');
const {validationResult}=require('express-validator');
exports.index=async(req,res,next)=>{
    try{
        const students=await Student.findAll({
            order:[
                ['id','DESC']
            ]
        });
        return req.headers.accept=='application/json'
            ? res.send({status:true,result:students})
            : res.render('index',{
                pageTitle:'Students Marks',
                students
            });   
        
    }catch(error){
        const message=error.errors?error.errors[0].message: error.message;
        res.send({status:false,message});
    }
    
}
// exports.show=(req,res,next)=>{}
// exports.create=(req,res,next)=>{}

exports.store=async(req,res,next)=>{
    const validation=validationResult(req);
    try{
        if(validation.isEmpty()){
            const result=await Student.create(req.body);
            return req.headers.accept=='application/json'
            ? res.status(201).send({status:true,result})
            : res.redirect('/');    
        }
        return req.headers.accept=='application/json'
            ? res.status(201).send({status:false,errors:validation.array({onlyFirstError:true})})
            : res.with('errors',validation.array({onlyFirstError:true})).with('old',req.body).redirect('/');
        
    }catch(error){
        const message=error.errors?error.errors[0].message: error.message;
        res.send({status:false,message});
    }
    
}
// exports.edit=(req,res,next)=>{}
// exports.update=(req,res,next)=>{}

exports.destroy=async(req,res,next)=>{
    const validation=validationResult(req);
        if(validation.isEmpty()){
        const {id}=req.params;
        const count=await Student.destroy({where:{id}});
        return req.headers.accept=='application/json'?
        res.send({status:true,isDeleted:count>0})
        :res.redirect('/');
        }
        res.send({status:false,errors:validation.array({onlyFirstError:true})})
    

}  