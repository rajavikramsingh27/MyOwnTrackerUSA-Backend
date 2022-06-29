

const Client = require("../ModelSchemas/Client")
const Response = require('../Responses/Response')

class CategoryController {
    async createClient(request, response) {
        const {
            name, email, mobileNumber, homeNumber,
            billing_address_1, billing_address_2, billing_state_Province, billing_city, billing_zip_Postal_Code,
            service_address_1, service_address_2, service_state_Province, service_city, service_zip_Postal_Code,
        } = request.body

        if (
            !name ||
            !email ||
            !mobileNumber ||
            !homeNumber ||

            !billing_address_1 ||
            !billing_address_2 ||
            !billing_state_Province ||
            !billing_zip_Postal_Code ||
            !billing_city ||

            !service_address_1 ||
            !service_address_2 ||
            !service_city ||
            !service_state_Province ||
            !service_zip_Postal_Code
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        name: 'String',
                        email: 'String',
                        mobileNumber: 'String',
                        homeNumber: 'String',

                        billing_address_1: 'String',
                        billing_address_2: 'String',
                        billing_state_Province: 'String',
                        billing_zip_Postal_Code: 'String',
                        billing_city: 'String',

                        service_address_1: 'String',
                        service_address_2: 'String',
                        service_city: 'String',
                        service_state_Province: 'String',
                        service_zip_Postal_Code: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Client.findOne({ 'userID': request.user.id })
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
                const detailsNewUser = Client(user)
                detailsMe = await detailsNewUser.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in detailsNewUser.save() ',
                    error.message,
                ))
            }
        }

        const basicInfo = {
            name: request.body.name,
            email: request.body.email,
            mobileNumber: request.body.mobileNumber,
            homeNumber: request.body.homeNumber,
        }

        const billingInfo = {
            billing_address_1: request.body.billing_address_1,
            billing_address_2: request.body.billing_address_2,
            billing_city: request.body.billing_city,
            billing_state_Province: request.body.billing_state_Province,
            billing_zip_Postal_Code: request.body.billing_zip_Postal_Code,
        }

        const serviceAddress = {
            service_address_1: request.body.service_address_1,
            service_address_2: request.body.service_address_2,
            service_city: request.body.service_city,
            service_state_Province: request.body.service_state_Province,
            service_zip_Postal_Code: request.body.service_zip_Postal_Code,
        }

        const clientData = {
            basicInfo,
            billingInfo,
            serviceAddress,
        }

        Client.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $push: { client: clientData }
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
                    'Client is created successfully.',
                    result.category,
                ))
            }
        })
    }

    async readClient(request, response) {

        var detailsMe

        console.log(request.user.id)

        try {
            detailsMe = await Client.findOne({ 'userID': request.user.id })

            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe.client : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateClient(request, response) {
        const {
            clientID, name, email, mobileNumber, homeNumber,
            billing_address_1, billing_address_2, billing_state_Province, billing_city, billing_zip_Postal_Code,
            service_address_1, service_address_2, service_state_Province, service_city, service_zip_Postal_Code,
        } = request.body

        if (
            !clientID ||
            !name ||
            !email ||
            !mobileNumber ||
            !homeNumber ||

            !billing_address_1 ||
            !billing_address_2 ||
            !billing_state_Province ||
            !billing_zip_Postal_Code ||
            !billing_city ||

            !service_address_1 ||
            !service_address_2 ||
            !service_city ||
            !service_state_Province ||
            !service_zip_Postal_Code
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        clientID: 'String',
                        name: 'String',
                        email: 'String',
                        mobileNumber: 'String',
                        homeNumber: 'String',

                        billing_address_1: 'String',
                        billing_address_2: 'String',
                        billing_state_Province: 'String',
                        billing_zip_Postal_Code: 'String',
                        billing_city: 'String',

                        service_address_1: 'String',
                        service_address_2: 'String',
                        service_city: 'String',
                        service_state_Province: 'String',
                        service_zip_Postal_Code: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Client.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.client.filter(
            function (value) {
                return value.id == request.body.clientID
            }
        )


        const basicInfo = {
            name: request.body.name,
            email: request.body.email,
            mobileNumber: request.body.mobileNumber,
            homeNumber: request.body.homeNumber,
        }

        const billingInfo = {
            billing_address_1: request.body.billing_address_1,
            billing_address_2: request.body.billing_address_2,
            billing_city: request.body.billing_city,
            billing_state_Province: request.body.billing_state_Province,
            billing_zip_Postal_Code: request.body.billing_zip_Postal_Code,
        }

        const serviceAddress = {
            service_address_1: request.body.service_address_1,
            service_address_2: request.body.service_address_2,
            service_city: request.body.service_city,
            service_state_Province: request.body.service_state_Province,
            service_zip_Postal_Code: request.body.service_zip_Postal_Code,
        }

        try {
            const data = await Client.findOneAndUpdate(
                {
                    'userID': request.user.id,
                    "client._id": request.body.clientID
                }, {
                $set: {
                    "client.$.basicInfo": basicInfo,
                    "client.$.billingInfo": billingInfo,
                    "client.$.serviceAddress": serviceAddress,
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Client is updated successfully.',
                data,
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOneAndUpdate',
                error.message,
            ))
        }
    }

    async deleteClient(request, response) {
        const { clientID } = request.body

        if (!clientID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        clientID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Client.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

        var output = detailsMe.client.filter(
            function (value) {
                return value.id == request.body.clientID
            }
        )

        const data = output[0]

        Client.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { client: data }
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
                    'Client is deleted successfully.',
                    result.client,
                ))
            }
        })

    }

    async deleteAllClient(request, response) {

        console.log(request.user._id);

        try {
            const details = await Client.findOneAndDelete(
                { "userID": request.user._id }
            )

            return response.json(Response.success(
                (details == null)
                    ? "User is not available."
                    : "Deleted successfully."
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findByIdAndDelete',
                error.message,
            ))
        }

    }

}

module.exports = new CategoryController()

