const {Sequelize}=require('sequelize');

const sequelize=new Sequelize({
    host:'localhost',
    port:3306,
    database:'school',
    username:'root',
    password:'197508',
    dialect:'mysql'
})


module.exports=sequelize;