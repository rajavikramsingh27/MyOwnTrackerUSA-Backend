

const mongoose = require("mongoose")

const estimate = mongoose.Schema({
    userID: String,
    estimate: [{
        client: Object,
        items: Array,
        subTotal: Number,    
        tax: Number,
        amountTotal: Number,    
        valueAmount: Number,
        paymentSchedule: Object,
        notes: String,
        contract: Object,
        estimateDocID: String,
        date: String,
        po: String,
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
