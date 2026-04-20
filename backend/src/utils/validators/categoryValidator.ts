import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'

const addCategoryValidator = [
    check('name').notEmpty().withMessage("le nom de la categorie est obligatoire").trim()
    .isLength({max: 32}).withMessage("nom categorie tres long"), validatorMiddleware 
]

const updateCategoryValidator = [
    check('id').isMongoId().withMessage("Id catégorie invalide"),
    check('name').notEmpty().withMessage("le nom de la categorie est obligatoire").trim()
    .isLength({max: 32}).withMessage("nom categorie tres long"), validatorMiddleware
]

const deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Id catégorie invalide"), validatorMiddleware
]

export {addCategoryValidator, updateCategoryValidator, deleteCategoryValidator}