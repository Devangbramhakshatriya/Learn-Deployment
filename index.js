const express=require("express")
const connection = require("./db")
const auth = require("./middleware/auth.middleware")
const RegisterRouter = require("./routes/register.route")
const TodoRouter = require("./routes/todo.route")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",RegisterRouter)
app.use(auth)
app.use("/",TodoRouter)


app.listen(8000,async()=>{
    try{
        await connection
        console.log("Connected To DB")
    }catch(err){
        console.log(err)
    }
    console.log("Server Is Running On 8000")
})