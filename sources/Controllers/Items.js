

const Item = require("../ModelSchemas/Items")
const Response = require('../Responses/Response')

class ItemController {
    async createItem(request, response, next) {
        const { name, quantity, rate, description, tax } = request.body

        if (!name || !quantity || !rate || !tax || !description) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        name: 'String',
                        quantity: 'Number',
                        rate: 'Number',
                        tax: 'String',
                        description: 'String',
                    }
                }
            ))
        }

        var details

        try {
            details = await Item.findOne({ 'userID': request.user.id })
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
                const detailsNewUser = Item(user)
                details = await detailsNewUser.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in save() ',
                    error.message,
                ))
            }
        }
        
        const dictTax = JSON.parse(tax)
        console.log(dictTax);

        const itemData = {
            name: request.body.name,
            quantity: request.body.quantity,
            rate: request.body.rate,
            tax: dictTax,
            description: request.body.description,
        }

        Item.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $push: { item: itemData }
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
                    'Item is created successfully.',
                    result.tax,
                ))
            }
        })
    }

    async listItem(request, response) {

        var details

        try {
            details = await Item.findOne({ 'userID': request.user.id })

            return response.json(Response.success(
                'Success',
                details
                    ? details.item : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async deleteItem(request, response) {
        const { itemID } = request.body

        if (!itemID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        itemID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Item.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.item.filter(
            function (value) {
                return value.id == request.body.itemID
            }
        )

        const data = output[0]

        Item.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { item: data }
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
                    'Item is deleted successfully.',
                    result.item,
                ))
            }
        })

    }

}

module.exports = new ItemController()

