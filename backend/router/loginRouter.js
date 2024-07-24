const express=require('express');
const router=express.Router();
const reg=require('../models/userModel')
const jwt=require('jsonwebtoken')
const SECRET_KEY = "ASLFKJL65654ADF"
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const userid = await reg.findOne({ email })
        if (!userid) {
            return res.json({
                message: "Indirect password and email"
            })
        }
        if (userid.email == email && userid.password == password) {
            const user = userid._id
            const token = jwt.sign({ user }, SECRET_KEY, {
                expiresIn: 3 * 24 * 60 * 60
            })
            await reg.updateOne({ "_id": user }, { $set: { token: token } })
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(201).json({ message: "User logged in successfully", success: true, token: userid.token, isLogin: true });
        } else {
            res.json({
                message: "login failed",
                isLogin: false,
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "Bad request",
            isLogin: true
        })
    }
})
module.exports=router