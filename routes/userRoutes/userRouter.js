const express = require("express");

const router = express.Router()
const userController = require("../../controller/user/userController.js")
const passport = require('passport')


router.get("/get-user",passport.authenticate('jwt', { session: false }),userController.getUser)
router.post("/signup",userController.createUser)
router.post("/login",userController.loginUser)
// router.get("/get-user",userController.getUser)


module.exports = router