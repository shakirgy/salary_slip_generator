const employe=require("../Models/employeeschema");

const getForUpdate=async (req,res)=>{
    const _id=req.params._id
    const getEmp=await employe.find({_id:_id})
    res.json(getEmp)
}

module.exports=getForUpdate;