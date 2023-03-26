const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"deva")
        if(decoded){
            req.body.userId=decoded.userId
            next()
        }else{
            res.status(400).send({"msg":"please Login First"})
        }
    }else{
        res.status(400).send({"msg":"please Login First"})
    }
}

module.exports=auth