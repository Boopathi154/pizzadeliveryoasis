const jwt = require('jsonwebtoken');
const userdb = require('../models/userModel');
const SECRET_KEY = "ASLFKJL65654ADF"

const adminAuthorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        // console.log(token)
        const verifyToken = jwt.verify(token, SECRET_KEY)
        const rootUser = await userdb.findOne({ _id: verifyToken.user })
        // console.log(rootUser)
        if (!rootUser) { throw new Error("User not found") }
        // console.log(rootUser._id)
        if(rootUser.isAdmin){
            req.token = token
            req.user = rootUser
            req.userid = rootUser._id
        }else{
            console.log(err)
        }
        next()
    } catch (err) {
        console.log(err)
    }
}
module.exports = adminAuthorization