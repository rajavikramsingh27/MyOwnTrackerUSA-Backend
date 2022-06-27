


const Tax = require("../ModelSchemas/Tax")
const Response = require('../Responses/Response')

class CategoryController {
    async createTax(request, response, next) {
        console.log(request.user.id);
        const { name, tax } = request.body

        if (!name || !tax) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        name: 'String',
                        tax: 'String',
                    }
                }
            ))
        }

        var details

        try {
            details = await Tax.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        if (details == null) {
            const user = {
                userID: request.user.id
            }

            try {
                const detailsNewUser = Tax(user)
                details = await detailsNewUser.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in save() ',
                    error.message,
                ))
            }
        }




        const taxData = {
            name: request.body.name,
            tax: request.body.tax,
        }

        console.log(taxData);

        Tax.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $push: { tax: taxData }
        }, {
            new: true
        }).exec((error, result) => {
            if (error) {
                return response.json(Response.fail(
                    error.message,
                    error.message,
                ))
            } else {
                return response.json(Response.success(
                    'Tax is created successfully.',
                    result.tax,
                ))
            }
        })
    }

    async listTax(request, response) {

        var details

        console.log(request.user.id)

        try {
            details = await Tax.findOne({ 'userID': request.user.id })

            console.log(details);

            return response.json(Response.success(
                'Success',
                details
                    ? details.tax : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findOne',
                error.message,
            ))
        }

    }

    async deleteTax(request, response) {
        const { taxID } = request.body

        if (!taxID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        taxID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Tax.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findOne',
                error.message,
            ))
        }

        var output = detailsMe.tax.filter(
            function (value) {
                return value.id == request.body.taxID
            }
        )

        const data = output[0]

        console.log(data);

        Tax.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { tax: data }
        }, {
            new: true
        }).exec((error, result) => {
            if (error) {
                return response.json(Response.fail(
                    error.message,
                    error.message,
                ))
            } else {
                return response.json(Response.success(
                    'Tax is deleted successfully.',
                    result.tax,
                ))
            }
        })

    }

}

module.exports = new CategoryController()

