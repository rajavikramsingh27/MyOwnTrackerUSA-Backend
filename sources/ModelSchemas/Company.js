

const mongoose = require("mongoose")

const company = mongoose.Schema({
    userID: String,
    company: Object,
})

const Company = mongoose.model("Company", company)
module.exports = Company

