const express=require('express');
const router=express.Router();
const pizzaModel=require('../models/pizzaModel')
const pizzaBase=require('../models/pizzaBase')
router.get("/allitems",async(req,res)=>{
    try{
        await pizzaModel.find({}).sort({
            createdAt:-1
    }).then((data)=>{
        res.json(data)
    })
    }catch(err){
        res.json({
            message:'pizzItem not found'
        })
    }
})
router.get("/homeitems",async(req,res)=>{
    try{
        await pizzaModel.find({}).limit(3).sort({
            createdAt:-1
    }).then((data)=>{
        res.json(data)
    })
    }catch(err){
        res.json({
            message:'pizzItem not found'
        })
    }
})
router.get("/items/:id",async(req,res)=>{
    try{
        await pizzaModel.findById(req.params.id).populate('base').populate('chesse').populate('sauce').populate('veg').then((data)=>{
        res.json(data)
    })
    }catch(err){
        res.json({
            message:'pizzItem not found'
        })
    }
})
router.get("/items/base/:id",async(req,res)=>{
    try{
        await pizzaModel.findById(req.params.id).then((data)=>{
        res.json(data)
    })
    }catch(err){
        res.json({
            message:'pizzItem not found'
        })
    }
})
module.exports=router