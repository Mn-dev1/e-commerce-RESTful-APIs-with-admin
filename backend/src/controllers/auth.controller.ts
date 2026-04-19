import express from "express"
import { StatusCodes } from "http-status-codes";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import refreshTokens from "../models/refresh.Token.js";
dotenv.config()
import type { StringValue } from 'ms';

const register = async (req: express.Request, res: express.Response) => {
    const admin = Admin.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    res.status(StatusCodes.CREATED).json(`admin créé`)
}

const login = async (req: express.Request, res: express.Response) => {
    const query = {
        $or: [
            { username: req.body.emailOrUsername },
            { email: req.body.emailOrUsername }
        ]
    }
    const admin = await Admin.findOne(query)
    if (admin) {
        const passwordCheck = await bcrypt.compare(req.body.password, admin.password)
        if (passwordCheck) {
            const accessToken = jwt.sign(
                { userId: admin._id, role: admin.role },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN as StringValue })

            const refreshToken = jwt.sign(
                { userId: admin._id },
                process.env.JWT_REFRESH_SECRET as string,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN as StringValue })

            await refreshTokens.create({ userId: admin._id, token: refreshToken })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Can’t be accessed by JS.
                secure: true,       // Only sent over HTTPS
                sameSite: 'strict', // Prevents CSRF attacks
                path: '/api/v1/auth/refresh',
                maxAge: 7 * 24 * 60 * 60 * 1000, //whats that ????????????
            }).setHeader('Authorization', `Bearer ${accessToken}`).json(`welcome`)


        } else res.status(StatusCodes.UNAUTHORIZED).json(`email ou mot de passe incorrecte`)
    } else res.status(StatusCodes.UNAUTHORIZED).json(`email ou mot de passe incorrecte`)

}

const refresh = async (req: express.Request, res: express.Response) => {
    const token = req.cookies['refreshToken']; //joiful nerja3 lih nhez mn la methode li yekteb biha l code w error handlers w turki aussi + implements frontend
    const expiredAccess = req.headers["authorization"]?.split(' ')[1]

    if (!token || !expiredAccess) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    else {
        try {
            const refreshToken = await refreshTokens.findOne({ token: token })
            if (!refreshToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);
            else {
                const expiredAccessToken = jwt.verify(expiredAccess, process.env.JWT_SECRET as string, { ignoreExpiration: true }) as jwt.JwtPayload;
                const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as jwt.JwtPayload;
                if (expiredAccessToken.id !== decoded.id) return res.sendStatus(StatusCodes.UNAUTHORIZED)
                
                // new access token
                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.JWT_SECRET as string,
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN as StringValue }
                );

                //rotate refresh token
                const newRefreshToken = jwt.sign(
                    { id: decoded.id },
                    process.env.JWT_REFRESH_SECRET as string,
                    { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN as StringValue }
                );
                await refreshTokens.deleteOne({ token: token })
                await refreshTokens.create({ userId: decoded.id, token: newRefreshToken })

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/api/v1/auth/refresh',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                return res.status(StatusCodes.OK).setHeader('Authorization', `Bearer ${accessToken}`).json('success')
            }

        } catch (err) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
    }
};

const logout = async (req: express.Request, res: express.Response) => {
    res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
    await refreshTokens.deleteOne({ userId: req.user.userId })
    return res.sendStatus(StatusCodes.NO_CONTENT);
}

export { register, login, refresh, logout }
// When building authentication services in Node.js, securing private keys is critical. JWTs (JSON Web Tokens) are often signed with an RSA private key, while clients and other services verify tokens using the corresponding public key.
// A common mistake is storing private keys directly in code or .env files. This approach is insecure and vulnerable to leaks. Instead, a better approach is to store sensitive keys in AWS S3 buckets and fetch them at runtime.