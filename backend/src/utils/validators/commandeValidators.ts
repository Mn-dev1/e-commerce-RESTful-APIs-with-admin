import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'

const addCommandeValidator = [
    check('adresse').notEmpty().withMessage("l'adresse est obligatoire").trim()
    .isLength({min: 2, max: 40}).withMessage("adresse tres long ou tres court"),
    check('commune').notEmpty().withMessage("la commune est obligatoire").trim()
    .isLength({min: 2, max: 40}).withMessage("nom de commune tres long ou tres court"),
    check('wilaya').notEmpty().withMessage("l'a wilaya est obligatoire").trim()
    .isLength({min: 2, max: 20}).withMessage("wilaya tres long ou tres court"),
    validatorMiddleware
]

export default addCommandeValidator