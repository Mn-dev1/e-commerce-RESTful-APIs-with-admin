import express from "express"
import {login, refresh, logout} from "../controllers/auth.controller.js"

const authRouter = express.Router()
authRouter.route('/').post(login)
authRouter.route('/refresh').post(refresh)
authRouter.route('/logout').post(logout)

export default authRouter