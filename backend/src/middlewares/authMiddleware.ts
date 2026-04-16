import dotenv from "dotenv"
dotenv.config()
import express from "express"
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"

const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    

    jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, admin) => {
        if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        req.admin = admin
        next();
    });
}


export default auth