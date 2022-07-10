
require("../sources/connection")

const express = require("express")
const app = express();
const cors = require('cors')
const fileupload = require("express-fileupload");

const FileUpload = require('./Global/FileUpload')
const path = require("path")

const Constants = require('./Global/Constants');
const Response = require('./Responses/Response')
const routerAuth = require('./Routers/Auth')
const routerTax = require('./Routers/Tax')
const routerItem = require('./Routers/Item')
const routerClient = require('./Routers/Client')
const routerCompany = require('./Routers/Company')
const routerGenricContract = require('./Routers/GenricContract')
const routerEmailMessages = require('./Routers/EmailMessages')
const routerEstimate = require('./Routers/Estimate')
const routerInvoice = require('./Routers/Invoice')
const routerPayment = require('./Routers/Payment')

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
app.use(routerCompany)
app.use(routerGenricContract)
app.use(routerEmailMessages)
app.use(routerEstimate)
app.use(routerInvoice)
app.use(routerPayment)


app.post("/uploadImage", (request, response, next) => {
    request.file = request.files.image
    // const allowedExtensions = /png|jpeg|jpg/

    // if (!allowedExtensions.test(path.extname(request.file.name))) {
    //     return response.json(Response.fail(
    //         'Extension must be ' + allowedExtensions.toString() + ' format',
    //     ))
    // }

    FileUpload.uploadFile(request, response, next, async function (pictureURL) {
        console.log(pictureURL);

        return response.json(Response.success(
            'Success',
            pictureURL,
        ))
    })
})

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

