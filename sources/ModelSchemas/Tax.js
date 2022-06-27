
const mongoose = require("mongoose")

const taxes = mongoose.Schema({
    userID: String,
    tax: [{
        name: String,
        tax: Number,    
        createdTime: {
            type: Date,
            default: Date.now
        }
    }], 
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
})

const Tax = mongoose.model("Tax", taxes)
module.exports = Tax
