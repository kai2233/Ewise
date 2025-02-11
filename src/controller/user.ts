const prisma = require("../prisma")
const getAccessToken = require("../utils/token")
const { generateSalt, encryptPassword, validatePassword } = require("../utils/hashPassword")
import { Request, Response, NextFunction } from "express";


exports.signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password", data: null });
        }
        const existedUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existedUser) {
            return res.status(400).json({ success: false, message: "User already exists", data: null });
        }
        const salt = generateSalt()
        const user = await prisma.user.create({
            data: {
                email,
                password: encryptPassword(password, salt),
                salt: salt
            }
        })
        const access_token = getAccessToken(user)
        if (!access_token) {
            return res.status(401).json({
                success: false,
                message: "unable to generate access token",
                data: null
            })
        }
        res.status(200).cookie("token", access_token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            access_token,
            message: "Successfully registered! Welcome to Ewise",
            data: null
        })

    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ success: false, message: error.message, data: null });
        } else {
            console.error('Unknown error:', error);
            return res.status(500).json({ success: false, message: 'An unknown error occurred', data: null });
        }
    }
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "missing email or password",
                data: null
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
                data: null
            })
        }

        if (!validatePassword(password, user.salt, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid password. Please try again",
                data: null
            })
        }
        const access_token = getAccessToken(user)
        if (!access_token) {
            return res.status(401).json({
                success: false,
                message: "unable to generate access token",
                data: null
            })
        }
        res.status(200).cookie("token", access_token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            access_token,
            message: "Login successfully! Welcomeback!",
            data: null
        })
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ success: false, message: error.message, data: null });
        } else {
            console.error('Unknown error:', error);
            return res.status(500).json({ success: false, message: 'An unknown error occurred', data: null });
        }
    }

}