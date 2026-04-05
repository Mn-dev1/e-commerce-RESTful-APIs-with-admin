import express from 'express'
import {getCategories, addCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js'
import {addCategoryValidator, updateCategoryValidator, deleteCategoryValidator}  from '../utils/validators/categoryValidator.js'

const categoryRouter = express.Router()
//middleware for catching error if the rules sralha failed
categoryRouter.route('/').get(getCategories).post(addCategoryValidator, addCategory)
categoryRouter.route('/:id').put(updateCategoryValidator, updateCategory).delete(deleteCategoryValidator, deleteCategory)

export default categoryRouter