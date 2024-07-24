const mongoose=require('mongoose');
const notification=new mongoose.Schema({
    name:{
        type:String,
    }
})
module.exports = mongoose.model("Notifcation", notification)