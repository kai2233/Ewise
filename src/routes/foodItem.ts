import express from "express"
const {insertItem, allFoodItem} = require("../controller/foodItem")
const {verifyToken} = require("../middleware/authMiddleware")
var router = express.Router()

router.post("/item",verifyToken,insertItem)
router.get("/items",verifyToken,allFoodItem)
module.exports = router 