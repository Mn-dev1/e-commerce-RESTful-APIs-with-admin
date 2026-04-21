import express from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProduct} from '../controllers/product.controller.js'
import { addProductValidator, deleteProductValidator, updateProductValidator } from '../utils/validators/productValidator.js'
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import { Role } from '../utils/enums.js'

const productRouter = express.Router()

productRouter.route('/').get(getAllProducts)
                        .post(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), addProductValidator, addProduct)
                        
productRouter.route('/:id').put(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), updateProductValidator, updateProduct)
                            .delete(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), deleteProductValidator, deleteProduct)

export default productRouter