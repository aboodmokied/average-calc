const sequelize=require('../config/database');
const {DataTypes}=require('sequelize');

const Student=sequelize.define('Student',{
    id:{
        type:DataTypes.BIGINT({unsigned:true}),
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    midMark:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    finalMark:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    activitiesMark:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    average:{
        type:DataTypes.VIRTUAL,
        get(){
            return (+this.getDataValue('midMark') + +this.getDataValue('finalMark') + +this.getDataValue('activitiesMark'))/3;
        }
    }
})

module.exports=Student;