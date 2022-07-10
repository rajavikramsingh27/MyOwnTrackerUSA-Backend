

const Estimate = require("../ModelSchemas/Estimate")
const Response = require('../Responses/Response')


class EstimateController {
    async createEstimate(request, response, next) {
        const {
            client, items, subTotal, tax, amountTotal,
            paymentSchedule, notes,
            contract, docID, date, po, states, states_name, signature
        } = request.body

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
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
                const detailsNew = Estimate(user)
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

        Estimate.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $push: { estimate: dictToSave }
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
                    'Estimate is created successfully.',
                    result.estimate,
                ))
            }
        })
    }

    async readEstimate(request, response) {

        var detailsMe

        console.log(request.user.id)

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })

            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe.estimate : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateEstimate(request, response) {
        const {
            estimateID,
            client, items, subTotal, tax, amountTotal,
            paymentSchedule, notes,
            contract, docID, date, po, states, states_name, signature
        } = request.body

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
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

        console.log(dictToSave)

        console.log(request.body.clientID);
        try {
            const data = await Estimate.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "estimate._id": estimateID
                }, {
                $set: {
                    "estimate.$": dictToSave
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Estimate is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateEstimateStates(request, response) {
        const {
            estimateID,
            states,
        } = request.body

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        try {
            const data = await Estimate.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "estimate._id": estimateID
                }, {
                $set: {
                    "estimate.$.states": states
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Estimate is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateEstimateStatesName(request, response) {
        const {
            estimateID,
            states_name,
        } = request.body

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        try {
            const data = await Estimate.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "estimate._id": estimateID
                }, {
                $set: {
                    "estimate.$.states_name": states_name
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Estimate is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async updateEstimateSignature(request, response) {
        const {
            estimateID, signature
        } = request.body

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }
        
        try {
            const data = await Estimate.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "estimate._id": estimateID
                }, {
                $set: {
                    "estimate.$.signature": JSON.parse(signature)
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Estimate is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async deleteEstimate(request, response) {
        const { estimateID } = request.body

        if (!estimateID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        estimateID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Estimate.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.estimate.filter(
            function (value) {
                return value.id == estimateID
            }
        )

        const data = output[0]

        Estimate.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { estimate: data }
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
                    'Estimate is deleted successfully.',
                    result.estimate,
                ))
            }
        })

    }

}

module.exports = new EstimateController()

