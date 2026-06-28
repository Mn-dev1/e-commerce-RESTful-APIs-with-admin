import express from "express"
import {getClients, addClient} from "../controllers/client.controller.js"
import addClientValidator from "../utils/validators/clientValidators.js"
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import {Role} from '../utils/enums.js'

const clientRouter = express.Router()

clientRouter.route('/').get(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), getClients)
                       .post(addClientValidator, addClient)

export default clientRouter