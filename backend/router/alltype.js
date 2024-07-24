const express=require('express');
const router=express.Router()
const chesse=require('../models/pizzaChesse')
const base =require('../models/pizzaBase')
const sauce=require('../models/pizzaSauce')
const veg=require('../models/pizzaVeg')
const adminAuthorization=require('./adminAuthorization')

router.get('/pizzachesse', adminAuthorization, async (req, res) => {
    chesse.find().then((data) => {
        res.json(data)
    })
})
router.get('/pizzachesse/:id', adminAuthorization, async (req, res) => {
    console.log(req.body)
    try {
        await chesse.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.json({
            message: "Error found"
        })
    }
})
router.put('/pizzachesse/:id', async (req, res) => {
    chesse.findByIdAndUpdate(req.params.id, { name:req.body.name,quantity: req.body.quantity }).then(() => {
        res.json({
            message: "Successfully Updated Data"
        })
    })
})
router.delete('/pizzachesse/:id', adminAuthorization, async (req, res) => {
    try {
        await chesse.findByIdAndDelete(req.params.id).then(() => {
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
router.post('/pizzachesse', async (req, res) => {
    try {
        const qtn = new chesse({
            name: req.body.name,
            quantity: req.body.quantity
        })
        await qtn.save()
        res.status(201).json({
            message: "Quantity successfully created."
        })
    } catch (err) {
        res.status(500).json({
            message: "Quantity not created"
        })
    }
})

/////////Pizza Base///////////////
router.get('/pizzabase', adminAuthorization, async (req, res) => {
    base.find().then((data) => {
        res.json(data)
    })
})
router.get('/pizzabase/:id', adminAuthorization, async (req, res) => {
    console.log(req.body)
    try {
        await base.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.json({
            message: "Error found"
        })
    }
})
router.put('/pizzabase/:id', async (req, res) => {
    base.findByIdAndUpdate(req.params.id, { name:req.body.name,quantity: req.body.quantity }).then(() => {
        res.json({
            message: "Successfully Updated Data"
        })
    })
})
router.delete('/pizzabase/:id', adminAuthorization, async (req, res) => {
    try {
        await base.findByIdAndDelete(req.params.id).then(() => {
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
router.post('/pizzabase', async (req, res) => {
    try {
        const qtn = new base({
            name: req.body.name,
            quantity: req.body.quantity
        })
        await qtn.save()
        res.status(201).json({
            message: "Quantity successfully created."
        })
    } catch (err) {
        res.status(500).json({
            message: "Quantity not created"
        })
    }
})
/////////Pizza Sauce///////////////
router.get('/pizzasauce', adminAuthorization, async (req, res) => {
    sauce.find().then((data) => {
        res.json(data)
    })
})
router.get('/pizzasauce/:id', adminAuthorization, async (req, res) => {
    console.log(req.body)
    try {
        await sauce.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.json({
            message: "Error found"
        })
    }
})
router.put('/pizzasauce/:id', async (req, res) => {
    sauce.findByIdAndUpdate(req.params.id, { name:req.body.name,quantity: req.body.quantity }).then(() => {
        res.json({
            message: "Successfully Updated Data"
        })
    })
})
router.delete('/pizzasauce/:id', adminAuthorization, async (req, res) => {
    try {
        await sauce.findByIdAndDelete(req.params.id).then(() => {
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
router.post('/pizzasauce', async (req, res) => {
    try {
        const qtn = new sauce({
            name: req.body.name,
            quantity: req.body.quantity
        })
        await qtn.save()
        res.status(201).json({
            message: "Quantity successfully created."
        })
    } catch (err) {
        res.status(500).json({
            message: "Quantity not created"
        })
    }
})
/////////Pizza Veg///////////////
router.get('/pizzaveg', adminAuthorization, async (req, res) => {
    veg.find().then((data) => {
        res.json(data)
    })
})
router.get('/pizzaveg/:id', adminAuthorization, async (req, res) => {
    console.log(req.body)
    try {
        await veg.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.json({
            message: "Error found"
        })
    }
})
router.put('/pizzaveg/:id', async (req, res) => {
    veg.findByIdAndUpdate(req.params.id, { name:req.body.name,quantity: req.body.quantity }).then(() => {
        res.json({
            message: "Successfully Updated Data"
        })
    })
})
router.delete('/pizzaveg/:id', adminAuthorization, async (req, res) => {
    try {
        await veg.findByIdAndDelete(req.params.id).then(() => {
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
router.post('/pizzaveg', async (req, res) => {
    try {
        const qtn = new veg({
            name: req.body.name,
            quantity: req.body.quantity
        })
        await qtn.save()
        res.status(201).json({
            message: "Quantity successfully created."
        })
    } catch (err) {
        res.status(500).json({
            message: "Quantity not created"
        })
    }
})
module.exports=router