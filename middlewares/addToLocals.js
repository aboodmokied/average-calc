module.exports=(req,res,next)=>{
    if('flash' in req.session && typeof req.session.flash == 'object'){
        res.locals=req.session.flash;
        req.session.destroy(error=>{
            if(error)console.log(error);
        })
    }
    next();
}