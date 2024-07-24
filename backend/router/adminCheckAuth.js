const express = require('express');
const router = express.Router();
const user = require('../models/userModel')
const authorize = require('./adminAuthorization')
router.get("/", authorize, async (req, res) => {
    try {
        await user.findOne({_id:req.userid,isAdmin:true})
        res.status(200).json({
            message: "true",
            id: req.userid
        })
    } catch (err) {
        res.status(404).json({
            message: "false"
        })
    }
})
module.exports = router