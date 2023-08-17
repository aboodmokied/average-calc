const Student=require('../models/student');
const {validationResult}=require('express-validator');
exports.index=async(req,res,next)=>{
    try{
        const students=await Student.findAll({
            order:[
                ['id','DESC']
            ]
        });
        res.render('index',{
        pageTitle:'Students Marks',
        students
    })
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
            await Student.create(req.body);
            return res.redirect('/');    
        }
       
        res.with('errors',validation.array({onlyFirstError:true})).with('old',req.body).redirect('/');
        
    }catch(error){
        const message=error.errors?error.errors[0].message: error.message;
        res.send({status:false,message});
    }
    
}
// exports.edit=(req,res,next)=>{}
// exports.update=(req,res,next)=>{}

exports.destroy=async(req,res,next)=>{
    try{
        const {id}=req.params;
        await Student.destroy({where:{id}});
        res.redirect('/');
    }catch(error){
        const message=error.errors?error.errors[0].message: error.message;
        res.send({status:false,message});
    }

}  