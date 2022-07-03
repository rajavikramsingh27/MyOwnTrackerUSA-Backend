

const mongoose = require("mongoose")

const emailMessage = mongoose.Schema({
    userID: String,
    estimateEmailMessage: String,
    invoiceEmailMessage: String,
})

const EmailMessage = mongoose.model("EmailMessage", emailMessage)
module.exports = EmailMessage

