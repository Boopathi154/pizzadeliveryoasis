const express=require('express');
const user=require('../models/userModel');
const router=express.Router()
router.post("/",async(req,res)=>{
    try{
        const newUser=new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save()
        res.status(201).json({
            message:"Successfully Created"
        })
    }catch(err){
        res.status(500).json({
            message:"User Not Created."
        })
    }
})
module.exports=router;