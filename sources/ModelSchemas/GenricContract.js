

const mongoose = require("mongoose")

const genricContract = mongoose.Schema({
    userID: String,
    genricContract: Object,
})

const GenricContract = mongoose.model("GenricContract", genricContract)
module.exports = GenricContract

