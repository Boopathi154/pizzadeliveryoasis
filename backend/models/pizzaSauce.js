const mongoose = require('mongoose');
const pizzaSauce = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity:{
        type:Number
    }
})
module.exports = mongoose.model('pizzaSauce', pizzaSauce)
