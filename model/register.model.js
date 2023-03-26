const mongoose=require("mongoose")

const RegisterSchema=mongoose.Schema({
    email:String,
    pass:String
})

const RegisterModel=mongoose.model("register",RegisterSchema)

module.exports=RegisterModel