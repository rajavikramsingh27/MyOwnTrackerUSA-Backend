

const Invoice = require("../ModelSchemas/Invoice")
const Response = require('../Responses/Response')


class InvoiceController {
    async createInvoice(request, response, next) {
        const {
            client, items, subTotal, tax, amountTotal,
            paymentSchedule, notes,
            contract, docID, date, po, states, states_name, signature
        } = request.body

        var detailsMe

        try {
            detailsMe = await Invoice.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        if (detailsMe == null) {
            const user = {
                userID: request.user.id
            }

            try {
                const detailsNew = Invoice(user)
                detailsMe = await detailsNew.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in detailsNewUser.save() ',
                    error.message,
                ))
            }
        }
        
        const dictToSave = { 
            client: JSON.parse(client),
            items: JSON.parse(items),
            paymentSchedule: JSON.parse(paymentSchedule),
            contract: JSON.parse(contract),
            signature: JSON.parse(signature),

            subTotal,
            tax,
            amountTotal,
            notes,
            docID,
            date,
            po,
            states,
            states_name,
        }

console.log(dictToSave);

        Invoice.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $push: { invoice: dictToSave }
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
                    'Invoice is created successfully.',
                    result.invoice,
                ))
            }
        })
    }

    async readInvoice(request, response) {
        var detailsMe
        try {
            detailsMe = await Invoice.findOne({ 'userID': request.user.id })

            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe.invoice : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateInvoice(request, response) {
        const {
            invoiceID,
            client, items, subTotal, tax, amountTotal,
            paymentSchedule, notes,
            contract, docID, date, po, states, states_name, , signature
        } = request.body

        var detailsMe

        try {
            detailsMe = await Invoice.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        const dictToSave = {
            client: JSON.parse(client),
            items: JSON.parse(items),
            paymentSchedule: JSON.parse(paymentSchedule),
            contract: JSON.parse(contract),
            signature: JSON.parse(signature),

            subTotal,
            tax,
            amountTotal,
            notes,
            docID,
            date,
            po,
            states,
            states_name,
        }

        try {
            const data = await Invoice.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "invoice._id": invoiceID
                }, {
                $set: {
                    "invoice.$": dictToSave
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Invoice is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateInvoiceStates(request, response) {
        const {
            invoiceID,
            states,
        } = request.body

        // var detailsMe

        // try {
        //     detailsMe = await Invoice.findOne({ 'userID': request.user.id })
        // } catch (error) {
        //     return response.json(Response.fail(
        //         'Error in findOne',
        //         error.message,
        //     ))
        // }

        try {
            const data = await Invoice.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "invoice._id": invoiceID
                }, {
                $set: {
                    "invoice.$.states": states
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Invoice is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateInvoiceStatesName(request, response) {
        const {
            invoiceID,
            states_name,
        } = request.body

        var detailsMe

        // try {
        //     detailsMe = await Invoice.findOne({ 'userID': request.user.id })
        // } catch (error) {
        //     return response.json(Response.fail(
        //         'Error in findOne',
        //         error.message,
        //     ))
        // }

        try {
            const data = await Invoice.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "invoice._id": invoiceID
                }, {
                $set: {
                    "invoice.$.states_name": states_name
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Invoice is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateInvoiceSignature(request, response) {
        const {
            invoiceID,
            signature,
        } = request.body

        try {
            const data = await Invoice.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "invoice._id": invoiceID
                }, {
                $set: {
                    "invoice.$.signature": signature
                }
            }, {
                new: true
            })

            for (let i = 0; i < data.invoice.length; i++) {
                if (data.invoice[i]._id == invoiceID) {
                    return response.json(Response.success(
                        'Invoice is updated successfully.',
                        data.invoice[i],
                    ))
                }
            }
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async deleteInvoice(request, response) {
        const { invoiceID } = request.body

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
            detailsMe = await Invoice.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.invoice.filter(
            function (value) {
                return value.id == invoiceID
            }
        )

        const data = output[0]

        Invoice.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { invoice: data }
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
                    'Invoice is deleted successfully.',
                    result.invoice,
                ))
            }
        })

    }

}

module.exports = new InvoiceController()

