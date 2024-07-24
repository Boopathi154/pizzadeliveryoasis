const express=require('express');
const router=express.Router();
const adminAuthorization=require('./adminAuthorization')
router.get("/",adminAuthorization,async(req,res)=>{
    
})
module.exports=router