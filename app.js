const express=require('express');
const app=express();

// modules
const session=require('express-session');


// middlewares
const addWith=require('./middlewares/addWith');
const addToLocals=require('./middlewares/addToLocals');

app.set('view engine','ejs');
app.set('views','views');


// statics
app.use(express.static('public'));

// body parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// session
app.use(session({
    secret:'abood'
}))

app.use(addWith);
app.use(addToLocals);

// routers
const webRoutes=require('./routes/web');
const sequelize = require('./config/database');

// routes
app.use(webRoutes);


// 404
app.use((req,res)=>{
    res.status(404).send({status:false,message:'This Route Not Found.'});
})



sequelize.authenticate().then(()=>{
    sequelize.sync().then(result=>{
        app.listen(5000,()=>{
            console.log('Running on port 5000')
        })
    })
    .catch(error=>{
        console.log('Database Error: '+error)
    })
})
.catch(error=>{
    console.log('Authentication Error: '+error)
})
