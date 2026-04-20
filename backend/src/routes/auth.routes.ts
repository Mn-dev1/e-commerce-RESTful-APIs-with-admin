import express from "express"
import {login, refresh, logout} from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/authMiddleware.js"

//esq ndir auth middlewares hna wla non ?
const authRouter = express.Router()
authRouter.route('/').post(login)
authRouter.route('/refresh').post(refresh)
authRouter.route('/logout').post(authenticate, logout)

export default authRouter