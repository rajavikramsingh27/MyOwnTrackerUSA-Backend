
const mongoose = require("mongoose")

const users = mongoose.Schema({
    profilePicture:  {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
})

const User = mongoose.model("Users", users)
module.exports = User
