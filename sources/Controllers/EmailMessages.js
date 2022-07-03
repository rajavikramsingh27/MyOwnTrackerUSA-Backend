


const EmailMessages = require("../ModelSchemas/EmailMessages")
const Response = require('../Responses/Response')


class CategoryController {
    async createEmailMessage(request, response, next) {

        const {
            estimateEmailMessage, invoiceEmailMessage
        } = request.body
        if (
            !estimateEmailMessage ||
            !invoiceEmailMessage
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        estimateEmailMessage: "String",
                        invoiceEmailMessage: "String",
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await EmailMessages.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category findOne',
                error.message,
            ))
        }

        if (detailsMe == null) {
            const user = {
                userID: request.user.id
            }

            try {
                const detailsNew = EmailMessages(user)
                detailsMe = await detailsNew.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in detailsNewUser.save() ',
                    error.message,
                ))
            }
        }

        const emailMessage = {
            estimateEmailMessage,
            invoiceEmailMessage,
        }

        EmailMessages.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $set: emailMessage
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
                    'Default subjects is created to send the Emails and Messages for Estimates and Invoices',
                    result.company,
                ))
            }
        })
    }

    async readEmailMessage(request, response) {
        var detailsMe

        try {
            detailsMe = await EmailMessages.findOne({ 'userID': request.user.id })
            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe : {},
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateEmailMessage(request, response) {
        const {
            estimateEmailMessage, invoiceEmailMessage
        } = request.body
        if (
            !estimateEmailMessage ||
            !invoiceEmailMessage
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        estimateEmailMessage: "String",
                        invoiceEmailMessage: "String",
                    }
                }
            ))
        }

        const dataForUpdate = {
            'userID': request.user.id,
        }
        console.log(dataForUpdate);

        const emailMessage = {
            estimateEmailMessage,
            invoiceEmailMessage,
        }

        try {
            const data = await EmailMessages.findOneAndUpdate(
                { 'userID': request.user.id }, {
                $set: emailMessage
            }, {
                new: true
            })

            return response.json(Response.success(
                'Default subjects is updated to send the Emails and Messages for Estimates and Invoices',
                data.company,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

}

module.exports = new CategoryController()

