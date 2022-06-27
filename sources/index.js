
require("../sources/connection")

const express = require("express")
const app = express();
const cors = require('cors')
const fileupload = require("express-fileupload");

const Constants = require('./Global/Constants');
const Response = require('./Responses/Response')
const routerAuth = require('./Routers/Auth')
const routerCategory = require('./Routers/Category')
const routerTax = require('./Routers/Tax')

app.use(cors())
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('frontend/build'))
}

app.use(express.json({ extended: false, limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: false, parameterLimit: 500000 }))
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(routerAuth)
app.use(routerCategory)
app.use(routerTax)

// app.post("/upload", upload.single("file"), FileUpload.handleFileUpload);

app.get("/", (request, response) => {
    const dictResData = {
        "Server Setup": "Node is connected",
        "baseURL": "http://localhost:" + Constants.PORT + "/"
    }
    return response.json(Response.message(dictResData))
})

app.listen(Constants.PORT, () => {
    console.log("Server Connected for " + Constants.PORT);
})