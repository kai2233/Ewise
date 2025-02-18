import express from "express"
var router = express.Router();
const{signup, login} = require("../controller/user");


router.post('/signup',signup)
router.get('/login',login)

module.exports = router;
