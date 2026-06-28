import express from "express"
import {addCommande, deleteCommande, getCommandes, updateCommande} from "../controllers/commande.controller.js"
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import {Role} from '../utils/enums.js'
import addCommandeValidator from "../utils/validators/commandeValidators.js"

const commandeRouter = express.Router()

commandeRouter.route('/').get(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), getCommandes)
                         
commandeRouter.route('/:id').put(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), updateCommande)
                            .delete(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), deleteCommande)
                            .post(addCommandeValidator, addCommande)

export default commandeRouter