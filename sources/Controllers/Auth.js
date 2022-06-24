
const User = require('../ModelSchemas/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Response = require('../Responses/Response')
const Constants = require('../Global/Constants')
const Filters = require('../Global/Filters')
const FileUpload = require('../Global/FileUpload')
const path = require("path")


class AuthController {
    auth(request, response, next) {
        const { authorization } = request.headers

        if (!authorization) {
            return response.json(Response.message('Use header (Authorization:Bearer YourToken)'))
        }

        const token = authorization.replace("Bearer ", "")

        jwt.verify(token, Constants.JWT_SECRET, (error, payload) => {

            if (error) {
                return response.json(Response.fail(
                    'InValid Token. You must be logged in.',
                    error.message
                ))
            }

            const { _id } = payload

            User.findById(_id).then(userdata => {
                request.user = Filters.filterUser(userdata)
                next()
            }).catch(error => {
                return response.json(Response.fail(
                    'User is not available is DataBase. Use a valid token.',
                    error.message
                ))
            })
        })

    }

    async signinSocial(request, response) {
        const { profilePicture, name, email, } = request.body

        if (!profilePicture || !name || !email) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        profilePicture: 'String',
                        name: 'String',
                        email: 'String',
                    }
                }
            ))
        }

        try {
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                const token = jwt.sign({ _id: userExist._id }, Constants.JWT_SECRET, { expiresIn: '2d' })

                return response.json(Response.success(
                    'Success',
                    { token, user: Filters.filterUser(userExist) }
                ))
            }
        } catch (error) {
            return response.json(Response.fail(
                'Error in finding UserExist...',
                error.message
            ))
        }

        try {
            var details = User(request.body)
            details['password'] = ''
            const created = await details.save()

            const token = jwt.sign({ _id: created._id }, Constants.JWT_SECRET)

            return response.json(Response.success(
                'Success',
                { token, user: Filters.filterUser(created) },
            ))
        } catch (error) {
            return response.json(Response.fail(
                error.message,
                error.message
            ))
        }
    }

    async signup(request, response) {
        const { profilePicture, name, email, password, } = request.body

        if (!profilePicture || !name || !email || !password) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        profilePicture: 'String',
                        name: 'String',
                        email: 'String',
                        password: 'String',
                    }
                }
            ))
        }

        try {
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return response.json(Response.fail(
                    'User already exists with this email',
                ))
            }
        } catch (error) {
            return response.json(Response.fail(
                'User is not finding',
                error.message
            ))
        }

        var hashedPassword = ''
        try {
            hashedPassword = await bcrypt.hash(password, 12)
            // console.log(hashedPassword)
        } catch (error) {
            return response.json(Response.fail(
                'Password is not bcrypting...',
                error.message
            ))
        }

        try {
            var details = User(request.body)
            details['password'] = hashedPassword
            const created = await details.save()
            console.log(created);

            const token = jwt.sign({ _id: created._id }, Constants.JWT_SECRET)
            details['token'] = token

            return response.json(Response.success(
                'Success',
                { token, user: Filters.filterUser(created) },
            ))
        } catch (error) {
            return response.json(Response.fail(
                error.message
            ))
        }
    }

    async signin(request, response) {
        const { email, password } = request.body

        if (!email || !password) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        email: 'String',
                        password: 'String',
                    }
                }
            ))
        }

        var savedUser

        try {
            savedUser = await User.findOne({ 'email': email })

            if (savedUser == null) {
                return response.json(Response.fail(
                    'User is not available'
                ))
            }
        } catch (error) {
            return response.json(Response.fail(
                error.message
            ))
        }

        const isMatch = await bcrypt.compare(password, savedUser.password)

        if (isMatch) {
            const token = jwt.sign({ _id: savedUser._id }, Constants.JWT_SECRET,
                // { expiresIn: '2d' }
            )

            return response.json(Response.success(
                'Success',
                { token, user: Filters.filterUser(savedUser) },
            ))
        } else {
            return response.json(Response.fail(
                'Invalid Email or password'
            ))
        }

    }

    async updateProfile(request, response, next) {
        const allowedExtensions = /png|jpeg|jpg/

        const { profilePicture, name, email, } = request.body

        if (!name || !email) {
            return response.json(Response.fail(
                'Please add all the fields In Body Parameters',
                {
                    'Body Parameters Fields': {
                        profilePicture: 'icon must be ' + allowedExtensions.toString() + ' format',
                        name: 'String',
                        email: 'String',
                    }
                }
            ))
        }

        const { name: nameImage, data } = request.files.profilePicture

        request.nameImage = nameImage
        request.data = data

        if (!allowedExtensions.test(path.extname(nameImage))) {
            return response.json(Response.fail(
                'Extension must be ' + allowedExtensions.toString() + ' format',
            ))
        }

        FileUpload.uploadS33(request, response, next, async function (pictureURL) {
            console.log(pictureURL);

            const data = {
                profilePicture: pictureURL,
                name,
                email,
            }

            try {
                const details = await User.findByIdAndUpdate(
                    { "_id": request.user._id }, data, { new: true }
                )

                return (details == null)
                    ? response.json(Response.fail(
                        {'message': 'User is not available'}
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
        })
    }
    
    async changePassword(request, response) {
        const { oldPassword, newPassword } = request.body

        if (!oldPassword || !newPassword) {
            return response.json(Response.fail(
                {
                    'Please add all the fields': {
                        oldPassword: 'String',
                        newPassword: 'String',
                    }
                }
            ))
        }

        const isMatch = await bcrypt.compare(oldPassword, request.user.password)
        if (!isMatch) {
            return response.json(Response.fail(
                'Old Password is not correct.',
            ))
        }

        var hashedPassword = ''

        try {
            hashedPassword = await bcrypt.hash(newPassword, 12)
        } catch (error) {
            return response.json(Response.fail(
                'Password is not bcrypting...',
                error.message
            ))
        }

        try {
            const details = await User.findByIdAndUpdate(
                { "_id": request.user._id }, { 'password': hashedPassword }, { new: true }
            )

            return response.json(Response.success(
                'New password is updated.',
            ))
        } catch (error) {
            return response.json(Response.fail(
                'findByIdAndUpdate is not working properly.',
                error.message
            ))
        }

    }

    async resetPassword(request, response) {
        const param = { 'email': request.body.email }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'rajavikramsingh27@gmail.com',
                pass: 'fdlhrqzfhxjrjphb',
            },
        });

        try {
            const user = await User.findOne(param)
            // console.log(user)

            if (user) {
                const mailOptions = {
                    from: request.body.email,
                    to: request.body.email,
                    subject: 'Request for Password Reset',
                    // text: 'Hello From GranzaX Team LLP',
                    html: `
                                 <p>You requested for password reset.</p>
                                 <h3>click on this link <a href="https://${Constants.kBaseURLLive}userID:${user._id}">Click here</a> to reset password</h>
                                 `
                }

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return response.json(Response.fail(
                            error.message
                        ))
                    } else {
                        return response.json(Response.success(
                            'Success',
                            info
                        ))
                    }
                })
            } else {
                return response.json(Response.fail(
                    'User is not registered with email ID.',
                ))
            }
        } catch (error) {
            return response.json(Response.fail(
                'Error in User findOne',
                error.message
            ))
        }

    }

    async setPasswordFromSentLinkOnMail(request, response) {
        const { userID, password } = request.body

        if (!password) {
            return response.json(Response.fail(
                'Please add all the fields'
            ))
        }

        var hashedPassword = ''

        try {
            hashedPassword = await bcrypt.hash(password, 12)
        } catch (error) {
            return response.json(Response.fail(
                'Password is not bcrypting...',
                error.message
            ))
        }

        try {
            const details = await User.findByIdAndUpdate(
                { "_id": userID }, { 'password': hashedPassword }, { new: true }
            )

            return response.json(Response.success(
                'New password is updated.',
            ))
        } catch (error) {
            return response.json(Response.fail(
                'findByIdAndUpdate is not working properly.',
                error.message
            ))
        }
    }

    async termsOfUse(request, response) {
        return response.sendFile('termsOfUse.html', { root: __dirname })
    }

    async privacyPolicy(request, response) {
        return response.sendFile('privacyPolicy.html', { root: __dirname })
    }

}

module.exports = new AuthController()
