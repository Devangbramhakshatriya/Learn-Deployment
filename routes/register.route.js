const express=require("express")
const RegisterModel = require("../model/register.model")
const RegisterRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');


RegisterRouter.post("/register",async(req,res)=>{
    const {email,pass}=req.body
    try{
        bcrypt.hash(pass, 5,async (err, hash)=> {
            const user=new RegisterModel({pass:hash,email})
            await user.save()
            res.status(200).send({"msg":"Register Done"})
        });
        
    }catch(err){
        console.log(err)
    }
})

RegisterRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await RegisterModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"login success","token":jwt.sign({ "userId": user._id }, 'deva',{ expiresIn: '1h' })})   
                }else{
                    res.status(400).send("Login Failed")
                }   
            })
        }
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports=RegisterRouter