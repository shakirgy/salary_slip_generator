const employe=require('../Models/employeeschema');

const deleteEmployee=async (req,res)=>{
    const _id=req.params._id;

    const details=await employe.deleteOne({_id:_id})
    console.log("one property deleted")
    res.json("delete")
}

module.exports=deleteEmployee;