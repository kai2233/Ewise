var express = require('express');
var router = express.Router();
import { Request, Response, NextFunction } from "express";
const{signup} = require("../controller/user");
/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

router.post('/signup',signup)
module.exports = router;
