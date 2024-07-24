const express=require('express');
const router=express.Router();
const orderItem=require("../models/orderItem");
const authorize=require('./authorize')
router.get("/item",authorize,async(req,res)=>{
    try{
        const order=await orderItem.find({userId:req.userid}).populate('base').populate('chesse').populate('pizzaItem').populate('sauce').populate('veg')
        res.status(200).json(order)
    }catch(err){
        res.json({
            message:"Order item not found"
        })
    }
})
router.delete("/item/:id",authorize,async(req,res)=>{
    try{
        await orderItem.findByIdAndDelete(req.params.id).then(()=>{
            res.json({
                message:"Item deleted"
            })
        })
    }catch(err){
        res.json({
            message:"Item Not deleted"
        })
    }
})

module.exports=router