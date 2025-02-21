import {Response, NextFunction } from "express";
const prisma = require("../prisma")
import {AuthenticatedRequest} from "../types"

exports.insertItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
                purchaseDate: new Date(purchaseDate),
                expirationDate: new Date(expirationDate),
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

exports.allFoodItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.user!
        const foods = await prisma.foodItem.findMany({
            where: {
                userId:id
            }
        })
        res.status(200).json({
            success:true,
            message:"all food items in inventory that belong to the user",
            data:foods
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

exports.updateFoodItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const foodId = req.params.id
        const updateinfo = req.body
        const updateData: Record<string, any> = {}

        for (const key in updateinfo){
            if (key in prisma.foodItem.fields) {
                updateData[key] = updateinfo[key];
            }
        }      
        const updateResult = await prisma.foodItem.update({
            where: {
                id:foodId
            },
            data:updateData
        })

        res.status(200).json({
            success:true,
            message:"all food items in inventory that belong to the user",
            data:updateResult
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

exports.deleteFoodItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const foodId = req.params.id
        const deleteResult = await prisma.foodItem.delete({
            where: {
                id:foodId
            }
        })

        res.status(200).json({
            success:true,
            message:"food item successfully deleted",
            data:deleteResult
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