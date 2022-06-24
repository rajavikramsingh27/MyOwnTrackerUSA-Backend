

const mongoose = require("mongoose")
const Constants = require('./Global/Constants');

mongoose.connect(Constants.MONGOURI, {
    // useNewUrlParser:true,
    // useCreateIndex: true,
    useUnifiedTopology:true,
    // useFindAndModify: false,
}).then(() => {
    console.log("MongoDB Connection is successfull.");
}).catch((error) => {
    console.log("MongoDB is not connect" + error);
});

