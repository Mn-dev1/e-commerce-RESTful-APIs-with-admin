import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'
import Category from '../../models/category.model.js'

const addProductValidator = [
    check('designation').notEmpty().withMessage("la designation de produit est obligatoire").isLength({max: 32}).withMessage("designation tres long"), 
    check('qte').notEmpty().withMessage('la quantite est obligatoire').isNumeric().withMessage('la quantite est un nombre'),
    check('prix').notEmpty().withMessage('le prix est obligatoire').isNumeric().withMessage('le prix est un nombre'), 
    check('imageCover').notEmpty().withMessage('image de produit est obligatoire'),
    check('category').notEmpty().withMessage('categorie obligatoire').isMongoId().withMessage("Id categorie invalide").custom(async (value) => {
        const category = await Category.findById(value)                                                                            //value ta3 l field li 3mlna check 3lih
        if (!category) {
            throw new Error('id categorie invalide')
        }
    }),
    validatorMiddleware 
]
const updateProductValidator = [
    check('id').isMongoId().withMessage("Id produit invalide"),
    check('qte').notEmpty().withMessage('la quantite est obligatoire').isNumeric().withMessage('la quantite est un nombre'),
    check('designation').notEmpty().withMessage("la designation de produit est obligatoire").isLength({max: 32}).withMessage("designation tres long"), 
    check('prix').notEmpty().withMessage('le prix est obligatoire').isNumeric().withMessage('le prix est un nombre'), 
    check('imageCover').notEmpty().withMessage('image de produit est obligatoire'),
    check('category').notEmpty().withMessage('categorie obligatoire').isMongoId().withMessage("Id categorie invalide"),
    validatorMiddleware
]

const deleteProductValidator = [
    check('id').isMongoId().withMessage("Id catégorie invalide"), 
    validatorMiddleware
]

export {addProductValidator, updateProductValidator, deleteProductValidator}