const express=require('express');
const router=express.Router();
const multer=require('multer')
const path = require('path')
const pizzaModel=require('../models/pizzaModel')
const pizzaBase=require('../models/pizzaBase');
const pizzaSauce = require('../models/pizzaSauce');
const pizzaChesse = require('../models/pizzaChesse');
const pizzaVeg = require('../models/pizzaVeg');
const adminAuthorization=require("./adminAuthorization")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.post("/pizzaitem",upload.single('file'),async(req,res)=>{
    try {
        const baseId=await pizzaBase.find({})
        const sauceId=await pizzaSauce.find({})
        const chesseId=await pizzaChesse.find({})
        const vegId=await pizzaVeg.find({})
        const newPizza = new pizzaModel({
            title:req.body.title,
            photo: req.file.filename,
            price:req.body.price,
            discount:req.body.discount,
            titleDescription:req.body.titleDesc,
            description:req.body.desc,
            isCustomizable: req.body.customizable,
            base:baseId,
            chesse:chesseId,
            sauce:sauceId,
            veg:vegId,
        });
        console.log(newPizza)
        await newPizza.save();
        res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
        res.status(500).json({ err: "User not created" })
    }
})
router.get("/pizzaitem",adminAuthorization,async(req,res)=>{
    try{
        const pizza=await pizzaModel.find({})
        res.json(pizza)
    }catch(err){
        res.json(err)
    }
})
router.delete('/pizzaitem/:id', adminAuthorization, async (req, res) => {
    try {
        await pizzaModel.findByIdAndDelete(req.params.id).then(() => {
            res.json({
                message: "Successfully Deleted Data"
            })
        })
    } catch (err) {
        res.json({
            message: "Not deleted"
        })
    }
})
router.get("/pizzaitem/:id", adminAuthorization, async (req, res) => {
    try {
        const pizza = await pizzaModel.findById(req.params.id)
        res.json(pizza)
    } catch (err) {
        res.json(err)
    }
})
router.put("/pizzaitem/:id", upload.single('file'), async (req, res) => {
    try {
        const baseId = await pizzaBase.find({})
        const sauceId = await pizzaSauce.find({})
        const chesseId = await pizzaChesse.find({})
        const vegId = await pizzaVeg.find({})
        console.log(req.body)
        await pizzaModel.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            photo:req.body.file,
            price:req.body.price,
            discount:req.body.discount,
            titleDescription:req.body.titleDesc,
            description:req.body.desc,
            isCustomizable:req.body.customizable
        }).then((res)=>{
            message:"Created"
        })
        // console.log(newPizza)
    } catch (err) {
        res.status(500).json({ err: "Not created" })
    }
})
module.exports=router