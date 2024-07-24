var express=require('express')
var router=express.Router();
var Razorpay=require('razorpay')
var key_id = "KEY_ID"
var key_secret = "KEY_SECRET"
const crypto = require("crypto");
const base=require('../models/pizzaBase');
const chesse=require('../models/pizzaChesse');
const sauce=require('../models/pizzaSauce');
const veg=require('../models/pizzaVeg')
const order=require('../models/orderItem')
const notification=require('../models/notifications')
const authorize=require('./authorize')
var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
const adminAuthorization = require('./adminAuthorization');
const notifications = require('../models/notifications');
// const nodemailer = require("nodemailer");
var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
});
router.post("/", (req, res) => {
    console.log(req.body)
    var options = {
        amount: req.body.price*100,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function (order, err) {
        if (err) {
            res.json(err)
        } else {
            res.json(order)
        }
    });
});
router.post("/verify",(req, res) => {
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id);
    const generated_signature = hmac.digest('hex')
    validatePaymentVerification({ "order_id": req.body.response.razorpay_order_id, "payment_id": req.body.response.razorpay_payment_id }, req.body.response.razorpay_signature, key_secret);
    if (generated_signature == req.body.response.razorpay_signature && validatePaymentVerification) {
        req.body.cart.forEach(async(item)=>{
            const pizza_base=await base.findOne({name:item.bas});
            const pizza_chesse=await chesse.findOne({name:item.chess})
            const pizza_sauce=await sauce.findOne({name:item.sauc})
            const pizza_veg=await veg.findOne({name:item.ve})
            await base.findByIdAndUpdate(pizza_base._id,{quantity:pizza_base.quantity-1})
            await chesse.findByIdAndUpdate(pizza_chesse._id,{quantity:pizza_chesse.quantity-1})
            await sauce.findByIdAndUpdate(pizza_sauce._id,{quantity:pizza_sauce.quantity-1})
            await veg.findByIdAndUpdate(pizza_veg._id,{quantity:pizza_veg.quantity-1})
            if (pizza_base.quantity <= 20) {
                const newnotification = new notification({ name: "Your Base is below 20" })
                await newnotification.save()
                // const info = await transport.sendMail({
                //     from: 'info@mailtrap.club', // sender address
                //     to: "suspensecreator2002@gmail.com", // list of receivers
                //     subject: "Alert", // Subject line
                //     text: "Your Base is below 20", // plain text body
                //     html: "<b>Your base is below 20</b>", // html body
                // });
                // res.json({ "Message sent": info.messageId })
            }
            if (pizza_chesse.quantity <= 20) {
                const newnotification = new notification({ name: "Your Chesse is below 20" })
                await newnotification.save()
                // const info = await transport.sendMail({
                //     from: 'info@mailtrap.club', // sender address
                //     to: "suspensecreator2002@gmail.com", // list of receivers
                //     subject: "Alert", // Subject line
                //     text: "Your Chesse is below 20", // plain text body
                //     html: "<b>Your Chesse is below 20</b>", // html body
                // });
                // res.json({ "Message sent": info.messageId })
            }
            if (pizza_sauce.quantity <= 20) {
                const newnotification = new notification({ name: "Your Sauce is below 20" })
                await newnotification.save()
                // const info = await transport.sendMail({
                //     from: 'info@mailtrap.club', // sender address
                //     to: "suspensecreator2002@gmail.com", // list of receivers
                //     subject: "Alert", // Subject line
                //     text: "Your sauce is below 20", // plain text body
                //     html: "<b>Your sauce is below 20</b>", // html body
                // });
                // res.json({ "Message sent": info.messageId })
            }
            if (pizza_veg.quantity <= 20) {
                const newnotification = new notification({ name: "Your veg is below 20" })
                await newnotification.save()
                // const info = await transport.sendMail({
                //     from: 'info@mailtrap.club', // sender address
                //     to: "suspensecreator2002@gmail.com", // list of receivers
                //     subject: "Alert", // Subject line
                //     text: "Your veg is below 20", // plain text body
                //     html: "<b>Your veg is below 20</b>", // html body
                // });
                // res.json({ "Message sent": info.messageId })
            }
            const newOrder=new order({
                pizzaItem:item.id,
                userId:req.body.user.id,
                quantity:item.quantity,
                status:"Accepted",
                payment_id:req.body.response.razorpay_payment_id,
                order_id:req.body.response.razorpay_order_id,
                payment_signature:req.body.response.razorpay_signature,
                payment_status:"Success",
                floor:req.body.address.floor,
                area:req.body.address.area,
                city:req.body.address.city,
                pincode:req.body.address.pin,
                price:item.price,
                base:pizza_base._id,
                chesse:pizza_chesse._id,
                sauce:pizza_sauce._id,
                veg:pizza_veg._id

            });
            await newOrder.save();
            res.json({message:"Order Accepted"})

        })
    } else {
        req.body.cart.forEach(async (item) => {
            const pizza_base = await base.findOne({ name: item.bas });
            const pizza_chesse = await chesse.findOne({ name: item.chess })
            const pizza_sauce = await sauce.findOne({ name: item.sauc })
            const pizza_veg = await veg.findOne({ name: item.ve })
            const newOrder = new order({
                pizzaItem: item.id,
                userId: req.body.user.id,
                quantity: item.quantity,
                status: "Not Accepted",
                payment_id: req.body.response.razorpay_payment_id,
                order_id: req.body.response.razorpay_order_id,
                payment_signature: req.body.response.razorpay_signature,
                payment_status: "Failed",
                floor: req.body.address.floor,
                area: req.body.address.area,
                city: req.body.address.city,
                pincode: req.body.address.pin,
                price: item.price,
                base: pizza_base._id,
                chesse: pizza_chesse._id,
                sauce: pizza_sauce._id,
                veg: pizza_veg._id

            });
            await newOrder.save();
            res.json({ message: "Order Failed" })

        })
    }
})

router.get("/allorder",authorize,async(req,res)=>{
    try{
        console.log(req.body)
        const orderItem=await order.find({userId:req.userid}).populate('base').populate('chesse').populate('pizzaItem').populate('sauce').populate('veg')
        res.json(orderItem)
    }catch(err){
        res.json(err)
    }
})
router.get('/orderitem/:id',authorize,async(req,res)=>{
    try{
        const orderItem = await order.findOne({userId:req.userid,_id:req.params.id}).populate('base').populate('chesse').populate('pizzaItem').populate('sauce').populate('veg')
        res.json(orderItem)
    }catch(err){
        res.json({message:"Not getting"})
    }
})
router.get('/admin/all',adminAuthorization,async(req,res)=>{
    try{
        const orderItem = await order.find({}).populate('base').populate('chesse').populate('pizzaItem').populate('sauce').populate('veg')
        res.json(orderItem)
    }catch(err){
        res.json(err)
    }
})
router.get("/admin/all/:id",adminAuthorization,async(req,res)=>{
    try {
        const orderItem = await order.findOne({_id:req.params.id}).populate('base').populate('chesse').populate('pizzaItem').populate('sauce').populate('veg')
        res.json(orderItem)
    } catch (err) {
        res.json({ message: "Not getting" })
    }
})
router.put('/admin/all/:id',async(req,res)=>{
    try{
        if (req.body.update === "Package" || req.body.update === "Out For Delivery" || req.body.update ==="Delivered"){
            await order.findByIdAndUpdate({_id:req.params.id},{status:req.body.update}).then(()=>{
                res.json({message:"Successfully Updated"})
            })
        }else{
            res.json({message:"Not Updated"})
        }
    }catch(err){
        res.json({message:"Not Updated"})
    }
})
router.get("/notify", adminAuthorization, async(req,res)=>{
    try{
        const allnotify=await notifications.find({})
        res.json(allnotify)
    }catch(err){
        res.json(err)
    }
})
module.exports=router