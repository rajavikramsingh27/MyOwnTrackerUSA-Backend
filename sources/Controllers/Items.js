

const Item = require("../ModelSchemas/Items")
const Response = require('../Responses/Response')

class ItemController {
    async createItem(request, response, next) {
        const { name, quantity, rate, description, tax, valueAmount } = request.body

        console.log(request.body);

        // if (!name || !quantity || !rate || !tax || !description) {
        //     return response.json(Response.fail(
        //         'Please add all the fields In Body Parameters',
        //         {
        //             'Body Parameters Fields': {
        //                 name: 'String',
        //                 quantity: 'Number',
        //                 rate: 'Number',
        //                 tax: 'String',
        //                 description: 'String',
        //             }
        //         }
        //     ))
        // }

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

        const itemData = {
            name: name,
            quantity: quantity,
            rate: rate,
            tax: dictTax,
            description: description,
            valueAmount: valueAmount
        }

        console.log(itemData);

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
                    result.item,
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

    async updateItem(request, response, next) {

        const { itemID, name, quantity, rate, description, tax, valueAmount } = request.body
        console.log(request.body);

        if (!itemID, !name || !quantity || !rate || !tax || !description) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        itemID: 'String',
                        name: 'String',
                        quantity: 'Number',
                        rate: 'Number',
                        tax: 'String',
                        description: 'String',
                    }
                }
            ))
        }

        const dictTax = JSON.parse(tax)

        const itemData = {
            name: name,
            quantity: quantity,
            rate: rate,
            tax: dictTax,
            description: description,
            valueAmount: valueAmount
        }

        console.log(itemData);
        console.log(request.user._id);
        console.log(itemID);

        try {
            const details = await Item.findOneAndUpdate({
                "userID": request.user._id,
                "item._id": itemID
            }, {
                $set: { 'item': itemData }
            }, { new: true }
            )

            return (details == null)
                ? response.json(Response.fail(
                    { 'message': 'Item is not available' }
                ))
                : response.json(Response.success(
                    'Success',
                    details,
                ))
        } catch (error) {
            return response.json(Response.fail(
                error.message
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

