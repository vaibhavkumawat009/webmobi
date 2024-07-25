const express = require("express")
const router = express.Router()

const userRouter = require("./userRoutes/userRouter.js")

router.use("/api/v1",userRouter)

module.exports = router