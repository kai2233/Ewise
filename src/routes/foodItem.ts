import express from "express"
const {foodItem} = require("../controller/foodItem")
const {verifyToken} = require("../middleware/authMiddleware")
var router = express.Router()

router.get("/",verifyToken,foodItem)
module.exports = router 