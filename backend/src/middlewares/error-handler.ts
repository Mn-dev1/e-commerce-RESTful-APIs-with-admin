import express from 'express'
import { StatusCodes } from "http-status-codes"
import CustomError from '../errors/CustomError.js'

const errorHandlerMiddleware = (error: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) =>{
    const customError = {
        message: error.message || `Something went wrong`,
        // status: error.status || 'error',
        // isOperational: error.isOperational,
        // stack: error.stack,
        timestamps: new Date().toISOString()
    }
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(customError)
}
export default errorHandlerMiddleware