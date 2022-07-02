
const mongoose = require("mongoose")

const client = mongoose.Schema({
    userID: String,
    client: [{
        basicInfo: Object,
        billingInfo: Object,
        serviceAddress: Object,
        notes: String,
        createdTime: {
            type: Date,
            default: Date.now
        }
    }],    
})

const Client = mongoose.model("Client", client)
module.exports = Client

