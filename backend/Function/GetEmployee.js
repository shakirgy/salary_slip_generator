const employe=require('../Models/employeeschema');

const getEmployee=async (req,res)=>{
    
    const impuser=await employe.find({})
    console.log("user imported")
    res.json(impuser)
}

module.exports=getEmployee;