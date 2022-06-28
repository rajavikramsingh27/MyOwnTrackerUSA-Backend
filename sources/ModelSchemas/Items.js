

const mongoose = require("mongoose")

const items = mongoose.Schema({
    userID: String,
    item: [{
        name: String,
        quantity: Number,
        rate: Number,    
        tax: Object,
        description: String,    
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
