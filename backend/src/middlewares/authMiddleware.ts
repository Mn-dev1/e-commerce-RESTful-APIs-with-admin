import dotenv from "dotenv"
dotenv.config()
import express from "express"
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"
import { Role } from '../utils/enums.js'
import refreshTokens from "../models/refresh.Token.js"

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const accessToken = req.headers["authorization"]?.split(' ')[1];
    if (!accessToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    jwt.verify(accessToken, process.env.JWT_SECRET as string, async (err, user) => {
        if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        req.user = user
        const connected = await refreshTokens.findOne({userId: req.user.userId})
        if(!connected) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        next();
    });
}

const authorize = (...allowedRoles: Role[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (allowedRoles.includes(req.user.role)) next()
        else return res.sendStatus(StatusCodes.FORBIDDEN)
    }
}


export { authenticate, authorize }