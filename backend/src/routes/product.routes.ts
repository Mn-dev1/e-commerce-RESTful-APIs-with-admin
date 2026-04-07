import express from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProduct} from '../controllers/product.controller.js'
import { addProductValidator, deleteProductValidator, updateProductValidator } from '../utils/validators/productValidator.js'

const productRouter = express.Router()

productRouter.route('/').get(getAllProducts).post(addProductValidator, addProduct)
productRouter.route('/:id').put(updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct)

export default productRouter