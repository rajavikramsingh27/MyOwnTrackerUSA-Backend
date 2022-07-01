

const mongoose = require("mongoose")

const items = mongoose.Schema({
    userID: String,
    item: [{
        name: String,
        quantity: String,
        rate: String,    
        tax: Object,
        description: String,    
        valueAmount: String,
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

const Item = mongoose.model("Item", items)
module.exports = Item
