import express from "express"
import { validationResult } from "express-validator"

const validatorMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req) //catch errors from req
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    next()
}
export default validatorMiddleware