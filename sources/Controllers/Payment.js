

const Payment = require("../ModelSchemas/Payment")
const Response = require('../Responses/Response')

class ItemController {
    async createPayment(request, response, next) {
        const { invoiceID, payment } = request.body

        var details

        try {
            details = await Payment.findOne({ 'invoiceID': invoiceID })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        if (details == null) {
            const user = {
                invoiceID: invoiceID
            }

            try {
                const detailsPayment = Payment(user)
                details = await detailsPayment.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in save() ',
                    error.message,
                ))
            }
        }

        // const dictPayment = JSON.parse(JSON.parse(payment))
        const dictPayment = JSON.parse(payment)
        // console.log(dictPayment);

        Payment.findOneAndUpdate(
            { 'invoiceID': invoiceID }, {
            $push: { payment: dictPayment }
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
                    'Payment is created successfully.',
                    result.payment,
                ))
            }
        })
    }

    async listPayment(request, response) {
        const { invoiceID } = request.body

        var details

        try {
            details = await Payment.findOne({ 'invoiceID': invoiceID })

            return response.json(Response.success(
                'Success',
                details
                ? details.payment : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updatePayment(request, response, next) {

        const { invoiceID, paymentID, payment } = request.body

        // const dictPayment = JSON.parse(JSON.parse(payment))
        const dictPayment = JSON.parse(payment)
        // console.log(dictPayment);

        try {
            const details = await Payment.findOneAndUpdate({
                "invoiceID": invoiceID,
                "payment._id": paymentID
            }, {
                $set: { payment: dictPayment }
            }, { new: true }
            )

            return (details == null)
                ? response.json(Response.fail(
                    { 'message': 'Item is not available' }
                ))
                : response.json(Response.success(
                    'This Item is updated successfully.',
                    details,
                ))
        } catch (error) {
            return response.json(Response.fail(
                error.message
            ))
        }
    }

    async deletePayment(request, response) {
        const { invoiceID, paymentID } = request.body

        if (!invoiceID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        invoiceID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Payment.findOne({ 'invoiceID': invoiceID })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.payment.filter(
            function (value) {
                return value.id == paymentID
            }
        )

        const data = output[0]

        Payment.findOneAndUpdate(
            { 'invoiceID': invoiceID }, {
            $pull: { payment: data }
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
                    'Payment is deleted successfully.',
                    result.item,
                ))
            }
        })

    }

}

module.exports = new ItemController()

