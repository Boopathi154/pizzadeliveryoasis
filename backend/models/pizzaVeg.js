const mongoose = require('mongoose');
const pizzaVeg = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    }
})
module.exports = mongoose.model('pizzaVeg', pizzaVeg)
