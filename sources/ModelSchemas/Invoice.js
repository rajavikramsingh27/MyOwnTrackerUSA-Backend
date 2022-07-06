

const mongoose = require("mongoose")

const invoice = mongoose.Schema({
    userID: String,
    estimate: [{
        client: Object,
        items: Array,
        subTotal: Number,    
        tax: Number,
        amountTotal: Number,    
        paymentSchedule: Object,
        notes: String,
        contract: Object,
        estimateDocID: String,
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

const Invoice = mongoose.model("Invoice", invoice)
module.exports = Invoice
