

const mongoose = require("mongoose")

const payment = mongoose.Schema({
    invoiceID: String,
    payment: [{
        totalAmount: Number,
        paidAmount: Number,
        paymentType: String,
        paymentDate: String,
        paymentMethod: String,
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

const Payment = mongoose.model("Payment", payment)
module.exports = Payment
