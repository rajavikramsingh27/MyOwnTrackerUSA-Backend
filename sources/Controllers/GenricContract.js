

const GenricContract = require("../ModelSchemas/GenricContract")
const Response = require('../Responses/Response')


class CategoryController {
    async createGenericContract(request, response, next) {

        const {
            name, days
        } = request.body
        if (
            !name ||
            !days
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        name: "String",
                        days: "int",
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await GenricContract.findOne({ 'userID': request.user.id })
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
                const detailsNew = GenricContract(user)
                detailsMe = await detailsNew.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in detailsNew.save() ',
                    error.message,
                ))
            }
        }

        const genricContractData = {
            name: request.body.name,
            days: request.body.days,
        }

        GenricContract.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $set: { genricContract: genricContractData }
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
                    'Genric Contract is created successfully.',
                    result.company,
                ))
            }
        })
    }

    async readGenericContract(request, response) {
        var detailsMe

        try {
            detailsMe = await GenricContract.findOne({ 'userID': request.user.id })
            return response.json(Response.success(
                'Success',
                // detailsMe ? detailsMe : [],
                detailsMe ? detailsMe.genricContract : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateGenericContract(request, response) {
        const {
            name, days
        } = request.body
        if (
            !name ||
            !days
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        name: "String",
                        days: "int",
                    }
                }
            ))
        }

        const dataForUpdate = {
            'userID': request.user.id,
        }
        console.log(dataForUpdate);

        try {
            const data = await GenricContract.findOneAndUpdate(
                dataForUpdate, {
                $set: {
                    "genricContract.name": request.body.name,
                    "genricContract.days": request.body.days,
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Genric Contract is updated successfully.',
                data.genricContract,
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

