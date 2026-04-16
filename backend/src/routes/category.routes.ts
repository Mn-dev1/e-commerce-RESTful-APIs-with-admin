import express from 'express'
import {getCategories, addCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js'
import {addCategoryValidator, updateCategoryValidator, deleteCategoryValidator}  from '../utils/validators/categoryValidator.js'
import auth from "../middlewares/authMiddleware.js"

const categoryRouter = express.Router()
//middleware for catching error if the rules sralha failed
categoryRouter.route('/').get(getCategories).post(auth, addCategoryValidator, addCategory)
categoryRouter.route('/:id').put(auth, updateCategoryValidator, updateCategory).delete(auth, deleteCategoryValidator, deleteCategory)

export default categoryRouter