import express from "express"
import {getClients, addClient} from "../controllers/client.controller.js"
import addClientValidator from "../utils/validators/clientValidators.js"
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import {Role} from '../utils/enums.js'

const clientRouter = express.Router()

clientRouter.route('/paiment').post(addClientValidator, addClient)

clientRouter.route('/clients').get(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), getClients)

export default clientRouter