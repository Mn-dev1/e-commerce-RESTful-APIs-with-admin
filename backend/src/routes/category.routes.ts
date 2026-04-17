import express from 'express'
import {getCategories, addCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js'
import {addCategoryValidator, updateCategoryValidator, deleteCategoryValidator}  from '../utils/validators/categoryValidator.js'
import { authenticate, authorize } from '../middlewares/authMiddleware.js'
import { Role } from '../utils/roles.js'


const categoryRouter = express.Router()
//middleware for catching error if the rules sralha failed
categoryRouter.route('/').get(getCategories)
                         .post(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), addCategoryValidator, addCategory)

categoryRouter.route('/:id').put(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), updateCategoryValidator, updateCategory)
                            .delete(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), deleteCategoryValidator, deleteCategory)

export default categoryRouter