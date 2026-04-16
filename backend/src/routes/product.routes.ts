import express from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProduct} from '../controllers/product.controller.js'
import { addProductValidator, deleteProductValidator, updateProductValidator } from '../utils/validators/productValidator.js'
import auth from "../middlewares/authMiddleware.js"

const productRouter = express.Router()

productRouter.route('/').get(getAllProducts).post(auth, addProductValidator, addProduct)
productRouter.route('/:id').put(auth, updateProductValidator, updateProduct).delete(auth, deleteProductValidator, deleteProduct)

export default productRouter