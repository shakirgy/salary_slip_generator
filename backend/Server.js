const express=require('express');
const app=express();
const Router=require('./Router/Route');
const connectDB=require('./Database/dbconnect');
const dotenv=require('dotenv');
const cors=require('cors')

connectDB()
dotenv.config()

app.use(express.json());
app.use(cors(
  {
    origin:["salary-slip-generator.vercel.app
"],
    methods:['GET','POST'],
    credentials: true
}
))
app.use("/",Router)


const port=process.env.port || 4000
app.listen(port,()=>console.log(`server is running ${port}`));
