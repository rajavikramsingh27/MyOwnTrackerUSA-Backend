

const Company = require("../ModelSchemas/Company")
const Response = require('../Responses/Response')
const FileUpload = require('../Global/FileUpload')
const path = require("path")



class CategoryController {
    async createCompany(request, response, next) {

        const {
            logo, licenceDoc, insuranceDoc,
            name, phone_1, phone_2, address_1, address_2, city, state_Province, zip_Postal_Code, business,
            websiteURL, googleBusinessURL, facebookURL, InstagramURL
        } = request.body
        if (
            !name ||
            !phone_1 ||
            !phone_2 ||

            !address_1 ||
            !address_2 ||
            !city ||
            !state_Province ||
            !zip_Postal_Code ||

            !business
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        logo: "String",
                        licenceDoc: "String",
                        InsuranceDoc: "String",

                        name: "String",
                        phone_1: "String",
                        phone_2: "String",
                        address_1: "String",
                        address_2: "String",
                        city: "String",
                        state_Province: "String",
                        zip_Postal_Code: "String",

                        business: "String",
                        websiteURL: "String",
                        googleBusinessURL: "String",
                        facebookURL: "String",
                        InstagramURL: "String",
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Company.findOne({ 'userID': request.user.id })
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
                const detailsNew = Company(user)
                detailsMe = await detailsNew.save()
            } catch (error) {
                return response.json(Response.fail(
                    'Error in detailsNewUser.save() ',
                    error.message,
                ))
            }
        }

        const basicInfo = {
            name: request.body.name,
            phone_1: request.body.phone_1,
            phone_2: request.body.phone_2,
            address_1: request.body.address_1,
            address_2: request.body.address_2,
            city: request.body.city,
            state_Province: request.body.state_Province,
            zip_Postal_Code: request.body.zip_Postal_Code,
            business: request.body.business,
        }

        const licence_Insurance = {
            licenceDoc: request.body.licenceDoc,
            insuranceDoc: request.body.insuranceDoc,
        }

        const website_SocialMedia = {
            websiteURL,
            googleBusinessURL,
            facebookURL,
            InstagramURL,
        }

        const dictCompany = {
            basicInfo,
            licence_Insurance,
            website_SocialMedia,
        }

        Company.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $set: { company: dictCompany }
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
                    'Company Profile is created successfully.',
                    result.company,
                ))
            }
        })
    }

    async readCompany(request, response) {
        var detailsMe

        try {
            detailsMe = await Company.findOne({ 'userID': request.user.id })
            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe.company : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in findOne',
                error.message,
            ))
        }

    }

    async updateCompany(request, response) {
        const {
            logo, licenceDoc, insuranceDoc,
            name, phone_1, phone_2, address_1, address_2, city, state_Province, zip_Postal_Code, business,
            websiteURL, googleBusinessURL, facebookURL, InstagramURL
        } = request.body
        if (
            !name ||
            !phone_1 ||
            !phone_2 ||

            !address_1 ||
            !address_2 ||
            !city ||
            !state_Province ||
            !zip_Postal_Code ||

            !business
        ) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        logo: "String",
                        licenceDoc: "String",
                        InsuranceDoc: "String",

                        name: "String",
                        phone_1: "String",
                        phone_2: "String",
                        address_1: "String",
                        address_2: "String",
                        city: "String",
                        state_Province: "String",
                        zip_Postal_Code: "String",

                        business: "String",
                        websiteURL: "String",
                        googleBusinessURL: "String",
                        facebookURL: "String",
                        InstagramURL: "String",
                    }
                }
            ))
        }

        const basicInfo = {
            name: request.body.name,
            phone_1: request.body.phone_1,
            phone_2: request.body.phone_2,
            address_1: request.body.address_1,
            address_2: request.body.address_2,
            city: request.body.city,
            state_Province: request.body.state_Province,
            zip_Postal_Code: request.body.zip_Postal_Code,
            business: request.body.business,
        }

        const licence_Insurance = {
            licenceDoc: request.body.licenceDoc,
            insuranceDoc: request.body.insuranceDoc,
        }

        const website_SocialMedia = {
            websiteURL,
            googleBusinessURL,
            facebookURL,
            InstagramURL,
        }

        const dataForUpdate = {
            'userID': request.user.id,
        }
        console.log(dataForUpdate);

        try {
            const data = await Company.findOneAndUpdate(
                dataForUpdate, {
                $set: {
                    "company.basicInfo": basicInfo,
                    "company.licence_Insurance": licence_Insurance,
                    "company.website_SocialMedia": website_SocialMedia,
                }
            }, {
                new: true
            })

            return response.json(Response.success(
                'Company is updated successfully.',
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

