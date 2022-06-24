
const mongoose = require("mongoose")

const category = mongoose.Schema({
    userID: String,
    category: [{
        icon: String,
        title: String,
        colorHex: String,        
        createdTime: {
            type: Date,
            default: Date.now
        }
    }],    
})

const Category = mongoose.model("Category", category)
module.exports = Category

