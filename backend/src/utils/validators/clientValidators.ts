import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'

const addClientValidator = [
    check('nom').notEmpty().withMessage("le nom et prénom sont obligatoires").trim()
    .isLength({min: 3, max: 100}).withMessage("nom tres long ou moins de 3 caracteres"),
    check('num_tel').notEmpty().withMessage("le numero de téléphone est obligatoire").trim()
    .isLength({min: 10, max: 10}).withMessage("numéro telephone invalide"),
    check('adresse').notEmpty().withMessage("l'adresse est obligatoire").trim()
    .isLength({min: 2, max: 40}).withMessage("adresse tres long ou tres court"),
    check('commune').notEmpty().withMessage("la commune est obligatoire").trim()
    .isLength({min: 2, max: 40}).withMessage("nom de commune tres long ou tres court"),
    check('wilaya').notEmpty().withMessage("l'a wilaya est obligatoire").trim()
    .isLength({min: 2, max: 20}).withMessage("wilaya tres long ou tres court"),
    validatorMiddleware
]

export default addClientValidator

