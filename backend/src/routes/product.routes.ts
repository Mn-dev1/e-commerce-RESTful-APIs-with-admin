import express from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProduct, getAllCategoryProducts} from '../controllers/product.controller.js'
import { addProductValidator, deleteProductValidator, updateProductValidator } from '../utils/validators/productValidator.js'

const productRouter = express.Router()

productRouter.route('/').get(getAllProducts).post(addProductValidator, addProduct)
productRouter.route('/:id').put(updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct)
             .get(getAllCategoryProducts)

export default productRouter