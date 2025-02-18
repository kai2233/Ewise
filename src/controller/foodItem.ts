import {Response, NextFunction } from "express";
const prisma = require("../prisma")
import {AuthenticatedRequest} from "../types"

exports.foodItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.user!
        const {name, category, quantity, unit, purchaseDate, expirationDate} = req.body
        const food = await prisma.foodItem.create({
            data: {
                userId:id,
                name,
                category,
                quantity,
                unit,
                purchaseDate,
                expirationDate,
                
            }
        })
        res.status(200).json({
            success:true,
            message:"food item successfully added to inventory",
            data:food
        })
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ success: false, message: error.message, data: null });
        } else {
            return res.status(500).json({ success: false, message: 'An unknown error occurred', data: null });
        }
    }
}