const express=require("express")
const RegisterModel = require("../model/register.model")
const TodoModel = require("../model/todo.model")
const TodoRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
    

TodoRouter.post("/posttodo",async(req,res)=>{
    const token=req.headers.authorization
    // jwt.verify(token, 'bruce',(err, decoded)=>{
    //     decoded? res.status(200).send("User Details"):res.status(400).send(err)
    //   });
    try{    
        
                const todo=new TodoModel(req.body)
                res.status(200).send("Posted Success")
                await todo.save()
            
            
          
    }catch(err){
        console.log(err)
    }
})

TodoRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"deva")

    try{
        if(decoded){
            const todo=await TodoModel.find({"userId":decoded.userId})
        res.status(200).send(todo)
        }
        
    }catch(err){
        console.log(err)
    }
})

TodoRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const payload=req.body
    const token=req.headers.authorization
    try{
        jwt.verify(token, 'bruce',async(err, decoded)=>{
            if(decoded){
                const movie=await TodoModel.findByIdAndUpdate(id,payload)
                res.status(200).send({"msg":"Todo Is Updated"})
            }else{
                res.status(400).send(err)
            }
          });
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

TodoRouter.delete("/delete/:id",(req,res)=>{
    const {id}=req.params
    const token=req.headers.authorization
    try{
        jwt.verify(token, 'deva',async(err, decoded)=>{
            if(decoded){
                const movie=await TodoModel.findByIdAndDelete(id)
                res.status(200).send({"msg":"Todo Is Deleted"})
            }else{
                res.status(400).send(err)
            }
          });
    }catch(err){
        res.status(400).send({"msg":err})
    }
})
module.exports=TodoRouter