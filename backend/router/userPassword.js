const express = require('express');
const router = express.Router();
const authorize = require('./authorize')
const userdb = require('../models/userModel')
router.get("/", authorize, async (req, res) => {
    const user=await userdb.findOne({_id:req.userid})
    res.json({id:user._id})
})
router.post('/',async (req, res) => {
    try {
        console.log(req.body)
        const user = await userdb.findOne({ _id: req.body.user_id })
        console.log(user.email)
        console.log(req.body.password)
        console.log(req.body.newpassword)
        console.log(user.password)
        if (user.password == req.body.password) {
            await userdb.updateOne({ "_id": user }, { $set: { password: req.body.newpassword } })
            res.status(201).json({
                message: "Password Successfully changed"
            })
        }
        else {
            res.json({
                message: "Password not change"
            })
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = router