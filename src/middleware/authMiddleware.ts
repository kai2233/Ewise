import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')

interface AuthenticatedRequest extends Request {
    user?: {};
}
const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
    const token = req.cookies.token || (typeof req.headers["authorization"] === "string" 
        ? req.headers["authorization"].split(" ")[1] 
        : undefined);
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}