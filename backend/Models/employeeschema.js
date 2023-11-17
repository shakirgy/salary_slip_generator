const mongoose=require('mongoose');

const empoyeeSchema=mongoose.Schema({
    employeename:{type:String},
    designation:{type:String},
    department:{type:String},
    dateofjoin:{type:String},
    basicpay:{type:Number},
    advance:{type:Number},
    pf:{type:Number},
    labourwelfarefund:{type:Number},
    totalamount:{type:Number},
    totaldeduction:{type:Number},
    netpay:{type:Number}
})
    
const employe=mongoose.model('employe',empoyeeSchema)
module.exports = employe;