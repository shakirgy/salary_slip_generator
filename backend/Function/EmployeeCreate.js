const employe=require('../Models/employeeschema');

const employecreate=async (req,res)=>{
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
    }=req.body
    try{
        if(!employeename ||!totalamount||!totaldeduction){
            return res.status(400).json({msg:"please enter all fields"})
        }else{
        const employeenew=await employe.create({
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
        console.log(" one employee created successfully");
        res.json("employee created successfully")
    }}
    catch(err){
        console.log('error', err)
    }
}
module.exports=employecreate;