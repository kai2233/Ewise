const prisma = require("../prisma")
const getAccessToken =  require("../utils/token")
import { Request, Response, NextFunction } from "express";


exports.signup = async(req: Request, res: Response, next: NextFunction) => {
    const {email,password} = req.body
}