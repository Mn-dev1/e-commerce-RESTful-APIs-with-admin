import { check } from 'express-validator'
import validatorMiddleware from '../../middlewares/validatorMiddleware.js'

const addAdminValidator = [
    check('username').notEmpty().withMessage("le nom de l'admin est obligatoire").isLength({min: 3, max: 100}).withMessage("nom admin tres long ou moins de 3 caracteres"),
    check('email').notEmpty().withMessage("l'email est obligatoire").isEmail().withMessage("Format d'email invalide"),
    check('password').notEmpty().withMessage("le mot de passe est obligatoire").isLength({min: 8}).withMessage("le mot de passe doit etre au moins 8 caracteres"),
    validatorMiddleware
]

const updateAdminValidator = [
    check('id').isMongoId().withMessage("Id admin invalide"),
    check('username').isLength({min: 3, max: 100}).withMessage("nom admin tres long ou moins de 3 caracteres"),
    check('email').isEmail().withMessage("Format d'email invalide"),
    check('password').isLength({min: 8}).withMessage("le mot de passe doit etre au moins 8 caracteres"),
    validatorMiddleware
]

const deleteAdminValidator = [
    check('id').isMongoId().withMessage("Id admin invalide"),
    validatorMiddleware
]

export {addAdminValidator, updateAdminValidator, deleteAdminValidator}