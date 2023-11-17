const employe=require('../Models/employeeschema')

const updateDetails=async (req,res)=>{
    const _id=req.params._id
    const {
        employeename,
        designation,
        department,
        dateofjoin,
        basicpay,
        advance,
        pf,
        labourwelfarefund,
        totalamount,
        totaldeduction,
        netpay
    }=req.body;
    const updateProp=await employe.findByIdAndUpdate(_id,{
        employeename,
        designation,
        department,
        dateofjoin,
        basicpay,
        advance,
        pf,
        labourwelfarefund,
        totalamount,
        totaldeduction,
        netpay
    })
    res.json(updateProp)
}

module.exports=updateDetails;