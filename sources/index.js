
require("../sources/connection")

const express = require("express")
const app = express();
const cors = require('cors')
const fileupload = require("express-fileupload");

const Constants = require('./Global/Constants');
const Response = require('./Responses/Response')
const routerAuth = require('./Routers/Auth')
const routerTax = require('./Routers/Tax')
const routerItem = require('./Routers/Item')
const routerClient = require('./Routers/Client')

app.use(cors())
app.use(express.json({ extended: false, limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: false, parameterLimit: 500000 }))
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(routerAuth)
app.use(routerTax)
app.use(routerItem)
app.use(routerClient)

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