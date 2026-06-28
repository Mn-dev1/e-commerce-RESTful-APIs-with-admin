import express from "express"
import { addProductAuPanier, deletePanier, getPanier} from "../controllers/panier.controller.js"
import { getAllProducts } from "../controllers/product.controller.js"

const panierRouter = express.Router()

panierRouter.route('/').post(addProductAuPanier)
                       .get(getAllProducts, getPanier)

panierRouter.route('/:id')//.put(updatePanier)
                       .delete(deletePanier)

export default panierRouter