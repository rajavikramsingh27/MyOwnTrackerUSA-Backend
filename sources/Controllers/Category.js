

const Category = require("../ModelSchemas/Category")
const Response = require('../Responses/Response')
const FileUpload = require('../Global/FileUpload')
const path = require("path")

class CategoryController {
    async createCategory(request, response, next) {
        const allowedExtensions = /png|jpeg|jpg/

        const { icon, title, colorHex } = request.body

        if (!title || !colorHex) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        icon: 'icon must be ' + allowedExtensions.toString() + ' format',
                        title: 'String',
                        colorHex: 'String',
                    }
                }
            ))
        }

        const { name, data } = request.files.icon

        request.name = name
        request.data = data

        if (!allowedExtensions.test(path.extname(name))) {
            return response.json(Response.fail(
                'Extension must be ' + allowedExtensions.toString() + ' format',
            ))
        }

        FileUpload.uploadS33(request, response, next, async function (pictureURL) {
            console.log(pictureURL);

            var detailsMe

            try {
                detailsMe = await Category.findOne({ 'userID': request.user.id })
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
                    const detailsNewUser = Category(user)
                    detailsMe = await detailsNewUser.save()
                } catch (error) {
                    return response.json(Response.fail(
                        'Error in detailsNewUser.save() ',
                        error.message,
                    ))
                }
            }

            const category = {
                icon: pictureURL,
                title: request.body.title,
                colorHex: request.body.colorHex,
            }

            Category.findOneAndUpdate(
                { 'userID': request.user.id }, {
                $push: { category: category }
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
                        'Category is created successfully.',
                        result.category,
                    ))
                }
            })
        })
    }

    async listCategory(request, response) {

        var detailsMe

        console.log(request.user.id)

        try {
            detailsMe = await Category.findOne({ 'userID': request.user.id })

            console.log(detailsMe);

            return response.json(Response.success(
                'Success',
                detailsMe ? detailsMe.category : [],
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findOne',
                error.message,
            ))
        }

    }

    async editCategory(request, response, next) {
        const { categoryID } = request.body

        if (!categoryID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        categoryID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Category.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findOne',
                error.message,
            ))
        }

        var output = detailsMe.category.filter(
            function (value) {
                return value.id == request.body.categoryID
            }
        )

        const categoryData = output[0]

        Category.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { category: categoryData }
        }, {
            new: true
        }).exec(async (error, result) => {
            if (error) {
                return response.json(Response.fail(
                    error.message,
                    error.message,
                ))
            } else {
                next()
                // friendDetails = result
                // return response.json(Response.success(
                //     'Category is deleted successfully.',
                //     result,
                // ))

                // await this.createCategory(request, response)
            }
        })

    }

    async deleteCategory(request, response) {
        const { categoryID } = request.body

        if (!categoryID) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        categoryID: 'String',
                    }
                }
            ))
        }

        var detailsMe

        try {
            detailsMe = await Category.findOne({ 'userID': request.user.id })
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findOne',
                error.message,
            ))
        }

        var output = detailsMe.category.filter(
            function (value) {
                return value.id == request.body.categoryID
            }
        )

        const categoryData = output[0]

        Category.findOneAndUpdate(
            { 'userID': request.user.id }, {
            $pull: { category: categoryData }
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
                    'Category is deleted successfully.',
                    result,
                ))
            }
        })

    }

    async deleteAllCategory(request, response) {

        console.log(request.user._id);

        try {
            const details = await Category.findOneAndDelete(
                { "userID": request.user._id }
            )

            return response.json(Response.success(
                (details == null)
                    ? "User is not available."
                    : "Deleted successfully."
            ))
        } catch (error) {
            return response.json(Response.fail(
                'Error in Category.findByIdAndDelete',
                error.message,
            ))
        }

    }

}

module.exports = new CategoryController()

