import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'

const addClientValidator = [
    check('nom').notEmpty().withMessage("le nom et prénom sont obligatoires").trim()
    .isLength({min: 3, max: 100}).withMessage("nom tres long ou moins de 3 caracteres"),
    check('num_tel').notEmpty().withMessage("le numero de téléphone est obligatoire").trim()
    .isLength({min: 10, max: 10}).withMessage("numéro telephone invalide"),
    check('email').optional().trim().isEmail().withMessage("Format d'email invalide"),
    validatorMiddleware
]

export default addClientValidator

