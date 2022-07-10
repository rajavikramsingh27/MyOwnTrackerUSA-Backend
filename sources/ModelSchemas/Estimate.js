

const mongoose = require("mongoose")

const estimate = mongoose.Schema({
    userID: String,
    estimate: [{
        client: Object,
        items: Array,
        paymentSchedule: Object,
        contract: Object,
        signature: Object,
        subTotal: Number,    
        tax: Number,
        amountTotal: Number,    
        notes: String,
        docID: String,
        date: String,
        po: String,
        states_name: String,
        states: String,
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

const Estimate = mongoose.model("Estimate", estimate)
module.exports = Estimate
