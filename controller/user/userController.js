const { sendResponse } = require("../../utils/sendResponse.js")
const { statusCode } = require("../../constants/statusCode.js")
const { successMessage, errorMessage } = require("../../constants/messages.js")
const User = require("../../model/user/userModel.js")
const { genPassword, validPassword } = require("../../utils/passwordUtils.js")
const { generateToken } = require("../../utils/genToken.js")
const {jwtDecode} = require("jwt-decode")

//signup
exports.createUser = async (req, res) => {
    try {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,

        }

        const passwordGen = genPassword(req.body.password)
        data.salt = passwordGen.salt
        data.hash = passwordGen.hash
        const result = await User.create(data);

        return sendResponse(res, statusCode.OK, true, `User ${successMessage.CREATED_SUCCESS}`, result)
    } catch (error) {
        console.log(error);
        return sendResponse(res, statusCode.OK, false, `User ${errorMessage.INTERNAL_SERVER}`, error)

    }
}

//login
exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return sendResponse(res, statusCode.OK, false, `User ${errorMessage.NOT_FOUND}`, error)
        }
        console.log(user.salt, "user")
        const validated = validPassword(req.body.password, user.hash, user.salt)

        let token = await generateToken(user)
        console.log(token)
        return validated ? sendResponse(res, statusCode.OK, true, `User Login ${successMessage.SUCCESSFULL}`, token) : sendResponse(res, statusCode.OK, false, `${errorMessage.WRONG_PASSWORD}`)
    } catch (error) {
        console.log(error);
        return sendResponse(res, statusCode.OK, false, `User ${errorMessage.INTERNAL_SERVER}`, error)

    }
}

//getUser
exports.getUser = async (req, res) => {
    try {
        console.log("hello vaibhav");
        const token = req.headers['authorization'];
        const decoded = jwtDecode(token);
        const id = decoded.id
        const result = await User.find({ _id: id })
        return sendResponse(res, statusCode.OK, true, `User ${successMessage.GET_SUCCESS}`, result)
    }
    catch (error) {
        console.log(error);
        return sendResponse(res, statusCode.OK, false, `User ${errorMessage.INTERNAL_SERVER}`, error)
    }
}
