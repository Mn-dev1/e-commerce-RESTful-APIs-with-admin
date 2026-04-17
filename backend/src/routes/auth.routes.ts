import express from "express"
import {login, refresh, logout} from "../controllers/auth.controller.js"

//esq ndir auth middlewares hna wla non ?
const authRouter = express.Router()
authRouter.route('/').post(login)
authRouter.route('/refresh').post(refresh)
authRouter.route('/logout').post(logout)

export default authRouter